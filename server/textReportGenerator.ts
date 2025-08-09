export interface PitchDeckData {
  validationData: {
    idea: string;
    targetCustomer: string;
    problemSolved: string;
    feedback: string;
  };
  customerInsights: Array<{
    persona: {
      name: string;
      role: string;
      background: string;
      painPoints: string[];
      priceWillingness: string;
    };
    conversations?: Array<{
      question: string;
      response: string;
    }>;
  }>;
  simulationData: Array<{
    month: number;
    title: string;
    challenges: string[];
    wins: string[];
    users: number;
    keyDecisions: string[];
  }>;
  landingPageContent?: string;
}

export class TextReportGenerator {
  private parseFeedbackScore(feedback: string): number {
    const scoreMatch = feedback.match(/(\d+)\/100/);
    return scoreMatch ? parseInt(scoreMatch[1]) : 75;
  }

  private extractFeedbackSection(feedback: string, sectionTitle: string): string[] {
    const regex = new RegExp(`<h3>${sectionTitle}</h3>[\\s\\S]*?(?=<h3>|$)`, 'i');
    const match = feedback.match(regex);
    if (!match) return [];
    
    // Extract text content, remove HTML tags
    const content = match[0].replace(/<[^>]*>/g, '').replace(/\n+/g, ' ').trim();
    const lines = content.split('\n').filter(line => line.trim() && !line.includes(sectionTitle));
    return lines.length > 0 ? lines : [content.replace(sectionTitle, '').trim()];
  }

  private generateInvestorProblemStatement(data: PitchDeckData): string {
    const score = this.parseFeedbackScore(data.validationData.feedback);
    const marketInsights = this.extractFeedbackSection(data.validationData.feedback, "Market Reality Check");
    
    // Synthesize a compelling problem statement based on customer pain points
    const customerPains = data.customerInsights.flatMap(insight => insight.persona.painPoints);
    const uniquePains = Array.from(new Set(customerPains));
    
    if (uniquePains.length > 0) {
      return `${data.validationData.targetCustomer} face significant challenges including ${uniquePains.slice(0, 3).join(', ')}. Our customer research revealed that ${data.customerInsights.length} out of ${data.customerInsights.length} interviewed customers struggle with these exact issues daily, creating a clear market opportunity for ${data.validationData.idea}.`;
    }
    
    return `${data.validationData.targetCustomer} consistently struggle with ${data.validationData.problemSolved}. Market validation shows ${score}% alignment between this problem and our target demographic, indicating strong demand for a comprehensive solution.`;
  }

  private generateValueProposition(data: PitchDeckData): string {
    const uniqueValue = this.extractFeedbackSection(data.validationData.feedback, "What Makes This Special");
    const customerWillingness = data.customerInsights.filter(c => c.persona.priceWillingness);
    
    let proposition = `${data.validationData.idea} directly addresses the core challenges faced by ${data.validationData.targetCustomer}.`;
    
    if (uniqueValue.length > 0) {
      proposition += ` Our unique approach includes ${uniqueValue[0].toLowerCase()}, setting us apart from existing solutions.`;
    }
    
    if (customerWillingness.length > 0) {
      proposition += ` Customer interviews confirm willingness to pay ${customerWillingness[0].persona.priceWillingness}, validating strong market demand.`;
    }
    
    return proposition;
  }

  private generateMarketOpportunity(data: PitchDeckData): string {
    const score = this.parseFeedbackScore(data.validationData.feedback);
    const finalUsers = data.simulationData.length > 0 ? data.simulationData[data.simulationData.length - 1].users : 0;
    
    return `With a validation score of ${score}/100, our market research indicates strong opportunity. Customer interviews with ${data.customerInsights.length} target users revealed consistent pain points and pricing willingness. Our 6-month projection shows potential to reach ${finalUsers?.toLocaleString()} users, demonstrating scalable market demand.`;
  }

  private generateBusinessModel(data: PitchDeckData): string {
    const pricePoints = data.customerInsights
      .map(c => c.persona.priceWillingness)
      .filter(price => price && price.includes('$'));
    
    if (pricePoints.length > 0) {
      const avgPricing = pricePoints.join(', ');
      return `Based on customer research, our pricing strategy targets ${avgPricing} range. This SaaS model allows for predictable recurring revenue with tiered features to accommodate different customer segments from individual users to enterprise clients.`;
    }
    
    return `Our subscription-based model provides recurring revenue through tiered pricing that accommodates different customer segments and use cases, as validated through customer interviews.`;
  }

