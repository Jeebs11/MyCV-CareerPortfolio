export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  achievements: string[];
  region: 'europe' | 'mena' | 'us' | 'asia' | 'uk';
  industry: string;
}

export interface Skill {
  name: string;
  category: 'methodology' | 'technical' | 'certification' | 'domain';
  level?: number;
}

export interface Achievement {
  metric: string;
  description: string;
  icon: string;
}

export const experiences: Experience[] = [
  {
    id: '1',
    role: 'Head of Projects & PMO Lead',
    company: 'Novocycle Technology',
    location: 'Remote/Dubai, UAE',
    period: 'Apr 2024 - Present',
    current: true,
    region: 'mena',
    industry: 'Engineering/Battery Recycling',
    achievements: [
      'Established a PMO to centralise communication, align projects, and manage multi-million Euro EU grant projects',
      'Coordinated technical and non-technical delivery teams across Europe and the Middle East',
      'Introduced structured project reporting and delivery tracking using Jira/Confluence, reducing reporting effort by 36%'
    ]
  },
  {
    id: '2',
    role: 'Senior Technical Project Manager',
    company: 'Caravan and Motorhome Club',
    location: 'Remote/London, UK',
    period: 'Oct 2022 - Nov 2023',
    current: false,
    region: 'uk',
    industry: 'Insurance',
    achievements: [
      'Redesigned a core insurance product, improving profitability',
      'Facilitated workshops to gather requirements and map workflows, identifying inefficiencies',
      'Introduced a vendor selection process and managed insurance underwriters'
    ]
  },
  {
    id: '3',
    role: 'Programme Manager',
    company: 'Simply Business',
    location: 'London, UK',
    period: 'Aug 2022 - Mar 2023',
    current: false,
    region: 'uk',
    industry: 'Insurance',
    achievements: [
      'Delivered a £1.2m insurance product using microservices and APIs',
      'Managed FCA-regulated programme with multi-workstream Agile delivery',
      'Introduced sprint cycles and reporting dashboards, improving progress tracking'
    ]
  },
  {
    id: '4',
    role: 'Programme Manager & Digital Transformation Lead',
    company: 'Mercer',
    location: 'London, UK',
    period: 'Oct 2021 - Jun 2022',
    current: false,
    region: 'uk',
    industry: 'Insurance',
    achievements: [
      'Directed multi-country rollouts for clients, including Amazon and Estée Lauder',
      'Developed BA deliverables such as process maps and onboarding playbooks',
      'Managed project plans, budgets and risk/dependency logs'
    ]
  },
  {
    id: '5',
    role: 'Senior International Project Manager',
    company: '6Connex',
    location: 'Remote/US',
    period: 'Jul 2020 - Mar 2022',
    current: false,
    region: 'us',
    industry: 'Events Technology',
    achievements: [
      'Simultaneously delivered global virtual platform programmes across Europe, US, MENA and South East Asia',
      'Coordinated Agile software teams across 6 time zones',
      'Improved platform infrastructure stability, reducing downtime at major global events'
    ]
  },
  {
    id: '6',
    role: 'Project Manager',
    company: 'GSMA',
    location: 'London, UK',
    period: 'Jan 2019 - Mar 2020',
    current: false,
    region: 'uk',
    industry: 'Telecoms',
    achievements: [
      'Managed creation and roll-out of Energy Consumption Benchmark Tool in association with UN 2030 Sustainability Goal',
      'Achieved up to 35% energy reduction for major operators like Vodafone, Verizon, and China Telecom',
      'Engaged with regulators and executives to influence adoption of new sustainability standards'
    ]
  }
];

export const skills: Skill[] = [
  { name: 'PRINCE2', category: 'certification' },
  { name: 'Agile', category: 'methodology' },
  { name: 'Scrum Master (PSM I & II)', category: 'certification' },
  { name: 'Six Sigma', category: 'certification' },
  { name: 'Waterfall', category: 'methodology' },
  { name: 'PMO Leadership', category: 'technical' },
  { name: 'Stakeholder Management', category: 'technical' },
  { name: 'Risk & Compliance', category: 'technical' },
  { name: 'Financial Services', category: 'domain' },
  { name: 'Digital Transformation', category: 'domain' },
  { name: 'International Delivery', category: 'domain' },
  { name: 'AI & Automation', category: 'technical' }
];

