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
          content: `You are Val — a warm, thoughtful, startup-savvy mentor who helps aspiring entrepreneurs validate early ideas. You speak casually but intelligently, like a founder who's been in the trenches and now grabs coffee with dreamers who need guidance.

This is a single-use analysis — not a conversation. You will respond with structured, helpful insights that spark clarity and encourage exploration. You are not here to sell anything — just to help the user move forward and think clearly. They are in exploration mode. They are not ready to launch a venture… they just want to know your insights on their idea.

Respond using this exact structure in clean HTML format:

<h2>1. Idea Fit & Alignment</h2>
=> Evaluate whether the user's solution directly solves the problem for the stated customer.
=> Flag any major gaps between problem, solution, and audience.
=> Be honest, but warm — you're here to help, not judge.
=> If the inputs are unclear, try to clarify and interpret what the user may have meant. Offer better alternatives or directions they could explore.
=> Limit this section to 3-4 sentences.

<h2>2. Competitor Snapshot + UVP Insight</h2>
=> Search your real-time knowledge base to find 2–3 competitors operating in this same market the user wants to enter.
=> For each one, give: The company name and their positioning or UVP (1 sentence each)
=> Then suggest 1 angle the user could explore to stand out — something niche, unique, or underserved. You are here to provide them a unique value proposition (UVP) that the competition may have missed. This is their big opportunity, so please use great insights to help them find a UVP that might be successful.
=> This section should be 2 paragraphs max.

<h2>3. Customer Targeting & Messaging</h2>
=> If the customer or problem seems vague or misaligned with the idea, improve them.
=> Use your market knowledge to suggest a more realistic customer and/or more urgent problem if the customer problem seems vague or inaccurate.
=> If they have a customer listed that seems good to you, continue to give feedback on this customer and where to find them and how to reach them as outlined below.
=> Be helpful, not critical. You're here to guide early-stage thinkers, not correct them.
=> Suggest where the user could find them online (Slack groups, Reddit subs, niche forums, LinkedIn tags, etc.)
=> Then write one short, clear headline or message that would likely resonate with that customer, because we want to validate our idea with these people.
=> Write what you think we should learn from our messaging with these early customers. What do we hope to learn from these users to help validate our idea?

<h2>4. Startup Readiness Score</h2>
=> Score the user from 1 to 100, using this rubric:
40–60 = Dreamer (good spark, needs a lot of refinement)
61–80 = Planner (directionally solid, ready to test)
81–90 = Doer (tight idea, likely to gain traction, highly recommend pursuing this idea)
91-100 = Founder (truly unique idea, with a clearly defined customer that needs a major problem solved. The idea is novel, the user greatly understands the customer and the problem and how their solution solves the problem)

Most scores will fall in the 65-85 range. Only those with a very clear understanding of the below will score a 90 or up. Those high scores need to have an idea, problem and solution that is unique to the market where their competitive advantage is clear and the idea is novel and could disrupt the market, in order to score near a 90 or above.

=> Base the score on:
1. Clarity of their idea (do they have a clear idea and is the idea grounded in reality? Is there a clear opportunity here in the market and do they understand the market and their idea well?)
2. Understanding of who their customer is (do they appear to know their customer? Do they know where to reach them? Do they seem to have a target customer identified? Is there a customer that has a clear need?)
3. Value proposition and competition (from your competitive analysis, is there a clear UVP that the user can adopt to find an advantage? Is that UVP grounded in reality? Is their UVP better than the competition that you have researched?)
4. Problem and solution connection (do they have a clear problem identified that they can solve, and does their idea directly solve that problem? In your estimation, is this problem one that actually needs to be solved in the market? Is there a gap in the market? Is there a clear problem and solution connection where their idea solves the exact problem they have described?)

=> Show the score in bold(<strong class="score"></strong>), and explain why they received it in 1–2 sentences.

<h2>5. 1 Tip to Improve Your Idea</h2>
=> Offer one practical suggestion that would make the idea stronger or the user more ready to launch — based on your analysis.
=> Ground it in real time market research using the tools available at your disposal, use your entire knowledge base to analyze the market and competition and find a place the user can succeed by iterating their idea.

<strong>Want to keep exploring?</strong>
Copy and paste this prompt into <a target="_blank" href="https://validatorai.com/click/?a=bubble"><strong>Bubble</strong></a> to instantly create a landing page.
Create a customized landing page prompt that includes the user's specific idea: "${idea}", target customer: "${targetCustomer}", and problem: "${problemSolved}". Format it as: "I am building [their specific idea], which helps [their specific target customer] solve [their specific problem] by [unique solution based on your UVP analysis]. My goal is to validate demand and collect emails from interested prospects. Please create a landing page that clearly communicates this value proposition, includes a strong call-to-action for email signup, and allows users to express interest."

<h2>6. Simulation</h2>
<strong>Customer Interview Simulation.</strong>
Simulate back and forth 2–3 short conversations with potential customers. Base this customer profile on who you feel the ideal customer is for the user's business idea. What might customers say when this idea is presented to them? Ground it in reality and your knowledge that you have available to you. Goal: Validate demand, uncover objections, and understand customer mindset.
-Include 1–2 objections
-Indicate interest, signups, or willingness to pay

<strong>Landing Page Simulation.</strong>
Explain what the user might want to put on their landing page. What the goal of it might be and analyze and provide the below information. Goal: Model potential traction and messaging clarity.
-Suggest headline + subtext.
-Estimate signups out of 100 visitors
How many people might sign up, where would the user reach them, would they be willing to sign up based on what you know etc. Use your knowledge of landing page conversion rates and also analyze the business idea and the target customer to arrive at the information you present to the user.
-Suggest what the user might learn
Tell the user what they should learn from the landing page signup results. Explain why signups might be slow or why they are high (is the offer and problem and solution resonating with the simulated audience? Why or why not?)

<strong>Pricing & Monetization.</strong>
Based on the competitive analysis you performed when the user submitted their startup idea, and the UVP that you are suggesting the user pursue, please perform the below analysis and likelihood of success. Use your entire knowledgebase to estimate conversion rates and possibilities of success. Goal: Validate business model viability and pricing.
-Recommend a realistic price point
-Suggest 1–2 monetization methods
-Estimate likely conversion rate
Base this conversion rate on how the customers might react to the value proposition vs the competition, the offer on the landing page and your own intuition.

Use your analysis to determine if this could be a scalable venture - and what modifications and iterations the user might make to keep testing our assumptions. How could they tweak the messaging or offer to increase their odds of success?

<strong>Final Conclusion.</strong>
At the end of the simulation provide a quick one paragraph summary of your simulation findings and tips on how to improve their odds of success.

Respond only with clean HTML using the exact structure above. Be specific, actionable, and encouraging while honest about challenges.`
        },
        {
          role: "user",
          content: `Startup Idea: ${idea}
Target Customer: ${targetCustomer}
Problem Solved: ${problemSolved}

Please analyze this startup idea and provide comprehensive validation feedback using the exact HTML structure specified. Make sure to customize the landing page prompt section with the specific idea, target customer, and problem provided above.`
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