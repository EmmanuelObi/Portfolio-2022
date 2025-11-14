import {
  AmbitLogo,
  BarepapersLogo,
  BimLogo,
  CDGOLogo,
  ClevertechLogo,
  ConsultlyLogo,
  EvercastLogo,
  Howdy,
  JarockiMeLogo,
  JojoMobileLogo,
  Minimal,
  MobileVikingsLogo,
  MonitoLogo,
  NSNLogo,
  ParabolLogo,
  TastyCloudLogo,
  YearProgressLogo,
} from "@/images/logos";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Emmanuel Obi",
  initials: "EO",
  location: "London, United Kingdom",
  locationLink: "https://www.google.com/maps/place/London",
  about: "Software Engineer & AI Researcher",
  summary:
    "Builder at heart with a strong track record of shipping user-centric products and driving growth through onboarding, activation, and retention improvements. Led AI-powered initiatives that 60× onboarding speed and delivered $2M+ in recovered revenue within 48 hours. Thrive in startup environments, owning products end-to-end from idea to impact.",
  avatarUrl: "https://avatars.githubusercontent.com/u/63916312?v=4",
  personalWebsiteUrl: "https://emmanuel-obi.vercel.app",
  contact: {
    email: "obiemmy123@gmail.com",
    tel: "+2348060597961",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/emmanuelobi",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/emmanuelobi20/",
        icon: LinkedInIcon,
      },
      {
        name: "X",
        url: "https://x.com/koliko_man",
        icon: XIcon,
      },
    ],
  },
  education: [
    {
      school: "Olabisi Onabanjo University",
      degree: "B.Eng. Electrical and Electronics Engineering",
      start: "2018",
      end: "2023",
      gpa: "3.76/4.0 (WES) - First Class Degree (Top 1%)",
      additionalInfo: "Campus Ambassador for Finance and Technology",
    },
  ],
  work: [
    {
      company: "VertoFx (YC 2019)",
      link: "https://vertofx.com",
      badges: ["Remote", "London, UK"],
      title: "Senior Software Engineer - Product Growth",
      logo: ParabolLogo,
      start: "Jun 2024",
      end: "Present",
      description: `Led the design and implementation of an AI-powered onboarding flow, increasing user activation by 60% and reducing onboarding time from 2 weeks to 1 day. Executed efforts to transition from a monolithic architecture to a microservices-based system, enhancing scalability and performance by over 300%. Designed and built retention workflows including a real-time churn detection tool that triggered proactive interventions and recovered $2M+ in 48 hours. Collaborated with onboarding teams and compliance specialists to develop an optimized risk calculation algorithm, significantly improving efficiency in business risk determination by 45%.`,
    },
    {
      company: "RoadPreppers Technologies",
      link: "https://lara.ng",
      badges: ["Lagos, Nigeria"],
      title: "Founding Engineer",
      logo: ClevertechLogo,
      start: "Apr 2021",
      end: "May 2024",
      description: `Owned product development lifecycle from 0 → 1, building features that supported 10x user growth during early-stage scaling. Led engineering on personalized onboarding systems that adapted user journeys based on goals and usage behavior. Optimized React codebase, reducing load times by 12% and enhancing overall application performance. Created reusable JavaScript code libraries, reducing development time by 50% and improving team efficiency. Collaborated with engineering team to develop a mobility algorithm that ensures accurate and up-to-date directions for over 100,000 concurrent users.`,
    },
    {
      company: "Atlens Limited",
      link: "https://wiremoney.com.au",
      badges: ["Lagos, Nigeria"],
      title: "Software Engineer",
      logo: ConsultlyLogo,
      start: "Jan 2019",
      end: "Apr 2021",
      description: `Championed front-end best practices during code reviews, improving performance and maintainability across three Angular and React projects resulting in a 15%+ boost in load efficiency and faster feature delivery. Authored detailed architectural and functional specs to ensure clarity, alignment, and delivery standards across client projects helping teams ship high-quality, scalable features with fewer revisions. Built a full-featured CMS using TypeScript and React, seamlessly integrating with backend APIs, contributing to a 20% lift in customer acquisition and retention.`,
    },
  ],
  skills: [
    "TypeScript",
    "React",
    "Angular",
    "Node.js",
    "Express",
    "Python",
    "Django",
    "OpenCV",
    "OpenAI",
    "VertexAI",
    "AWS",
    "MySQL",
    "MongoDB",
    "DynamoDB",
    "Redis",
    "Kafka",
    "SQS",
  ],
  projects: [
    {
      title: "Verto Platform",
      techStack: ["Angular", "Node", "Typescript", "AWS", "MySQL", "MongoDb"],
      description:
        "Global financial technology application enabling users to make cross border payments",
      logo: ConsultlyLogo,
      link: {
        label: "verto",
        href: "https://www.vertofx.com/",
      },
    },
    {
      title: "VertoFx",
      techStack: [
        "TypeScript",
        "React",
        "Node.js",
        "AWS",
        "Microservices",
        "AI/ML",
      ],
      description:
        "Cross-border fintech platform based in the United Kingdom. Led AI-powered onboarding and retention initiatives.",
      logo: ParabolLogo,
      link: {
        label: "vertofx.com",
        href: "https://vertofx.com/",
      },
    },
    {
      title: "LARA - Directions Assistant",
      techStack: ["TypeScript", "React", "PWA", "Python", "Django"],
      description:
        "Meet Lara, your automated directions assistant for various locations in Nigeria. A progressive web app built with TypeScript & React.",
      logo: ClevertechLogo,
      link: {
        label: "lara.ng",
        href: "https://lara.ng/",
      },
    },
    {
      title: "WireMoney",
      techStack: ["Angular", "TypeScript", "NgRx", "JavaScript"],
      description:
        "Payments app that makes it super easy and fast to send money to loved ones or get payments from clients overseas with lower transfer fees.",
      logo: ConsultlyLogo,
      link: {
        label: "wiremoney.com.au",
        href: "https://wiremoney.com.au/",
      },
    },
  ],
  certificates: [
    {
      title: "Secure Coding and Design Best Practices in NodeJs JavaScript",
      issuer: "Udemy",
      date: "2023",
      skills: [
        "Secure Authentication",
        "Network Architecture",
        "Authorization",
        "SDLC",
        "API Design",
        "API Security",
      ],
      link: "https://www.udemy.com/certificate/UC-e4d81c59-c158-4732-aab1-a1625872aa53/",
    },
    {
      title: "Software Architecture & Design of Modern Large Scale Systems",
      issuer: "Udemy",
      date: "2022",
      skills: [
        "Architectural Drivers",
        "Architectural Patterns",
        "Big Data",
        "Systems Design",
      ],
      link: "http://ude.my/UC-246bcca9-09a6-4c6a-938a-e5a27d52c412",
    },
    {
      title: "Microservices and Event-Driven Architecture",
      issuer: "Udemy",
      date: "2022",
      skills: [
        "Microservices",
        "Web Services API",
        "Software Architecture",
        "Observability",
        "Distributed Systems",
      ],
      link: "http://ude.my/UC-779480a1-e696-45c1-8c72-0f4ce27d726b",
    },
  ],
  publications: [
    {
      title:
        "Design and Development of an Automatic Plate Number Recognition System Using OpenCV",
      authors: "Emmanuel Obi",
      year: "2023",
      link: "https://drive.google.com/file/d/1MO7CBNW1sBWKo_CRZ9fIR2nzWP8RFf2-/view?usp=sharing",
    },
    {
      title:
        "Algorithm development for vehicle detection and counting with application of OpenCV (Under Review)",
      authors:
        "Olajide, M. B., Alase, A. D., Obi, E. N., Kuponiyi, D. S., & Aina, O. A.",
      year: "2024",
      link: "https://drive.google.com/file/d/1WJYXFNITg5Tabq2Hrm9Rt0Sb21KU6vtM/view?usp=sharing",
    },
    {
      title: "Understand Hoisting In 4 Minutes",
      authors: "Emmanuel Obi",
      year: "2023",
      link: "https://codeprophet.hashnode.dev/understand-hoisting-in-4-minutes",
    },
    {
      title: "Do You Make These 7 Common Mistakes In React?",
      authors: "Emmanuel Obi",
      year: "2022",
      link: "https://codeprophet.hashnode.dev/do-you-make-these-7-common-mistakes-in-react",
    },
  ],
  awards: [
    {
      title: "Employee of the Year",
      company: "VertoFx (YC 2019)",
      year: "2024",
    },
    {
      title: "Rising Star",
      company: "VertoFx (YC 2019)",
      year: "2024",
    },
  ],
  researchInterests: [
    "Computer Vision",
    "Responsible & Trustworthy AI",
    "Reliable ML Systems",
    "Applied Machine Learning",
    "AI for Product Growth",
  ],
  researchProjects: [
    {
      title: "Automatic Plate Number Recognition (APNR) System",
      year: "2023",
      tech: ["OpenCV", "Python", "Image Processing", "Pattern Recognition"],
      link: "https://drive.google.com/file/d/1MO7CBNW1sBWKo_CRZ9fIR2nzWP8RFf2-/view?usp=sharing",
      highlights: [
        "Designed and implemented full-featured APNR system using OpenCV with >77% accuracy on Nigerian plates",
        "Built a curated registration database of Nigerian plate numbers for evaluation and error analysis",
        "Performed performance benchmarking and validation against target success thresholds",
      ],
    },
  ],
} as const;
