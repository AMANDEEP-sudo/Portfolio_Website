export const SITE_NAME = 'Amandeep Aman - Portfolio';
export const SITE_DESCRIPTION = 'Advanced portfolio showcasing projects and achievements';
export const SITE_URL = 'https://amandeepaman.dev';

export const NAV_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const HERO_CONTENT = {
  greeting: 'Hi! my name is',
  title: 'Amandeep.',
  roleLine: "I'm a Fullstack Web Developer.",
  emphasisLine: 'I create reliable software on the internet.',
  description:
    'Backend-first engineer blending Java, Spring Boot, and Next.js to craft polished products with the same energy I bring to hackathons.',
  ctaPrimary: 'Projects',
  ctaSecondary: 'Resume',
  socialHint: 'find me on',
};

export const ABOUT_PARAGRAPHS = [
  `I'm Amandeep, a backend-leaning developer who obsesses over gradients, micro-interactions, and database schemas in equal measure.`,
  `My toolkit spans Java + Spring Boot APIs, React/Next.js frontends, and cloud-first deployment workflows so every prototype feels production ready.`,
  `Hackathons like Binary Blitz and CodeStorm sharpened my speed, but daily DSA reps keep my fundamentals honest.`,
];

export const ABOUT_TAGS = [
  { label: 'Role', value: 'Fullstack Web Developer' },
  { label: 'Location', value: 'Punjab, India' },
  { label: 'Focus', value: 'Java · Spring Boot · Next.js · Tailwind' },
];

