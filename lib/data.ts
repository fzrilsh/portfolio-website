export const aboutData = {
  name: "Fazril Syaveral Hillaby",
  title: "Fullstack Web Developer",
  description: [
    "I'm a Fullstack Web Developer with strong experience in building scalable web applications using Laravel, Livewire, React.js, and Next.js.",
    "Currently preparing for the WorldSkills ASEAN competition in Web Technologies and expanding my backend skills by learning Golang.",
    "I have a proven track record in startup environments, system architecture, and have achieved significant success in national-level competitions.",
  ],
}

export const experienceData = [
  {
    title: "Backend Developer",
    company: "FreshVora",
    type: "Founding Member",
    period: "Nov 2024 - Present",
    responsibilities: [
      "Initiated early-stage outreach by communicating with potential business partners and school leaders to build collaboration opportunities.",
      "Contributed to identifying core problems, formulating solutions, and discovering potential business opportunities.",
      "Participated in strategic discussions to define the startup's direction and validate its value proposition.",
      "Took on the role of backend developer in later stages, managing server scalability and selecting efficient technologies for application development.",
      "Developed robust server-side logic, including RESTful APIs to support frontend integration and system functionality.",
    ],
  },
  {
    title: "Fullstack Web Developer",
    company: "PT. Karya Edukasi & Teknologi Digital",
    type: "Internship",
    period: "July 2024 - Dec 2024",
    responsibilities: [
      "Developed the commercial SaaS application Sekolahawan.id using the TALL stack (Tailwind CSS, Alpine.js, Laravel, Livewire) with Laravel Tenancy to enable multi-tenant architecture.",
      "Implemented a robust authentication and authorization system with role-based access control for copywriters, super admins, school administrators, and other user roles.",
      "Collaborated with a team using tools such as Slack, Azure DevOps, and other project management software.",
    ],
  },
  {
    title: "Fullstack Developer",
    company: "Cursebyte (VerdantNS)",
    type: "Founding Member",
    period: "Dec 2022 - Jan 2024",
    responsibilities: [
      "Managed internal team communication to ensure effective collaboration and project alignment.",
      "Led the technological direction of the team, including stack decisions and development workflows.",
      "Designed and maintained internal systems, processes, and standard operating procedures.",
      "Contributed as an internal developer, building and maintaining internal tools and features.",
      "Actively worked on client-acquired projects, taking part in both development and execution.",
    ],
  },
]

export const skillsData = {
  programming: ["JavaScript", "PHP", "Python", "C"],
  frontend: ["React.js", "Next.js", "Tailwind CSS", "Alpine.js", "HTML5", "CSS3"],
  backend: ["Laravel", "Livewire", "Express.js", "Go"],
  databases: ["MySQL", "MongoDB"],
  tools: ["Git", "Docker", "Prisma", "Arduino", "Raspberry Pi"],
  languages: ["English", "Indonesian"],
}

export const achievementsData = [
  {
    title: "Indonesian Skills Competition Goes To The 14th WorldSkills ASEAN",
    organization: "Ministry of Manpower (Kemenaker) RI",
    category: "Web Technologies",
    medal: "Silver",
    date: "November 10, 2024",
    description:
      "2nd Place Winner in the Web Technologies Category of the Indonesian Skills Competition Goes To The 14th WorldSkills ASEAN Philippines 2025.",
    projects: [
      "Developed a car installment platform that manages society data, including validating society eligibility, setting income thresholds to qualify for specific car types, and providing real-time updates on installments applications.",
      "Developed a 2D maze game using HTML, CSS, and JavaScript, featuring a player and multiple dogs depending on the selected level. The game includes destructible walls using bombs and utilizes the Depth-First Search (DFS) algorithm to allow the dogs to find the shortest path to the player.",
      "Completed various small-scale programming tasks involving HTML, CSS, JavaScript, and PHP.",
    ],
  },
  {
    title: "Student Skills Competition (LKS) National Level 2024",
    organization: "Ministry of Education (Kemendikbud) RI",
    category: "Web Technologies",
    medal: "Gold",
    date: "August 24, 2024",
    description:
      "1st Place Winner in the Web Technologies Category of the Vocational High School Student Competency Competition (LKS SMK) at the Indonesian National Level in 2024.",
    projects: [
      "Developed an online course platform named WebTech Academy, featuring two interfaces: an admin panel (API-only) to manage lessons, and a user interface for participants to access and complete available lessons. The backend was built with Laravel and the frontend with React.js.",
      "Created a simple 2D maze-themed game using HTML, CSS, and JavaScript, where the objective is to reach the finish line on the right side of the screen. The main challenge was generating a random maze while ensuring at least one valid path to the finish. Utilized the Breadth-First Search (BFS) algorithm to verify the existence of a solvable path.",
      "Completed various small-scale programming tasks involving HTML, CSS, JavaScript, and PHP.",
    ],
  },
  {
    title: "Student Skills Competition (LKS) Banten Province 2024",
    organization: "Ministry of Education (Kemendikbud) RI",
    category: "Web Technologies",
    medal: "Gold",
    date: "May 2024",
    description:
      "1st Place Winner in the Web Technologies Category of the Vocational High School Student Competency Competition (LKS SMK) at the Banten Province Level in 2024.",
    projects: [
      "Developed an online browser-based gaming platform that consists of a Developer Portal for game developers to upload their games, an Administrator Portal for managing users and game content, and a Gaming Portal where users can play games directly in the browser.",
      "Developed a 2D shooting game using JavaScript, where the player (Shooter) can aim at targets by moving the cursor and shoot by clicking the left mouse button. Players can switch weapons by pressing the Space key, and select their target and weapon from the welcome screen before starting the game.",
    ],
  },
  {
    title: "Student Skills Competition (LKS) Tangerang City Level 2024",
    organization: "Ministry of Education (Kemendikbud) RI",
    category: "Web Technologies",
    medal: "Gold",
    date: "February 2024",
    description:
      "1st Place Winner in the Web Technologies Category of the Vocational High School Student Competency Competition (LKS SMK) at the Tangerang City Level in 2024.",
  },
]

