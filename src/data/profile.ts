export interface Project {
  title: string
  description: string
  tags: string[]
  image?: string
}

export interface Post {
  id: string
  content: string
  timestamp: string
  likes: number
  replies: number
  retweets: number
  pinned?: boolean
  image?: string
}

export interface ProfileData {
  name: string
  handle: string
  title: string
  location: string
  education: string
  joined: string
  bio: string
  avatar: string
  banner: string
  website: string
  followers: number
  stats: {
    projects: number
    technologies: number
    deployments: number
  }
  skills: {
    frontend: string[]
    backend: string[]
    databases: string[]
    tools: string[]
  }
  projects: Project[]
  posts: Post[]
  workflow: string[]
  experience: string[]
  social: {
    github: string
    linkedin: string
    email: string
  }
}

export const profile: ProfileData = {
  name: "Mouataz Billah Kachkach",
  handle: "Blaze-73",
  title: "Full Stack Web Developer",
  location: "Morocco",
  education: "OFPPT ISMONTIC — Software Development Full Stack",
  joined: "2024",
  followers: 128,
  bio: "I build modern, scalable web applications with clean code and smooth experiences. Passionate about React, Next.js, and crafting polished interfaces. Currently seeking freelance opportunities and a Junior Developer role. Open source contributor & lifelong learner.",
  avatar: "/pfp.jpg",
  banner: "/wp.jpg",
  website: "",
  stats: {
    projects: 10,
    technologies: 22,
    deployments: 7,
  },
  skills: {
    frontend: [
      "HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript",
      "React", "Next.js", "TailwindCSS", "Framer Motion",
      "Redux Toolkit", "Vite", "Responsive Design",
    ],
    backend: [
      "PHP", "Laravel", "Node.js", "Express.js",
      "REST APIs", "Authentication",
    ],
    databases: [
      "MySQL", "PostgreSQL", "MongoDB", "Supabase",
    ],
    tools: [
      "Git", "GitHub", "Docker", "Redis",
      "Figma", "Postman", "VS Code",
      "Linux", "CI/CD", "Vercel",
    ],
  },
  projects: [
    {
      title: "Fleur de Luxe",
      description:
        "Luxury flower e-commerce platform built with Next.js, TypeScript, TailwindCSS and Supabase. Features a polished product catalog, cart system, and secure checkout.",
      tags: ["Next.js", "TypeScript", "TailwindCSS", "Supabase"],
    },
    {
      title: "AHAYZONE",
      description:
        "Modern art gallery and tourism platform showcasing Asilah's artistic culture. Built with React, TailwindCSS, modern animations, and multilingual support.",
      tags: ["React", "TailwindCSS", "Framer Motion", "i18n"],
    },
    {
      title: "Gym Management System",
      description:
        "Full-stack management platform with Laravel backend and React frontend. Includes authentication, membership management, admin dashboard, and REST API.",
      tags: ["Laravel", "React", "REST API", "Auth"],
    },
    {
      title: "Pharmacy Platform",
      description:
        "Medicine management platform with a React frontend and Laravel backend. Features authentication, inventory tracking, and a responsive modern UI.",
      tags: ["React", "Laravel", "MySQL", "Responsive"],
    },
    {
      title: "Centre Hassan II Platform",
      description:
        "Modern React frontend with Laravel backend for managing center operations. Clean architecture and responsive design throughout.",
      tags: ["React", "Laravel", "PostgreSQL"],
    },
    {
      title: "Real Estate Platform",
      description:
        "Property management platform featuring listings, search, and user accounts. Built using React and Laravel with a focus on UX.",
      tags: ["React", "Laravel", "MySQL", "TailwindCSS"],
    },
    {
      title: "Realtime Chat Application",
      description:
        "Full-featured chat app with WebSockets, typing indicators, message history, and user presence. Built with React, Node.js, and Socket.io.",
      tags: ["React", "Node.js", "Socket.io", "Redis"],
    },
    {
      title: "Weather Dashboard",
      description:
        "Interactive weather dashboard with 7-day forecasts, animated weather icons, location search, and responsive data visualization using Chart.js.",
      tags: ["React", "Chart.js", "REST API", "Geolocation"],
    },
    {
      title: "Task Management System",
      description:
        "Kanban-style project management tool with drag-and-drop, real-time collaboration, and team workspaces. Built with Next.js and Supabase.",
      tags: ["Next.js", "Supabase", "DnD", "Realtime"],
    },
    {
      title: "Blog Engine",
      description:
        "Markdown-powered blog with syntax highlighting, categories, SEO optimization, and an admin dashboard. Server-side rendered with Next.js.",
      tags: ["Next.js", "MDX", "TailwindCSS", "SEO"],
    },
  ],
  posts: [
    {
      id: "p1",
      pinned: true,
      content: "Just shipped v2.0 of Fleur de Luxe 🚀 Added dark mode, improved checkout flow, and optimized images for 40% faster load times. Built with Next.js, TypeScript, and Supabase. Check it out!",
      timestamp: "2h",
      likes: 28,
      replies: 5,
      retweets: 12,
      image: "/fleure.png",
    },
    {
      id: "p2",
      content: "Hot take: TailwindCSS v4 with the new @theme directive is the best DX I've had in years. No more fighting with config files, just pure utility classes with CSS variables. Game changer.",
      timestamp: "5h",
      likes: 42,
      replies: 8,
      retweets: 15,
    },
    {
      id: "p3",
      content: "Spent the weekend refactoring the Gym Management System. Migrated everything to hooks, added proper error boundaries, wrote unit tests, and set up CI/CD. Clean code feels incredible.",
      timestamp: "1d",
      likes: 19,
      replies: 3,
      retweets: 7,
      image: "/gympic.png",
    },
    {
      id: "p4",
      content: "Working on something new 🤫 Can't share details yet but it involves React Server Components, real-time data, and a lot of TypeScript. The prototype is looking promising.",
      timestamp: "2d",
      likes: 34,
      replies: 11,
      retweets: 5,
    },
    {
      id: "p5",
      content: "Just published a deep dive on building authentication systems with Laravel Sanctum and React. Covers token management, protected routes, and refresh token rotation. Who wants the link?",
      timestamp: "3d",
      likes: 56,
      replies: 23,
      retweets: 31,
    },
    {
      id: "p6",
      content: "AHAYZONE is live! 🎨 A modern art gallery platform for Asilah. Built with React, Framer Motion for smooth transitions, and full i18n support for English & French. Proud of this one.",
      timestamp: "5d",
      likes: 47,
      replies: 9,
      retweets: 18,
      image: "/art.png",
    },
    {
      id: "p7",
      content: "Pro tip: Use `React.memo` + `useMemo` strategically, not everywhere. Premature optimization is the root of all evil. Measure first, optimize second.",
      timestamp: "6d",
      likes: 89,
      replies: 14,
      retweets: 42,
    },
    {
      id: "p8",
      content: "Just deployed the Pharmacy Platform to production 💊 Inventory management, auth, and a clean dashboard. Laravel + React combo is unbeatable for full-stack speed.",
      timestamp: "1w",
      likes: 22,
      replies: 4,
      retweets: 9,
      image: "/para.png",
    },
    {
      id: "p9",
      content: "Learning Supabase deeply this month. The Row Level Security model is elegant — define policies once at the DB level and never worry about auth checks in your app code again.",
      timestamp: "1w",
      likes: 65,
      replies: 17,
      retweets: 28,
    },
    {
      id: "p10",
      content: "Centre Hassan II platform — built a comprehensive dashboard with real-time stats, role-based access control, and a responsive layout that works perfectly on tablets. React + Laravel.",
      timestamp: "1w",
      likes: 15,
      replies: 2,
      retweets: 6,
    },
    {
      id: "p11",
      content: "Portfolio v3 is live! ✨ Complete redesign with light/dark mode, interactive particle background, and a cleaner layout. Built with React, Framer Motion, and TailwindCSS.",
      timestamp: "2w",
      likes: 73,
      replies: 12,
      retweets: 25,
      image: "/portfolio.png",
    },
    {
      id: "p12",
      content: "Anyone else love the new React 19 features? The improved hooks, server components, and enhanced error reporting are making development so much smoother.",
      timestamp: "2w",
      likes: 51,
      replies: 19,
      retweets: 11,
    },
    {
      id: "p13",
      content: "Real Estate Platform — implemented advanced search with filters, map integration, and saved searches. The UX flow from browsing to inquiry is buttery smooth.",
      timestamp: "3w",
      likes: 33,
      replies: 7,
      retweets: 14,
      image: "https://picsum.photos/seed/estate/600/400",
    },
    {
      id: "p14",
      content: "TIL: You can use CSS `container queries` for truly responsive components. No more media query hacks — the component adapts to its container, not the viewport. Mind blown.",
      timestamp: "3w",
      likes: 94,
      replies: 11,
      retweets: 45,
    },
    {
      id: "p15",
      content: "Open sourcing some of my utility libraries! Starting with a React hook collection — useDebounce, useLocalStorage, useMediaQuery, and more. Clean, tested, typed. Stay tuned.",
      timestamp: "1mo",
      likes: 38,
      replies: 6,
      retweets: 20,
    },
  ],
  workflow: [
    "Understanding the client's needs",
    "Planning the application architecture",
    "Designing intuitive interfaces",
    "Building scalable frontend architecture",
    "Developing secure backend APIs",
    "Testing thoroughly across devices",
    "Deploying polished products",
  ],
  experience: [
    "Software Development Full Stack student at OFPPT ISMONTIC",
    "Built 10+ real-world projects from concept to deployment",
    "Freelance web developer — delivered 4 client projects",
    "Open source contributor on GitHub",
    "Continuous learner — always exploring modern tools and patterns",
    "Freelance-ready — available for web development projects",
  ],
  social: {
    github: "https://github.com/Blaze-73",
    linkedin: "https://linkedin.com/in/mouataz-billah-kachkach-67dih",
    email: "kachkachmouata@gmail.com",
  },
}
