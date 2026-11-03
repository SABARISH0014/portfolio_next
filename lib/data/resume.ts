export const resumeData = {
  personalInfo: {
    name: "Sabarish P",
    title: "Software, AI & Product Developer",
    batch: "MCA Batch of 2027",
    location: "Coimbatore, India",
    summary:
      "MCA student (Batch of 2027) based in Coimbatore. Passionate about exploring how models and systems work under the hood and building practical features that solve real-world problems. Skilled in Python (FastAPI, Pandas, Scikit-learn), JavaScript (Node.js, React.js), and Kotlin, with hands-on experience in text parsing, data extraction, and full-stack system design. Comfortable using Git for version control and leveraging modern AI coding tools daily to accelerate development, test ideas, and learn fast.",
    contact: {
      email: "sabarish.0014@gmail.com",
      phone: "+91 8148246432",
      linkedin: "linkedin.com/in/sabarishparthiban",
      github: "github.com/SABARISH0014",
      leetcode: "leetcode.com/u/SABARISH_P"
    }
  },
  education: [
    {
      institution: "PSG College of Technology",
      degree: "Master of Computer Applications",
      duration: "July 2025 - Present",
      score: "CGPA: 7.94",
      location: "Coimbatore, India"
    },
    {
      institution: "SRM Institute of Science and Technology",
      degree: "Bachelor of Computer Applications",
      duration: "July 2022 - May 2025",
      score: "CGPA: 9.36",
      location: "Chennai, India"
    },
    {
      institution: "Swami Vivekananda Matric Hr Sec School",
      degree: "12th Grade",
      duration: "June 2021 - May 2022",
      score: "58%",
      location: "Kanchipuram, India"
    },
    {
      institution: "Swami Vivekananda Matric Hr Sec School",
      degree: "10th Grade",
      duration: "June 2019 - May 2020",
      score: "81%",
      location: "Kanchipuram, India"
    }
  ],
  experience: [
    {
      role: "Web Development Virtual Intern",
      company: "Internz Learn",
      duration: "Aug 2024 - Sep 2024",
      location: "Chennai, India",
      highlights: [
        "Built a personal portfolio website during a virtual internship, gaining hands-on exposure to how web systems are designed and run using Node.js.",
        "Implemented basic server-side functionality, tested features, and performed systematic debugging based on mentor feedback.",
        "Used Git for version control to track code changes, prioritize tasks independently, and communicate progress clearly."
      ],
      shortSummary:
        "Built a Node.js web system, implemented server-side logic, and performed systematic debugging using Git."
    }
  ],
  projects: [
    {
      id: "cipherspend",
      title: "CipherSpend",
      subtitle: "Offline-First Android Finance Tracker",
      description:
        "Built an offline-first mobile application from scratch using Flutter, Core Java concepts, and a native Kotlin backend. Solved messy, unstructured text extraction problems by engineering an automated pipeline using native Android background receivers and custom Named Entity Recognition (NER) regex rules to parse bank SMS data. Configured local SQLite databases for reliable data storage and iterated on the parsing logic to improve extraction accuracy.",
      tech: ["Flutter", "Kotlin", "Java", "NER Regex", "SQLite", "Android Receivers"],
      githubUrl: "https://github.com/SABARISH0014/CipherSpend-v1",
      details: [
        { label: "Focus", value: "Offline finance & SMS NER" },
        { label: "Outcome", value: "Automated SMS extraction" },
        { label: "Core", value: "Kotlin receivers & SQLite" }
      ],
      caseStudy:
        "CipherSpend pairs native Android background receivers with custom Named Entity Recognition (NER) regex rules to turn unstructured bank SMS alerts into structured local SQLite financial records — 100% offline."
    },
    {
      id: "subsage",
      title: "SubSage",
      subtitle: "Full-Stack Subscription Management System",
      description:
        "Designed and built an end-to-end web application using JavaScript, Node.js, HTML, Express, and MongoDB. Developed production-style backend logic and RESTful APIs to manage user subscriptions, explore spending data, and visualize expense analytics. Integrated the Stripe API for payment processing and configured secure authentication flows for real-world usability.",
      tech: ["JavaScript", "Node.js", "Express", "MongoDB", "RESTful APIs", "Stripe API"],
      githubUrl: "https://github.com/SABARISH0014/SubSage-Subscription_Management_System",
      details: [
        { label: "Focus", value: "Subscription & spend control" },
        { label: "Outcome", value: "REST APIs + Stripe billing" },
        { label: "Core", value: "Node.js, Express & MongoDB" }
      ],
      caseStudy:
        "SubSage unifies subscription lifecycle management, RESTful API design, interactive expense analytics, and Stripe payment processing into one cohesive control surface."
    },
    {
      id: "mxshare",
      title: "MXShare",
      subtitle: "Educational Notes Sharing Platform",
      description:
        "Developed a responsive web platform utilizing Next.js for collaborative educational resource sharing. Explored and integrated cloud storage APIs independently to streamline file-handling workflows and improve system design. Tested features with peers, gathered feedback, and iterated quickly to make the uploading experience faster and more intuitive.",
      tech: ["Next.js", "React.js", "Cloud Storage APIs", "System Design"],
      githubUrl: "https://github.com/SABARISH0014/mx-share-new",
      details: [
        { label: "Focus", value: "Collaborative resource sharing" },
        { label: "Outcome", value: "Streamlined cloud uploads" },
        { label: "Core", value: "Next.js & Cloud Storage APIs" }
      ],
      caseStudy:
        "MXShare streamlines academic note distribution through Next.js and direct cloud storage API ingestion, refined through rapid peer testing and UX iteration."
    }
  ],
  skills: {
    languages: ["Python", "JavaScript", "Java", "Kotlin", "C", "HTML", "CSS"],
    aiDataBackend: [
      "FastAPI",
      "Pandas",
      "Scikit-learn",
      "Text Parsing (NER/Regex)",
      "Node.js",
      "Express",
      "RESTful APIs"
    ],
    frontendMobileDb: ["React.js (Vite)", "Next.js", "Flutter", "SQLite", "MongoDB"],
    toolsAndWorkflows: ["Git", "GitHub", "GitHub Actions", "AI-Assisted Coding & Testing"],
    coreCompetencies: [
      "Problem Solving",
      "Fast Learning",
      "System Design Basics",
      "Adaptability",
      "Clear Communication"
    ],
    // Backward-compatible aliases so existing consumers don't break
    frameworks: ["Node.js", "Express", "Next.js", "Flutter", "FastAPI"],
    databasesAndTools: ["MongoDB", "SQLite", "Git", "GitHub"],
    certifications: ["Programming in Java - NPTEL"]
  }
};
