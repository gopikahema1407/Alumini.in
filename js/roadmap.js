// Career Roadmap System - Main JavaScript

let currentCareer = null;
let currentYearFilter = 0;
let progressData = {};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const { data: sessionData } = await window.supabaseClient?.auth.getSession();
    if (!sessionData?.session?.user) {
      window.location.href = "login.html";
      return;
    }

    initializeRoadmap();
  } catch (err) {
    console.error("Init error:", err);
    initializeRoadmap();
  }
});

function initializeRoadmap() {
  setupSearch();
  loadProgressFromStorage();
}

// ==================== SEARCH FUNCTIONALITY ====================
function setupSearch() {
  const searchInput = document.getElementById("search-input");
  const suggestions = document.getElementById("search-suggestions");

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    
    if (query.length === 0) {
      suggestions.classList.remove("show");
      return;
    }

    const results = searchCareers(query);
    
    if (results.length === 0) {
      suggestions.classList.remove("show");
      return;
    }

    suggestions.innerHTML = results.map(career => `
      <div class="search-suggestion" onclick="selectCareer('${career}')">
        ${career}
      </div>
    `).join("");
    
    suggestions.classList.add("show");
  });

  // Close suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box")) {
      suggestions.classList.remove("show");
    }
  });
}

function selectCareer(careerName) {
  document.getElementById("search-input").value = careerName;
  document.getElementById("search-suggestions").classList.remove("show");
  currentCareer = careerName;
  displayRoadmap(careerName);
}

// ==================== ROADMAP DISPLAY ====================
function generateRoadmap() {
  const input = document.getElementById("search-input").value.trim();
  
  if (!input) {
    alert("Please search and select a career first");
    return;
  }

  if (!getAllCareerNames().includes(input)) {
    alert("Please select a valid career from the suggestions");
    return;
  }

  selectCareer(input);
}