export const projectsData = [
  {
    title: "Sekolahawan.id",
    description:
      "A SaaS application using the TALL stack with Laravel Tenancy to enable multi-tenant architecture for school management.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS", "MySQL"],
    liveUrl: "https://sekolahawan.id",
    githubUrl: "#",
  },
  {
    title: "Transfermrkt",
    description:
      "A Node.js module to scrape transfer player and club data from Transfermarkt. Also published on npm.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["Node.js", "Cheerio", "Axios", "JavaScript"],
    liveUrl: "https://www.npmjs.com/package/transfermarkt",
    githubUrl: "https://github.com/fzrilsh/transfermrkt",
  },
  {
    title: "StackOverflow Scrape",
    description:
      "A tool to query Stack Overflow and retrieve answers using Node.js and Cheerio. Also available on npm.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["Node.js", "Cheerio", "JavaScript"],
    liveUrl: "https://www.npmjs.com/package/stackoverflow-scrape",
    githubUrl: "https://github.com/fzrilsh/stackoverflow-scrape",
  },
  {
    title: "Brute TikTok",
    description:
      "A semi-automated script to increase views/favorites on TikTok using zefoy.com API with manual captcha handling.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["Node.js", "Puppeteer", "JavaScript"],
    liveUrl: "#",
    githubUrl: "https://github.com/fzrilsh/brute-tiktok",
  },
  {
    title: "simpleAI",
    description:
      "An experimental AI module that builds its intent set using scraped search data from Google.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["JavaScript", "Node.js"],
    liveUrl: "#",
    githubUrl: "https://github.com/fzrilsh/simpleAI",
  },
  {
    title: "wikitools",
    description:
      "A small utility to perform WikiHow searches using JavaScript scraping techniques.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["JavaScript"],
    liveUrl: "#",
    githubUrl: "https://github.com/fzrilsh/wikitools",
  },
  {
    title: "cnnindonesia-news-api",
    description:
      "Unofficial API for CNN Indonesia news content. Forked and modified for personal use.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["Node.js", "Express", "JavaScript"],
    liveUrl: "#",
    githubUrl: "https://github.com/fzrilsh/cnnindonesia-news-api",
  },
  {
    title: "Notion Spending Bot",
    description:
      "A Telegram bot that helps users log and manage their expenses directly into Notion databases.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["Node.js", "Telegraf.js", "Notion API"],
    liveUrl: "#",
    githubUrl: "https://github.com/fzrilsh/notion-spending-bot",
  },
  {
    title: "WebTech Academy",
    description:
      "An educational platform to support LKS (Lomba Kompetensi Siswa) participants in Web Technologies by offering modules, self-assessment, and discussions.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["Laravel", "Tailwind CSS", "Livewire", "MySQL"],
    liveUrl: "#",
    githubUrl: "https://github.com/fzrilsh/WebTech-Academy",
  },
  {
    title: "OneSecMail API",
    description:
      "A lightweight API wrapper for OneSecMail to automate temporary email usage in Node.js.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["Node.js", "Express", "REST API"],
    liveUrl: "#",
    githubUrl: "https://github.com/fzrilsh/onesecmail-api",
  },
  {
    title: "Gartic WhatsApp Bot",
    description:
      "A WhatsApp bot that lets users play Gartic-style drawing games in chat using Baileys library.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["Node.js", "Baileys", "Socket.io"],
    liveUrl: "#",
    githubUrl: "https://github.com/fzrilsh/Gartic-WhatsappBot",
  },
  {
    title: "Geros",
    description:
      "A Instagram client library for NodeJS that connects through the Instagram Web browser app.",
    image: "/placeholder.svg?height=300&width=600",
    technologies: ["NodeJS", "Puppeteer"],
    liveUrl: "#",
    githubUrl: "https://github.com/fzrilsh/geros",
  }
]

export const educationData = [
  {
    degree: "Bachelor of Computer Science",
    institution: "Bina Nusantara University",
    period: "Expected Graduation: 2029",
  },
  {
    degree: "Computer and Network Engineering",
    institution: "SMKN 1 Kota Tangerang",
    period: "Graduated: 2025",
    details: "Certification: Certified KKNI Level II Computer Network Engineering.",
    gpa: "GPA: 92/100"
  },
]

export const contactData = {
  channels: [
    {
      name: "Mobile Number",
      icon: "phone",
      url: "https://wa.me/6285183180321",
      display: "+62 851-8318-0321"
    },
    {
      name: "Email",
      icon: "mail",
      url: "mailto:hello@fazrilsh.com",
      display: "hello@fazrilsh.com",
    },
    {
      name: "GitHub",
      icon: "github",
      url: "https://github.com/fzrilsh",
      display: "github.com/fzrilsh",
    },
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://linkedin.com/in/fazrilsyaveralhillaby",
      display: "linkedin.com/in/fazrilsyaveralhillaby",
    },
  ],
  location: "Tangerang City, Banten, Indonesia",
}
