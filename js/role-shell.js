/*
 * KIT Alumni Network - Dynamic Navigation & Header Shell
 * Renders optimized header, collapsible sidebar, and mobile navigation
 */

document.addEventListener("DOMContentLoaded", async () => {
  await initAppShell();
});

async function initAppShell() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // Skip auth pages
  if (["index.html", "login.html", "signup.html", "register-alumni.html"].includes(currentPath)) {
    return;
  }

  if (!window.supabaseClient) {
    window.location.href = "login.html";
    return;
  }

  const { data: sessionData } = await window.supabaseClient.auth.getSession();
  if (!sessionData?.session?.user) {
    window.location.href = "login.html";
    return;
  }

  let authRole = null;
  let userProfile = null;

  try {
    const res = await window.apiClient.get(`/api/profile-me?user_id=${sessionData.session.user.id}`);
    if (res?.user) {
      authRole = res.user.role;
      userProfile = res.user;
      if (window.authService) {
        window.authService.setCurrentUser(res.user);
      }
    }
  } catch (err) {
    console.error("[Shell] Profile fetch failed:", err);
  }

  if (!authRole) {
    window.location.href = "login.html";
    return;
  }

  // Render header, sidebar, and mobile nav
  renderHeader(userProfile, authRole, currentPath);
  renderSidebar(authRole, currentPath);
  renderMobileNav(authRole, currentPath);
  
  // Setup event listeners
  setupMenuToggle();
}

function renderHeader(user, role, currentPath) {
  const container = document.getElementById("top-header-container");
  if (!container) return;

  const initials = user?.full_name 
    ? user.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "KI";

  const roleLabel = role === "admin" ? "🔐 Admin" : role === "alumni" ? "🎓 Alumni" : "⚡ Student";

  container.innerHTML = `
    <header class="top-header">
      <div class="header-left">
        <button class="btn btn-icon menu-toggle-btn" id="menu-toggle" aria-label="Toggle menu" style="margin-right: 8px;">
          <span style="font-size: 1.2rem;">☰</span>
        </button>
        <a href="dashboard.html" class="header-brand" style="display: flex; align-items: center; gap: 8px;">
          <img src="images/logo.png" alt="Logo" style="width: 40px; height: 40px; object-fit: contain;">
          <div class="header-brand-text">
            <div class="header-brand-main">KIT</div>
            <div class="header-brand-sub">Alumni</div>
          </div>
        </a>
      </div>
      <div class="header-right">
        <span class="role-badge">${roleLabel}</span>
        <div class="user-info">
          <div class="user-avatar">${initials}</div>
          <button class="btn btn-sm btn-secondary" onclick="window.authService?.logout()">Log out</button>
        </div>
      </div>
    </header>
  `;
}

function renderSidebar(role, currentPath) {
  const container = document.getElementById("sidebar-container");
  if (!container) return;

  const navItems = getNavItems(role);
  
  const navHTML = navItems.map(item => {
    const isActive = currentPath === item.href;
    return `
      <li class="nav-item ${isActive ? "active" : ""}">
        <a href="${item.href}" title="${item.label}">
          <span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>
        </a>
      </li>
    `;
  }).join("");

  container.innerHTML = `
    <aside class="sidebar">
      <nav class="nav-list">
        ${navHTML}
      </nav>
    </aside>
  `;
}

function renderMobileNav(role, currentPath) {
  const container = document.getElementById("mobile-menu-container");
  if (!container) return;

  const mobileItems = getMobileNavItems(role);
  
  const mobileHTML = mobileItems.map(item => {
    const isActive = currentPath === item.href;
    return `
      <a href="${item.href}" class="tab-item ${isActive ? "active" : ""}" onclick="closeSidebar()">
        <span class="tab-icon">${item.icon}</span>
        <span>${item.label}</span>
      </a>
    `;
  }).join("");

  container.innerHTML = `
    <nav class="bottom-tab-bar">
      ${mobileHTML}
    </nav>
  `;
}

