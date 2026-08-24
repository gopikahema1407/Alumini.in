// Career Roadmap Database with 50+ domains
const ROADMAP_DATA = {
  "Web Developer": {
    free: "https://www.freecodecamp.org",
    paid: "https://www.udemy.com",
    1: ["Learn Internet Basics & Version Control", "Master HTML5 Semantics & Accessibility", "Master CSS3 Basics, Flexbox, & Grid", "Learn JavaScript Basics & DOM Manipulation", "Build 3 Simple Static Websites"],
    2: ["Advanced JavaScript (ES6+, Async/Await)", "Learn a CSS Framework (Tailwind/Bootstrap)", "Master React.js Basics & Hooks", "Understand REST APIs & Data Fetching", "Build Responsive Dynamic Web Projects"],
    3: ["Learn Node.js & Express.js Fundamentals", "Master Relational & NoSQL Databases", "Understand RESTful APIs & Authentication", "Implement CRUD Operations Securely", "Build a Full-Stack Web Application"],
    4: ["Learn TypeScript & Next.js", "Learn Docker & Containerization", "Deploy on Cloud & CI/CD Pipelines", "Understand System Design & Microservices", "Build a Large-Scale Production Project"]
  },
  "Frontend Developer": {
    free: "https://www.w3schools.com",
    paid: "https://www.udemy.com",
    1: ["Learn HTML5 and Semantic Web", "Master CSS3, Flexbox & Grid", "Learn JavaScript Fundamentals", "DOM Manipulation & Browser APIs", "Build static UI pages & Portfolios"],
    2: ["Advanced JavaScript (ES6+, Closures)", "Learn React.js or Vue.js Framework", "Master Responsive & Tailwind CSS", "Work with REST APIs & Data Fetching", "Build dynamic frontend projects"],
    3: ["Learn TypeScript for strict typing", "Learn Next.js for SSR & SSG", "Write Unit Tests (Jest/React Testing)", "Learn Webpack/Vite bundlers", "Build real-world UI applications"],
    4: ["Master Web Performance Optimization", "Learn Progressive Web Apps (PWA)", "Learn Micro-Frontends Architecture", "Contribute to Open Source Projects", "Prepare for Frontend interviews"]
  },
  "Backend Developer": {
    free: "https://www.freecodecamp.org",
    paid: "https://www.udemy.com",
    1: ["Learn Internet & Networking Basics", "Learn Python, Java, or Go basics", "Understand Data Structures & Algorithms", "Learn Git, Terminal & Linux Command Line", "Build CLI-based applications"],
    2: ["Learn a Backend Framework (Node.js/Django)", "Master SQL & NoSQL Databases", "Build and test RESTful APIs", "Understand Authentication (JWT, OAuth)", "Build backend APIs for web clients"],
    3: ["Learn GraphQL & gRPC APIs", "Learn Message Brokers (RabbitMQ/Kafka)", "Master Web Security & Caching (Redis)", "Learn Docker & Containerization", "Work with Microservices Architecture"],
    4: ["Learn Kubernetes & Orchestration", "Learn Cloud Providers (AWS/Azure/GCP)", "Learn CI/CD Pipelines & DevOps basics", "Master Database Scaling & Sharding", "Build production-ready backend project"]
  },
  "Full Stack Developer": {
    free: "https://www.theodinproject.com",
    paid: "https://www.udemy.com",
    1: ["HTML & CSS Foundations", "JavaScript Essentials", "SQL & Database Basics", "Git & GitHub Basics", "Student CRUD App"],
    2: ["React.js Framework", "Node.js & Express APIs", "MongoDB & Mongoose", "Responsive UI with Tailwind", "Blog Web Application"],
    3: ["Advanced React Patterns", "Authentication & Security", "Docker & Containerization", "AWS EC2 & Deployment", "Real-Time Chat Application"],
    4: ["Next.js & Server-Side Rendering", "Microservices Architecture", "CI/CD Pipelines", "SaaS Dashboard Platform", "AI-Powered Career Platform"]
  },
  "Data Scientist": {
    free: "https://www.kaggle.com/learn",
    paid: "https://www.datacamp.com",
    1: ["Learn Python for Data Science", "Learn SQL for Data querying", "Understand Statistics & Probability", "Learn Linear Algebra & Calculus basics", "Master Data Manipulation with Pandas"],
    2: ["Learn Data Visualization (Matplotlib, Seaborn)", "Learn Exploratory Data Analysis (EDA)", "Understand Data Cleaning & Preprocessing", "Learn Scikit-Learn for Machine Learning", "Build Supervised Learning models"],
    3: ["Learn Advanced Machine Learning", "Learn Deep Learning basics with TensorFlow", "Understand Natural Language Processing (NLP)", "Learn Time Series Analysis", "Work on real-world Kaggle datasets"],
    4: ["Learn Big Data tools (Spark, Hadoop)", "Learn Model Deployment (Flask, FastAPI)", "Understand MLOps and Cloud ML", "Learn Advanced Deep Learning", "Build full-stack Data Science projects"]
  },
  "Machine Learning Engineer": {
    free: "https://fast.ai",
    paid: "https://www.coursera.org",
    1: ["Learn Python fundamentals", "Learn math for ML (Linear Algebra)", "Master Statistics & Probability", "Learn Data Structures & Algorithms", "Understand ML fundamentals"],
    2: ["Learn ML algorithms", "Build ML projects", "Learn feature engineering", "Understand model evaluation", "Practice Kaggle competitions"],
    3: ["Learn TensorFlow or PyTorch", "Develop deep learning models", "Learn NLP & Computer Vision", "Learn model optimization", "Build advanced ML applications"],
    4: ["Deploy ML models", "Learn MLOps practices", "Master cloud ML services", "Prepare ML interviews", "Build production ML systems"]
  },
  "AI/ML Engineer": {
    free: "https://www.elementsofai.com",
    paid: "https://www.udacity.com",
    1: ["Learn Python programming deeply", "Master Mathematics (Linear Algebra, Calculus)", "Learn Statistics and Probability", "Understand Data Structures", "Learn Data manipulation (Pandas, NumPy)"],
    2: ["Master Scikit-Learn & Classical ML", "Learn Deep Learning fundamentals", "Learn Neural Networks", "Master TensorFlow/PyTorch", "Learn Computer Vision basics"],
    3: ["Learn Advanced Computer Vision", "Learn Advanced NLP", "Learn Reinforcement Learning", "Learn Generative AI (GANs)", "Learn Large Language Models (LLMs)"],
    4: ["Learn MLOps", "Learn Docker & Kubernetes", "Deploy models on Cloud", "Understand AI Ethics", "Build full AI systems"]
  },
  "Data Engineer": {
    free: "https://www.kaggle.com/learn",
    paid: "https://www.coursera.org",
    1: ["Python basics", "SQL fundamentals", "Data fundamentals", "Statistics basics", "Data cleaning"],
    2: ["ETL pipelines", "Data warehouses", "Big data basics", "Spark fundamentals", "Data processing"],
    3: ["Distributed systems", "Data pipeline design", "Cloud data tools", "Streaming data", "Advanced data engineering"],
    4: ["Production pipelines", "Cloud deployment", "Data architecture", "Portfolio projects", "Data engineer interviews"]
  },
  "Cloud Engineer": {
    free: "https://aws.amazon.com/training",
    paid: "https://www.acloudguru.com",
    1: ["Learn Linux basics", "Learn networking fundamentals", "Understand cloud concepts", "AWS/Azure fundamentals", "Basic cloud setup"],
    2: ["Learn cloud services", "Understand storage solutions", "Learn networking in cloud", "Understand cloud security", "Build cloud projects"],
    3: ["Advanced cloud services", "Learn containerization (Docker)", "Learn Kubernetes", "Cloud architecture design", "Multi-cloud management"],
    4: ["Cloud certifications", "Enterprise cloud design", "Cloud cost optimization", "Advanced security", "Production deployments"]
  },
  "DevOps Engineer": {
    free: "https://roadmap.sh/devops",
    paid: "https://www.udemy.com",
    1: ["Learn Linux fundamentals", "Learn Git & version control", "Shell scripting basics", "Understand CI/CD concepts", "Basic automation"],
    2: ["Learn Docker containerization", "Learn CI/CD tools (Jenkins, GitHub Actions)", "Learn configuration management", "Infrastructure basics", "Build pipelines"],
    3: ["Learn Kubernetes", "Learn infrastructure as code", "Learn monitoring tools", "Learn logging systems", "Deploy applications"],
    4: ["Advanced Kubernetes", "Cloud integration", "Advanced monitoring", "Security practices", "Production management"]
  },
  "Cybersecurity Analyst": {
    free: "https://www.cybrary.it",
    paid: "https://www.udemy.com",
    1: ["Learn networking basics", "Learn Linux fundamentals", "Understand security concepts", "Learn encryption basics", "Security tools introduction"],
    2: ["Learn firewalls & IDS/IPS", "Understand vulnerability assessment", "Learn penetration testing basics", "Security policy & compliance", "Security projects"],
    3: ["Advanced penetration testing", "Learn SIEM tools", "Understand threat hunting", "Learn incident response", "Real-world security labs"],
    4: ["Security certifications", "Enterprise security", "Advanced threat analysis", "Security architecture", "Career preparation"]
  },
  "Ethical Hacker": {
    free: "https://www.hackthebox.com",
    paid: "https://www.udemy.com",
    1: ["Learn networking basics", "Learn Linux fundamentals", "Hacking fundamentals", "Networking protocols", "Security concepts"],
    2: ["Learn penetration testing", "Practice CTF challenges", "Learn hacking tools", "Vulnerability assessment", "Security labs"],
    3: ["Advanced penetration testing", "Web application testing", "Network testing", "Real-world scenarios", "CEH preparation"],
    4: ["OSCP certification", "Consulting skills", "Advanced techniques", "Career as pentester", "Ethical hacking portfolio"]
  },
  "Network Engineer": {
    free: "https://www.netacad.com",
    paid: "https://www.udemy.com",
    1: ["Learn networking basics (OSI, TCP/IP)", "Understand IP addressing", "Learn routing basics", "Understand switches", "Network fundamentals"],
    2: ["Learn CCNA concepts", "Practice subnetting", "Configure routers", "Configure switches", "Build test networks"],
    3: ["Advanced routing", "Network security", "WAN technologies", "Network optimization", "CCNA labs"],
    4: ["CCNA certification", "Advanced networking", "Network design", "Enterprise networks", "Career path"]
  },
  "Mobile Developer (iOS)": {
    free: "https://www.hackingwithswift.com",
    paid: "https://www.udemy.com",
    1: ["Learn Swift programming", "Learn iOS fundamentals", "Understand MVC pattern", "Build basic apps", "Learn UIKit"],
    2: ["Learn SwiftUI", "Network programming", "Data persistence", "Build dynamic apps", "iOS projects"],
    3: ["Advanced iOS development", "Performance optimization", "iOS security", "Real device testing", "App deployment"],
    4: ["App Store publishing", "App marketing", "Advanced Swift patterns", "iOS interviews", "Career path"]
  },
  "Mobile Developer (Android)": {
    free: "https://developer.android.com/courses",
    paid: "https://www.udemy.com",
    1: ["Learn Java or Kotlin", "Learn Android fundamentals", "Understand Activities", "Build basic apps", "Learn Android Studio"],
    2: ["Learn fragments", "Network programming", "Database basics", "Build dynamic apps", "Android projects"],
    3: ["Advanced Android development", "Performance optimization", "Android security", "Real device testing", "App deployment"],
    4: ["Play Store publishing", "App marketing", "Advanced patterns", "Android interviews", "Career path"]
  },
  "Game Developer": {
    free: "https://learn.unity.com",
    paid: "https://www.gamedev.tv",
    1: ["Learn programming basics", "Learn game design", "Learn C# for Unity", "Build simple games", "Understand game loops"],
    2: ["Learn Unity engine", "3D graphics basics", "Physics engine", "Build medium games", "Game projects"],
    3: ["Advanced game development", "AI & pathfinding", "Optimization", "Multiplayer basics", "Complex games"],
    4: ["Game publishing", "Unreal Engine", "Game portfolio", "Career as game dev", "Industry knowledge"]
  },
  "UI/UX Designer": {
    free: "https://www.figma.com/learn",
    paid: "https://www.udemy.com",
    1: ["Design fundamentals", "Color theory", "Typography basics", "UI principles", "Learn Figma"],
    2: ["Wireframing", "Layout design", "Component design", "Responsive design", "Design systems"],
    3: ["Advanced UI/UX", "User research", "Usability testing", "Design thinking", "Real projects"],
    4: ["UX portfolio", "Accessibility design", "Advanced Figma", "UX interviews", "Career path"]
  },
  "Product Manager": {
    free: "https://www.productschool.com/blog",
    paid: "https://www.coursera.org",
    1: ["Product basics", "Market research", "User research", "Product strategy", "Communication skills"],
    2: ["Product lifecycle", "Analytics basics", "Data analysis", "Roadmap planning", "Product cases"],
    3: ["Advanced analytics", "Growth strategies", "A/B testing", "Product leadership", "Real products"],
    4: ["Product portfolio", "Business strategy", "Stakeholder management", "PM interviews", "Career path"]
  },
  "Data Analyst": {
    free: "https://www.google.com/analytics/learn",
    paid: "https://www.coursera.org",
    1: ["Learn Excel", "SQL basics", "Statistics fundamentals", "Data basics", "Analytics concepts"],
    2: ["Advanced SQL", "Power BI / Tableau", "Dashboard creation", "Data visualization", "Analytics projects"],
    3: ["Advanced analytics", "Business intelligence", "Statistical analysis", "Real datasets", "Analytics tools"],
    4: ["Analytics portfolio", "Advanced tools", "Career development", "Analytics interviews", "Industry roles"]
  },
  "Business Analyst": {
    free: "https://www.edx.org",
    paid: "https://www.coursera.org",
    1: ["Business basics", "Requirements analysis", "Process mapping", "Communication skills", "Problem solving"],
    2: ["Business modeling", "Data analysis", "Stakeholder management", "Documentation", "Business cases"],
    3: ["Advanced analysis", "Business intelligence", "Strategic planning", "Real projects", "Tools & techniques"],
    4: ["BA portfolio", "Enterprise analysis", "Consulting skills", "BA interviews", "Career path"]
  },
  "Solutions Architect": {
    free: "https://www.freecodecamp.org",
    paid: "https://www.coursera.org",
    1: ["Software basics", "Design patterns", "System fundamentals", "Architecture basics", "Cloud concepts"],
    2: ["Enterprise architecture", "API design", "Database design", "Security architecture", "Real systems"],
    3: ["Advanced architecture", "Microservices", "Scalability", "High availability", "Complex systems"],
    4: ["Architecture portfolio", "Consulting", "Technical leadership", "Interviews", "Career path"]
  },
  "Solutions Engineer": {
    free: "https://www.freecodecamp.org",
    paid: "https://www.udemy.com",
    1: ["Technical basics", "Product knowledge", "Client communication", "Troubleshooting", "Documentation"],
    2: ["Advanced troubleshooting", "System integration", "API knowledge", "Custom solutions", "Client projects"],
    3: ["Enterprise solutions", "Sales engineering", "Technical expertise", "Complex implementations", "Real clients"],
    4: ["Solutions portfolio", "Leadership", "Consulting", "Career development", "Industry roles"]
  },
  "QA Engineer": {
    free: "https://www.guru99.com/software-testing.html",
    paid: "https://www.udemy.com",
    1: ["Testing fundamentals", "Manual testing", "Test case writing", "Bug reporting", "Quality basics"],
    2: ["Test automation basics", "Selenium framework", "Java/Python for testing", "Test design", "Automation projects"],
    3: ["Advanced automation", "Performance testing", "API testing", "CI/CD testing", "Real test suites"],
    4: ["Test portfolio", "Leadership", "Advanced tools", "QA career", "Industry practices"]
  },
  "DevOps/SRE": {
    free: "https://roadmap.sh/devops",
    paid: "https://www.udemy.com",
    1: ["Linux fundamentals", "Networking basics", "Shell scripting", "Version control", "Cloud basics"],
    2: ["Docker & containers", "CI/CD pipelines", "Kubernetes basics", "Infrastructure as code", "Monitoring basics"],
    3: ["Advanced Kubernetes", "Cloud services", "Observability", "Incident response", "Production systems"],
    4: ["SRE practices", "Advanced DevOps", "Career development", "Leadership", "Industry roles"]
  },
  "Security Engineer": {
    free: "https://www.cybrary.it",
    paid: "https://www.udemy.com",
    1: ["Security basics", "Network security", "Cryptography", "Authentication", "Security concepts"],
    2: ["Advanced security", "Web security", "Secure coding", "Security tools", "Security projects"],
    3: ["Enterprise security", "Cloud security", "Security architecture", "Threat modeling", "Real scenarios"],
    4: ["Security career", "Certifications", "Leadership", "Advanced techniques", "Industry roles"]
  },
  "Infrastructure Engineer": {
    free: "https://www.linuxfoundation.org",
    paid: "https://www.udemy.com",
    1: ["Linux basics", "Networking fundamentals", "Server setup", "Basic automation", "Infrastructure concepts"],
    2: ["Advanced Linux", "Network administration", "Storage systems", "Backup solutions", "Infrastructure projects"],
    3: ["Cloud infrastructure", "Virtualization", "Infrastructure automation", "High availability", "Scaling systems"],
    4: ["Infrastructure portfolio", "Cloud certifications", "Leadership", "Career development", "Enterprise roles"]
  },
  "IT Support Specialist": {
    free: "https://www.netacad.com",
    paid: "https://www.udemy.com",
    1: ["Computer hardware basics", "Operating systems", "Network basics", "Troubleshooting", "Customer service"],
    2: ["Advanced troubleshooting", "System administration", "Help desk tools", "Security basics", "IT support"],
    3: ["Network support", "Server support", "Advanced diagnostics", "IT projects", "Complex issues"],
    4: ["IT career path", "Specializations", "Leadership", "Certifications", "Industry roles"]
  },
  "Blockchain Developer": {
    free: "https://cryptozombies.io",
    paid: "https://www.udemy.com",
    1: ["Blockchain basics", "Cryptocurrency fundamentals", "Smart contracts introduction", "Solidity basics", "Ethereum basics"],
    2: ["Advanced Solidity", "DApp development", "Web3.js", "Consensus mechanisms", "Blockchain projects"],
    3: ["Advanced blockchain", "DeFi protocols", "Security auditing", "Layer 2 solutions", "Complex dApps"],
    4: ["Blockchain portfolio", "Advanced protocols", "Career development", "Interviews", "Industry roles"]
  },
  "AR/VR Developer": {
    free: "https://learn.xr.university",
    paid: "https://www.udemy.com",
    1: ["3D fundamentals", "Unity basics", "C# for XR", "AR concepts", "VR concepts"],
    2: ["ARKit/ARCore", "VR development", "3D modeling", "User interaction", "AR/VR projects"],
    3: ["Advanced XR", "Multiplayer XR", "Performance optimization", "Complex interactions", "Real XR apps"],
    4: ["XR portfolio", "Publishing apps", "Advanced techniques", "Career path", "Industry roles"]
  }
};

// Function to get all career names
function getAllCareerNames() {
  return Object.keys(ROADMAP_DATA).sort();
}

// Function to search careers with fuzzy matching
function searchCareers(query) {
  if (!query || query.length < 1) return [];
  
  const lowerQuery = query.toLowerCase();
  return getAllCareerNames().filter(career =>
    career.toLowerCase().includes(lowerQuery) ||
    lowerQuery.split('').every(char => career.toLowerCase().includes(char))
  ).slice(0, 10);
}

// Function to get career roadmap
function getCareerRoadmap(careerName) {
  return ROADMAP_DATA[careerName] || null;
}
