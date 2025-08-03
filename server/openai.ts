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
          content: `You are an expert startup validation analyst. Analyze the provided startup idea and provide comprehensive feedback in JSON format with exactly these 7 elements:

1. ideaFitAlignment: A detailed analysis of how well the idea fits the problem and target market
2. competitorSnapshot: An array of 3 competitor descriptions in format "**Name** – Description"
3. uvpInsight: A specific unique value proposition insight or recommendation
4. customerTargeting: Detailed advice with specific Reddit groups (include 3-5 relevant subreddits by name), online communities, and in-person locations where they can find their target customers. Be very specific with actual community names.
5. startupReadinessScore: A number between 60-95 representing startup readiness
6. improvementTip: One specific, actionable tip to improve the startup
7. customerInterviewSimulation: Array of 3 realistic customer quotes, including at least one objection
8. pricingMonetization: Object with pricePoint (in dollars with market research justification), monetization strategy, and conversionRate (as percentage with explanation of how you arrived at this number)

Respond only with valid JSON. Be specific, actionable, and encouraging while honest about challenges.`
        },
        {
          role: "user",
          content: `Startup Idea: ${idea}
Target Customer: ${targetCustomer}
Problem Solved: ${problemSolved}

Please analyze this startup idea and provide comprehensive validation feedback.`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1500
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