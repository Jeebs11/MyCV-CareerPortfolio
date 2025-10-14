import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { blogPostsTable } from '../shared/schema';

const blogPostsData = [
  {
    title: 'Building Effective PMOs in Distributed Teams',
    excerpt: 'How to establish and scale Project Management Offices when your team is spread across multiple continents and time zones.',
    content: 'In today\'s global business environment, distributed teams are the norm rather than the exception. Having managed teams across 6 time zones, I\'ve learned that successful PMO implementation requires more than just following a playbook...',
    category: 'PMO Leadership',
    readTime: '5 min',
    publishDate: '2024-09',
    tags: JSON.stringify(['PMO', 'Distributed Teams', 'Remote Work', 'Leadership']),
    featured: false,
  },
  {
    title: 'Navigating FCA Regulations in Agile Delivery',
    excerpt: 'Balancing regulatory compliance with Agile flexibility in financial services projects.',
    content: 'The Financial Conduct Authority (FCA) has strict requirements for project delivery in insurance and fintech. Many believe Agile and compliance are at odds, but they can work together effectively...',
    category: 'Compliance',
    readTime: '6 min',
    publishDate: '2024-08',
    tags: JSON.stringify(['Compliance', 'FCA', 'Agile', 'Financial Services']),
    featured: false,
  },
  {
    title: 'AI-Powered Project Management: Practical Applications',
    excerpt: 'How I\'ve integrated AI tools to reduce reporting overhead and improve decision-making in large programmes.',
    content: 'Artificial Intelligence is transforming project management. At Novocycle, I introduced AI-powered time tracking that reduced reporting effort by 36%. Here\'s what worked...',
    category: 'Innovation',
    readTime: '7 min',
    publishDate: '2024-10',
    tags: JSON.stringify(['AI', 'Automation', 'Efficiency', 'Innovation']),
    featured: true,
  },
  {
    title: 'The Follow-the-Sun Delivery Model',
    excerpt: 'Implementing 24/7 project delivery across global teams without burning out your people.',
    content: 'When managing programmes at 6Connex, we perfected the follow-the-sun model to deliver continuously across time zones. The key is not just scheduling, but culture...',
    category: 'Methodology',
    readTime: '5 min',
    publishDate: '2024-07',
    tags: JSON.stringify(['Global Delivery', 'Time Zones', 'Agile', 'Team Management']),
    featured: false,
  }
];

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  console.log('🌱 Seeding blog posts...');

  try {
    // Insert blog posts
    for (const post of blogPostsData) {
      await db.insert(blogPostsTable).values(post);
      console.log(`✅ Inserted: ${post.title}`);
    }

    console.log('✨ Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

seed();
