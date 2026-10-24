export interface ArchitectureNode {
  step: string;
  label: string;
  component: string;
  description: string;
  type: 'input' | 'process' | 'logic' | 'output';
}

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
  architectureFlow?: ArchitectureNode[];
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
    roleHeadline: " B.Tech in Computer Science & Engineering (Data Science)",
    subheadline: "Frontend Development & Software Engineering | Web Applications & Embedded Systems",
    shortBio: "B.Tech student specializing in Computer Science and Engineering (Data Science), with an interest in frontend development and software engineering. Familiar with HTML, CSS, Java, and Python, with hands-on project experience in web application development and Arduino-based embedded systems. Eager to learn new technologies, strengthen problem-solving skills, and contribute to real-world projects through an internship opportunity.",
    location: "Hyderabad, Telangana, India",
    statusBadge: "Eager & Available for SDE / Frontend Internships",
    email: "aryanpandey2675@gmail.com",
    github: "https://github.com/Aryan8892",
    linkedin: "https://www.linkedin.com/in/aryan-pandey-4b2609402/",
    resumeUrl: "/resume.pdf",
    resumeLastUpdated: "Updated from Official Resume",
    stats: [
      { label: "Projects Built", value: "3+" },
      { label: "Tech Skills", value: "5+" },
      { label: "Core Interest", value: "Software Developer" },
      { label: "For Internship", value: "Available" },
    ]
  },

  about: {
    title: "About Me",
    badge: "Student & Software Developer",
    introduction: "I am a B.Tech student specializing in Computer Science and Engineering (Data Science) at St. Peter's Engineering College, Hyderabad. With a solid foundation in electronics, embedded systems, and modern web application development, I bridge hardware logic and responsive frontend user interfaces to build practical, real-world solutions.",
    pillars: [
      {
        title: "Frontend Engineering",
        description: "Designing responsive, intuitive user interfaces using React, JavaScript, HTML5, and CSS with role-oriented workflows."
      },
      {
        title: "AI-Assisted Workflows",
        description: "Leveraging cutting-edge AI-assisted developer tooling (Antigravity) to rapidly scaffold, refine, and troubleshoot application components."
      },
      {
        title: "Core Programming & Data",
        description: "Proficient foundations in Java, Python, C/C++, R, and relational database management (SQL, MySQL)."
      },
      {
        title: "Embedded Systems & IoT",
        description: "Hands-on experience developing Arduino-based safety prototypes, sensor integration (MQ-3), and relay cutoff mechanisms."
      }
    ],
    technicalHighlights: [
      "Problem-Solving Skills : Applying logical thinking, data structures, and algorithm to solve coding challenges efficiently.",
      "Tachnical Expertise : Working with Java, Python, web technologies, and database management to build practical solution.",
      "Real-World Projects : Developing practical applications that slove problem through software, automation and data-driven approaches.",
      "Continuous Learning : Exploring emerging technologies, improving coding skills, and learning new tools to build better applications."
    ]
  },

  skills: [
    {
      title: "Frontend Development",
      description: "Client-side engineering, responsive UI design & web standards",
      skills: [
        { name: "HTML5", level: "Advanced", description: "Semantic markup, structured content layout, accessibility & SEO standards" },
        { name: "CSS3 / Modern Styling", level: "Advanced", description: "Responsive layouts, flexbox, grid, animations, and custom styling systems" },
        { name: "JavaScript (ES6+)", level: "Proficient", description: "DOM manipulation, asynchronous workflows, promises, modern ES syntax" },
        { name: "React", level: "Proficient", description: "Component-based architecture, hooks, state management, role-based workflows" }
      ]
    },
    {
      title: "Programming Languages",
      description: "Core languages for software engineering and data applications",
      skills: [
        { name: "Java", level: "Proficient", description: "Object-oriented programming, core syntax, collections, logic implementation" },
        { name: "Python", level: "Proficient", description: "Scripting, algorithmic problem solving, data processing fundamentals" },
        { name: "C / C++", level: "Proficient", description: "Pointers, memory concepts, embedded programming, firmware logic" },
        { name: "R", level: "Familiar", description: "Data exploration, statistical analysis, academic data science foundation" }
      ]
    },
    {
      title: "Frameworks & Backend",
      description: "Web application frameworks and runtime environments",
      skills: [
        { name: "React", level: "Proficient", description: "Interactive user interfaces, component reusability, single page apps" },
        { name: "Node.js", level: "Familiar", description: "Backend runtime environment, npm package ecosystem, server fundamentals" }
      ]
    },
    {
      title: "Database Management",
      description: "Relational data modeling, querying and schema management",
      skills: [
        { name: "SQL", level: "Proficient", description: "Relational queries, joins, data filtering, table schemas, normalization" },
        { name: "MySQL", level: "Proficient", description: "Relational database administration, table indexing, ACID transactions" }
      ]
    },
    {
      title: "Developer Tools & IDEs",
      description: "Version control, AI tooling, and integrated development environments",
      skills: [
        { name: "Git & GitHub", level: "Advanced", description: "Source code version control, repository management, collaborative workflows" },
        { name: "Antigravity (AI Tools)", level: "Advanced", description: "AI-assisted development to generate, refine components, and accelerate engineering" },
        { name: "VS Code & Visual Studio", level: "Advanced", description: "Primary development environments for web and embedded software" },
        { name: "PyCharm, IntelliJ, Eclipse", level: "Proficient", description: "Specialized Java and Python development environments" }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "alcohol-sensing-alert",
      title: "Alcohol Sensing Alert System – Engine Off Technology",
      subtitle: "Smart Automotive Safety & DUI Prevention System (2025)",
      category: "IoT & Embedded",
      featured: true,
      shortDescription: "An Arduino-based vehicle safety prototype designed to detect alcohol vapors and prevent drunk driving by triggering an immediate ignition cutoff.",
      problemSolved: "Drunk driving is a leading cause of preventable road accidents. This prototype provides an active mechanical safeguard by disengaging the vehicle's ignition before operation is possible.",
      fullDescription: "Developed an Arduino-based vehicle safety prototype designed to detect alcohol vapors and help prevent drunk driving. Integrated an MQ-3 alcohol sensor with an Arduino Nano to collect and process sensor readings against a predefined threshold. Designed a relay-based ignition cutoff mechanism to prevent engine starting when alcohol detection exceeds the configured threshold. Incorporated a warning mechanism to alert the driver when potential alcohol consumption is detected, exploring emergency override and fail-safe operation to improve reliability.",
      tags: ["Arduino Nano", "Embedded C/C++", "MQ-3 Alcohol Sensor", "Relay Module", "IoT Safety"],
      features: [
        "Developed an Arduino-based vehicle safety prototype designed to detect alcohol vapors and prevent drunk driving",
        "Integrated an MQ-3 alcohol sensor with an Arduino Nano to collect and process readings against a predefined threshold",
        "Designed a relay-based ignition cutoff mechanism to prevent engine starting when alcohol detection exceeds threshold",
        "Incorporated an active warning mechanism to alert the driver when potential alcohol consumption is detected",
        "Explored safety features including emergency override and fail-safe operation to improve system reliability"
      ],
      architectureOverview: "Analog MQ-3 sensor readings are continuously sampled and processed by the Arduino Nano microcontroller. If the reading crosses the safety threshold, GPIO signals actuate a high-power relay module to cut off the engine ignition circuit while triggering driver warnings.",
      architectureFlow: [
        {
          step: "01",
          label: "Vapor Ingestion",
          component: "MQ-3 Gas Sensor",
          description: "Continuously captures and measures ambient alcohol vapor concentrations inside vehicle cabin.",
          type: "input"
        },
        {
          step: "02",
          label: "ADC Sampling",
          component: "Arduino Nano (ATmega328P)",
          description: "10-bit internal ADC converts analog voltage and checks against calibrated safety threshold.",
          type: "process"
        },
        {
          step: "03",
          label: "Safety Interlock",
          component: "Electromechanical Relay",
          description: "GPIO actuates the relay to instantly break the 12V ignition line, preventing engine crank.",
          type: "logic"
        },
        {
          step: "04",
          label: "Driver Feedback",
          component: "Piezo Buzzer & LED",
          description: "Triggers immediate audible alarm and visual warning alert with fail-safe status logging.",
          type: "output"
        }
      ],
      metricsOrOutcome: "Reliable threshold-triggered cutoff mechanism demonstrated in prototype testing for automotive safety compliance.",
      githubUrl: "https://github.com/Aryan8892/Alcohol-Sensing-Alert-System",
      isPrototypeOrHardware: true
    },
    {
      id: "vetcare-management-system",
      title: "VetCare – Veterinary Clinic & Pet Care Management System",
      subtitle: "AI-Assisted Pet Healthcare & Clinic Appointment Platform (Present - 2026)",
      category: "Web App",
      featured: true,
      shortDescription: "An AI-assisted veterinary care web application helping pet owners manage pet profiles, medical records, and clinic appointments with role-oriented workflows.",
      problemSolved: "Pet owners often struggle with fragmented pet vaccination records and cumbersome clinic scheduling. VetCare centralizes pet profiles and appointment bookings in one cohesive interface.",
      fullDescription: "Developed an AI-assisted veterinary care web application to help pet owners manage pet profiles, healthcare records, and clinic appointments. Built a React-based user interface with separate workflows for pet owners and veterinary clinics. Implemented pet profile management and appointment booking workflows, including appointment status management. Designed responsive UI components for clinic discovery, pet health history, and appointment management using AI-assisted development tools (Antigravity).",
      tags: ["React", "JavaScript", "HTML5", "CSS3", "Antigravity AI", "Web App"],
      features: [
        "Developed an AI-assisted veterinary care web application for pet profiles, healthcare records, and clinic appointments",
        "Built a React-based user interface with separate, intuitive workflows for pet owners and veterinary clinics",
        "Implemented pet profile management and appointment booking workflows with real-time status management",
        "Designed responsive UI components for clinic discovery, pet health history, and appointment coordination",
        "Used AI-assisted development tools (Antigravity) to generate, refine components, troubleshoot issues, and optimize workflow"
      ],
      architectureOverview: "Modular React application featuring role-separated views for pet parents and veterinarians, managing dynamic state transitions for appointment workflows and digital pet medical history cards.",
      architectureFlow: [
        {
          step: "01",
          label: "Role-Based UI",
          component: "React 18 + Tailwind",
          description: "Dual-portal interface separating customer views (pet owners) from veterinary clinic admins.",
          type: "input"
        },
        {
          step: "02",
          label: "Workflow Router",
          component: "Client State & Routing",
          description: "Manages session role switching, navigation guardrails, and responsive mobile-first layouts.",
          type: "process"
        },
        {
          step: "03",
          label: "Booking Engine",
          component: "Appointment Lifecycle",
          description: "Coordinates slot reservation, conflict validation, and status transitions (Pending -> Confirmed).",
          type: "logic"
        },
        {
          step: "04",
          label: "Health Record Hub",
          component: "Medical Profile Store",
          description: "Centralizes digital vaccination records, dietary instructions, and emergency contact metadata.",
          type: "output"
        }
      ],
      metricsOrOutcome: "Smooth user experience with responsive layout for both clinic administrative desks and mobile pet owners.",
      githubUrl: "https://github.com/Aryan8892/VetCare-Management-System",
      isPrototypeOrHardware: false
    },
    {
      id: "civictrust-portal",
      title: "CivicTrust – Complaint Management Portal",
      subtitle: "Web-Based Grievance Registration & Resolution Platform (Present - 2026)",
      category: "Full-Stack",
      featured: true,
      shortDescription: "A web-based complaint management portal for civic grievance registration, tracking, and resolution with separate role-oriented workflows.",
      problemSolved: "Municipal complaint processes are often opaque, slow, and prone to lost tickets. CivicTrust streamlines grievance redressal with automated ticket IDs, status milestones, and accountability logging.",
      fullDescription: "Designed an AI-assisted development workflow to build a web-based complaint management portal for complaint registration, tracking, and resolution. Developed a structured user interface with separate role-oriented workflows for citizens, department staff, and administrators. Designed complaint management dashboards, navigation flows, and administrative interfaces to improve usability and transparency. Created responsive UI layouts for complaint handling, status tracking, and role-specific application pages using Antigravity AI tools.",
      tags: ["React", "JavaScript", "HTML5", "CSS3", "Antigravity AI", "Full-Stack UI"],
      features: [
        "Designed an AI-assisted development workflow to build a web-based complaint portal for registration, tracking & resolution",
        "Developed a structured user interface with separate role-oriented workflows for citizens, department staff & administrators",
        "Designed complaint management dashboards, navigation flows, and administrative interfaces for high transparency",
        "Created responsive UI layouts for complaint handling, status milestone tracking, and role-specific views",
        "Used AI-assisted development tools (Antigravity) to generate, refine interface components, and accelerate debugging"
      ],
      architectureOverview: "Role-oriented frontend architecture implemented in React with distinct access portals for citizens, municipal department officers, and executive supervisors, ensuring clear ticket routing and transparency.",
      architectureFlow: [
        {
          step: "01",
          label: "Grievance Intake",
          component: "Citizen Submission Portal",
          description: "Structured incident intake form with department category tagging, ward selection, and evidence upload.",
          type: "input"
        },
        {
          step: "02",
          label: "Ticket Generation",
          component: "Automated Routing Engine",
          description: "Generates unique encrypted ticket tracking ID, assigns SLA timeline, and dispatches to ward officer.",
          type: "process"
        },
        {
          step: "03",
          label: "Action Dashboard",
          component: "Department Officer Portal",
          description: "Field team triage board for updating investigation notes, dispatching field crew, and resolving tickets.",
          type: "logic"
        },
        {
          step: "04",
          label: "Public Audit & SLA",
          component: "Transparency Tracker",
          description: "Real-time citizen progress bar, resolution verification sign-off, and municipal response metrics.",
          type: "output"
        }
      ],
      metricsOrOutcome: "Organized multi-tier grievance pipeline facilitating transparent status updates and departmental issue assignment.",
      githubUrl: "https://github.com/Aryan8892/CivicTrust-Complaint-Portal",
      isPrototypeOrHardware: false
    }
  ] as Project[],

  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      specialization: "Computer Science and Engineering (Data Science)",
      institution: "St. Peter's Engineering College, Hyderabad",
      location: "Hyderabad, Telangana",
      duration: "2025 – 2028",
      status: "Currently Pursuing (Undergraduate)",
      cgpaOrGrade: "Present CGPA: 8.1",
      relevantCoursework: [
        "Data Science Foundations",
        "Frontend Web Development",
        "Data Structures & Algorithms",
        "Database Management Systems (SQL)",
        "Software Engineering",
        "Python & Java Programming"
      ],
      keyHighlights: [
        "Specializing in Computer Science & Engineering with a focused concentration on Data Science",
        "Hands-on project work in AI-assisted web application development and embedded systems",
        "Maintaining a strong 8.1 present CGPA while actively building real-world software prototypes"
      ]
    },
    {
      degree: "Diploma in Engineering",
      specialization: "Electronics and Communication Engineering",
      institution: "Government Polytechnic, Mahabubnagar",
      location: "Mahabubnagar, Telangana",
      duration: "2022 – 2025",
      status: "Completed",
      cgpaOrGrade: "CGPA: 7.8",
      relevantCoursework: [
        "Microcontrollers & Embedded Systems",
        "Electronic Devices & Circuits",
        "C & Embedded C Programming",
        "Sensor Interfacing & Actuators",
        "Digital Electronics"
      ],
      keyHighlights: [
        "Graduated with a 7.8 CGPA, building a strong hardware-software foundation",
        "Engineered the Arduino-based Alcohol Sensing Alert System with vehicle ignition cutoff",
        "Extensive laboratory experience in circuit design, sensor calibration, and relay switching"
      ]
    },
    {
      degree: "Secondary School Education (Class X)",
      specialization: "General Academic Curriculum",
      institution: "Holy Angels High School, Hyderabad",
      location: "Hyderabad, Telangana",
      duration: "May 2022",
      status: "Completed",
      cgpaOrGrade: "CGPA: 8.7",
      relevantCoursework: [
        "Mathematics & Analytical Reasoning",
        "General Science & Physics",
        "Computer Basics"
      ],
      keyHighlights: [
        "Completed Class X with an outstanding 8.7 CGPA",
        "Consistently demonstrated strong mathematical aptitude and scientific curiosity"
      ]
    }
  ] as EducationItem[],

  contact: {
    heading: "Let's Connect & Build Together",
    subheading: "I am actively seeking software engineering and frontend development internship opportunities. Whether you have an open position, an exciting project, or a technical inquiry, my inbox is always open.",
    responseTime: "Typically replies within 24 hours",
    fields: {
      email: "aryanpandey2675@gmail.com",
      github: "https://github.com/Aryan8892",
      linkedin: "https://www.linkedin.com/in/aryan-pandey-4b2609402/",
      location: "Hyderabad, Telangana, India"
    }
  }
};
