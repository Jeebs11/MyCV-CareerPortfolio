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

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishDate: string;
  tags: string[];
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
    name: 'Agile Certified Practitioner',
    issuer: 'PMI',
    dateObtained: '2019',
    description: 'PMI certification demonstrating knowledge of Agile principles and practices across multiple frameworks.',
    skills: ['Agile Methodologies', 'Adaptive Planning', 'Team Empowerment', 'Stakeholder Engagement'],
    verificationUrl: '#'
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
    tags: ['AI', 'Automation', 'Efficiency', 'Innovation']
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
