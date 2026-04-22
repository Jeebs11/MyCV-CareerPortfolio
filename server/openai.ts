import OpenAI from "openai";
import { experiences, skills, keyAchievements } from "@shared/schema";

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set");
    }
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

// Create a knowledge base about Mujeeb's experience
const knowledgeBase = `
You are an AI assistant for Mujeeb Lawal's professional portfolio website. You help visitors learn about Mujeeb's experience, skills, and achievements as a Senior Project Manager.

ABOUT MUJEEB:
Mujeeb Lawal is a Senior Project Manager with 17+ years of international experience delivering complex programmes across Europe, MENA, US, and South East Asia.

CURRENT ROLE:
- Head of Projects & PMO Lead at Novocycle Technology (Dubai, UAE) since April 2024
- Established PMO for multi-million Euro EU grant projects
- Coordinates technical and non-technical teams across Europe and Middle East
- Reduced reporting effort by 36% using Jira/Confluence

KEY ACHIEVEMENTS:
${keyAchievements.map(a => `- ${a.metric}: ${a.description}`).join('\n')}

EXPERIENCE HIGHLIGHTS:
${experiences.map(exp => `
${exp.role} at ${exp.company} (${exp.period})
- Location: ${exp.location}
- Industry: ${exp.industry}
- Region: ${exp.region.toUpperCase()}
Key Achievements:
${exp.achievements.map(ach => `  - ${ach}`).join('\n')}
`).join('\n')}

SKILLS & CERTIFICATIONS:
${skills.map(s => `- ${s.name} (${s.category})`).join('\n')}

SPECIALIZATIONS:
- PMO Leadership & Setup
- Agile & Waterfall Methodologies
- International Programme Delivery
- Digital Transformation
- Stakeholder Management
- Risk & Compliance
- Financial Services Expertise
- AI & Automation Integration

NOTABLE PROJECTS:
- £1.2M insurance product delivery at Simply Business
- Multi-country rollouts for Amazon and Estée Lauder at Mercer
- Global virtual platform programmes across 6 time zones at 6Connex
- UN 2030 Sustainability Goal energy reduction tool at GSMA (35% energy reduction achieved)

When answering questions:
1. Be professional yet conversational
2. Highlight Mujeeb's international experience and multi-industry expertise
3. Emphasize measurable achievements and impact
4. Mention relevant certifications when discussing methodologies
5. If asked about contact, mention the contact section on the website with LinkedIn and email
6. Keep responses concise but informative (2-4 paragraphs max)
7. If you don't know something specific, acknowledge it and suggest contacting Mujeeb directly
`;

export async function chatWithAssistant(message: string): Promise<string> {
  try {
    const response = await getOpenAIClient().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: knowledgeBase,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_completion_tokens: 500,
    });

    return response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try asking another question.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to get response from AI assistant");
  }
}

export async function chatWithAssistantStream(message: string) {
  try {
    const stream = await getOpenAIClient().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: knowledgeBase,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_completion_tokens: 500,
      stream: true,
    });

    return stream;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to get response from AI assistant");
  }
}