export const keyAchievements: Achievement[] = [
  {
    metric: '£1.2M+',
    description: 'Programme Value Delivered',
    icon: 'TrendingUp'
  },
  {
    metric: '17+',
    description: 'Years Experience',
    icon: 'Award'
  },
  {
    metric: '36%',
    description: 'Efficiency Improvement',
    icon: 'Zap'
  },
  {
    metric: '6',
    description: 'Time Zones Managed',
    icon: 'Globe'
  },
  {
    metric: '4',
    description: 'Continents Delivered',
    icon: 'MapPin'
  },
  {
    metric: '35%',
    description: 'Energy Reduction Achieved',
    icon: 'Leaf'
  }
];

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  value: string;
  challenge: string;
  approach: string[];
  outcomes: {
    metric: string;
    description: string;
  }[];
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface DetailedCertification {
  id: string;
  name: string;
  issuer: string;
  dateObtained: string;
  validUntil?: string;
  credentialId?: string;
  verificationUrl?: string;
  logo?: string;
  description: string;
  skills: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  fieldOfStudy?: string;
  achievements?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishDate: string;
  tags: string[];
  featured?: boolean;
  heroImage?: string;
}

export interface ProjectMetrics {
  budgetUtilization: number;
  schedulePerformance: number;
  teamSatisfaction: number;
  stakeholderSatisfaction: number;
  riskScore: number;
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'FCA-Regulated Insurance Product Launch',
    client: 'Simply Business',
    industry: 'Insurance',
    duration: '8 months',
    value: '£1.2M',
    challenge: 'Deliver a complex, FCA-regulated insurance product using modern microservices architecture while maintaining compliance, coordinating multiple workstreams, and meeting strict regulatory deadlines.',
    approach: [
      'Established multi-workstream Agile delivery framework with clear governance',
      'Implemented sprint cycles with daily standups and bi-weekly retrospectives',
      'Created comprehensive reporting dashboards for stakeholder visibility',
      'Coordinated between technical teams, compliance, and business stakeholders',
      'Managed API integrations with legacy systems and external partners'
    ],
    outcomes: [
      { metric: '£1.2M', description: 'Programme value delivered on time' },
      { metric: '100%', description: 'FCA compliance achieved' },
      { metric: '4', description: 'Workstreams coordinated simultaneously' },
      { metric: '0', description: 'Major incidents post-launch' }
    ],
    technologies: ['Microservices', 'APIs', 'Jira', 'Confluence', 'Agile/Scrum'],
    testimonial: {
      quote: 'Mujeeb\'s leadership was instrumental in delivering this complex programme on time while navigating strict regulatory requirements.',
      author: 'Senior Stakeholder',
      role: 'Simply Business'
    }
  },
  {
    id: '2',
    title: 'Global Virtual Events Platform at Scale',
    client: '6Connex',
    industry: 'Events Technology',
    duration: '20 months',
    value: 'Multi-year contract',
    challenge: 'Deliver global virtual platform programmes simultaneously across Europe, US, MENA, and South East Asia, coordinating Agile teams across 6 time zones while improving platform stability.',
    approach: [
      'Implemented follow-the-sun delivery model across time zones',
      'Established standardised Agile ceremonies adapted for distributed teams',
      'Created centralised communication hub reducing coordination overhead',
      'Introduced proactive monitoring and incident response protocols',
      'Built cross-functional relationships to break down silos'
    ],
    outcomes: [
      { metric: '6', description: 'Time zones coordinated successfully' },
      { metric: '45%', description: 'Reduction in platform downtime' },
      { metric: '30+', description: 'Major events delivered without incident' },
      { metric: '4', description: 'Continents served simultaneously' }
    ],
    technologies: ['Agile', 'Distributed Teams', 'Virtual Events Platform', 'Monitoring Tools']
  },
  {
    id: '3',
    title: 'UN Sustainability Initiative - Energy Reduction Tool',
    client: 'GSMA',
    industry: 'Telecoms',
    duration: '15 months',
    value: 'UN 2030 Goal alignment',
    challenge: 'Create and roll out an Energy Consumption Benchmark Tool aligned with UN 2030 Sustainability Goals, engaging major telecom operators and regulators globally to adopt new sustainability standards.',
    approach: [
      'Collaborated with UN and regulatory bodies to define benchmarking standards',
      'Engaged C-level executives at major operators (Vodafone, Verizon, China Telecom)',
      'Managed tool development with clear sustainability impact metrics',
      'Created adoption playbook for global rollout',
      'Facilitated workshops with operators to demonstrate ROI'
    ],
    outcomes: [
      { metric: '35%', description: 'Energy reduction achieved by operators' },
      { metric: '12+', description: 'Major operators adopted tool' },
      { metric: '100%', description: 'UN 2030 goal alignment' },
      { metric: 'Global', description: 'Reach across continents' }
    ],
    technologies: ['Sustainability Analytics', 'Benchmarking Tools', 'Stakeholder Engagement', 'Change Management']
  }
];