function getNavItems(role) {
  if (role === "student") {
    return [
      { label: "Dashboard", href: "dashboard.html", icon: "📊" },
      { label: "Profile", href: "profile.html", icon: "👤" },
      { label: "Feed", href: "public-feed.html", icon: "📰" },
      { label: "Messages", href: "messages.html", icon: "💬" },
      { label: "Mentors", href: "directory.html", icon: "👥" },
      { label: "Matchmaker", href: "matchmaker.html", icon: "🎯" },
      { label: "Requests", href: "mentorship-requests.html", icon: "📩" },
      { label: "Jobs", href: "jobs.html", icon: "💼" },
      { label: "Roadmap", href: "roadmap.html", icon: "🗺️" },
      { label: "AI Mentor", href: "chat.html", icon: "🤖" },
      { label: "Settings", href: "profile-edit.html", icon: "⚙️" }
    ];
  } else if (role === "alumni") {
    return [
      { label: "Dashboard", href: "dashboard.html", icon: "📊" },
      { label: "Profile", href: "profile.html", icon: "👤" },
      { label: "Feed", href: "public-feed.html", icon: "📰" },
      { label: "Messages", href: "messages.html", icon: "💬" },
      { label: "Discover", href: "discover.html", icon: "🔍" },
      { label: "Network", href: "discover.html", icon: "🌐" },
      { label: "Requests", href: "mentorship-requests.html", icon: "📩" },
      { label: "Students", href: "student-directory.html", icon: "👨‍🎓" },
      { label: "Jobs", href: "jobs.html", icon: "💼" },
      { label: "AI Mentor", href: "chat.html", icon: "🤖" },
      { label: "Settings", href: "profile-edit.html", icon: "⚙️" }
    ];
  } else if (role === "admin") {
    return [
      { label: "Dashboard", href: "admin-dashboard.html", icon: "📊" },
      { label: "Users", href: "admin-users.html", icon: "👥" },
      { label: "Posts", href: "admin-posts.html", icon: "📰" },
      { label: "Messages", href: "admin-messages.html", icon: "💬" },
      { label: "Jobs", href: "admin-jobs.html", icon: "💼" },
      { label: "Mentorship", href: "admin-mentorship.html", icon: "🤝" },
      { label: "Settings", href: "admin-settings.html", icon: "⚙️" }
    ];
  }
  return [];
}

function getMobileNavItems(role) {
  if (role === "admin") {
    return [
      { label: "Home", href: "admin-dashboard.html", icon: "🏠" },
      { label: "Users", href: "admin-users.html", icon: "👥" },
      { label: "Posts", href: "admin-posts.html", icon: "📰" },
      { label: "Search", href: "discover.html", icon: "🔍" },
      { label: "Profile", href: "profile.html", icon: "👤" }
    ];
  }
  // Students & Alumni use same mobile nav
  return [
    { label: "Home", href: "dashboard.html", icon: "🏠" },
    { label: "Feed", href: "public-feed.html", icon: "📰" },
    { label: "Messages", href: "messages.html", icon: "💬" },
    { label: "Search", href: "discover.html", icon: "🔍" },
    { label: "Profile", href: "profile.html", icon: "👤" }
  ];
}

function setupMenuToggle() {
  const toggle = document.getElementById("menu-toggle");
  if (!toggle) return;

  // Single click handler
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSidebar();
  });

  // Close menu when clicking outside (but not on the button)
  document.addEventListener("click", (e) => {
    const sidebar = document.querySelector(".sidebar");
    if (!sidebar) return;
    
    // If menu is open and click is outside
    if (sidebar.classList.contains("open") && 
        !sidebar.contains(e.target) && 
        e.target.id !== "menu-toggle" &&
        !e.target.closest(".menu-toggle-btn")) {
      closeSidebar();
    }
  });
}

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;
  sidebar.classList.toggle("open");
}

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    sidebar.classList.remove("open");
  }
}

// Utility for role-based visibility
window.applyDataRoleFilters = function(role) {
  document.querySelectorAll("[data-role]").forEach(el => {
    const roles = el.getAttribute("data-role").split(",").map(r => r.trim());
    if (!roles.includes(role)) {
      el.style.display = "none";
    }
  });
};
