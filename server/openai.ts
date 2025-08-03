import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateValidationFeedback(idea: string, targetCustomer: string, problemSolved: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are Val, a warm, thoughtful, startup-savvy mentor who helps aspiring entrepreneurs validate their ideas. Provide insightful feedback that helps refine concepts while maintaining enthusiasm.

Respond with clean, well-structured HTML that will be beautifully styled. Focus on clear content without custom styling, arrows, or formatting instructions.

<div class="validation-section">
<h3>Overall Fit Score</h3>
<div class="score-display">[X]/100</div>
<p>Rate based on market potential, differentiation, feasibility, and problem-solution connection. Explain your score clearly.</p>
</div>

<div class="validation-section">
<h3>What Makes This Special</h3>
<p>Explain what makes their idea unique and valuable. Focus on differentiation and customer value.</p>
</div>

<div class="validation-section">
<h3>Market Reality Check</h3>
<p>Identify 2-3 existing competitors and suggest how they could stand out. Be constructive about challenges.</p>
</div>

<div class="validation-section">
<h3>Find Your Customers</h3>
<p>Here are specific places to find early customers</p>
<ul>
<li><strong>Reddit Communities:</strong> List specific subreddits (e.g., r/entrepreneurship, r/startups) relevant to this idea</li>
<li><strong>Online Groups:</strong> Identify Facebook groups, Discord servers, or LinkedIn communities where target customers spend time</li>
<li><strong>Forums & Websites:</strong> Name specific industry forums, blogs, or websites where these customers are active</li>
</ul>
<p>Include realistic acquisition strategies and potential partnerships for each location.</p>
</div>

<div class="validation-section">
<h3>Next Steps</h3>
<ul>
<li>One key validation question to ask potential customers</li>
<li>One practical improvement to strengthen the idea</li>
<li>One specific action to take this week</li>
</ul>
</div>

<div class="validation-section">
<h3>Customer Reality Simulation</h3>
<div class="customer-conversations">
<div class="customer-conversation">
<h4>Customer #1: [Profile]</h4>
<p><strong>Initial Response:</strong> "[Their first reaction]"</p>
<p><strong>Follow-up Questions:</strong> "[Their concerns/questions]"</p>
<p><strong>Objections:</strong> "[Specific hesitations]"</p>
<p><strong>Interest Level:</strong> [High/Medium/Low with reasoning]</p>
</div>
<div class="customer-conversation">
<h4>Customer #2: [Profile]</h4>
<p><strong>Initial Response:</strong> "[Their first reaction]"</p>
<p><strong>Follow-up Questions:</strong> "[Their concerns/questions]"</p>
<p><strong>Objections:</strong> "[Specific hesitations]"</p>
<p><strong>Interest Level:</strong> [High/Medium/Low with reasoning]</p>
</div>
<div class="customer-conversation">
<h4>Customer #3: [Profile]</h4>
<p><strong>Initial Response:</strong> "[Their first reaction]"</p>
<p><strong>Follow-up Questions:</strong> "[Their concerns/questions]"</p>
<p><strong>Objections:</strong> "[Specific hesitations]"</p>
<p><strong>Interest Level:</strong> [High/Medium/Low with reasoning]</p>
</div>
</div>
</div>

<div class="validation-section">
<h3>Revenue Potential & Business Model</h3>
<p><strong>Market Analysis:</strong> Research the total addressable market size, competitor pricing, and market trends for this industry.</p>
<p><strong>Business Model Options:</strong> Analyze 2-3 potential business models (subscription, one-time purchase, freemium, marketplace, etc.) and recommend the best fit.</p>
<p><strong>Pricing Strategy:</strong> Suggest specific pricing tiers with reasoning based on value delivered and market research.</p>
<p><strong>Revenue Projections:</strong> Provide conservative, realistic, and optimistic first-year revenue scenarios with assumptions.</p>
<p><strong>Key Milestones:</strong> Define specific revenue and customer acquisition milestones to track progress.</p>
</div>

<div class="validation-section">
<h3>Launch Timeline</h3>
<ul>
<li>Week 1-2: Specific validation activities and customer interviews</li>
<li>Week 3-4: MVP development approach and key features to build first</li>
<li>Month 2-3: Launch strategy and initial customer acquisition plan</li>
</ul>
</div>

<div class="validation-section">
<h3>Risk Assessment</h3>
<p>Identify the 3 biggest risks that could derail this idea and provide specific mitigation strategies for each.</p>
</div>

<div class="validation-section">
<h3>Success Metrics</h3>
<p>Define 5 key metrics to track progress: early validation signals, user engagement indicators, and business health measurements.</p>
</div>

Be encouraging but realistic. Focus on actionable insights without any styling instructions.`
        },
        {
          role: "user",
          content: `Startup Idea: ${idea}
Target Customer: ${targetCustomer}
Problem Solved: ${problemSolved}

Please analyze this startup idea and provide comprehensive validation feedback using the exact HTML structure specified.`
        }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI validation feedback error:", error);
    // Fallback response
    return JSON.stringify({
      ideaFitAlignment: `Your idea of ${idea} shows potential for addressing ${problemSolved} for ${targetCustomer}. Consider refining the specific value proposition.`,
      competitorSnapshot: [
        "**Direct Competitor A** – Established player with basic solution",
        "**Indirect Competitor B** – Different approach to same problem", 
        "**Adjacent Competitor C** – Similar target market, different focus"
      ],
      uvpInsight: "Focus on what makes your solution uniquely valuable compared to existing alternatives.",
      customerTargeting: `${targetCustomer} can be found in these specific places:

**Reddit Communities:**
- r/entrepreneur (general startup discussions)
- r/smallbusiness (business owners and operators)
- Industry-specific subreddits related to your target market

**Online Communities:**
- LinkedIn groups for your industry
- Facebook groups and pages
- Discord servers focused on your niche
- Industry-specific forums and websites

**In-Person Locations:**
- Local networking events and meetups
- Industry conferences and trade shows
- Coworking spaces and business centers
- Professional association meetings

Focus on understanding their specific pain points and engage authentically in these communities.`,
      startupReadinessScore: 72,
      improvementTip: "Conduct customer interviews to validate assumptions and refine your solution based on real feedback.",
      customerInterviewSimulation: [
        `"I really need a better solution for ${problemSolved}."`,
        `"This could be helpful, but I'm concerned about the learning curve."`,
        `"I'm happy with my current solution - why should I switch?"`
      ],
      pricingMonetization: {
        pricePoint: "$49/month - Based on market research showing similar B2B tools price between $29-99/month. This positions you competitively while allowing room for value demonstration.",
        monetization: "Monthly subscription model with 14-day free trial. Premium tier at $99/month for advanced features and integrations.",
        conversionRate: "4.2% - Industry average for B2B SaaS landing pages is 2-5%. With proper targeting and value proposition, expect 4-5% from qualified traffic."
      }
    });
  }
}

export async function generateLandingPagePrompt(idea: string, targetCustomer: string, problemSolved: string, validationFeedback: any) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert at creating comprehensive landing page prompts for AI-powered no-code website builders like Base44, Lovable, and Bubble. Create a detailed, actionable prompt that these AI builders can use to generate a complete, high-converting landing page.

Your prompt should include:
- Compelling headline and subheadline with clear value proposition
- Problem/solution framework with emotional hooks
- Target customer language and pain points
- Detailed feature/benefit breakdown
- Social proof elements and credibility indicators
- Email capture strategy with lead magnets
- Visual design suggestions and layout structure
- Call-to-action copy and button placement
- Color scheme and typography recommendations
- Mobile responsiveness considerations
- Trust signals and risk reduction elements

Make it extremely specific and actionable so an AI can build a complete landing page. Focus on conversion optimization and email list building for early customer validation.`
        },
        {
          role: "user", 
          content: `Create a comprehensive landing page prompt for AI site builders (Base44, Lovable, Bubble) for this startup:

**Startup Details:**
- Idea: ${idea}
- Target Customer: ${targetCustomer}
- Problem Solved: ${problemSolved}

**AI Validation Insights:**
- Market Fit Analysis: ${validationFeedback.ideaFitAlignment}
- Unique Value Proposition: ${validationFeedback.uvpInsight}
- Target Customer Locations: ${validationFeedback.customerTargeting}
- Startup Readiness: ${validationFeedback.startupReadinessScore}/100
- Pricing Strategy: ${validationFeedback.pricingMonetization?.pricePoint || 'To be determined'}

Create an extremely detailed prompt that an AI site builder can use to generate a complete landing page. Include specific copy suggestions, design elements, sections, and conversion optimization strategies. The goal is email capture for early customer validation and building a waitlist.`
        }
      ],
      temperature: 0.8,
      max_tokens: 800
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI landing page prompt error:", error);
    // Fallback prompt
    return `Build a high-converting landing page for "${idea}" targeting ${targetCustomer}:

**PAGE STRUCTURE & DESIGN:**
- Clean, modern design with primary color #2563eb (blue) and accent #f59e0b (orange)
- Mobile-first responsive layout
- Fast loading with optimized images
- Sticky header with logo and CTA button

**HERO SECTION:**
- Headline: "Finally, a solution for ${problemSolved}"
- Subheadline: "Join 500+ ${targetCustomer} who are revolutionizing how they handle ${problemSolved}"
- Hero image: Modern, professional illustration or photo relevant to the solution
- Primary CTA button: "Get Early Access" (prominent, above fold)

**PROBLEM SECTION:**
- Header: "The Problem ${targetCustomer} Face Daily"
- Pain points specific to ${targetCustomer}
- Statistical data about the problem impact
- Emotional language that creates urgency

**SOLUTION SECTION:**
- Header: "Introducing [Product Name]"
- 3 key benefits with icons and descriptions
- Feature breakdown with mockup images
- "How It Works" - 3-step process

**SOCIAL PROOF SECTION:**
- "Join 500+ Early Adopters" counter
- 3 customer testimonials with photos and titles
- Company logos (if any partnerships)
- "Featured on" media mentions

**EMAIL CAPTURE SECTION:**
- Header: "Get Early Access + Exclusive Updates"
- Lead magnet: "Free [Industry] Toolkit" or "Beta Access"
- Single email input field
- Privacy assurance text
- Compelling CTA: "Reserve My Spot"

**TRUST SIGNALS:**
- Security badges and certifications
- Money-back guarantee
- "No spam, unsubscribe anytime"
- Founder photo and credentials

**FOOTER:**
- Contact information
- Social media links
- Privacy policy and terms
- Additional trust indicators

**CONVERSION OPTIMIZATION:**
- Multiple email capture points (hero, middle, bottom)
- Exit-intent popup with special offer
- Social media sharing buttons
- Analytics and heat mapping integration

Build this as a single-page application with smooth scrolling navigation and optimized for email conversion.`;
  }
}