export const detailedCertifications: DetailedCertification[] = [
  {
    id: '1',
    name: 'PRINCE2 Practitioner',
    issuer: 'AXELOS',
    dateObtained: '2015',
    description: 'Comprehensive project management methodology widely used for large-scale programmes in regulated industries.',
    skills: ['Project Governance', 'Risk Management', 'Quality Management', 'Change Control'],
    verificationUrl: '#'
  },
  {
    id: '2',
    name: 'Professional Scrum Master I & II',
    issuer: 'Scrum.org',
    dateObtained: '2018',
    description: 'Advanced certification in Agile Scrum methodology, demonstrating expertise in facilitating high-performing teams.',
    skills: ['Agile Facilitation', 'Sprint Planning', 'Team Coaching', 'Continuous Improvement'],
    verificationUrl: '#'
  },
  {
    id: '3',
    name: 'Six Sigma',
    issuer: 'Six Sigma Academy',
    dateObtained: '2016',
    description: 'Process improvement methodology focused on reducing defects and variation in processes.',
    skills: ['Process Optimization', 'Data Analysis', 'Quality Control', 'Lean Principles'],
    verificationUrl: '#'
  },
  {
    id: '4',
    name: 'Agile Methodology',
    issuer: 'Professional Development',
    dateObtained: '2017',
    description: 'Comprehensive understanding of Agile principles and practices for iterative project delivery.',
    skills: ['Agile Frameworks', 'Iterative Development', 'Adaptive Planning', 'Team Collaboration'],
    verificationUrl: '#'
  },
  {
    id: '5',
    name: 'Waterfall Methodology',
    issuer: 'Professional Development',
    dateObtained: '2014',
    description: 'Traditional project management approach with sequential phases and comprehensive planning.',
    skills: ['Sequential Planning', 'Documentation', 'Milestone Management', 'Stakeholder Communication'],
    verificationUrl: '#'
  }
];

export const education: Education[] = [
  {
    id: '1',
    degree: 'Master of Science (MSc)',
    institution: 'Newcastle University',
    location: 'Newcastle, UK',
    period: 'Completed',
    fieldOfStudy: 'Renewable Energy, Enterprise and Management',
    achievements: [
      'Focused on sustainable energy systems and business management',
      'Combined technical engineering knowledge with enterprise management'
    ]
  },
  {
    id: '2',
    degree: 'Bachelor of Engineering (BEng)',
    institution: 'Aston University',
    location: 'Birmingham, UK',
    period: 'Completed',
    fieldOfStudy: 'Chemical Engineering',
    achievements: [
      'Foundation in engineering principles and process management',
      'Developed analytical and problem-solving skills'
    ]
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Effective PMOs in Distributed Teams',
    excerpt: 'How to establish and scale Project Management Offices when your team is spread across multiple continents and time zones.',
    content: 'In today\'s global business environment, distributed teams are the norm rather than the exception. Having managed teams across 6 time zones, I\'ve learned that successful PMO implementation requires more than just following a playbook...',
    category: 'PMO Leadership',
    readTime: '5 min',
    publishDate: '2024-09',
    tags: ['PMO', 'Distributed Teams', 'Remote Work', 'Leadership']
  },
  {
    id: '2',
    title: 'Navigating FCA Regulations in Agile Delivery',
    excerpt: 'Balancing regulatory compliance with Agile flexibility in financial services projects.',
    content: 'The Financial Conduct Authority (FCA) has strict requirements for project delivery in insurance and fintech. Many believe Agile and compliance are at odds, but they can work together effectively...',
    category: 'Compliance',
    readTime: '6 min',
    publishDate: '2024-08',
    tags: ['Compliance', 'FCA', 'Agile', 'Financial Services']
  },
  {
    id: '3',
    title: 'AI-Powered Project Management: Practical Applications',
    excerpt: 'How I\'ve integrated AI tools to reduce reporting overhead and improve decision-making in large programmes.',
    content: 'Artificial Intelligence is transforming project management. At Novocycle, I introduced AI-powered time tracking that reduced reporting effort by 36%. Here\'s what worked...',
    category: 'Innovation',
    readTime: '7 min',
    publishDate: '2024-10',
    tags: ['AI', 'Automation', 'Efficiency', 'Innovation'],
    featured: true
  },
  {
    id: '4',
    title: 'The Follow-the-Sun Delivery Model',
    excerpt: 'Implementing 24/7 project delivery across global teams without burning out your people.',
    content: 'When managing programmes at 6Connex, we perfected the follow-the-sun model to deliver continuously across time zones. The key is not just scheduling, but culture...',
    category: 'Methodology',
    readTime: '5 min',
    publishDate: '2024-07',
    tags: ['Global Delivery', 'Time Zones', 'Agile', 'Team Management']
  }
];

