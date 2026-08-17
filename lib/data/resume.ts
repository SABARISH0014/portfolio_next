export const resumeData = {
  personalInfo: {
    name: "Sabarish P",
    title: "Aspiring Software & Product Developer",
    location: "Coimbatore, Tamil Nadu",
    contact: {
      email: "sabarish.0014@gmail.com",
      phone: "+91 8148246432",
      linkedin: "linkedin.com/in/sabarishparthiban",
      github: "github.com/SABARISH0014"
    }
  },
  education: [
    {
      institution: "PSG College of Technology",
      degree: "Master of Computer Applications",
      duration: "2025 - Present",
      score: "CGPA: 7.94",
      location: "Coimbatore, Tamil Nadu"
    },
    {
      institution: "SRM Institute of Science and Technology",
      degree: "Bachelor of Computer Applications",
      duration: "2022 - 2025",
      score: "CGPA: 9.36",
      location: "Chennai, Tamil Nadu"
    },
    {
      institution: "Swami Vivekananda Matric Hr Sec School",
      degree: "12th Grade",
      duration: "2021 - 2022",
      score: "58%",
      location: "Kanchipuram, Tamil Nadu"
    },
    {
      institution: "Swami Vivekananda Matric Hr Sec School",
      degree: "10th Grade",
      duration: "2019 - 2020",
      score: "81%",
      location: "Kanchipuram, Tamil Nadu"
    }
  ],
  experience: [
    {
      role: "Web Development Intern",
      company: "InternLearn",
      duration: "Aug. 2024 - Sep. 2024",
      location: "Chennai, India",
      highlights: [
        "Collaborated effectively with a cross-functional team throughout the complete project life cycle, ensuring the design, testing, and deployment of software solutions strictly aligned with business needs, accelerating delivery timelines by 10%.",
        "Leveraged strong analytical skills to troubleshoot complex system issues, debug legacy code, and implement tailored technical solutions that improved overall application stability by 15%."
      ],
      shortSummary: "Accelerated delivery timelines by 10%, improved stability by 15%"
    }
  ],
  projects: [
    {
      id: "subsage",
      title: "SubSage",
      subtitle: "Full-Stack Subscription Management System",
      description: "Engineered a full-stack subscription management dashboard featuring interactive analytics to track monthly expenses. Integrated the Stripe API for scalable payment processing and implemented secure authentication flows using bcrypt and secure email transport for password recovery.",
      tech: ["NodeJS", "Express", "MongoDB", "Stripe API", "bcrypt"],
      githubUrl: "https://github.com/SABARISH0014/SubSage-Subscription_Management_System",
      details: [
        { label: "Focus", value: "Subscription billing control" },
        { label: "Outcome", value: "Payments + analytics" },
        { label: "Core", value: "Stripe webhooks & auth" }
      ],
      caseStudy: "SubSage pairs auth, payments, and operational clarity into one cohesive subscription control surface. The expanded view is designed to feel like a live product teardown, not a static modal."
    },
    {
      id: "mxshare",
      title: "MXShare",
      subtitle: "Educational Notes Sharing Platform",
      description: "Architected a fast, modern web platform utilizing NextJS to facilitate the seamless distribution and collaborative sharing of educational resources. Tailored the solution to user needs by implementing direct cloud storage APIs, empowering users to intuitively select and upload files.",
      tech: ["Next.JS", "Cloud Storage APIs"],
      githubUrl: "https://github.com/SABARISH0014/mx-share-new",
      details: [
        { label: "Focus", value: "Notes discovery & sharing" },
        { label: "Outcome", value: "Cloud storage ingestion" },
        { label: "Core", value: "Cloud APIs integration" }
      ],
      caseStudy: "MXShare organizes educational notes into a lightweight cloud-native flow with cloud storage ingestion and simple distribution for collaborative learning."
    },
    {
      id: "cipherspend",
      title: "CipherSpend",
      subtitle: "Offline-First Finance Tracker App",
      description: "Developed a 100% offline, privacy-first mobile application using Flutter and a native Kotlin backend, secured by encrypted local databases and a two-factor authentication flow. Engineered an automated expense-tracking system using native Android background receivers to intercept and parse bank SMS messages locally via custom regex rules.",
      tech: ["Flutter", "Kotlin", "SQLCipher", "Android Receivers"],
      githubUrl: "https://github.com/SABARISH0014/CipherSpend-v1",
      details: [
        { label: "Focus", value: "Offline finance tracking" },
        { label: "Outcome", value: "Secure SMS parsing" },
        { label: "Core", value: "SQLCipher & receivers" }
      ],
      caseStudy: "CipherSpend focuses on resilient local-first finance tracking with encrypted storage and background capture. The interaction surface mirrors the product's tactile, mobile-first intent."
    }
  ],
  skills: {
    languages: ["Java", "JavaScript", "Kotlin", "Dart", "C"],
    frameworks: ["NodeJS", "Express", "NextJS", "Flutter"],
    databasesAndTools: ["MongoDB", "SQLite", "Git"],
    certifications: ["Programming in Java - NPTEL"]
  }
};