  private generateTractionHighlights(data: PitchDeckData): string[] {
    if (!data.simulationData || data.simulationData.length === 0) {
      return ['Customer validation completed with positive feedback', 'Market opportunity confirmed through research'];
    }
    
    const highlights = [];
    const finalUsers = data.simulationData[data.simulationData.length - 1].users;
    highlights.push(`Projected ${finalUsers?.toLocaleString()} users by Month 6`);
    
    // Extract key wins from simulation
    const allWins = data.simulationData.flatMap(month => month.wins || []);
    highlights.push(...allWins.slice(0, 3));
    
    return highlights;
  }

  generatePitchDeckText(data: PitchDeckData): string {
    const score = this.parseFeedbackScore(data.validationData.feedback);
    const problemStatement = this.generateInvestorProblemStatement(data);
    const valueProposition = this.generateValueProposition(data);
    const marketOpportunity = this.generateMarketOpportunity(data);
    const businessModel = this.generateBusinessModel(data);
    const tractionHighlights = this.generateTractionHighlights(data);

    return `
STARTUP PITCH DECK
==================

${data.validationData.idea}
--------------------------
Investor Presentation

Generated by ValidatorAI - AI-Powered Startup Validation Platform


EXECUTIVE SUMMARY
=================

${data.validationData.idea} is a validated startup opportunity targeting ${data.validationData.targetCustomer} with a comprehensive solution for ${data.validationData.problemSolved}.

${valueProposition}

Market Validation Score: ${score}/100
Customer Interviews: ${data.customerInsights.length} target users validated
Projected Scale: ${data.simulationData.length > 0 ? data.simulationData[data.simulationData.length - 1].users?.toLocaleString() + ' users by Month 6' : 'Strong growth potential'}


THE PROBLEM
===========

Market Opportunity
${problemStatement}

Customer Pain Points Identified:
${data.customerInsights.length > 0 ? 
  Array.from(new Set(data.customerInsights.flatMap(insight => insight.persona.painPoints)))
    .slice(0, 5)
    .map(pain => `• ${pain}`)
    .join('\n') : 
  `• ${data.validationData.problemSolved}\n• Lack of effective solutions in the market\n• Unmet customer needs`
}


OUR SOLUTION
============

${valueProposition}

Key Differentiators:
${this.extractFeedbackSection(data.validationData.feedback, "What Makes This Special").length > 0 ? 
  this.extractFeedbackSection(data.validationData.feedback, "What Makes This Special")
    .map(value => `• ${value}`)
    .join('\n') : 
  `• Comprehensive approach to ${data.validationData.problemSolved}\n• Validated through extensive customer research\n• Built specifically for ${data.validationData.targetCustomer}`
}


MARKET VALIDATION
=================

${marketOpportunity}

Customer Interview Results:
${data.customerInsights.map(insight => `
• ${insight.persona.name} (${insight.persona.role}): "${insight.conversations && insight.conversations.length > 0 ? 
  insight.conversations[0].response.substring(0, 150) + '...' : 
  'Confirmed strong interest and willingness to pay ' + insight.persona.priceWillingness
}"`).join('\n')}


BUSINESS MODEL
==============

Revenue Strategy
${businessModel}

Pricing Validation:
${data.customerInsights.filter(c => c.persona.priceWillingness).length > 0 ? 
  data.customerInsights.filter(c => c.persona.priceWillingness)
    .map(c => `• ${c.persona.role}: ${c.persona.priceWillingness}`)
    .join('\n') : 
  '• Validated pricing through customer interviews\n• Subscription-based recurring revenue model\n• Tiered pricing for different market segments'
}


TRACTION & PROJECTIONS
======================

${data.simulationData && data.simulationData.length > 0 ? `
6-Month Growth Projection:
${data.simulationData.map(month => 
  `Month ${month.month}: ${month.users?.toLocaleString()} users - ${month.title}`
).join('\n')}

Key Milestones Achieved:
${tractionHighlights.map(highlight => `• ${highlight}`).join('\n')}
` : `
Validation Milestones:
• Completed comprehensive market validation (${score}/100 score)
• Interviewed ${data.customerInsights.length} target customers with positive feedback
• Confirmed pricing willingness and market demand
• Ready for MVP development and market entry
`}


COMPETITIVE ADVANTAGES
======================

${this.extractFeedbackSection(data.validationData.feedback, "Market Reality Check").length > 0 ? 
  this.extractFeedbackSection(data.validationData.feedback, "Market Reality Check")
    .map(insight => `• ${insight}`)
    .join('\n') : 
  `• First-mover advantage in validated market segment\n• Deep customer research and validation\n• Proven demand through customer interviews`
}


INVESTMENT OPPORTUNITY
======================

Why Invest in ${data.validationData.idea}:

• Validated Market Demand: ${score}/100 validation score with customer research
• Proven Customer Interest: ${data.customerInsights.length} interviews confirm willingness to pay
• Scalable Business Model: ${businessModel.includes('recurring') ? 'Recurring revenue' : 'Subscription-based'} with clear growth path
• Experienced Validation: Comprehensive market research and customer development completed

Next Steps:
${data.simulationData && data.simulationData.length > 0 && data.simulationData[0].keyDecisions ? 
  data.simulationData[0].keyDecisions.map(decision => `• ${decision}`).join('\n') : 
  '• Secure seed funding for MVP development\n• Build core product features\n• Launch to early adopter customers\n• Scale customer acquisition'
}


CONTACT & NEXT STEPS
====================

Ready to discuss this validated opportunity further.

This comprehensive pitch deck is based on:
✓ AI-powered market validation and analysis
✓ Real customer interviews and feedback
✓ 6-month business simulation modeling
✓ Competitive analysis and positioning research

Generated through ValidatorAI.com - The AI-Powered Startup Validation Platform
    `;
  }

  generateBusinessReportText(data: PitchDeckData): string {
    const score = this.parseFeedbackScore(data.validationData.feedback);
    const problemStatement = this.generateInvestorProblemStatement(data);
    const valueProposition = this.generateValueProposition(data);
    const marketOpportunity = this.generateMarketOpportunity(data);
    const businessModel = this.generateBusinessModel(data);

    return `
COMPREHENSIVE STARTUP VALIDATION REPORT
========================================

${data.validationData.idea}
AI-Powered Business Analysis & Market Validation

Generated by ValidatorAI Platform


EXECUTIVE SUMMARY
=================

Business Opportunity Assessment
${data.validationData.idea} represents a validated market opportunity in the ${data.validationData.targetCustomer} segment. Through comprehensive AI analysis and customer research, we've identified strong market demand and viable business potential.

Validation Score: ${score}/100
Market Research: ${data.customerInsights.length} customer interviews completed
Business Model: ${businessModel.includes('subscription') ? 'Subscription-based SaaS' : 'Recurring revenue model'}
Growth Projection: ${data.simulationData.length > 0 ? data.simulationData[data.simulationData.length - 1].users?.toLocaleString() + ' users projected by Month 6' : 'Strong scalability indicators'}

Key Finding: ${valueProposition}


MARKET OPPORTUNITY ANALYSIS
===========================

Problem Definition & Market Need
${problemStatement}

Market Size & Opportunity
${marketOpportunity}

Competitive Landscape Analysis:
${this.extractFeedbackSection(data.validationData.feedback, "Market Reality Check").length > 0 ? 
  this.extractFeedbackSection(data.validationData.feedback, "Market Reality Check")
    .map(insight => `• ${insight}`)
    .join('\n') : 
  `• Market research indicates growing demand for solutions addressing ${data.validationData.problemSolved}\n• Customer interviews reveal gaps in current market offerings\n• Opportunity for differentiated approach based on customer feedback`
}


CUSTOMER RESEARCH & VALIDATION
==============================

We conducted comprehensive customer research with ${data.customerInsights.length} target users to validate market assumptions and gather deep insights.

${data.customerInsights.map((insight, index) => `
TARGET CUSTOMER PROFILE ${index + 1}
Name: ${insight.persona.name}
Role: ${insight.persona.role}
Background: ${insight.persona.background}

Pain Points Analysis:
${insight.persona.painPoints.map(pain => `• ${pain} - directly addressed by our solution`).join('\n')}

Price Sensitivity & Willingness to Pay:
${insight.persona.priceWillingness}

Customer Interview Insights:
${insight.conversations && insight.conversations.length > 0 ? 
  insight.conversations.map(conv => `
Research Question: "${conv.question}"
Customer Response: "${conv.response}"

Analysis: This response indicates ${conv.response.toLowerCase().includes('interested') || conv.response.toLowerCase().includes('need') || conv.response.toLowerCase().includes('want') ? 
  'strong interest and validation of our value proposition' : 
  'valuable feedback for product development and positioning'}.
`).join('') : 
  `Direct feedback confirmed interest in our solution approach and validated pricing expectations.`
}
`).join('\n')}


BUSINESS MODEL & REVENUE STRATEGY
==================================

Revenue Model Analysis
${businessModel}

Pricing Strategy Validation:
Based on customer research, our pricing strategy is validated across multiple customer segments:

${data.customerInsights.filter(c => c.persona.priceWillingness).length > 0 ? 
  data.customerInsights.filter(c => c.persona.priceWillingness)
    .map(c => `• ${c.persona.role} Segment: ${c.persona.priceWillingness} - indicates strong willingness to pay for value provided`)
    .join('\n') : 
  '• Customer interviews confirm pricing assumptions\n• Multiple price points validated for different customer segments\n• Revenue projections based on realistic market penetration'
}

Customer Acquisition Strategy:
${data.simulationData && data.simulationData.length > 0 && data.simulationData[0].keyDecisions ? 
  `Based on simulation modeling:\n${data.simulationData[0].keyDecisions.map(decision => `• ${decision}`).join('\n')}` : 
  '• Direct customer outreach based on validated personas\n• Content marketing targeting identified pain points\n• Partnership opportunities with complementary services'
}


DETAILED 6-MONTH BUSINESS SIMULATION
====================================

${data.simulationData && data.simulationData.length > 0 ? `
Our AI-powered simulation models realistic business growth based on customer insights and market conditions:

${data.simulationData.map(month => `
MONTH ${month.month}: ${month.title.toUpperCase()}
----------------------------------------------
Projected User Base: ${month.users?.toLocaleString()} users
Growth Rate: ${month.month > 1 ? '+' + Math.round(((month.users - (data.simulationData[month.month - 2]?.users || 0)) / (data.simulationData[month.month - 2]?.users || 1)) * 100) + '% from previous month' : 'Initial launch'}

Strategic Wins & Milestones:
${month.wins && month.wins.length > 0 ? 
  month.wins.map(win => `• ${win} - contributing to sustainable growth and market validation`).join('\n') : 
  '• Month-over-month progress in user acquisition and product development'
}

Challenges & Risk Mitigation:
${month.challenges && month.challenges.length > 0 ? 
  month.challenges.map(challenge => `• ${challenge} - addressed through strategic planning and customer feedback integration`).join('\n') : 
  '• Anticipated challenges managed through proactive planning'
}

Key Strategic Decisions:
${month.keyDecisions && month.keyDecisions.length > 0 ? 
  month.keyDecisions.map(decision => `• ${decision} - based on customer research and market analysis`).join('\n') : 
  '• Data-driven decisions focused on customer value and market fit'
}

Business Impact Analysis:
Month ${month.month} represents ${month.month === 1 ? 'initial market entry with focus on product-market fit validation' : 
  month.month <= 3 ? 'early growth phase with emphasis on customer acquisition and retention' :
  'scaling phase with established market presence and predictable growth patterns'}.
`).join('\n')}

SIMULATION SUMMARY:
The 6-month projection shows ${data.simulationData[data.simulationData.length - 1].users?.toLocaleString()} total users, representing strong market penetration and sustainable business growth based on validated customer demand.
` : `
GROWTH PROJECTION ANALYSIS:
Based on customer validation and market research, the business shows strong indicators for:
• Rapid customer acquisition through validated pain point solutions
• Sustainable revenue growth via proven pricing model
• Market expansion opportunities through customer segment diversification
`}


COMPETITIVE ANALYSIS & POSITIONING
===================================

Market Position & Differentiation:
${this.extractFeedbackSection(data.validationData.feedback, "What Makes This Special").length > 0 ? 
  `Our unique market position is established through:\n${this.extractFeedbackSection(data.validationData.feedback, "What Makes This Special")
    .map(value => `• ${value} - providing clear competitive advantage`).join('\n')}` : 
  `• Customer-validated approach to ${data.validationData.problemSolved}\n• Deep understanding of target customer needs through research\n• Differentiated solution based on actual market gaps identified`
}

Competitive Landscape:
${this.extractFeedbackSection(data.validationData.feedback, "Market Reality Check").length > 0 ? 
  this.extractFeedbackSection(data.validationData.feedback, "Market Reality Check")
    .map(insight => `• ${insight}`)
    .join('\n') : 
  `• Existing solutions fail to address core customer pain points identified in our research\n• Market opportunity exists for comprehensive, customer-focused approach\n• Competitive advantage through validated customer development process`
}


RISK ANALYSIS & MITIGATION STRATEGIES
======================================

Identified Business Risks:
${data.simulationData && data.simulationData.length > 0 ? 
  `Based on simulation modeling:\n${Array.from(new Set(data.simulationData.flatMap(month => month.challenges || [])))
    .map(challenge => `• ${challenge} - mitigated through strategic planning and customer feedback loops`).join('\n')}` : 
  '• Market adoption rates - mitigated through validated customer research\n• Competitive response - addressed through differentiated positioning\n• Technical execution - managed through iterative development approach'
}

Mitigation Strategies:
• Continuous customer feedback integration to ensure product-market fit
• Agile development approach based on validated learning principles
• Strategic partnerships to accelerate market penetration
• Financial planning based on conservative growth projections


STRATEGIC RECOMMENDATIONS
==========================

IMMEDIATE ACTIONS (Next 30 Days):
${data.simulationData && data.simulationData.length > 0 && data.simulationData[0].keyDecisions ? 
  data.simulationData[0].keyDecisions.map(decision => `• ${decision} - priority action item`).join('\n') : 
  '• Begin MVP development based on customer feedback\n• Establish customer feedback loops for continuous validation\n• Develop go-to-market strategy based on research insights'
}

MEDIUM-TERM STRATEGY (3-6 Months):
• Scale customer acquisition based on validated channels
• Expand product features according to customer priority rankings
• Establish strategic partnerships for market expansion
• Implement customer success metrics and tracking systems

LONG-TERM VISION (6+ Months):
• Market leadership in validated customer segment
• Product line expansion based on customer needs analysis
• Geographic or demographic market expansion
• Strategic acquisition or partnership opportunities

SUCCESS METRICS & KPIs:
• Customer Acquisition Cost (CAC) vs. Customer Lifetime Value (LTV)
• Monthly Recurring Revenue (MRR) growth rate
• Customer satisfaction scores and Net Promoter Score (NPS)
• Product-market fit indicators and usage metrics
• Market share growth in target customer segments


CONCLUSION & INVESTMENT READINESS
==================================

Investment Opportunity Summary:
${data.validationData.idea} represents a validated, scalable business opportunity with:

✓ Market Validation: ${score}/100 comprehensive validation score
✓ Customer Research: ${data.customerInsights.length} target customer interviews with positive validation
✓ Revenue Model: Proven pricing strategy through customer willingness-to-pay research
✓ Growth Potential: ${data.simulationData.length > 0 ? data.simulationData[data.simulationData.length - 1].users?.toLocaleString() + ' user projection demonstrates' : 'Strong indicators for'} scalable market opportunity
✓ Competitive Advantage: Differentiated approach validated through customer research

Recommendation: PROCEED with confidence based on comprehensive validation and customer research.

Next Steps for Investment/Development:
1. Secure funding for MVP development and initial market entry
2. Build core product features based on customer priority feedback
3. Execute go-to-market strategy using validated customer acquisition channels
4. Scale operations based on proven business model and customer demand

---

This comprehensive report is based on AI-powered analysis combining:
• Advanced market validation algorithms
• Real customer interview data and insights
• Competitive landscape analysis
• Financial modeling and business simulation
• Risk assessment and strategic planning

Generated through ValidatorAI.com - The AI-Powered Startup Validation Platform
Validated. Analyzed. Ready for Market.
    `;
  }

  generatePitchDeck(data: PitchDeckData): Buffer {
    const textContent = this.generatePitchDeckText(data);
    return Buffer.from(textContent, 'utf-8');
  }

  generateBusinessReport(data: PitchDeckData): Buffer {
    const textContent = this.generateBusinessReportText(data);
    return Buffer.from(textContent, 'utf-8');
  }
}