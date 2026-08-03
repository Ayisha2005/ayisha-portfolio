export interface ProfileData {
  name: string;
  role: string;
  title: string;
  badge: string;
  college: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: string;
  about: string;
  careerObjective: string;
  currentlyBuildingMessage: string;
  certificationsMessage: string;
  projectsMessage: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  skills: {
    programming: { name: string; level: string; color: string }[];
    database: { name: string; level: string; color: string }[];
    versionControl: { name: string; level: string; color: string }[];
    professional: { name: string; icon: string }[];
  };
  education: {
    period: string;
    degree: string;
    institution: string;
    description: string;
  }[];
  languages: string[];
}

export const profileData: ProfileData = {
  name: "Ayisha Parveen A",
  role: "Final Year B.Tech Computer Science and Business Systems Student",
  title: "Aspiring Software Developer",
  badge: "Open to Internships & Full-Time Opportunities",
  college: "Apollo Engineering College",
  email: "ayishaparveena36@gmail.com",
  phone: "+91 7092320571",
  github: "https://github.com/Ayisha2005",
  linkedin: "https://www.linkedin.com/in/ayisha-parveen-a-5539bb301",
  location: "Tamil Nadu, India",
  careerObjective: "Final Year B.Tech Computer Science and Business Systems student at Apollo Engineering College seeking an entry-level Software Developer position where I can apply my programming skills, algorithm logic, and business systems background to solve real-world problems.",
  about: "I am a passionate Final Year B.Tech Computer Science and Business Systems student at Apollo Engineering College with a strong interest in software development, programming logic, and continuous learning.\n\nI enjoy learning modern technologies, solving real-world problems, and building clean, user-friendly software applications.\n\nI am currently looking for opportunities to begin my career as a Software Developer.",
  currentlyBuildingMessage: "I am currently learning and building real-world software applications. New projects will be added here soon.",
  certificationsMessage: "Certificates will be uploaded soon.",
  projectsMessage: "Projects are currently under development.",
  socials: {
    github: "https://github.com/Ayisha2005",
    linkedin: "https://www.linkedin.com/in/ayisha-parveen-a-5539bb301",
    email: "mailto:ayishaparveena36@gmail.com"
  },
  skills: {
    programming: [
      { name: "Python", level: "Core & Problem Solving", color: "#3776AB" },
      { name: "Java", level: "OOP Fundamentals", color: "#007396" },
      { name: "C", level: "Procedural Logic", color: "#A8B9CC" },
      { name: "C++", level: "Data Structures & Algorithms", color: "#00599C" }
    ],
    database: [
      { name: "SQL", level: "Relational Queries & Schema Design", color: "#4479A1" }
    ],
    versionControl: [
      { name: "Git", level: "Version Control CLI", color: "#F05032" },
      { name: "GitHub", level: "Repository Collaboration", color: "#181717" }
    ],
    professional: [
      { name: "Typewriting", icon: "keyboard" },
      { name: "Problem Solving", icon: "brain-circuit" },
      { name: "Communication", icon: "message-square" },
      { name: "Team Collaboration", icon: "users" }
    ]
  },
  education: [
    {
      period: "Final Year Student",
      degree: "B.Tech Computer Science and Business Systems",
      institution: "Apollo Engineering College",
      description: "Specialized engineering program combining core Computer Science fundamentals (OOP, Data Structures, SQL Database Systems) with business strategy and software engineering."
    },
    {
      period: "Class 8th to 12th",
      degree: "Higher Secondary Education",
      institution: "Government Girls Higher Secondary School",
      description: "Completed secondary education focusing on mathematics, science fundamentals, and academic excellence."
    },
    {
      period: "LKG to Class 7th",
      degree: "Primary & Middle School Education",
      institution: "St. Mary's Matriculation Higher Secondary School",
      description: "Foundational schooling focusing on language skills, analytical logic, and extracurriculars."
    }
  ],
  languages: ["English", "Tamil"]
};
