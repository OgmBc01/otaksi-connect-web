import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Company knowledge base for Otaksi Connect
const COMPANY_KNOWLEDGE = {
  name: "Otaksi Connect",
  fullName: "Otaksi Connect FZ-LLC",
  founded: "2026",
  location: "Dubai, United Arab Emirates",
  description: "Premium software engineering consultancy delivering intelligent digital systems for enterprises across the UAE and Middle East.",
  
  services: [
    {
      name: "Software Engineering",
      description: "Custom web and mobile applications, enterprise software, API development, microservices architecture, branding, outsourcing"
    },
    {
      name: "AI & Automation",
      description: "Machine learning solutions, intelligent process automation, predictive analytics, computer vision, NLP"
    },
    {
      name: "Cloud Platforms",
      description: "AWS, Azure, Google Cloud, cloud migration, cloud-native development, serverless architecture"
    },
    {
      name: "DevOps & SRE",
      description: "CI/CD pipelines, infrastructure as code, monitoring, site reliability engineering, container orchestration"
    },
    {
      name: "Enterprise Systems",
      description: "ERP implementation, CRM solutions, business intelligence, data warehousing, legacy modernization"
    },
    {
      name: "Digital Transformation",
      description: "End-to-end digital strategy, process optimization, innovation consulting, technology roadmap"
    }
  ],
  
  industries: [
    { name: "Real Estate", description: "PropTech, property management, smart buildings" },
    { name: "FinTech", description: "Digital payments, banking platforms, blockchain" },
    { name: "Healthcare", description: "Telemedicine, EHR, patient portals" },
    { name: "Logistics", description: "Supply chain optimization, fleet management" },
    { name: "E-commerce", description: "Online marketplaces, payment gateways" },
    { name: "Government", description: "Digital citizen services, smart cities" }
  ],
  
  process: [
    "Discovery & Requirements Analysis",
    "Architecture & Design",
    "Agile Development",
    "Testing & Quality Assurance",
    "Deployment & Integration",
    "Maintenance & Support"
  ],
  
  contact: {
    email: "info@otaksiconnect.com",
    phone: "+971 58 255 1785",
    address: "Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates."
  },
  
  socialLinks: {
    linkedin: "https://linkedin.com/company/otaksi-connect",
    twitter: "https://twitter.com/otaksiconnect",
    github: "https://github.com/otaksi-connect"
  }
};

function generateSystemPrompt(): string {
  return `You are a helpful AI assistant for ${COMPANY_KNOWLEDGE.name}, a Dubai-based software engineering consultancy.

## ABOUT THE COMPANY:
${COMPANY_KNOWLEDGE.description}
Founded in ${COMPANY_KNOWLEDGE.founded}, located in ${COMPANY_KNOWLEDGE.location}.

## CORE SERVICES:
${COMPANY_KNOWLEDGE.services.map(s => `• ${s.name}: ${s.description}`).join('\n')}

## INDUSTRIES WE SERVE:
${COMPANY_KNOWLEDGE.industries.map(i => `• ${i.name}: ${i.description}`).join('\n')}

## OUR PROCESS:
${COMPANY_KNOWLEDGE.process.map((p, i) => `${i+1}. ${p}`).join('\n')}

## CONTACT INFORMATION:
Email: ${COMPANY_KNOWLEDGE.contact.email}
Phone: ${COMPANY_KNOWLEDGE.contact.phone}
Address: ${COMPANY_KNOWLEDGE.contact.address}

## RESPONSE GUIDELINES:
1. Be friendly, professional, and helpful
2. Keep responses concise (2-3 sentences for simple questions, bullet points for lists)
3. Use proper spacing and punctuation
4. Encourage visitors to contact the team for detailed quotes or consultations
5. If you don't know something, offer to connect them with a human
6. Never make up pricing - always direct them to contact the sales team

Remember: You're representing ${COMPANY_KNOWLEDGE.name}. Be professional but approachable.`;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history, sessionId } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get or create session ID
    const currentSessionId = sessionId || crypto.randomUUID();

    // Build conversation history for the AI
    const messages = [
      { role: "system", content: generateSystemPrompt() },
      ...(history || []),
      { role: "user", content: message }
    ];

    // Call Groq API (you'll need to sign up for free API key at https://console.groq.com)
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    
    if (!GROQ_API_KEY) {
      console.error('GROQ_API_KEY not configured');
      return NextResponse.json({ 
        reply: "I'm having trouble connecting to my brain right now. Please try again later or contact us directly at info@otaksiconnect.com",
        sessionId: currentSessionId
      });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: messages,
        max_tokens: 600,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', errorText);
      throw new Error(`Groq API responded with status ${response.status}`);
    }

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that. Please try again.";

    // Store conversation in Supabase
    const supabase = await createClient();
    await supabase.from('conversations').insert({
      session_id: currentSessionId,
      user_message: message,
      bot_response: aiReply
    });

    return NextResponse.json({ 
      reply: aiReply,
      sessionId: currentSessionId
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ 
      reply: "I apologize, but I'm experiencing technical difficulties. Please contact us directly at info@otaksiconnect.com for immediate assistance.",
      error: true
    }, { status: 500 });
  }
}
