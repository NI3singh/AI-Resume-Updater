// src/lib/types.ts

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  location: string;
  gpaLabel: string;
  degree: string;
  startDate: string;
  endDate: string;
  highlight: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  techStack: string;
  githubUrl: string;
  liveUrl: string;
  bullets: string[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  projectSubtitle: string;
  bullets: string[];
}

export interface ExtracurricularEntry {
  id: string;
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface AchievementItem {
  id: string;
  text: string;
}

export interface CertificationItem {
  id: string;
  text: string;
  credentialUrl: string;
}

export interface PublicationEntry {
  id: string;
  title: string;
  authors: string;
  abstractText: string;
  paperUrl: string;
  paperLinkLabel: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  education: EducationEntry[];
  skills: SkillCategory[];
  projects: ProjectEntry[];
  experience: ExperienceEntry[];
  extracurricular: ExtracurricularEntry[];
  achievements: AchievementItem[];
  certifications: CertificationItem[];
  publications: PublicationEntry[];
}

export type BuilderMode = 'manual' | 'upload';
export type ActiveSection =
  | 'personal'
  | 'education'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'extracurricular'
  | 'achievements'
  | 'certifications'
  | 'publications';

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT DATA — pre-filled with Nitin Singh's resume
// ─────────────────────────────────────────────────────────────────────────────
export const defaultResumeData: ResumeData = {
  personal: {
    name: 'Singh Nitin Rakesh',
    email: 'ni3.singh.r@gmail.com',
    phone: '(+91) 7041808600',
    location: 'Surat, India',
    linkedin: 'https://www.linkedin.com/in/nitinsinghr/',
    github: 'https://www.github.com/NI3singh',
    website: 'https://portfolio-nitinsingh.vercel.app/',
  },

  education: [
    {
      id: 'edu_1',
      institution: 'Uka Tarsadia University',
      location: 'Surat, Gujarat',
      gpaLabel: 'Agg. CGPA: 8.68',
      degree: 'B.Tech Artificial Intelligence & Data Science',
      startDate: 'Sep 2021',
      endDate: 'May 2025',
      highlight: 'Achieved a perfect 10.0 SGPA in the final semester, demonstrating mastery of advanced coursework',
    },
  ],

  skills: [
    {
      id: 'skill_1',
      category: 'Languages',
      items: ['Python(advanced)', 'Javascript(basic)', 'C/C++ (basic)'],
    },
    {
      id: 'skill_2',
      category: 'Tools & Technology',
      items: ['HTML', 'CSS', 'Node.js', 'Hugging Face', 'Power BI', 'Git', 'FastAPI', 'Flask', 'GitHub', 'Excel'],
    },
    {
      id: 'skill_3',
      category: 'Frameworks',
      items: ['Pandas', 'Numpy', 'Scikit-Learn', 'Matplotlib', 'Tensorflow', 'Keras', 'PyTorch'],
    },
    {
      id: 'skill_4',
      category: 'Technical Domains',
      items: ['Machine Learning', 'Deep Learning', 'OOP', 'Data Science', 'Computer Vision', 'NLP', 'GenAI', 'Manual Testing', 'IOT', 'Mongodb'],
    },
    {
      id: 'skill_5',
      category: 'Data Analysis & Visualization',
      items: ['SQL', 'Pandas', 'Numpy', 'Scikit-learn', 'Exploratory Data Analysis (EDA)', 'Statistical Analysis', 'Data Cleaning'],
    },
    {
      id: 'skill_6',
      category: 'Databases & Cloud Platforms',
      items: ['Snowflake', 'Google Cloud Platform (GCP)', 'AWS'],
    },
  ],

  projects: [
    {
      id: 'proj_1',
      name: 'Face Recognition Web Application (Find You)',
      techStack: 'RetinaFace, Facenet',
      githubUrl: 'https://github.com/NI3singh/Find-You/tree/main',
      liveUrl: '',
      bullets: [
        'This is a Flask-based web application for face recognition. Users can upload or capture photos to find matched faces from a dataset. The app also provides options to download all matched photos as a zip file.',
        'Ensuring Proper Security implementation by adding feature "Authorized access only by Password-Protected-Link".',
        'Achieved 96.3% face recognition accuracy on a diverse dataset of 500+ images.',
      ],
    },
    {
      id: 'proj_2',
      name: 'Solana Price Data Analysis',
      techStack: 'Data Engineering, Data Science, Data Analysis',
      githubUrl: 'https://github.com/NI3singh/Solana-Data-Analysis',
      liveUrl: 'https://solana-live-dashboard.onrender.com/',
      bullets: [
        'Analyzed over 1,300 days of historical market data to identify key drivers of price volatility and inform potential trading strategies.',
        'Engineered a robust data pipeline to clean, process, and enrich the raw dataset with 25+ technical indicators (e.g., RSI, MACD), creating a comprehensive foundation for analysis.',
        'Synthesized the enhanced 44-column dataset, which directly led to an 8% improvement in the predictive performance of a baseline machine learning model.',
      ],
    },
    {
      id: 'proj_3',
      name: 'Retail Sales Analysis on Snowflake',
      techStack: 'Snowflake, SQL',
      githubUrl: 'https://github.com/NI3singh/Snowflake-Project',
      liveUrl: '',
      bullets: [
        'Managed an end-to-end data analysis pipeline within Snowflake, processing over 1 million rows of Rossmann retail sales data to identify key drivers for demand forecasting.',
        'Executed data cleaning, preparation, and feature engineering entirely with SQL, handling missing values through imputation and creating new features like IsWeekend and PromoMonthFlag.',
        'Uncovered a critical business insight through Exploratory Data Analysis (EDA): promotional periods boosted average daily sales from EUR 4,406 to EUR 7,391, a remarkable uplift of 67.7%.',
      ],
    },
    {
      id: 'proj_4',
      name: 'RAG-Based Financial Intelligence Agent',
      techStack: 'Data Gen AI, RAG & Flask',
      githubUrl: 'https://github.com/NI3singh/stock-news-summarizer',
      liveUrl: 'https://stock-news-summarizer.onrender.com/',
      bullets: [
        'Developed a Retrieval-Augmented Generation (RAG) pipeline that aggregates real-time financial news from Polygon and Finviz APIs.',
        'Optimized the RAG pipeline using semantic chunking strategies and vector embeddings to manage context window limits, ensuring high-accuracy retrieval for Gemini Pro.',
        'Deployed the solution using Flask, handling dynamic context injection to ensure the LLM responses were grounded in live market data, eliminating hallucinations.',
      ],
    },
    {
      id: 'proj_5',
      name: 'Multi-Agent Competitive Querying System (AMD-AI-League)',
      techStack: 'Agentic AI & LLM Orchestration',
      githubUrl: 'https://github.com/NI3singh/AMD-AI-Premiere-League-Hackathon',
      liveUrl: '',
      bullets: [
        'Architected a Multi-Agent System comprising distinct "Questioner" and "Answerer" agents to simulate competitive information retrieval scenarios.',
        'Implemented complex prompting strategies where the Question Agent generates context-aware queries and the Answer Agent retrieves and synthesizes data to respond.',
        'Designed the evaluation logic to score agent performance based on accuracy and relevance, laying the groundwork for automated negotiation systems.',
      ],
    },
    {
      id: 'proj_6',
      name: 'Generative AI Image Pipeline & LoRA Fine-Tuning',
      techStack: 'Deep Learning & Computer Vision',
      githubUrl: 'https://github.com/NI3singh/AI-Avtaar',
      liveUrl: '',
      bullets: [
        'Engineered an end-to-end image generation pipeline (AI-Avtaar) utilizing Stable Diffusion and Automatic1111 for high-fidelity character creation.',
        'Fine-tuned custom LoRA models and applied 4-bit Quantization techniques to optimize model inference latency and reduce memory usage during deployment.',
        'Integrated a Virtual Try-On module using Computer Vision (CatVTON), allowing users to overlay generated clothing onto custom avatars seamlessly.',
      ],
    },
    {
      id: 'proj_7',
      name: 'Auto-Doc - VS Code Extension',
      techStack: 'JavaScript, VS Code API, Markdown, Git Diff Algorithm',
      githubUrl: 'https://github.com/NI3singh/Auto-Doc',
      liveUrl: '',
      bullets: [
        'Developed a zero-configuration VS Code extension that automatically tracks and documents code changes in real-time, creating timestamped Markdown logs with precise line-by-line diffs (additions/removals with line numbers) to eliminate manual documentation effort for developers.',
        'Implemented intelligent diff detection algorithm that triggers on every file save, generating clean, readable change logs.',
      ],
    },
  ],

  experience: [
    {
      id: 'exp_1',
      role: 'AI/ML Engineer',
      company: 'ELaunch Solution Pvt. Ltd.',
      location: 'Surat, Gujarat',
      startDate: 'Dec 2024',
      endDate: '',
      current: true,
      projectSubtitle: '',
      bullets: [
        "Led the 'Solana Market Analysis' project, performing end-to-end exploratory data analysis (EDA) on over 1,300 days of historical data to identify key market drivers.",
        'Engineered a data pipeline in Python to clean, process, and enrich the dataset with 25+ technical indicators (e.g., RSI, MACD), creating a comprehensive foundation for analysis.',
        'Engineered and deployed an end-to-end AI image search system, performing rigorous model evaluation and tuning, achieving 92% accuracy.',
      ],
    },
    {
      id: 'exp_2',
      role: 'Data Analyst Intern',
      company: 'JBcodeapp',
      location: 'Surat, Gujarat',
      startDate: 'May 2024',
      endDate: 'June 2024',
      current: false,
      projectSubtitle: 'Project: Student Performance Analysis | Python, Numpy',
      bullets: [
        'Engineered an automated data pipeline using Python to perform ETL (Extract, Transform, Load) on 5,000+ student records.',
        'Conducted exploratory data analysis to identify the key factors and patterns influencing student academic performance.',
        'Synthesized findings into a comprehensive report that isolated key factors influencing academic scores, providing a foundation for data-driven teaching methods and resource allocation strategies.',
      ],
    },
    {
      id: 'exp_3',
      role: 'AI/ML Trainee',
      company: 'AlgoBrain AI',
      location: 'Surat, Gujarat',
      startDate: 'Sep 2023',
      endDate: 'Jan 2024',
      current: false,
      projectSubtitle: 'Project: Movie-Ticket Booking Chatbot with DialogFlow CX',
      bullets: [
        'Analyzed potential user conversation paths to design and build a movie-ticket booking chatbot in DialogFlow CX, enhancing the overall user experience.',
        'Systematically investigated 4 web applications to identify and resolve 30+ critical bugs, showcasing strong analytical skills in anomaly detection and root cause analysis.',
      ],
    },
  ],

  extracurricular: [
    {
      id: 'extra_1',
      title: 'Research Community Member',
      organization: 'Swaayan Drone Club, SVNIT, Surat, Gujarat',
      startDate: 'May 2024',
      endDate: 'June 2024',
      bullets: ['Built and Assisted for Drone Bootcamps by building and calibrating drones using beta flight and mission planner.'],
    },
    {
      id: 'extra_2',
      title: 'User Software Tester (Part-Time)',
      organization: 'Nothing India, Remote',
      startDate: 'Feb 2023',
      endDate: 'Present',
      bullets: ['Conducted user trial testing for Nothing Phone 1, Nothing Phone 2, Nothing 2a, Android 14, Cmf Watch, and more.'],
    },
    {
      id: 'extra_3',
      title: 'Summer Analytics',
      organization: 'IIT Guwahati, Online',
      startDate: 'July 2024',
      endDate: 'Aug 2024',
      bullets: ['Successfully completed Summer Analytics 2024 Program with top 10 ranking out of all participants.'],
    },
    {
      id: 'extra_4',
      title: 'Aspire Leaders Program',
      organization: 'Aspire Institute, Harvard Business School, Online',
      startDate: 'Aug 2024',
      endDate: 'Nov 2024',
      bullets: ['Completed all modules in Leadership, Communication, and Problem-Solving.'],
    },
    {
      id: 'extra_5',
      title: 'AI Business Fellow',
      organization: 'Perplexity, Online',
      startDate: 'Feb 2025',
      endDate: 'Aug 2025',
      bullets: ['Selected in the Perplexity AI Business Fellow Program 2025.'],
    },
    {
      id: 'extra_6',
      title: 'Gujarat State Lead',
      organization: 'Open Source Connect, Remote',
      startDate: 'Jul 2025',
      endDate: 'Sep 2025',
      bullets: ['Led Open Source Connect initiatives in Gujarat, driving AI, ML, and marketing outreach efforts.'],
    },
    {
      id: 'extra_7',
      title: 'McKinsey.org Forward Program',
      organization: 'McKinsey.org, Online',
      startDate: 'Apr 2025',
      endDate: 'Jun 2025',
      bullets: ['Completed professional development in business analytics and strategic thinking.'],
    },
    {
      id: 'extra_8',
      title: 'Google Student Ambassador Program',
      organization: 'Google, Ping Network MCN, Online',
      startDate: 'Sep 2025',
      endDate: 'Dec 2025',
      bullets: ['Selected as the Google Student Ambassador from my college, serving as the campus representative for Google.'],
    },
  ],

  achievements: [
    { id: 'ach_1', text: 'Awarded a Certificate of Excellence in Summer Analytics (IIT Guwahati) for finishing in the top 10 of all participants.' },
    { id: 'ach_2', text: 'Certified in Time Series Analysis by IIT Guwahati, with demonstrated expertise in statistical forecasting models.' },
    { id: 'ach_3', text: 'Achieved Runner-Up position in Tattva Hackathon 2025 (CGPIT), demonstrating problem-solving, teamwork, and innovation.' },
    { id: 'ach_4', text: 'Achieved Winner position in Quiz (Group) Competition at College Fest 2023, showcasing knowledge, teamwork, and quick thinking.' },
    { id: 'ach_5', text: 'Secured 2nd Runner-Up position in Script Writing (Solo) at College Fest 2023, demonstrating creativity and communication skills.' },
  ],

  certifications: [
    {
      id: 'cert_1',
      text: 'Passed Google Analytics Certification.',
      credentialUrl: 'https://skillshop.credential.net/1d6d808c-2508-4233-8032-517fcdc6ce8f',
    },
    {
      id: 'cert_2',
      text: 'Python for Data Science by NPTEL.',
      credentialUrl: 'https://www.linkedin.com/in/nitinsinghr/details/certifications/1757332944332/single-media-viewer/?profileId=ACoAAD1bebkBJhNg93bP5KViM3Bfq_Uka_OtPdc',
    },
    {
      id: 'cert_3',
      text: 'Completed AI/ML for GeoData Analysis by ISRO.',
      credentialUrl: 'https://www.linkedin.com/in/nitinsinghr/details/certifications/1726937879804/single-media-viewer/?profileId=ACoAAD1bebkBJhNg93bP5KViM3Bfq_Uka_OtPdc',
    },
    {
      id: 'cert_4',
      text: 'Completed ML: An Overview from Coursera.',
      credentialUrl: 'https://coursera.org/share/f949133df4ee1f7e79f02bc8f72a49db',
    },
  ],

  publications: [
    {
      id: 'pub_1',
      title: 'Is Architectural Complexity Always the Answer? A Case Study on SwinIR vs. an Efficient CNN',
      authors: 'Chandresh Sutariya, Nitin Singh',
      abstractText: 'Demonstrated that an optimized CNN achieves near state-of-the-art restoration quality comparable to SwinIR while significantly reducing computational overhead.',
      paperUrl: 'https://arxiv.org/abs/2510.07984',
      paperLinkLabel: 'arXiv Pre-print, 2025',
    },
  ],
};

export interface SectionConfig {
  id: Exclude<ActiveSection, 'personal'>;
  label: string; // shown in nav AND used as \section*{label} in LaTeX
}

export const ALL_SECTIONS: SectionConfig[] = [
  { id: 'education',       label: 'Education' },
  { id: 'skills',          label: 'Technical Skills' },
  { id: 'projects',        label: 'Projects' },
  { id: 'experience',      label: 'Experience' },
  { id: 'extracurricular', label: 'Extracurricular Activities' },
  { id: 'achievements',    label: 'Achievements' },
  { id: 'certifications',  label: 'Certifications' },
  { id: 'publications',    label: 'Publications' },
];