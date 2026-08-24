// Domain-Specific Monthly & Weekly Roadmaps
// Each domain has unique monthly breakdown for every task

const MONTHLY_PLANS = {
  "Web Developer": {
    "Learn Internet Basics & Version Control": {
      1: ["Day 1-3: Internet fundamentals (TCP/IP, DNS, HTTP)", "Day 4-7: Learn the OSI model and networking basics"],
      2: ["Day 1-5: Git basics - clone, commit, push", "Day 6-7: GitHub profile setup and practice"],
      3: ["Day 1-4: Branching and merging strategies", "Day 5-7: Collaborative Git workflows"],
      4: ["Day 1-7: Advanced Git - rebase, stash, cherry-pick"]
    },
    "Master HTML5 Semantics & Accessibility": {
      1: ["Day 1-3: HTML document structure and elements", "Day 4-7: Semantic tags (header, nav, section, article)"],
      2: ["Day 1-5: Forms and input elements", "Day 6-7: ARIA labels and accessibility attributes"],
      3: ["Day 1-7: Building accessible navigation systems"],
      4: ["Day 1-7: SEO optimization and meta tags"]
    },
    "Master CSS3 Basics, Flexbox, & Grid": {
      1: ["Day 1-3: CSS selectors and specificity", "Day 4-7: Box model and positioning"],
      2: ["Day 1-4: Flexbox layout basics", "Day 5-7: Complex flex layouts"],
      3: ["Day 1-4: CSS Grid fundamentals", "Day 5-7: Advanced grid patterns"],
      4: ["Day 1-7: Responsive design and media queries"]
    },
    "Learn JavaScript Basics & DOM Manipulation": {
      1: ["Day 1-4: Variables, data types, operators", "Day 5-7: Control flow (if/else, loops)"],
      2: ["Day 1-4: Functions and scope", "Day 5-7: Objects and arrays"],
      3: ["Day 1-4: DOM selection and manipulation", "Day 5-7: Event listeners and handlers"],
      4: ["Day 1-7: DOM traversal and complex interactions"]
    },
    "Build 3 Simple Static Websites": {
      1: ["Day 1-3: Plan and sketch website layout", "Day 4-7: HTML structure"],
      2: ["Day 1-4: CSS styling and responsiveness", "Day 5-7: Add interactivity"],
      3: ["Day 1-4: Deploy website", "Day 5-7: Optimize and test"],
      4: ["Day 1-7: Create portfolio website"]
    },
    "Advanced JavaScript (ES6+, Async/Await)": {
      1: ["Day 1-3: Arrow functions and template literals", "Day 4-7: Destructuring and spread operator"],
      2: ["Day 1-4: Classes and inheritance", "Day 5-7: Promises and .then()"],
      3: ["Day 1-4: Async/await syntax", "Day 5-7: Error handling with try/catch"],
      4: ["Day 1-7: Functional programming concepts"]
    },
    "Learn a CSS Framework (Tailwind/Bootstrap)": {
      1: ["Day 1-3: Framework setup and configuration", "Day 4-7: Utility classes basics"],
      2: ["Day 1-4: Building components", "Day 5-7: Responsive utilities"],
      3: ["Day 1-4: Creating custom themes", "Day 5-7: Optimization techniques"],
      4: ["Day 1-7: Building complete UI with framework"]
    },
    "Master React.js Basics & Hooks": {
      1: ["Day 1-3: React setup and JSX", "Day 4-7: Components and props"],
      2: ["Day 1-4: State and useState hook", "Day 5-7: useEffect for side effects"],
      3: ["Day 1-4: Event handling in React", "Day 5-7: Conditional rendering"],
      4: ["Day 1-7: Building a multi-component app"]
    },
    "Understand REST APIs & Data Fetching": {
      1: ["Day 1-3: API fundamentals and REST principles", "Day 4-7: HTTP methods (GET, POST, PUT, DELETE)"],
      2: ["Day 1-4: Fetch API basics", "Day 5-7: Error handling and response parsing"],
      3: ["Day 1-4: Async data fetching patterns", "Day 5-7: Loading and error states"],
      4: ["Day 1-7: Building API integration"]
    },
    "Build Responsive Dynamic Web Projects": {
      1: ["Day 1-3: Plan project requirements", "Day 4-7: Create mockups and wireframes"],
      2: ["Day 1-4: Build frontend structure", "Day 5-7: Integrate with backend API"],
      3: ["Day 1-4: Add responsiveness", "Day 5-7: Test across devices"],
      4: ["Day 1-7: Deploy and document project"]
    },
    "Learn Node.js & Express.js Fundamentals": {
      1: ["Day 1-3: Node.js setup and basics", "Day 4-7: npm and package management"],
      2: ["Day 1-4: Express.js server setup", "Day 5-7: Routing basics"],
      3: ["Day 1-4: Middleware and request handling", "Day 5-7: Response sending"],
      4: ["Day 1-7: Building a simple REST API"]
    },
    "Master Relational & NoSQL Databases": {
      1: ["Day 1-3: SQL fundamentals and basic queries", "Day 4-7: JOIN operations"],
      2: ["Day 1-4: MongoDB document structure", "Day 5-7: CRUD operations"],
      3: ["Day 1-4: Database indexing and optimization", "Day 5-7: Transactions"],
      4: ["Day 1-7: Database design best practices"]
    },
    "Understand RESTful APIs & Authentication": {
      1: ["Day 1-3: RESTful design principles", "Day 4-7: Status codes and conventions"],
      2: ["Day 1-4: JWT authentication basics", "Day 5-7: Token generation and validation"],
      3: ["Day 1-4: Authorization and permissions", "Day 5-7: Secure password storage"],
      4: ["Day 1-7: OAuth and third-party auth"]
    },
    "Implement CRUD Operations Securely": {
      1: ["Day 1-3: Create endpoints", "Day 4-7: Read endpoints"],
      2: ["Day 1-4: Update endpoints", "Day 5-7: Delete endpoints"],
      3: ["Day 1-4: Input validation", "Day 5-7: SQL injection prevention"],
      4: ["Day 1-7: Rate limiting and security"]
    },
    "Build a Full-Stack Web Application": {
      1: ["Day 1-3: Architecture design", "Day 4-7: Setup project structure"],
      2: ["Day 1-4: Build backend API", "Day 5-7: Create frontend components"],
      3: ["Day 1-4: Integrate frontend and backend", "Day 5-7: Add authentication"],
      4: ["Day 1-7: Deploy to production"]
    },
    "Learn TypeScript & Next.js": {
      1: ["Day 1-3: TypeScript types and interfaces", "Day 4-7: Generics and advanced types"],
      2: ["Day 1-4: Next.js setup and pages", "Day 5-7: Dynamic routing"],
      3: ["Day 1-4: API routes in Next.js", "Day 5-7: SSR and SSG"],
      4: ["Day 1-7: Building production Next.js app"]
    },
    "Learn Docker & Containerization": {
      1: ["Day 1-3: Docker fundamentals", "Day 4-7: Creating Dockerfiles"],
      2: ["Day 1-4: Building and running containers", "Day 5-7: Docker networks"],
      3: ["Day 1-4: Docker volumes and persistence", "Day 5-7: Multi-container apps"],
      4: ["Day 1-7: Docker compose and orchestration"]
    },
    "Deploy on Cloud & CI/CD Pipelines": {
      1: ["Day 1-3: Cloud platforms (AWS, Heroku, Vercel)", "Day 4-7: Basic deployment"],
      2: ["Day 1-4: CI/CD pipeline setup", "Day 5-7: GitHub Actions introduction"],
      3: ["Day 1-4: Automated testing in CI/CD", "Day 5-7: Automated deployments"],
      4: ["Day 1-7: Monitoring and logging"]
    },
    "Understand System Design & Microservices": {
      1: ["Day 1-3: Monolith vs microservices", "Day 4-7: Service communication"],
      2: ["Day 1-4: API Gateway patterns", "Day 5-7: Service discovery"],
      3: ["Day 1-4: Load balancing and scaling", "Day 5-7: Distributed transactions"],
      4: ["Day 1-7: Resilience and fault tolerance"]
    },
    "Build a Large-Scale Production Project": {
      1: ["Day 1-3: System architecture planning", "Day 4-7: Database schema design"],
      2: ["Day 1-4: API endpoint design", "Day 5-7: Frontend architecture"],
      3: ["Day 1-4: Integration and testing", "Day 5-7: Performance optimization"],
      4: ["Day 1-7: Production deployment and monitoring"]
    }
  },

  "Frontend Developer": {
    "Learn HTML5 and Semantic Web": {
      1: ["Day 1-3: HTML document structure", "Day 4-7: Semantic elements (header, nav, section)"],
      2: ["Day 1-4: Form elements and validation", "Day 5-7: Accessibility attributes"],
      3: ["Day 1-4: Meta tags and SEO", "Day 5-7: Microdata and structured data"],
      4: ["Day 1-7: HTML best practices"]
    },
    "Master CSS3, Flexbox & Grid": {
      1: ["Day 1-3: CSS selectors and cascade", "Day 4-7: Box model and positioning"],
      2: ["Day 1-4: Flexbox layout", "Day 5-7: Grid layout"],
      3: ["Day 1-4: Transforms and transitions", "Day 5-7: Animations"],
      4: ["Day 1-7: Responsive design patterns"]
    },
    "Learn JavaScript Fundamentals": {
      1: ["Day 1-4: Variables and data types", "Day 5-7: Operators and control flow"],
      2: ["Day 1-4: Functions and scope", "Day 5-7: Objects and arrays"],
      3: ["Day 1-4: Array methods (map, filter, reduce)", "Day 5-7: String methods"],
      4: ["Day 1-7: Debugging and error handling"]
    },
    "DOM Manipulation & Browser APIs": {
      1: ["Day 1-3: DOM selection methods", "Day 4-7: DOM traversal"],
      2: ["Day 1-4: Creating and modifying elements", "Day 5-7: Styling with JavaScript"],
      3: ["Day 1-4: Event listeners and delegation", "Day 5-7: Local storage and session"],
      4: ["Day 1-7: Canvas and Web APIs"]
    },
    "Build static UI pages & Portfolios": {
      1: ["Day 1-3: Design mockups", "Day 4-7: HTML structure"],
      2: ["Day 1-4: CSS styling", "Day 5-7: Responsiveness"],
      3: ["Day 1-4: Interactive elements", "Day 5-7: Animation and effects"],
      4: ["Day 1-7: Portfolio deployment"]
    },
    "Advanced JavaScript (ES6+, Closures)": {
      1: ["Day 1-3: Arrow functions", "Day 4-7: Template literals and destructuring"],
      2: ["Day 1-4: Spread operator and rest params", "Day 5-7: Closures and scope"],
      3: ["Day 1-4: Classes and prototypes", "Day 5-7: Async programming"],
      4: ["Day 1-7: Functional programming"]
    },
    "Learn React.js or Vue.js Framework": {
      1: ["Day 1-3: Framework basics and components", "Day 4-7: JSX and templates"],
      2: ["Day 1-4: State management", "Day 5-7: Lifecycle and hooks"],
      3: ["Day 1-4: Props and data binding", "Day 5-7: Event handling"],
      4: ["Day 1-7: Building component library"]
    },
    "Master Responsive & Tailwind CSS": {
      1: ["Day 1-3: Utility-first CSS", "Day 4-7: Tailwind setup and config"],
      2: ["Day 1-4: Common components", "Day 5-7: Responsive utilities"],
      3: ["Day 1-4: Custom styling", "Day 5-7: Dark mode"],
      4: ["Day 1-7: Building UI quickly"]
    },
    "Work with REST APIs & Data Fetching": {
      1: ["Day 1-3: HTTP and REST concepts", "Day 4-7: Fetch API"],
      2: ["Day 1-4: Promises and async/await", "Day 5-7: Error handling"],
      3: ["Day 1-4: Request/response patterns", "Day 5-7: Authentication"],
      4: ["Day 1-7: Advanced API patterns"]
    },
    "Build dynamic frontend projects": {
      1: ["Day 1-3: Project planning", "Day 4-7: Component architecture"],
      2: ["Day 1-4: Data management", "Day 5-7: API integration"],
      3: ["Day 1-4: User interactions", "Day 5-7: Animations"],
      4: ["Day 1-7: Deployment"]
    },
    "Learn TypeScript for strict typing": {
      1: ["Day 1-3: Type basics", "Day 4-7: Interfaces and types"],
      2: ["Day 1-4: Generics", "Day 5-7: Advanced types"],
      3: ["Day 1-4: Integration with React", "Day 5-7: Type checking"],
      4: ["Day 1-7: Best practices"]
    },
    "Learn Next.js for SSR & SSG": {
      1: ["Day 1-3: Next.js setup", "Day 4-7: File-based routing"],
      2: ["Day 1-4: Static generation", "Day 5-7: Server-side rendering"],
      3: ["Day 1-4: API routes", "Day 5-7: Image optimization"],
      4: ["Day 1-7: Production deployment"]
    },
    "Write Unit Tests (Jest/React Testing)": {
      1: ["Day 1-3: Testing basics", "Day 4-7: Jest setup"],
      2: ["Day 1-4: Testing utilities", "Day 5-7: Component testing"],
      3: ["Day 1-4: Mocking and spies", "Day 5-7: Integration testing"],
      4: ["Day 1-7: Coverage and CI/CD"]
    },
    "Learn Webpack/Vite bundlers": {
      1: ["Day 1-3: Bundler concepts", "Day 4-7: Webpack configuration"],
      2: ["Day 1-4: Loaders and plugins", "Day 5-7: Code splitting"],
      3: ["Day 1-4: Vite setup", "Day 5-7: Performance optimization"],
      4: ["Day 1-7: Build pipeline"]
    },
    "Build real-world UI applications": {
      1: ["Day 1-3: Requirements gathering", "Day 4-7: Design system"],
      2: ["Day 1-4: Component development", "Day 5-7: State management"],
      3: ["Day 1-4: Testing and QA", "Day 5-7: Performance tuning"],
      4: ["Day 1-7: Launch and monitoring"]
    },
    "Master Web Performance Optimization": {
      1: ["Day 1-3: Performance metrics", "Day 4-7: Profiling tools"],
      2: ["Day 1-4: Code splitting", "Day 5-7: Lazy loading"],
      3: ["Day 1-4: Image optimization", "Day 5-7: Caching strategies"],
      4: ["Day 1-7: CDN and compression"]
    },
    "Learn Progressive Web Apps (PWA)": {
      1: ["Day 1-3: PWA concepts", "Day 4-7: Service worker basics"],
      2: ["Day 1-4: Offline functionality", "Day 5-7: Manifest files"],
      3: ["Day 1-4: Installation prompts", "Day 5-7: Push notifications"],
      4: ["Day 1-7: Deployment"]
    },
    "Learn Micro-Frontends Architecture": {
      1: ["Day 1-3: Architecture concepts", "Day 4-7: Module federation"],
      2: ["Day 1-4: Communication between apps", "Day 5-7: Shared dependencies"],
      3: ["Day 1-4: Routing and composition", "Day 5-7: Testing"],
      4: ["Day 1-7: Production setup"]
    },
    "Contribute to Open Source Projects": {
      1: ["Day 1-3: GitHub workflow", "Day 4-7: Finding projects"],
      2: ["Day 1-4: Making contributions", "Day 5-7: Code review process"],
      3: ["Day 1-4: Community engagement", "Day 5-7: Becoming maintainer"],
      4: ["Day 1-7: Building portfolio"]
    },
    "Prepare for Frontend interviews": {
      1: ["Day 1-3: Interview fundamentals", "Day 4-7: Coding challenges"],
      2: ["Day 1-4: System design prep", "Day 5-7: Behavioral questions"],
      3: ["Day 1-4: Frontend specific questions", "Day 5-7: Mock interviews"],
      4: ["Day 1-7: Final preparation"]
    }
  },

  "Backend Developer": {
    "Learn Internet & Networking Basics": {
      1: ["Day 1-3: OSI model layers", "Day 4-7: TCP/IP protocol suite"],
      2: ["Day 1-4: DNS and domain names", "Day 5-7: HTTP/HTTPS protocols"],
      3: ["Day 1-4: Port and socket concepts", "Day 5-7: Network security basics"],
      4: ["Day 1-7: Packet analysis"]
    },
    "Learn Python, Java, or Go basics": {
      1: ["Day 1-3: Language syntax", "Day 4-7: Variables and data types"],
      2: ["Day 1-4: Control flow structures", "Day 5-7: Functions and modules"],
      3: ["Day 1-4: Object-oriented programming", "Day 5-7: Error handling"],
      4: ["Day 1-7: File I/O operations"]
    },
    "Understand Data Structures & Algorithms": {
      1: ["Day 1-3: Arrays and linked lists", "Day 4-7: Stacks and queues"],
      2: ["Day 1-4: Trees and graphs", "Day 5-7: Hash tables"],
      3: ["Day 1-4: Sorting algorithms", "Day 5-7: Searching algorithms"],
      4: ["Day 1-7: Time and space complexity"]
    },
    "Learn Git, Terminal & Linux Command Line": {
      1: ["Day 1-3: Terminal basics", "Day 4-7: File operations"],
      2: ["Day 1-4: Git fundamentals", "Day 5-7: Branching and merging"],
      3: ["Day 1-4: Permissions and users", "Day 5-7: Package management"],
      4: ["Day 1-7: Shell scripting basics"]
    },
    "Build CLI-based applications": {
      1: ["Day 1-3: CLI argument parsing", "Day 4-7: Input/output handling"],
      2: ["Day 1-4: Configuration files", "Day 5-7: Error messages"],
      3: ["Day 1-4: File processing", "Day 5-7: Performance optimization"],
      4: ["Day 1-7: Packaging and distribution"]
    },
    "Learn a Backend Framework (Node.js/Django)": {
      1: ["Day 1-3: Framework fundamentals", "Day 4-7: Project structure"],
      2: ["Day 1-4: Routing and controllers", "Day 5-7: Middleware"],
      3: ["Day 1-4: Request/response handling", "Day 5-7: Error handling"],
      4: ["Day 1-7: Building API"]
    },
    "Master SQL & NoSQL Databases": {
      1: ["Day 1-3: SQL basics and queries", "Day 4-7: JOIN operations"],
      2: ["Day 1-4: Indexing and optimization", "Day 5-7: MongoDB basics"],
      3: ["Day 1-4: Document modeling", "Day 5-7: Transactions"],
      4: ["Day 1-7: Database design"]
    },
    "Build and test RESTful APIs": {
      1: ["Day 1-3: API design principles", "Day 4-7: Endpoint structure"],
      2: ["Day 1-4: Request validation", "Day 5-7: Response formatting"],
      3: ["Day 1-4: Unit testing APIs", "Day 5-7: Integration testing"],
      4: ["Day 1-7: API documentation"]
    },
    "Understand Authentication (JWT, OAuth)": {
      1: ["Day 1-3: Authentication basics", "Day 4-7: JWT tokens"],
      2: ["Day 1-4: Token validation", "Day 5-7: Refresh tokens"],
      3: ["Day 1-4: OAuth 2.0 flow", "Day 5-7: Social login"],
      4: ["Day 1-7: Security best practices"]
    },
    "Build backend APIs for web clients": {
      1: ["Day 1-3: API requirements", "Day 4-7: Schema design"],
      2: ["Day 1-4: Controller implementation", "Day 5-7: Database queries"],
      3: ["Day 1-4: Pagination and filtering", "Day 5-7: Error responses"],
      4: ["Day 1-7: Performance testing"]
    },
    "Learn GraphQL & gRPC APIs": {
      1: ["Day 1-3: GraphQL schema design", "Day 4-7: Queries and mutations"],
      2: ["Day 1-4: Resolvers", "Day 5-7: Error handling"],
      3: ["Day 1-4: gRPC protocol buffers", "Day 5-7: gRPC streaming"],
      4: ["Day 1-7: API optimization"]
    },
    "Learn Message Brokers (RabbitMQ/Kafka)": {
      1: ["Day 1-3: Message queue concepts", "Day 4-7: RabbitMQ setup"],
      2: ["Day 1-4: Producers and consumers", "Day 5-7: Kafka fundamentals"],
      3: ["Day 1-4: Topic and partition management", "Day 5-7: Consumer groups"],
      4: ["Day 1-7: Monitoring and scaling"]
    },
    "Master Web Security & Caching (Redis)": {
      1: ["Day 1-3: Security vulnerabilities", "Day 4-7: Input validation"],
      2: ["Day 1-4: SQL injection prevention", "Day 5-7: XSS and CSRF"],
      3: ["Day 1-4: Redis caching", "Day 5-7: Cache strategies"],
      4: ["Day 1-7: Rate limiting"]
    },
    "Learn Docker & Containerization": {
      1: ["Day 1-3: Container concepts", "Day 4-7: Dockerfile creation"],
      2: ["Day 1-4: Image management", "Day 5-7: Container networking"],
      3: ["Day 1-4: Volume persistence", "Day 5-7: Multi-container setups"],
      4: ["Day 1-7: Production deployment"]
    },
    "Work with Microservices Architecture": {
      1: ["Day 1-3: Service decomposition", "Day 4-7: Service communication"],
      2: ["Day 1-4: API gateway patterns", "Day 5-7: Service discovery"],
      3: ["Day 1-4: Data consistency", "Day 5-7: Distributed tracing"],
      4: ["Day 1-7: Resilience patterns"]
    },
    "Learn Kubernetes & Orchestration": {
      1: ["Day 1-3: K8s concepts", "Day 4-7: Pods and deployments"],
      2: ["Day 1-4: Services and networking", "Day 5-7: StatefulSets"],
      3: ["Day 1-4: Persistent volumes", "Day 5-7: ConfigMaps and secrets"],
      4: ["Day 1-7: Production management"]
    },
    "Learn Cloud Providers (AWS/Azure/GCP)": {
      1: ["Day 1-3: Cloud fundamentals", "Day 4-7: Compute services"],
      2: ["Day 1-4: Storage and databases", "Day 5-7: Networking"],
      3: ["Day 1-4: Security and IAM", "Day 5-7: Cost optimization"],
      4: ["Day 1-7: Multi-region deployment"]
    },
    "Learn CI/CD Pipelines & DevOps basics": {
      1: ["Day 1-3: Pipeline concepts", "Day 4-7: GitHub Actions"],
      2: ["Day 1-4: Testing automation", "Day 5-7: Build automation"],
      3: ["Day 1-4: Deployment strategies", "Day 5-7: Rollback procedures"],
      4: ["Day 1-7: Monitoring and alerts"]
    },
    "Master Database Scaling & Sharding": {
      1: ["Day 1-3: Vertical vs horizontal scaling", "Day 4-7: Read replicas"],
      2: ["Day 1-4: Replication strategies", "Day 5-7: Sharding concepts"],
      3: ["Day 1-4: Consistent hashing", "Day 5-7: Query routing"],
      4: ["Day 1-7: Data migration"]
    },
    "Build production-ready backend project": {
      1: ["Day 1-3: Architecture design", "Day 4-7: Database schema"],
      2: ["Day 1-4: API development", "Day 5-7: Integration testing"],
      3: ["Day 1-4: Security implementation", "Day 5-7: Performance tuning"],
      4: ["Day 1-7: Production deployment"]
    }
  },

  "Data Scientist": {
    "Learn Python for Data Science": {
      1: ["Day 1-3: Python syntax and basics", "Day 4-7: Data types and operations"],
      2: ["Day 1-4: Lists, dictionaries, sets", "Day 5-7: Functions and modules"],
      3: ["Day 1-4: File I/O operations", "Day 5-7: String manipulation"],
      4: ["Day 1-7: Debugging and testing"]
    },
    "Learn SQL for Data querying": {
      1: ["Day 1-3: SELECT and WHERE clauses", "Day 4-7: Filtering and sorting"],
      2: ["Day 1-4: JOIN operations", "Day 5-7: Aggregation functions"],
      3: ["Day 1-4: GROUP BY and HAVING", "Day 5-7: Subqueries"],
      4: ["Day 1-7: Query optimization"]
    },
    "Understand Statistics & Probability": {
      1: ["Day 1-3: Descriptive statistics", "Day 4-7: Normal distribution"],
      2: ["Day 1-4: Probability concepts", "Day 5-7: Conditional probability"],
      3: ["Day 1-4: Hypothesis testing", "Day 5-7: Confidence intervals"],
      4: ["Day 1-7: Bayesian statistics"]
    },
    "Learn Linear Algebra & Calculus basics": {
      1: ["Day 1-3: Vectors and matrices", "Day 4-7: Matrix operations"],
      2: ["Day 1-4: Eigenvalues and eigenvectors", "Day 5-7: Derivatives"],
      3: ["Day 1-4: Gradients and optimization", "Day 5-7: Chain rule"],
      4: ["Day 1-7: Multivariable calculus"]
    },
    "Master Data Manipulation with Pandas": {
      1: ["Day 1-3: DataFrames creation", "Day 4-7: Selection and filtering"],
      2: ["Day 1-4: Grouping and aggregation", "Day 5-7: Merging and joining"],
      3: ["Day 1-4: Data cleaning", "Day 5-7: Missing data handling"],
      4: ["Day 1-7: Data transformation"]
    },
    "Learn Data Visualization (Matplotlib, Seaborn)": {
      1: ["Day 1-3: Matplotlib basics", "Day 4-7: Plotting types"],
      2: ["Day 1-4: Seaborn fundamentals", "Day 5-7: Statistical plots"],
      3: ["Day 1-4: Subplots and layouts", "Day 5-7: Interactive plots"],
      4: ["Day 1-7: Dashboard creation"]
    },
    "Learn Exploratory Data Analysis (EDA)": {
      1: ["Day 1-3: Data understanding", "Day 4-7: Summary statistics"],
      2: ["Day 1-4: Distribution analysis", "Day 5-7: Correlation analysis"],
      3: ["Day 1-4: Outlier detection", "Day 5-7: Feature relationships"],
      4: ["Day 1-7: Report generation"]
    },
    "Understand Data Cleaning & Preprocessing": {
      1: ["Day 1-3: Missing data patterns", "Day 4-7: Imputation methods"],
      2: ["Day 1-4: Outlier treatment", "Day 5-7: Data normalization"],
      3: ["Day 1-4: Feature scaling", "Day 5-7: Categorical encoding"],
      4: ["Day 1-7: Pipeline creation"]
    },
    "Learn Scikit-Learn for Machine Learning": {
      1: ["Day 1-3: Scikit-learn basics", "Day 4-7: Train-test split"],
      2: ["Day 1-4: Cross-validation", "Day 5-7: Hyperparameter tuning"],
      3: ["Day 1-4: Model evaluation metrics", "Day 5-7: Pipelines"],
      4: ["Day 1-7: Model selection"]
    },
    "Build Supervised Learning models": {
      1: ["Day 1-3: Linear regression", "Day 4-7: Logistic regression"],
      2: ["Day 1-4: Decision trees", "Day 5-7: Random forests"],
      3: ["Day 1-4: SVM algorithms", "Day 5-7: Gradient boosting"],
      4: ["Day 1-7: Ensemble methods"]
    },
    "Learn Advanced Machine Learning": {
      1: ["Day 1-3: Unsupervised learning", "Day 4-7: K-means clustering"],
      2: ["Day 1-4: Hierarchical clustering", "Day 5-7: Dimensionality reduction"],
      3: ["Day 1-4: PCA", "Day 5-7: T-SNE"],
      4: ["Day 1-7: Anomaly detection"]
    },
    "Learn Deep Learning basics with TensorFlow": {
      1: ["Day 1-3: Neural network basics", "Day 4-7: TensorFlow setup"],
      2: ["Day 1-4: Layers and models", "Day 5-7: Training neural networks"],
      3: ["Day 1-4: Loss functions", "Day 5-7: Optimization techniques"],
      4: ["Day 1-7: Regularization"]
    },
    "Understand Natural Language Processing (NLP)": {
      1: ["Day 1-3: Text preprocessing", "Day 4-7: Tokenization"],
      2: ["Day 1-4: Word embeddings", "Day 5-7: TF-IDF and vectorization"],
      3: ["Day 1-4: Sentiment analysis", "Day 5-7: Named entity recognition"],
      4: ["Day 1-7: Text classification"]
    },
    "Learn Time Series Analysis": {
      1: ["Day 1-3: Time series basics", "Day 4-7: Trend and seasonality"],
      2: ["Day 1-4: ARIMA models", "Day 5-7: Exponential smoothing"],
      3: ["Day 1-4: Forecasting methods", "Day 5-7: Evaluation metrics"],
      4: ["Day 1-7: Anomaly detection"]
    },
    "Work on real-world Kaggle datasets": {
      1: ["Day 1-3: Competition analysis", "Day 4-7: Data exploration"],
      2: ["Day 1-4: Feature engineering", "Day 5-7: Model development"],
      3: ["Day 1-4: Ensemble methods", "Day 5-7: Submission creation"],
      4: ["Day 1-7: Results analysis"]
    },
    "Learn Big Data tools (Spark, Hadoop)": {
      1: ["Day 1-3: Hadoop fundamentals", "Day 4-7: MapReduce concept"],
      2: ["Day 1-4: Spark basics", "Day 5-7: RDD and DataFrames"],
      3: ["Day 1-4: Spark SQL", "Day 5-7: Spark Streaming"],
      4: ["Day 1-7: Cluster deployment"]
    },
    "Learn Model Deployment (Flask, FastAPI)": {
      1: ["Day 1-3: Flask basics", "Day 4-7: Creating endpoints"],
      2: ["Day 1-4: FastAPI introduction", "Day 5-7: Model serialization"],
      3: ["Day 1-4: REST API creation", "Day 5-7: Error handling"],
      4: ["Day 1-7: Production deployment"]
    },
    "Understand MLOps and Cloud ML": {
      1: ["Day 1-3: ML lifecycle", "Day 4-7: Experiment tracking"],
      2: ["Day 1-4: Model versioning", "Day 5-7: Cloud ML platforms"],
      3: ["Day 1-4: Monitoring models", "Day 5-7: Retraining pipelines"],
      4: ["Day 1-7: Cost optimization"]
    },
    "Learn Advanced Deep Learning": {
      1: ["Day 1-3: CNNs for images", "Day 4-7: Transfer learning"],
      2: ["Day 1-4: RNNs for sequences", "Day 5-7: LSTMs and GRUs"],
      3: ["Day 1-4: Attention mechanisms", "Day 5-7: Transformer models"],
      4: ["Day 1-7: GANs and VAEs"]
    },
    "Build full-stack Data Science projects": {
      1: ["Day 1-3: Problem definition", "Day 4-7: Data collection"],
      2: ["Day 1-4: Data preprocessing", "Day 5-7: Model development"],
      3: ["Day 1-4: Model evaluation", "Day 5-7: Deployment"],
      4: ["Day 1-7: Monitoring and maintenance"]
    }
  },

  "Machine Learning Engineer": {
    "Learn Python fundamentals": {
      1: ["Day 1-3: Syntax and basics", "Day 4-7: Data types"],
      2: ["Day 1-4: Control flow", "Day 5-7: Functions"],
      3: ["Day 1-4: OOP concepts", "Day 5-7: Modules and packages"],
      4: ["Day 1-7: Error handling"]
    },
    "Learn math for ML (Linear Algebra)": {
      1: ["Day 1-3: Vectors and matrices", "Day 4-7: Operations"],
      2: ["Day 1-4: Determinants", "Day 5-7: Eigenvalues"],
      3: ["Day 1-4: Matrix decomposition", "Day 5-7: Applications"],
      4: ["Day 1-7: Geometric interpretation"]
    },
    "Master Statistics & Probability": {
      1: ["Day 1-3: Distributions", "Day 4-7: Central limit theorem"],
      2: ["Day 1-4: Hypothesis testing", "Day 5-7: Confidence intervals"],
      3: ["Day 1-4: Bayesian methods", "Day 5-7: Markov chains"],
      4: ["Day 1-7: Information theory"]
    },
    "Learn Data Structures & Algorithms": {
      1: ["Day 1-3: Arrays and lists", "Day 4-7: Stacks and queues"],
      2: ["Day 1-4: Trees and graphs", "Day 5-7: Hash tables"],
      3: ["Day 1-4: Sorting algorithms", "Day 5-7: Graph algorithms"],
      4: ["Day 1-7: Optimization"]
    },
    "Understand ML fundamentals": {
      1: ["Day 1-3: Supervised learning", "Day 4-7: Unsupervised learning"],
      2: ["Day 1-4: Reinforcement learning", "Day 5-7: Loss functions"],
      3: ["Day 1-4: Regularization", "Day 5-7: Cross-validation"],
      4: ["Day 1-7: Bias-variance tradeoff"]
    },
    "Learn ML algorithms": {
      1: ["Day 1-3: Linear regression", "Day 4-7: Logistic regression"],
      2: ["Day 1-4: Decision trees", "Day 5-7: Random forests"],
      3: ["Day 1-4: Gradient boosting", "Day 5-7: SVM"],
      4: ["Day 1-7: Clustering algorithms"]
    },
    "Build ML projects": {
      1: ["Day 1-3: Problem definition", "Day 4-7: Data collection"],
      2: ["Day 1-4: Feature engineering", "Day 5-7: Model selection"],
      3: ["Day 1-4: Hyperparameter tuning", "Day 5-7: Validation"],
      4: ["Day 1-7: Deployment"]
    },
    "Learn feature engineering": {
      1: ["Day 1-3: Feature selection", "Day 4-7: Feature creation"],
      2: ["Day 1-4: Feature scaling", "Day 5-7: Encoding"],
      3: ["Day 1-4: Dimensionality reduction", "Day 5-7: Domain knowledge"],
      4: ["Day 1-7: Automated feature engineering"]
    },
    "Understand model evaluation": {
      1: ["Day 1-3: Confusion matrix", "Day 4-7: Precision and recall"],
      2: ["Day 1-4: F1 score", "Day 5-7: ROC curves"],
      3: ["Day 1-4: AUC metrics", "Day 5-7: Regression metrics"],
      4: ["Day 1-7: Cross-validation"]
    },
    "Practice Kaggle competitions": {
      1: ["Day 1-3: Competition analysis", "Day 4-7: Baseline model"],
      2: ["Day 1-4: Feature engineering", "Day 5-7: Ensemble methods"],
      3: ["Day 1-4: Hyperparameter optimization", "Day 5-7: Stacking"],
      4: ["Day 1-7: Final submission"]
    },
    "Learn TensorFlow or PyTorch": {
      1: ["Day 1-3: Framework setup", "Day 4-7: Tensors and operations"],
      2: ["Day 1-4: Neural network layers", "Day 5-7: Optimization"],
      3: ["Day 1-4: Custom models", "Day 5-7: Advanced features"],
      4: ["Day 1-7: Distributed training"]
    },
    "Develop deep learning models": {
      1: ["Day 1-3: CNN architectures", "Day 4-7: RNN basics"],
      2: ["Day 1-4: LSTM and GRU", "Day 5-7: Attention mechanisms"],
      3: ["Day 1-4: Transformers", "Day 5-7: Vision models"],
      4: ["Day 1-7: Custom architectures"]
    },
    "Learn NLP & Computer Vision": {
      1: ["Day 1-3: Text preprocessing", "Day 4-7: Word embeddings"],
      2: ["Day 1-4: Image preprocessing", "Day 5-7: CNN basics"],
      3: ["Day 1-4: Object detection", "Day 5-7: Segmentation"],
      4: ["Day 1-7: Multimodal models"]
    },
    "Learn model optimization": {
      1: ["Day 1-3: Quantization", "Day 4-7: Pruning"],
      2: ["Day 1-4: Knowledge distillation", "Day 5-7: Caching"],
      3: ["Day 1-4: Hardware acceleration", "Day 5-7: Edge deployment"],
      4: ["Day 1-7: Performance tuning"]
    },
    "Build advanced ML applications": {
      1: ["Day 1-3: Architecture design", "Day 4-7: Data pipeline"],
      2: ["Day 1-4: Model development", "Day 5-7: Integration"],
      3: ["Day 1-4: Testing", "Day 5-7: Monitoring"],
      4: ["Day 1-7: Production deployment"]
    },
    "Deploy ML models": {
      1: ["Day 1-3: Model serialization", "Day 4-7: API creation"],
      2: ["Day 1-4: Containerization", "Day 5-7: Orchestration"],
      3: ["Day 1-4: Scaling", "Day 5-7: Load balancing"],
      4: ["Day 1-7: Monitoring"]
    },
    "Learn MLOps practices": {
      1: ["Day 1-3: Experiment tracking", "Day 4-7: Model registry"],
      2: ["Day 1-4: CI/CD pipelines", "Day 5-7: Data versioning"],
      3: ["Day 1-4: Model monitoring", "Day 5-7: Retraining"],
      4: ["Day 1-7: Governance"]
    },
    "Master cloud ML services": {
      1: ["Day 1-3: AWS ML services", "Day 4-7: Azure ML"],
      2: ["Day 1-4: GCP ML Engine", "Day 5-7: AutoML"],
      3: ["Day 1-4: Model hosting", "Day 5-7: Batch prediction"],
      4: ["Day 1-7: Cost optimization"]
    },
    "Prepare ML interviews": {
      1: ["Day 1-3: ML fundamentals", "Day 4-7: System design"],
      2: ["Day 1-4: Coding problems", "Day 5-7: Algorithms"],
      3: ["Day 1-4: Real-world scenarios", "Day 5-7: Behavioral"],
      4: ["Day 1-7: Final preparation"]
    },
    "Build production ML systems": {
      1: ["Day 1-3: Requirements analysis", "Day 4-7: Architecture design"],
      2: ["Day 1-4: Data pipeline", "Day 5-7: Model training"],
      3: ["Day 1-4: Testing and validation", "Day 5-7: Deployment"],
      4: ["Day 1-7: Monitoring and maintenance"]
    }
  }
};

// Function to get monthly plan for specific task
function getMonthlyPlanData(career, task) {
  if (MONTHLY_PLANS[career] && MONTHLY_PLANS[career][task]) {
    return MONTHLY_PLANS[career][task];
  }
  return null;
}

// Function to generate detailed monthly breakdown
function generateDetailedMonthlyPlan(career, task) {
  const monthlyData = getMonthlyPlanData(career, task);
  if (!monthlyData) {
    return generateDefaultMonthlyPlan();
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let html = '<div class="months-grid">';

  months.forEach((month, i) => {
    const weeklyTasks = monthlyData[i + 1] || ["To be defined"];
    html += `
      <div class="month-card">
        <div class="month-title">Month ${i + 1} (${month})</div>
        <ul class="month-tasks">
          ${weeklyTasks.map(task => `<li>• ${task}</li>`).join('')}
        </ul>
      </div>
    `;
  });

  html += '</div>';
  return html;
}

// Default fallback for careers not yet in database
function generateDefaultMonthlyPlan() {
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
        <div class="month-title">Month ${i + 1}</div>
        <ul class="month-tasks">
          ${tasks.map(task => `<li>• ${task}</li>`).join('')}
        </ul>
      </div>
    `;
  });

  html += '</div>';
  return html;
}