function displayRoadmap(careerName) {
  const roadmapData = getCareerRoadmap(careerName);
  if (!roadmapData) {
    alert("Career not found");
    return;
  }

  const content = document.getElementById("roadmap-content");
  content.classList.remove("empty");

  let html = `
    <div class="roadmap-header">
      <div class="domain-title">${careerName}</div>
      <div class="resource-links">
        <a href="${roadmapData.free}" target="_blank" class="resource-link">
          📚 Free Resources
        </a>
        <a href="${roadmapData.paid}" target="_blank" class="resource-link">
          💰 Paid Courses
        </a>
      </div>
    </div>

    <div class="years-container">
  `;

  const yearFilter = parseInt(document.getElementById("year-filter").value);
  
  // Determine starting year (1 if "All Years" selected, otherwise the selected year)
  const startYear = yearFilter === 0 ? 1 : yearFilter;

  for (let year = startYear; year <= 4; year++) {

    const tasks = roadmapData[year] || [];
    const progressKey = `${careerName}_year${year}`;
    const completed = progressData[progressKey] || [];
    const completionPercent = tasks.length > 0 ? Math.round((completed.length / tasks.length) * 100) : 0;

    html += `
      <div class="year-section" id="year-${year}">
        <div class="year-header" onclick="toggleYearSection(${year})">
          <div class="year-title">
            <span style="font-size: 0.9rem; opacity: 0.9;">
              ${year === 1 ? "1st" : year === 2 ? "2nd" : year === 3 ? "3rd" : "4th"} Year
            </span>
          </div>
          <div class="year-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${completionPercent}%"></div>
            </div>
            <span class="progress-text">${completed.length}/${tasks.length}</span>
            <span class="toggle-icon">▼</span>
          </div>
        </div>

        <div class="year-content">
    `;

    tasks.forEach((task, idx) => {
      const isCompleted = completed.includes(idx);
      const taskId = `${careerName}_${year}_${idx}`;

      html += `
        <div class="task-item ${isCompleted ? 'completed' : ''}">
          <input type="checkbox" class="task-checkbox" ${isCompleted ? 'checked' : ''} 
            onchange="toggleTask('${careerName}', ${year}, ${idx})" />
          <div class="task-content">
            <div class="task-title">${task}</div>
            <div class="task-actions">
              <button class="task-btn" onclick="toggleMonthlyPlan('monthly-${taskId}')">
                📅 Monthly Plan
              </button>
            </div>
            <div class="monthly-plan" id="monthly-${taskId}">
              ${generateMonthlyPlan(task)}
            </div>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  }

  html += `
    </div>
    <div class="time-estimate">
      ⏱️ Complete this roadmap in 1-2 years of consistent learning
    </div>
  `;

  content.innerHTML = html;
}

function toggleYearSection(year) {
  const section = document.getElementById(`year-${year}`);
  section.classList.toggle("collapsed");
}

function toggleMonthlyPlan(id) {
  const plan = document.getElementById(id);
  plan.classList.toggle("show");
}

function generateMonthlyPlan(taskTitle) {
  // Get domain-specific monthly plan if available
  if (currentCareer && typeof generateDetailedMonthlyPlan === 'function') {
    return generateDetailedMonthlyPlan(currentCareer, taskTitle);
  }
  
  // Fallback to default plan
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const tasks = [
    "Week 1-2: Learn fundamentals and theory",
    "Week 3: Practice with small exercises",
    "Week 4: Build a mini project"
  ];

  let html = '<div class="months-grid">';
  
  months.forEach((month, i) => {
    html += `
      <div class="month-card">
        <div class="month-title">Month ${i + 1} (${month})</div>
        <ul class="month-tasks">
          ${tasks.map(task => `<li>• ${task}</li>`).join('')}
        </ul>
      </div>
    `;
  });

  html += '</div>';
  return html;
}

// ==================== PROGRESS TRACKING ====================
function toggleTask(careerName, year, taskIdx) {
  const progressKey = `${careerName}_year${year}`;
  let completed = progressData[progressKey] || [];

  const index = completed.indexOf(taskIdx);
  if (index > -1) {
    completed.splice(index, 1);
  } else {
    completed.push(taskIdx);
  }

  progressData[progressKey] = completed;
  saveProgressToStorage();

  // Re-render to update progress bar
  displayRoadmap(careerName);
}

function saveProgressToStorage() {
  localStorage.setItem("roadmapProgress", JSON.stringify(progressData));
}

function loadProgressFromStorage() {
  const saved = localStorage.getItem("roadmapProgress");
  if (saved) {
    progressData = JSON.parse(saved);
  }
}

// ==================== FILTER BY YEAR ====================
function filterByYear() {
  if (currentCareer) {
    displayRoadmap(currentCareer);
  }
}

// ==================== EXPORT FUNCTIONALITY ====================
function exportToPDF() {
  if (!currentCareer) {
    alert("Please select a career first");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const roadmapData = getCareerRoadmap(currentCareer);

  // Title
  doc.setFontSize(20);
  doc.text(`${currentCareer} - Career Roadmap`, 20, 20);

  // Subtitle
  doc.setFontSize(12);
  doc.text(`Karpagam Institute of Technology Alumni Network`, 20, 30);

  let yPosition = 45;

  // Get year filter value
  const yearFilter = parseInt(document.getElementById("year-filter").value);
  const startYear = yearFilter === 0 ? 1 : yearFilter;

  // Add years (from selected year onwards)
  for (let year = startYear; year <= 4; year++) {
    const tasks = roadmapData[year] || [];
    const progressKey = `${currentCareer}_year${year}`;
    const completed = progressData[progressKey] || [];

    // Year header
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text(`${year === 1 ? "1st" : year === 2 ? "2nd" : year === 3 ? "3rd" : "4th"} Year (${completed.length}/${tasks.length} completed)`, 20, yPosition);
    yPosition += 8;

    // Tasks
    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    tasks.forEach((task, idx) => {
      const isCompleted = completed.includes(idx);
      const symbol = isCompleted ? "✓" : "○";
      const text = `${symbol} ${task}`;

      // Handle text wrapping
      const lines = doc.splitTextToSize(text, 170);
      lines.forEach((line, lineIdx) => {
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, 25, yPosition);
        yPosition += 6;
      });
    });

    yPosition += 5;
  }

  doc.save(`${currentCareer}_Roadmap.pdf`);
}

function exportToWord() {
  if (!currentCareer) {
    alert("Please select a career first");
    return;
  }

  const roadmapData = getCareerRoadmap(currentCareer);

  let html = `
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="UTF-8" />
      <title>${currentCareer} Roadmap</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #4CAF50; }
        h2 { color: #666; margin-top: 20px; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        td { border: 1px solid #ddd; padding: 10px; }
        tr:nth-child(odd) { background: #f9f9f9; }
        .completed { text-decoration: line-through; }
      </style>
    </head>
    <body>
      <h1>${currentCareer} - Career Roadmap</h1>
      <p><strong>Institution:</strong> Karpagam Institute of Technology Alumni Network</p>
      <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
  `;

  // Get year filter value
  const yearFilter = parseInt(document.getElementById("year-filter").value);
  const startYear = yearFilter === 0 ? 1 : yearFilter;

  for (let year = startYear; year <= 4; year++) {
    const tasks = roadmapData[year] || [];
    const progressKey = `${currentCareer}_year${year}`;
    const completed = progressData[progressKey] || [];

    html += `
      <h2>${year === 1 ? "1st" : year === 2 ? "2nd" : year === 3 ? "3rd" : "4th"} Year 
        (${completed.length}/${tasks.length} completed)</h2>
      <table>
        <tr style="background: #4CAF50; color: white;">
          <th>Status</th>
          <th>Task</th>
        </tr>
    `;

    tasks.forEach((task, idx) => {
      const isCompleted = completed.includes(idx);
      const status = isCompleted ? "✓ Completed" : "○ Pending";
      const rowClass = isCompleted ? 'completed' : '';

      html += `
        <tr>
          <td style="width: 80px; text-align: center; font-weight: bold;">${status}</td>
          <td class="${rowClass}">${task}</td>
        </tr>
      `;
    });

    html += `</table>`;
  }

  html += `
      <p style="margin-top: 30px; color: #666; font-size: 12px;">
        <strong>Note:</strong> This roadmap is personalized based on your career selection. 
        Complete each task systematically to progress through your career development journey.
      </p>
    </body>
    </html>
  `;

  const blob = new Blob([html], { type: "application/msword" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${currentCareer}_Roadmap.docx`;
  link.click();
}
