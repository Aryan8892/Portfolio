export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'IoT & Embedded' | 'Web App';
  featured: boolean;
  shortDescription: string;
  problemSolved: string;
  fullDescription: string;
  tags: string[];
  features: string[];
  architectureOverview: string;
  metricsOrOutcome?: string;
  githubUrl: string;
  liveUrl?: string;
  isPrototypeOrHardware?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Proficient' | 'Familiar';
    iconName?: string;
    description: string;
  }[];
}

export interface EducationItem {
  degree: string;
  specialization: string;
  institution: string;
  location: string;
  duration: string;
  status: string;
  cgpaOrGrade: string;
  relevantCoursework: string[];
  keyHighlights: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Aryan Pandey",
    roleHeadline: "Aspiring Software Engineer & B.Tech Student",
    subheadline: "Specializing in Java, Data Structures & Algorithms, and Modern Web Applications",
    shortBio: "A dedicated B.Tech student with strong problem-solving skills and a passion for engineering scalable software solutions. Actively seeking Software Development Engineer (SDE) internships and graduate engineering roles where I can build reliable, impactful systems.",
    location: "India [Update City/State]",
    statusBadge: "Actively seeking 2026/2027 SDE Internships & Placements",
    email: "aryan.dev.contact@example.com", // Replace with your primary email
    github: "https://github.com/aryanPandey-dev", // Replace with your GitHub profile
    linkedin: "https://linkedin.com/in/aryan-Pandey-dev", // Replace with your LinkedIn profile
    resumeUrl: "/resume.pdf", // Path in public directory
    resumeLastUpdated: "Updated for 2026 Opportunities",
    stats: [
      { label: "Core Projects", value: "3+" },
      { label: "DSA Problems Solved", value: "250+" },
      { label: "Primary Language", value: "Java" },
      { label: "Focus", value: "SDE & Web" },
    ]
  },

  about: {
    title: "About Me",
    badge: "Student & Software Developer",
    introduction: "I am a Bachelor of Technology (B.Tech) undergraduate driven by an intrinsic curiosity for computational problem solving and clean system architecture. My primary foundation lies in Java and Data Structures & Algorithms, complemented by hands-on engineering across full-stack web platforms and IoT hardware prototypes.",
    pillars: [
      {
        title: "Algorithmic Rigor",
        description: "Constantly practicing core Data Structures & Algorithms (Trees, Graphs, DP, Arrays) with a strong emphasis on time and space complexity optimization."
      },
      {
        title: "Robust Development",
        description: "Building responsive, maintainable web applications using React, TypeScript, and modern frontend design principles backed by clean RESTful architectures."
      },
      {
        title: "Hardware & IoT Exploration",
        description: "Translating code into real-world impact through embedded microcontroller systems, sensor integrations, and automated safety logic."
      },
      {
        title: "Engineering Mindset",
        description: "Valuing clean code, version control hygiene (Git/GitHub), semantic structure, and continuous learning alongside collaborative team workflows."
      }
    ],
    technicalHighlights: [
      "Proficient in Java Object-Oriented Programming (OOP) and Collections Framework",
      "Hands-on experience developing end-to-end full stack web portals and embedded prototypes",
      "Solid comprehension of Operating Systems, DBMS (SQL), and Computer Networking fundamentals",
      "Passionate about writing readable, modular, and maintainable software"
    ]
  },

  skills: [
    {
      title: "Core Languages & Foundations",
      description: "Fundamental languages and algorithmic programming",
      skills: [
        { name: "Java (Core & OOP)", level: "Advanced", description: "Inheritance, Polymorphism, Collections Framework, Multithreading & Exception Handling" },
        { name: "Data Structures & Algorithms", level: "Advanced", description: "Array manipulations, Linked Lists, Trees, Graphs, Sorting/Searching, Dynamic Programming" },
        { name: "C / C++", level: "Proficient", description: "Pointers, memory concepts, fundamental logic and embedded firmware programming" },
        { name: "SQL", level: "Proficient", description: "Relational schema design, complex joins, indexing, query optimization" }
      ]
    },
    {
      title: "Frontend & Web Technologies",
      description: "Modern client-side engineering and responsive user interfaces",
      skills: [
        { name: "React.js", level: "Proficient", description: "Functional components, custom hooks, virtual DOM, performance optimization" },
        { name: "TypeScript", level: "Proficient", description: "Strict static typing, interfaces, generics, maintainable codebases" },
        { name: "JavaScript (ES6+)", level: "Advanced", description: "Asynchronous async/await, closures, promises, DOM manipulation" },
        { name: "Tailwind CSS", level: "Advanced", description: "Utility-first design systems, responsive layouts, glassmorphism, micro-interactions" },
        { name: "HTML5 & Semantic Web", level: "Advanced", description: "Accessible markup, SEO metadata, web standards, cross-browser compatibility" }
      ]
    },
    {
      title: "Computer Science Fundamentals",
      description: "Underpinning academic and engineering foundations",
      skills: [
        { name: "Object-Oriented Design (OOD)", level: "Advanced", description: "SOLID principles, design patterns, modular architecture, abstraction" },
        { name: "Database Management (DBMS)", level: "Proficient", description: "ACID properties, normalization, relational integrity, transaction management" },
        { name: "Operating Systems (OS)", level: "Proficient", description: "Process scheduling, thread concurrency, memory management, file systems" },
        { name: "Computer Networks (CN)", level: "Proficient", description: "OSI & TCP/IP models, HTTP/HTTPS, DNS, sockets, REST API design" }
      ]
    },
    {
      title: "Tools, Platforms & Workflow",
      description: "Development tools, deployment environments and version control",
      skills: [
        { name: "Git & GitHub", level: "Advanced", description: "Branching strategies, pull requests, version control, collaborative workflows" },
        { name: "REST APIs & Postman", level: "Proficient", description: "API design, endpoint testing, request/response payload validation" },
        { name: "Vite & Modern Tooling", level: "Proficient", description: "Rapid bundling, HMR, modern ES modules build optimization" },
        { name: "Linux / CLI & Shell", level: "Familiar", description: "Command-line navigation, file permissions, shell scripts, environment configuration" }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "civictrust-portal",
      title: "CivicTrust Complaint Management Portal",
      subtitle: "Decentralized & Transparent Civic Grievance Tracking System",
      category: "Full-Stack",
      featured: true,
      shortDescription: "A modern, role-based complaint registration and tracking platform enabling citizens and municipal administrators to log, monitor, and resolve civic infrastructure issues in real-time.",
      problemSolved: "Municipal complaint processes are often opaque, slow, and prone to lost tickets. CivicTrust streamlines grievance redressal with automated ticket IDs, status milestones, and accountability logging.",
      fullDescription: "CivicTrust provides a structured digital workflow between citizens and administrative departments. Citizens can submit detailed grievances with category tagging (roads, sanitation, water supply, electricity), track resolution progress through a live status pipeline, and receive automated notifications. Administrators have an overview dashboard to assign department officers, filter complaints by urgency, and update resolution notes.",
      tags: ["React", "TypeScript", "Tailwind CSS", "RESTful APIs", "Java Backend Architecture", "SQL Database"],
      features: [
        "Role-based authentication & separation (Citizen vs Department Administrator)",
        "Automated unique ticket generator and end-to-end lifecycle status tracking",
        "Categorized departmental routing (Sanitation, Roads, Electricity, Water)",
        "Priority flags and SLA escalation alerts for overdue civic grievances",
        "Responsive administrative dashboard with complaint resolution analytics"
      ],
      architectureOverview: "Frontend built with React and TypeScript communicating via RESTful endpoints to a modular backend service, backed by a normalized relational database schema for immutable complaint auditing.",
      metricsOrOutcome: "Simulated load testing demonstrated seamless handling of simultaneous complaint registrations with under 150ms average API response time.",
      githubUrl: "https://github.com/aryanPandey-dev/CivicTrust-Complaint-Portal",
      liveUrl: "https://civictrust-demo.example.com",
      isPrototypeOrHardware: false
    },
    {
      id: "alcohol-sensing-alert",
      title: "Alcohol Sensing Alert: Engine Off Technology",
      subtitle: "Smart Automotive Safety & DUI Prevention Embedded System",
      category: "IoT & Embedded",
      featured: true,
      shortDescription: "An embedded IoT safety prototype incorporating high-precision alcohol gas sensing with microcontroller logic to automatically prevent vehicle ignition and alert emergency contacts when alcohol thresholds are breached.",
      problemSolved: "Drunk driving causes millions of preventable accidents worldwide. This system provides a physical preventative safeguard by disengaging the vehicle ignition system before the vehicle can be operated.",
      fullDescription: "Engineered around an MQ-3 alcohol sensor and microcontroller processing unit (Arduino/ESP32). When a driver enters the cabin, the sensor continuously monitors air sample concentration. If blood alcohol concentration (BAC) estimation exceeds the programmed safety threshold, a 5V relay module triggers an immediate ignition cutoff circuit, rendering the engine start sequence inoperable. Concurrently, an audible buzzer and LCD diagnostic alert are engaged, and an alert packet is transmitted via GSM/GPS telemetry.",
      tags: ["Embedded C/C++", "Arduino / ESP32", "MQ-3 Gas Sensor", "Relay Control", "IoT Telemetry", "Hardware Prototype"],
      features: [
        "Continuous alcohol vapor sensing with calibration against ambient temperature",
        "Instant mechanical relay cutoff preventing starter motor and ignition coil activation",
        "Audible piezo buzzer warning and dual-line LCD real-time PPM readout",
        "Fail-safe circuit architecture ensuring default engine lock upon sensor disconnection",
        "Emergency telemetry alert module configuration for GPS location broadcasting"
      ],
      architectureOverview: "Analog sensor signals are digitized through ADC pins, evaluated against safety threshold algorithms on the MCU, which then toggles GPIO pins to switch high-power electromechanical relays.",
      metricsOrOutcome: "Sub-second (<800ms) detection-to-cutoff response latency achieved in prototype testing environments.",
      githubUrl: "https://github.com/aryanPandey-dev/Alcohol-Sensing-Engine-Cutoff",
      isPrototypeOrHardware: true
    },
    {
      id: "smart-work-hub",
      title: "SMART-WORK-HUB",
      subtitle: "Centralized Productivity & Team Task Coordination Platform",
      category: "Web App",
      featured: true,
      shortDescription: "A modular productivity workspace engineered to streamline team sprint planning, milestone delivery, priority filtering, and project progress tracking.",
      problemSolved: "Distributed student and developer teams struggle with fragmented communication and scattered task checklists. SMART-WORK-HUB consolidates sprint tracking into a clean, distraction-free interface.",
      fullDescription: "SMART-WORK-HUB offers customizable Kanban boards, priority categorization, milestone countdowns, and progress analytics. Built with high-performance client state management to ensure instantaneous reactivity, drag-and-drop task reordering, and local persistence fallback.",
      tags: ["React", "TypeScript", "Tailwind CSS", "State Management", "Vite", "Productivity"],
      features: [
        "Interactive multi-column Kanban board with dynamic task status transitions",
        "Priority categorization (High, Medium, Low) and deadline urgency badges",
        "Instant search filter and tag-based sorting across all backlog items",
        "Persistent local state caching with seamless synchronization",
        "Clean, distraction-free dark UI designed for engineering sprints"
      ],
      architectureOverview: "Modular React component architecture utilizing strict TypeScript type contracts, centralized reducer-based state management, and optimized render cycles.",
      metricsOrOutcome: "100% client-side offline capability with zero layout shift (CLS < 0.01) and instant load times.",
      githubUrl: "https://github.com/aryanPandey-dev/SMART-WORK-HUB",
      liveUrl: "https://smart-work-hub-demo.example.com",
      isPrototypeOrHardware: false
    }
  ] as Project[],

  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      specialization: "Computer Science & Engineering",
      institution: "[Your University / Institute Name]", // E.g., National Institute of Technology / State Technical University
      location: "[City, State, Country]",
      duration: "2023 - 2027 (Expected)",
      status: "Currently in 3rd Year / Undergraduate",
      cgpaOrGrade: "Current CGPA: 8.5 / 10.0 [Update with actual grade]",
      relevantCoursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming (Java/C++)",
        "Database Management Systems (DBMS)",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
        "Discrete Mathematics",
        "Design & Analysis of Algorithms"
      ],
      keyHighlights: [
        "Strong academic foundation in core computer science principles and algorithmic design",
        "Active participant in technical symposiums, coding competitions, and hackathons",
        "Hands-on project work bridging theoretical algorithms with practical software development"
      ]
    },
    {
      degree: "Senior Secondary Education (Class XII)",
      specialization: "Science Stream (Physics, Chemistry, Mathematics & Computer Science)",
      institution: "[Your Senior Secondary School / Junior College Name]",
      location: "[City, State]",
      duration: "2021 - 2023",
      status: "Completed",
      cgpaOrGrade: "Percentage: [Update e.g. 88.5%]",
      relevantCoursework: [
        "Mathematics & Calculus",
        "Computer Science (Basics of C++ / Python)",
        "Physics & Electronics"
      ],
      keyHighlights: [
        "Solid analytical and mathematical problem-solving background",
        "Represented school in science and technology exhibitions"
      ]
    }
  ] as EducationItem[],

  contact: {
    heading: "Let's Connect & Build Together",
    subheading: "I am actively seeking software engineering internships, co-op opportunities, and placement roles. Whether you have an open position, an exciting project, or a technical inquiry, my inbox is always open.",
    responseTime: "Typically replies within 24 hours",
    fields: {
      email: "aryan.dev.contact@example.com",
      github: "https://github.com/aryanPandey-dev",
      linkedin: "https://linkedin.com/in/aryan-Pandey-dev",
      location: "India [Open to Remote & Onsite]"
    }
  }
};
