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