export const sampleProjectMetrics: ProjectMetrics = {
  budgetUtilization: 94,
  schedulePerformance: 98,
  teamSatisfaction: 92,
  stakeholderSatisfaction: 96,
  riskScore: 15
};

export interface TimelineProject {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  industry: string;
  projectType: string;
  keyAchievements: string[];
  budget?: string;
  teamSize?: number;
  technologies?: string[];
}

export interface CareerMetric {
  id: string;
  value: number | string;
  label: string;
  description: string;
  icon: string;
  suffix?: string;
  prefix?: string;
}

export interface IndustryExperience {
  id: string;
  name: string;
  years: number;
  color: string;
  projects: {
    company: string;
    role: string;
    period: string;
    keyAchievement: string;
  }[];
}

export const timelineProjects: TimelineProject[] = [
  {
    id: '1',
    role: 'Head of Projects & PMO Lead',
    company: 'Novocycle Technology',
    location: 'Dubai, UAE',
    period: 'Apr 2024 - Present',
    startDate: '2024-04',
    endDate: null,
    current: true,
    industry: 'Engineering Tech',
    projectType: 'PMO Leadership',
    keyAchievements: [
      'Created new PMO department from scratch',
      'Managing EU-funded battery recycling research programmes',
      'Leading work packages across multiple departments'
    ],
    teamSize: 15,
    technologies: ['Jira', 'Confluence', 'Agile']
  },
  {
    id: '2',
    role: 'Senior Technical Project Manager',
    company: 'Caravan and Motorhome Club',
    location: 'London, UK',
    period: 'Oct 2022 - Nov 2023',
    startDate: '2022-10',
    endDate: '2023-11',
    current: false,
    industry: 'Insurance',
    projectType: 'Product Transformation',
    keyAchievements: [
      'Restructured mutual agreement product',
      'Enhanced insurance product increasing profit margin',
      'Reduced vendor selection time by 30%'
    ],
    technologies: ['Website Transformation', 'Underwriting Negotiation']
  },
  {
    id: '3',
    role: 'Programme Manager',
    company: 'Simply Business',
    location: 'London, UK',
    period: 'Aug 2022 - Mar 2023',
    startDate: '2022-08',
    endDate: '2023-03',
    current: false,
    industry: 'Insurance',
    projectType: 'FCA Compliance',
    budget: '£1.2M',
    teamSize: 34,
    keyAchievements: [
      'Led Global Hackathon - 10th Edition with 20 unique hacks',
      'Delivered premier commercial insurance product (£1.2M budget, 34 specialists)',
      'Managed FCA projects: Operation Resilience + Consumer Duty'
    ],
    technologies: ['Microservices', 'APIs', 'Agile', 'Jira']
  },
  {
    id: '4',
    role: 'Programme Manager & Digital Transformation Lead',
    company: 'Mercer',
    location: 'London, UK',
    period: 'Oct 2021 - Jun 2022',
    startDate: '2021-10',
    endDate: '2022-06',
    current: false,
    industry: 'Insurance',
    projectType: 'Digital Transformation',
    keyAchievements: [
      'Led global employee benefit platform rollouts',
      'Established digital transformation framework',
      'Delivered for Amazon, Estée Lauder, Marsh & McLennan'
    ],
    technologies: ['HR Systems', 'Data Analytics']
  },
  {
    id: '5',
    role: 'Senior International Project Manager',
    company: '6Connex',
    location: 'Remote/Nevada, US',
    period: 'Jul 2020 - Mar 2022',
    startDate: '2020-07',
    endDate: '2022-03',
    current: false,
    industry: 'Events Tech',
    projectType: 'Global Delivery',
    keyAchievements: [
      'Orchestrated virtual event transformation during COVID-19',
      'Delivered events across 6 time zones simultaneously',
      'Established change management framework with robust governance'
    ],
    technologies: ['Virtual Event Platform', 'Agile', 'Global Coordination']
  },
  {
    id: '6',
    role: 'Project Delivery Manager',
    company: 'Best Future Education Centre',
    location: 'Nigeria',
    period: 'Mar 2020 - Dec 2020',
    startDate: '2020-03',
    endDate: '2020-12',
    current: false,
    industry: 'Education',
    projectType: 'Digital Transformation',
    keyAchievements: [
      'Led COVID-19 strategic response',
      'Implemented software, training, and data migration',
      'Ensured uninterrupted education during lockdown'
    ]
  },
  {
    id: '7',
    role: 'Project Manager',
    company: 'GSMA',
    location: 'London, UK',
    period: 'Jan 2019 - Mar 2020',
    startDate: '2019-01',
    endDate: '2020-03',
    current: false,
    industry: 'Telecoms',
    projectType: 'Sustainability',
    keyAchievements: [
      'Delivered Energy Consumption Benchmark Tool',
      'Achieved 35% energy reduction for major operators',
      'Worked with Vodafone, Verizon, China Telecom'
    ],
    technologies: ['Sustainability Analytics', 'UN SDG Alignment']
  },
  {
    id: '8',
    role: 'Cryptocurrency & Blockchain Journalist',
    company: 'Finimize',
    location: 'London, UK',
    period: 'Jun 2018 - Jan 2020',
    startDate: '2018-06',
    endDate: '2020-01',
    current: false,
    industry: 'Blockchain',
    projectType: 'Content Creation',
    keyAchievements: [
      'Created insightful crypto and blockchain content',
      'Contributed to company growth and reputation',
      'Established voice in blockchain industry'
    ]
  },
  {
    id: '9',
    role: 'Implementation Manager',
    company: 'Jardine Lloyd Thompson',
    location: 'London, UK',
    period: 'Jan 2017 - Jan 2019',
    startDate: '2017-01',
    endDate: '2019-01',
    current: false,
    industry: 'Insurance',
    projectType: 'SaaS Implementation',
    keyAchievements: [
      'Regional employee benefits platform for Hitachi and TfL',
      'Optimised renewal process improving efficiency by 34%',
      'Identified cost-saving opportunities reducing project time'
    ],
    technologies: ['SaaS Platform', 'Employee Benefits Software']
  },
  {
    id: '10',
    role: 'Senior Implementation Consultant',
    company: 'Dictate.IT',
    location: 'London, UK',
    period: 'Sep 2014 - May 2016',
    startDate: '2014-09',
    endDate: '2016-05',
    current: false,
    industry: 'Healthcare',
    projectType: 'Software Implementation',
    keyAchievements: [
      'Deployed medical transcription software using SDN technology',
      'Collaborated with C-suite stakeholders and medical professionals',
      'Delivered projects at St George, Royal Free, Nuffield Health'
    ],
    technologies: ['SDN Technology', 'Medical Software']
  },
  {
    id: '11',
    role: 'Technical Project Manager',
    company: 'BSS Industrial',
    location: 'London, UK',
    period: 'Nov 2013 - Aug 2014',
    startDate: '2013-11',
    endDate: '2014-08',
    current: false,
    industry: 'Engineering',
    projectType: 'Construction Management',
    keyAchievements: [
      'Managed engineering and construction projects',
      'Coordinated technical teams and stakeholders'
    ]
  },
  {
    id: '12',
    role: 'Project Engineer',
    company: 'Alfa Laval',
    location: 'London, UK',
    period: 'Sep 2008 - Nov 2013',
    startDate: '2008-09',
    endDate: '2013-11',
    current: false,
    industry: 'Engineering',
    projectType: 'Engineering Projects',
    keyAchievements: [
      'Delivered engineering and construction projects',
      'Started professional project management career'
    ]
  }
];

