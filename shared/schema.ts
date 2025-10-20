import { pgTable, serial, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// ============ DATABASE SCHEMA ============

export const blogPostsTable = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  readTime: varchar('read_time', { length: 50 }).notNull(),
  publishDate: varchar('publish_date', { length: 50 }).notNull(),
  tags: text('tags').notNull(), // JSON array stored as string
  featured: boolean('featured').default(false),
  heroImage: varchar('hero_image', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Zod schemas for validation
export const insertBlogPostSchema = createInsertSchema(blogPostsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateBlogPostSchema = insertBlogPostSchema.partial();

// TypeScript types
export type BlogPostRow = typeof blogPostsTable.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type UpdateBlogPost = z.infer<typeof updateBlogPostSchema>;

// CV Contacts Table
export const cvContactsTable = pgTable('cv_contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  email: varchar('email', { length: 300 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  downloadedAt: timestamp('downloaded_at').defaultNow().notNull(),
});

export const insertCVContactSchema = createInsertSchema(cvContactsTable).omit({
  id: true,
  downloadedAt: true,
});

export type CVContactRow = typeof cvContactsTable.$inferSelect;
export type InsertCVContact = z.infer<typeof insertCVContactSchema>;

// CV File Table
export const cvFileTable = pgTable('cv_file', {
  id: serial('id').primaryKey(),
  filename: varchar('filename', { length: 300 }).notNull(),
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
});

export const insertCVFileSchema = createInsertSchema(cvFileTable).omit({
  id: true,
  uploadedAt: true,
});

export type CVFileRow = typeof cvFileTable.$inferSelect;
export type InsertCVFile = z.infer<typeof insertCVFileSchema>;

// ============ INTERFACES ============

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
  employmentType: 'Permanent' | 'Contract';
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
    employmentType: 'Permanent',
    achievements: [
      'Built the PMO function from the ground up, bringing structure to multi-million Euro EU-funded battery recycling research programmes',
      'Managing cross-border delivery teams spanning Europe and the Middle East, keeping technical and non-technical workstreams aligned',
      'Cut reporting overhead by 36% through smart use of Jira and Confluence, giving stakeholders better visibility with less effort'
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
    employmentType: 'Contract',
    achievements: [
      'Transformed a core mutual agreement insurance product, directly boosting profit margins',
      'Led workshops with stakeholders to map workflows and spot inefficiencies, then fixed them',
      'Built a vendor selection framework and negotiated with insurance underwriters to get better terms'
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
    employmentType: 'Contract',
    achievements: [
      'Shipped a £1.2M commercial insurance product built on microservices and APIs, with a team of 34 specialists',
      'Ran the company\'s 10-year anniversary Global Hackathon, then coached the winning team to secure sponsorship and build their MVP',
      'Delivered two major FCA compliance programmes (Operation Resilience and Consumer Duty) across multiple workstreams',
      'Set up sprint cycles and live dashboards that gave everyone clear visibility on where we were'
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
    employmentType: 'Contract',
    achievements: [
      'Led global employee benefits platform rollouts for Fortune 500 clients including Amazon, Estée Lauder, and Marsh & McLennan',
      'Created process maps and onboarding playbooks that made complex regional rollouts smoother',
      'Kept multiple project plans, budgets, and risk logs on track to hit regulatory deadlines'
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
    employmentType: 'Permanent',
    achievements: [
      'Ran virtual event programmes simultaneously across 6 time zones (Europe, US, MENA, South East Asia) during the pandemic pivot',
      'Coordinated Agile engineering teams around the clock to keep major events like university graduations and international exhibitions running',
      'Improved platform stability, cutting downtime during peak events when thousands of users were online'
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
    employmentType: 'Contract',
    achievements: [
      'Built and launched the Energy Consumption Benchmark Tool in partnership with the UN\'s 2030 Sustainability Goals',
      'Helped major operators (Vodafone, Verizon, China Telecom) cut their energy consumption by up to 35%',
      'Worked directly with regulators and C-level executives to drive adoption of new sustainability standards globally'
    ]
  },
  {
    id: '7',
    role: 'Project Delivery Manager',
    company: 'Best Future Education Centre',
    location: 'Nigeria',
    period: 'Mar 2020 - Dec 2020',
    current: false,
    region: 'mena',
    industry: 'Education',
    employmentType: 'Contract',
    achievements: [
      'Led the digital pivot when COVID hit, getting data systems and remote learning platforms live fast',
      'Trained staff and students on new tools so classes could continue without interruption',
      'Kept education running through the entire lockdown period'
    ]
  },
  {
    id: '8',
    role: 'Senior Implementation Consultant',
    company: 'Dictate.IT',
    location: 'London, UK',
    period: 'Sep 2014 - May 2016',
    current: false,
    region: 'uk',
    industry: 'Healthcare',
    employmentType: 'Permanent',
    achievements: [
      'Deployed digital dictation systems across NHS Trusts including St George\'s, Royal Free, and Nuffield Health',
      'Cut turnaround times and costs by digitizing clinical documentation workflows',
      'Trained medical teams on new systems and managed the change process to ensure adoption'
    ]
  },
  {
    id: '9',
    role: 'Technical Project Manager',
    company: 'BSS Industrial',
    location: 'London, UK',
    period: 'Nov 2013 - Aug 2014',
    current: false,
    region: 'uk',
    industry: 'Engineering/Construction',
    employmentType: 'Permanent',
    achievements: [
      'Delivered high-profile construction projects including The Hilton Brighton and Offplan developments',
      'Managed fit-out, procurement, and engineering across multiple commercial and hospitality sites',
      'Oversaw quality control and risk management for sustainable technical solutions'
    ]
  },
  {
    id: '10',
    role: 'Project Support Engineer',
    company: 'Alfa Laval',
    location: 'London, UK',
    period: 'Sep 2008 - Nov 2013',
    current: false,
    region: 'uk',
    industry: 'Engineering',
    employmentType: 'Permanent',
    achievements: [
      'Engineered heat transfer solutions for The Shard, London 2012 Olympic Aquatic Centre, and 20 Fenchurch Street',
      'Improved operational efficiency for landmark UK infrastructure through technical consulting',
      'Delivered training and support across major construction and engineering projects'
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
    metric: '£50M+',
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

// Blog posts are now stored in the database and managed via the admin panel
// Visit /admin to create, edit, and manage blog articles

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
  description?: string;
  keyAchievements: string[];
  budget?: string;
  teamSize?: number;
  technologies?: string[];
  employmentType: 'Permanent' | 'Contract';
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
    employmentType: 'Permanent',
    description: "Oversaw project delivery and governance across EU-funded engineering programmes, building the company's PMO function from scratch. The role blended strategic oversight and hands-on delivery, aligning international teams and embedding scalable systems across R&D and operations.",
    keyAchievements: [
      'Built the company\'s PMO from the ground up',
      'Standardising governance and delivery process for both internal and external projects',
      'Introduced department/business progress reporting using PowerBI and Excel',
      'Enhanced transparency, consistency, and accountability across the different business units'
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
    employmentType: 'Contract',
    description: 'Led the technical modernisation of insurance products and mutual agreement products, managing ERP and vendor integrations. Focused on improving operational visibility, process efficiency, and alignment between IT and business units.',
    keyAchievements: [
      'Redesigned a core insurance product, improving profitability',
      'Re-engineered processes to eliminate inefficiencies and accelerate underwriting cycles',
      'Introduced workshops to gather requirements and identify inefficiencies resulting in increased process efficiency',
      'Introduced a vendor governance model, aligning IT and business priorities'
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
    employmentType: 'Contract',
    description: 'Directed large-scale digital transformation projects in a regulated insurance environment. Drove the rollout of FCA-compliant platforms and introduced delivery frameworks that improved efficiency and governance across multiple workstreams.',
    keyAchievements: [
      'Delivered a £1.2m insurance product using microservices to enhance speed and scalability',
      'Managed FCA-regulated programme with multi-workstream Agile delivery (Operation Resilience + Consumer Duty)',
      'Managed the delivery of the 10-year anniversary Hackathon and coached the winning hack to also win sponsorship to build the MVP'
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
    employmentType: 'Contract',
    description: 'Managed multinational transformation projects for global clients in HR and ERP modernisation. Oversaw regional delivery teams and budgets across EMEA, APAC, and the Americas, ensuring complex solutions met compliance and scalability requirements.',
    keyAchievements: [
      'Developed BA deliverables such as process maps and onboarding playbooks, ensuring clear requirements and smoother adoption across regions',
      'Introduced project governance which improved project onboarding and delivery',
      'Developed a programme reporting dashboard to provide a more accurate overview of the projects within the programme'
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
    employmentType: 'Permanent',
    description: 'Delivered enterprise SaaS implementations during the global shift to virtual engagement. Streamlined implementation frameworks to improve delivery speed, reliability, and user experience for high-profile corporate clients.',
    keyAchievements: [
      'Unified delivery across distributed Agile teams in six time zones',
      'Strengthened client delivery performance for high-profile enterprise events',
      'Turned around a failing project using effective stakeholder management'
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
    employmentType: 'Contract',
    description: 'Led the digital transition of a traditional school during the pandemic, introducing virtual learning platforms and staff training programmes. Focused on operational continuity, accessibility, and stakeholder adoption.',
    keyAchievements: [
      'Led full digital transition during COVID-19, implementing e-learning platforms and data systems',
      'Ensured operational continuity through scalable technology, staff upskilling and effective training'
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
    employmentType: 'Contract',
    description: 'Partnered with leading telecom operators to define sustainability standards and develop industry energy benchmarking frameworks. Played a key role in advancing the sector\'s global approach to efficiency and environmental impact as well as future technology adoption.',
    keyAchievements: [
      'Led delivery of the Energy Consumption Benchmark Tool supporting UN 2030 Sustainability Goals',
      'Partnered with operators like Vodafone and Verizon to achieve up to 35% energy reduction',
      'Faciliated the unboard of 8 new telecom technologies with mobile operators'
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
    employmentType: 'Contract',
    description: 'Produced financial journalism and analysis covering cryptocurrency markets and blockchain technology. Contributed to audience growth and brand positioning during a period of rapid industry evolution.',
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
    employmentType: 'Permanent',
    description: 'Delivered SaaS-based employee benefits transformation projects for enterprise clients including Hitachi and Transport for London. Improved project efficiency by 34% through workflow optimisation and close coordination between IT, operations, and client stakeholders.',
    keyAchievements: [
      'Improved project efficiency by 34% by automating a number of key repetitive tasks in the processes',
      'Streamlined workflows and governance to accelerate delivery and adoption'
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
    employmentType: 'Permanent',
    description: 'Managed SaaS deployments across NHS Trusts, improving efficiency in clinical documentation and reporting workflows. Oversaw the full implementation cycle, from requirements to onboarding, ensuring seamless adoption in high-compliance environments.',
    keyAchievements: [
      'Revived a failing project with strong stakeholder management',
      'Developed a standard change management process to ensure adoption across clinical teams',
      'Standerdised training process and training material resulting in a smoother unboarding and reduced post implementation issues by 65%'
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
    employmentType: 'Permanent',
    description: 'Delivered sustainable construction and fit-out projects, coordinating design, engineering, and on-site teams. Ensured projects met technical, safety, and compliance standards within tight operational deadlines.',
    keyAchievements: [
      'Strengthened coordination between design, engineering, and commercial functions'
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
    employmentType: 'Permanent',
    description: 'Supported delivery of high-profile energy-efficient engineering projects (heat transfer solutions), for high profile construction sites like The Shard and the 2012 Olympic Aquatic Centre. Contributed to design, testing, and installation phases to ensure optimal performance and compliance.',
    keyAchievements: [
      'Supported design and installation of energy-efficient systems for The Shard and the 2012 Olympic Aquatic Centre',
      'Achieved the highest sold heat transfer solution for a high end client as a student on career placaement'
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