export const TECH_STACK = [
  {
    category: 'Front-End',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Astro'],
  },
  {
    category: 'Back-End',
    tools: ['Java', 'Spring Boot', 'Node.js', 'Express', 'MongoDB', 'MySQL'],
  },
  {
    category: 'Programming',
    tools: ['Java', 'C++', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    category: 'Tech & Tools',
    tools: ['Git', 'GitHub', 'Vercel', 'Netlify', 'VS Code', 'Postman', 'Figma'],
  },
];

export const FEATURED_PROJECTS = [
  {
    id: 'ai-karaoke-app',
    title: 'AI-Karaoke App',
    description:
      'Interactive karaoke application powered by AI, featuring real-time voice recognition, song matching, and scoring system.',
    highlights: [
      'Real-time AI voice recognition',
      'Automatic song detection and matching',
      'Scoring based on pitch and timing accuracy',
      'Interactive web-based interface',
    ],
    tech: ['React', 'AI/ML', 'Web Audio API', 'Next.js'],
    repo: 'https://github.com/AMANDEEP-sudo/ai-karaoke-app',
    status: 'Live',
  },
  {
    id: 'theft-protection-tool',
    title: 'Theft Protection Tool',
    description:
      'Windows desktop security application that automatically captures webcam images during unauthorized login attempts.',
    highlights: [
      'Automatic theft detection',
      'Windows event hook integration',
      'Webcam capture on login/unlock events',
      'Secure evidence storage',
    ],
    tech: ['Python', 'Windows API', 'Security'],
    demo: 'https://github.com/AMANDEEP-sudo/Theft_Protection_Tool',
    repo: 'https://github.com/AMANDEEP-sudo/Theft_Protection_Tool',
    status: 'Live',
  },
  {
    id: 'password-manager',
    title: 'Password Manager',
    description:
      'Secure Java-based vault for encrypted credential management with master-password authentication and audit logs.',
    highlights: [
      'Master-password encryption',
      'Secure credential storage',
      'Password strength validation',
      'Offline backup support',
    ],
    tech: ['Java', 'Security', 'Swing'],
    demo: 'https://github.com/AMANDEEP-sudo/Password_Manager',
    repo: 'https://github.com/AMANDEEP-sudo/Password_Manager',
    status: 'Live',
  },
  {
    id: 'daily-task-organizer',
    title: 'Daily Task Organizer',
    description:
      'Full-stack productivity application for task management with priority-based organization and calendar export features.',
    highlights: [
      'Priority-based task scheduling',
      'Calendar export (.ics) support',
      'Responsive UI design',
      'Persistent data storage',
    ],
    tech: ['PHP', 'HTML/CSS', 'Database'],
    demo: 'https://github.com/AMANDEEP-sudo/Daily_Task_Organiser',
    repo: 'https://github.com/AMANDEEP-sudo/Daily_Task_Organiser',
    status: 'Live',
  },
];

export const CERTIFICATIONS = [
  {
    id: 'binary-blitz',
    title: 'Binary Blitz Hackathon Winner',
    issuer: 'Binary Blitz',
    category: 'Hackathon',
    year: '2024',
    description: 'Champion build for the Binary Blitz hackathon with a full Next.js submission HQ.',
    fileName: 'Binary_Blitz_Hackathon_Amandeep_Aman.pdf',
  },
  {
    id: 'summer-training',
    title: 'Summer Training – Java & Web Technologies',
    issuer: 'IKGPTU',
    category: 'Industry Training',
    year: '2023',
    description: '45-day intensive covering Java, Spring Boot, REST APIs, and deployment pipelines.',
    fileName: 'Summer_Training_Amandeep_Aman.pdf',
  },
  {
    id: 'neocolab-cpp',
    title: 'CSE101 C++ Programming Essentials',
    issuer: 'NeoColab',
    category: 'Academic',
    year: '2023',
    description: 'Object-oriented design, STL practice, and memory-safe patterns in C++.',
    fileName: 'NeoColab_CPP_Amandeep_Aman.pdf',
  },
  {
    id: 'neocolab-dsa-advanced',
    title: 'CSE202 Advanced DSA',
    issuer: 'NeoColab',
    category: 'Academic',
    year: '2023',
    description: 'Complexity analysis, advanced recursion, trees, and graph problem solving.',
    fileName: 'NeoColab_Advanced_DSA_Amandeep_Aman.pdf',
  },
  {
    id: 'neocolab-c',
    title: 'C Programming Fundamentals',
    issuer: 'NeoColab',
    category: 'Academic',
    year: '2022',
    description: 'Pointers, memory management, and system-level problem solving in C.',
    fileName: 'NeoColab_C_Programming_Amandeep_Aman.pdf',
  },
  {
    id: 'neocolab-dsa-foundation',
    title: 'Data Structures & Algorithms Foundation',
    issuer: 'NeoColab',
    category: 'Academic',
    year: '2022',
    description: 'Arrays, linked structures, searching, and sorting mastered through timed labs.',
    fileName: 'NeoColab_DSA_Foundation_Amandeep_Aman.pdf',
  },
  {
    id: 'neocolab-java',
    title: 'Java Programming',
    issuer: 'NeoColab',
    category: 'Academic',
    year: '2022',
    description: 'Core Java, collections, multithreading, and JDBC-driven CRUD utilities.',
    fileName: 'NeoColab_Java_Amandeep_Aman.pdf',
  },
  {
    id: 'neocolab-oops',
    title: 'Object Oriented Programming Concepts',
    issuer: 'NeoColab',
    category: 'Academic',
    year: '2022',
    description: 'SOLID patterns, UML thinking, and encapsulated architectures.',
    fileName: 'NeoColab_OOPS_Amandeep_Aman.pdf',
  },
  {
    id: 'nptel-mooc',
    title: 'NPTEL MOOC Excellence',
    issuer: 'NPTEL',
    category: 'MOOC',
    year: '2022',
    description: 'National Programme on Technology Enhanced Learning certification with top percentile score.',
    fileName: 'NPTEL_MOOC_Amandeep_Aman.pdf',
  },
  {
    id: 'oracle-ai',
    title: 'Oracle AI Foundations Associate',
    issuer: 'Oracle',
    category: 'Industry',
    year: '2024',
    description: 'Oracle Race to Certification – AI foundations and responsible AI principles.',
    fileName: 'Oracle_AI_Foundation_Amandeep_Aman.pdf',
  },
];

export const CONTACT_INFO = [
  { icon: 'Mail', label: 'Email', value: 'aman.deepaman3086@gmail.com', href: 'mailto:aman.deepaman3086@gmail.com' },
  { icon: 'Phone', label: 'Phone', value: '+91 9113468393', href: 'tel:+919113468393' },
  { icon: 'MapPin', label: 'Location', value: 'Punjab, India', href: 'https://maps.app.goo.gl/' },
];

export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/AMANDEEP-sudo' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/amandeep-aman/' },
  { name: 'Email', url: 'mailto:aman.deepaman3086@gmail.com' },
];

export const CONTACT_CTA = {
  heading: "Let's collaborate!",
  message: 'Reach out to discuss backend-heavy web builds, internships, or simply say hello.',
  button: 'Send Message',
};

export const FOOTER_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
  { name: 'Resume', href: '/Amandeep Aman_general_cv_feb_21_2026.pdf' },
];
