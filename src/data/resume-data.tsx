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
  location: "Lagos, Nigeria, WAT",
  locationLink: "https://www.google.com/maps/place/Lagos",
  about:
    "Frontend Developer focused on building products with extra attention to detail",
  summary:
    "Skilled frontend developer with experience in designing, developing, and maintaining web applications. Achieved measurable success optimizing web applications to ensure a seamless experience for over 100,000 users. Adept at collaborating with cross-functional teams and delivering software on time and on budget.",
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
      degree: "B.Eng (First Class) Electrical and Electronics Engineering",
      start: "Oct 2018",
      end: "Nov 2023",
    },
  ],
  work: [
    {
      company: "RoadPreppers Technologies",
      link: "https://lara.ng",
      badges: ["Remote", "USA"],
      title: "Frontend Developer",
      logo: ParabolLogo,
      start: "2022",
      end: "Present",
      description: `Created reusable JavaScript code libraries, reducing development time for future projects by 50% and improving the efficiency of the development team. Utilized Redux for state management in React, resulting in a 25% reduction in code complexity and a 15% increase in team productivity. Collaborated with the backend engineers to develop a mobility algorithm in Python that ensures accurate and up-to-date directions are being provided to over 100,000 users.`,
    },
    {
      company: "Atlens Limited",
      link: "https://wiremoney.com.au",
      badges: ["Remote", "Lagos"],
      title: "Frontend Developer",
      logo: ClevertechLogo,
      start: "2020",
      end: "2022",
      description: `Participated actively in code reviews and provided best practice solutions, which increased the website code efficiency of three client projects built using Angular and React by over 15% each. Designed detailed architectural and functional software requirement documents for various client projects to portray the quality and standard of the product being delivered. Efficiently interacted with APIs designed by the backend team to create and deliver a fully functional CMS using Typescript and React that improved customer acquisition and retention by 20%.`,
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React/Next.js/Remix",
    "HTML/CSS",
    "Redux",
    "Angular",
    "Tailwind CSS",
    "Cypress",
    "Python",
    "Rust",
  ],
  projects: [
    {
      title: "Lara.ng",
      techStack: ["JavaScript(ES6)", "PWA", "Service Workers", "HTML", "CSS"],
      description:
        "Meet Lara, your automated directions assistant for various locations in Nigeria.",
      logo: ConsultlyLogo,
      link: {
        label: "lara.ng",
        href: "https://lara.ng/",
      },
    },
    {
      title: "Wiremoney",
      techStack: ["Angular", "TypeScript", "NgRx", "JavaScript"],
      description:
        "Wiremoney makes it super easy and fast to send money to loved ones or get payments from clients overseas with lower transfer fees",
      logo: ConsultlyLogo,
      link: {
        label: "Wiremoney",
        href: "https://wiremoney.com.au/",
      },
    },
    {
      title: "Lara Beta",
      techStack: [
        "React",
        "TypeScript",
        "Next.js",
        "JavaScript",
        "PWA",
        "Redux",
      ],
      description:
        "Meet Lara, your automated directions assistant for various locations in Nigeria.",
      logo: ConsultlyLogo,
      link: {
        label: "beta.lara.ng",
        href: "https://beta.lara.ng/",
      },
    },
  ],
} as const;