export const careerMetrics: CareerMetric[] = [
  {
    id: '1',
    value: 17,
    label: 'Years Experience',
    description: 'Managing complex projects internationally',
    icon: 'Calendar',
    suffix: '+'
  },
  {
    id: '2',
    value: 7,
    label: 'Industries',
    description: 'Insurance, Engineering, Healthcare, Events, Telecoms, Education, Blockchain',
    icon: 'Briefcase',
    suffix: '+'
  },
  {
    id: '3',
    value: 95,
    label: 'On-Time Delivery',
    description: 'Consistent track record across all projects',
    icon: 'Target',
    suffix: '%'
  },
  {
    id: '4',
    value: 30,
    label: 'Efficiency Gains',
    description: 'Average improvement across programmes',
    icon: 'TrendingUp',
    suffix: '%',
    prefix: '+'
  },
  {
    id: '5',
    value: '£1.2M',
    label: 'Largest Programme',
    description: 'Single project budget managed',
    icon: 'DollarSign'
  },
  {
    id: '6',
    value: 34,
    label: 'Team Members',
    description: 'Led on single project',
    icon: 'Users',
    suffix: '+'
  }
];

export const industryExperience: IndustryExperience[] = [
  {
    id: '1',
    name: 'Insurance Tech',
    years: 6,
    color: 'hsl(190, 85%, 55%)',
    projects: [
      {
        company: 'Simply Business',
        role: 'Programme Manager',
        period: '2022-2023',
        keyAchievement: '£1.2M FCA-regulated product delivery'
      },
      {
        company: 'Caravan & Motorhome Club',
        role: 'Senior Technical PM',
        period: '2022-2023',
        keyAchievement: 'Product restructure improving profit margin'
      },
      {
        company: 'Mercer',
        role: 'Programme Manager',
        period: '2021-2022',
        keyAchievement: 'Global benefit platform for Amazon, Estée Lauder'
      },
      {
        company: 'JLT',
        role: 'Implementation Manager',
        period: '2017-2019',
        keyAchievement: '34% efficiency improvement in renewal process'
      }
    ]
  },
  {
    id: '2',
    name: 'Blockchain/Web3',
    years: 8,
    color: 'hsl(270, 70%, 60%)',
    projects: [
      {
        company: 'Finimize',
        role: 'Crypto Journalist',
        period: '2018-2020',
        keyAchievement: 'Established voice in blockchain industry'
      }
    ]
  },
  {
    id: '3',
    name: 'Engineering Tech',
    years: 5,
    color: 'hsl(220, 90%, 60%)',
    projects: [
      {
        company: 'Novocycle Technology',
        role: 'Head of Projects & PMO',
        period: '2024-Present',
        keyAchievement: 'Created PMO department from scratch'
      },
      {
        company: 'BSS Industrial',
        role: 'Technical PM',
        period: '2013-2014',
        keyAchievement: 'Engineering and construction delivery'
      },
      {
        company: 'Alfa Laval',
        role: 'Project Engineer',
        period: '2008-2013',
        keyAchievement: 'Started PM career journey'
      }
    ]
  },
  {
    id: '4',
    name: 'Healthcare Tech',
    years: 2,
    color: 'hsl(140, 70%, 55%)',
    projects: [
      {
        company: 'Dictate.IT',
        role: 'Senior Implementation Consultant',
        period: '2014-2016',
        keyAchievement: 'Medical transcription software deployment using SDN'
      }
    ]
  },
  {
    id: '5',
    name: 'Events Management Tech',
    years: 2,
    color: 'hsl(310, 75%, 60%)',
    projects: [
      {
        company: '6Connex',
        role: 'Senior International PM',
        period: '2020-2022',
        keyAchievement: 'Global events across 6 time zones'
      }
    ]
  },
  {
    id: '6',
    name: 'Telecommunications',
    years: 2,
    color: 'hsl(40, 85%, 55%)',
    projects: [
      {
        company: 'GSMA',
        role: 'Project Manager',
        period: '2019-2020',
        keyAchievement: '35% energy reduction for major operators'
      }
    ]
  },
  {
    id: '7',
    name: 'Education Tech',
    years: 1,
    color: 'hsl(200, 80%, 60%)',
    projects: [
      {
        company: 'Best Future Education Centre',
        role: 'Project Delivery Manager',
        period: '2020',
        keyAchievement: 'Digital transformation during COVID-19'
      }
    ]
  }
];
