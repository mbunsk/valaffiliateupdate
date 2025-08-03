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
8. pricingMonetization: Object with pricePoint, monetization, and conversionRate fields

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
        pricePoint: "$30-150 depending on features and market positioning",
        monetization: "Subscription model or one-time purchase with premium features",
        conversionRate: "3-7% conversion rate from qualified leads"
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
          content: `You are an expert at creating landing page prompts for no-code website builders. Create a detailed prompt that builders like Base44, Lovable, or Bubble can use to build a high-converting landing page.

The prompt should include:
- Clear headline and value proposition
- Problem/solution messaging
- Target customer language
- Social proof elements
- Email capture strategy
- Visual suggestions
- Call-to-action copy

Make it specific, actionable, and conversion-focused. The goal is to capture early user interest and build an email list.`
        },
        {
          role: "user", 
          content: `Create a landing page prompt for this startup:

Idea: ${idea}
Target Customer: ${targetCustomer}
Problem Solved: ${problemSolved}

AI Validation Insights:
- Idea Fit: ${validationFeedback.ideaFitAlignment}
- Unique Opportunity: ${validationFeedback.uvpInsight}
- Customer Targeting: ${validationFeedback.customerTargeting}
- Readiness Score: ${validationFeedback.startupReadinessScore}/100

Create a detailed prompt for building a landing page that will capture early user interest and emails.`
        }
      ],
      temperature: 0.8,
      max_tokens: 800
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI landing page prompt error:", error);
    // Fallback prompt
    return `Create a landing page for "${idea}" targeting ${targetCustomer}:

**Headline:** The solution ${targetCustomer} need for ${problemSolved}

**Hero Section:**
- Bold headline addressing the main problem
- Subheadline explaining the unique solution
- Hero image/video showing the product in action

**Problem Section:**
- Clearly state the pain point: ${problemSolved}
- Use emotional language that resonates with ${targetCustomer}

**Solution Section:**
- Explain how your idea solves the problem
- Highlight key benefits and features
- Include screenshots or mockups

**Social Proof:**
- Customer testimonials (even if early/beta)
- "Join 100+ early users" counter
- Trust indicators and credentials

**Email Capture:**
- "Get Early Access" or "Join the Waitlist" form
- Offer: Free trial, beta access, or exclusive updates
- Single email field with compelling CTA button

**Call-to-Action:**
- Primary: "Get Early Access" 
- Secondary: "Learn More"
- Use action-oriented, benefit-focused language

**Design Notes:**
- Clean, modern design with your brand colors
- Mobile-responsive layout
- Fast loading and simple navigation
- Include contact information and social links`;
  }
}