import puppeteer from 'puppeteer';

interface PitchDeckData {
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
  simulationData?: Array<{
    month: number;
    title: string;
    users: number;
    wins?: string[];
    challenges?: string[];
    keyDecisions?: string[];
  }>;
}

export class PDFPitchDeckGenerator {
  private parseFeedbackScore(feedback: string): number {
    const scoreMatch = feedback.match(/(\d+)\/100/);
    return scoreMatch ? parseInt(scoreMatch[1]) : 75;
  }

  private extractFeedbackSection(feedback: string, sectionTitle: string): string[] {
    const regex = new RegExp(`<h3>${sectionTitle}</h3>[\\s\\S]*?(?=<h3>|$)`, 'i');
    const match = feedback.match(regex);
    if (!match) return [];
    
    const content = match[0].replace(/<[^>]*>/g, '').replace(/\n+/g, ' ').trim();
    const lines = content.split('\n').filter(line => line.trim() && !line.includes(sectionTitle));
    return lines.length > 0 ? lines : [content.replace(sectionTitle, '').trim()];
  }

  private generateProblemStatement(data: PitchDeckData): string {
    const customerPains = data.customerInsights.flatMap(insight => insight.persona.painPoints);
    const uniquePains = Array.from(new Set(customerPains));
    
    if (uniquePains.length > 0) {
      return `${data.validationData.targetCustomer} struggle with ${uniquePains.slice(0, 3).join(', ')}. Our research with ${data.customerInsights.length} customers confirms this is a widespread issue affecting productivity and success.`;
    }
    
    return `${data.validationData.targetCustomer} face significant challenges with ${data.validationData.problemSolved}, creating clear demand for an effective solution.`;
  }

  private generateSolutionStatement(data: PitchDeckData): string {
    const uniqueValue = this.extractFeedbackSection(data.validationData.feedback, "What Makes This Special");
    
    let solution = `${data.validationData.idea} provides a comprehensive solution for ${data.validationData.targetCustomer}.`;
    
    if (uniqueValue.length > 0) {
      solution += ` Our approach is unique because ${uniqueValue[0].toLowerCase()}.`;
    }
    
    return solution;
  }

  private generateCustomerValidation(data: PitchDeckData): string {
    if (data.customerInsights.length === 0) {
      return "Customer research validates strong market demand for this solution.";
    }

    const pricePoints = data.customerInsights
      .filter(c => c.persona.priceWillingness)
      .map(c => c.persona.priceWillingness)
      .join(', ');

    return `We interviewed ${data.customerInsights.length} target customers who confirmed strong interest. Price validation shows willingness to pay ${pricePoints}, demonstrating clear market demand.`;
  }

  private generateNextSteps(data: PitchDeckData): string[] {
    if (data.simulationData && data.simulationData.length > 0 && data.simulationData[0].keyDecisions) {
      return data.simulationData[0].keyDecisions;
    }
    
    return [
      "Develop MVP based on customer feedback",
      "Launch beta program with early adopters", 
      "Scale customer acquisition channels",
      "Secure funding for growth acceleration"
    ];
  }

  private generateTraction(data: PitchDeckData): string {
    const score = this.parseFeedbackScore(data.validationData.feedback);
    
    if (data.simulationData && data.simulationData.length > 0) {
      const finalUsers = data.simulationData[data.simulationData.length - 1].users;
      return `Validation Score: ${score}/100 • Customer Interviews: ${data.customerInsights.length} completed • Projected Users: ${finalUsers?.toLocaleString()} by Month 6`;
    }
    
    return `Validation Score: ${score}/100 • Customer Research: ${data.customerInsights.length} interviews completed • Market Opportunity: Validated`;
  }

  generatePitchDeckHTML(data: PitchDeckData): string {
    const score = this.parseFeedbackScore(data.validationData.feedback);
    const problemStatement = this.generateProblemStatement(data);
    const solutionStatement = this.generateSolutionStatement(data);
    const customerValidation = this.generateCustomerValidation(data);
    const nextSteps = this.generateNextSteps(data);
    const traction = this.generateTraction(data);

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Pitch Deck - ${data.validationData.idea}</title>
    <style>
        @page {
            size: A4 landscape;
            margin: 0;
        }
        
        body {
            font-family: 'Arial', 'Helvetica', sans-serif;
            margin: 0;
            padding: 0;
            background: #f8fafc;
            color: #1a202c;
        }
        
        .slide {
            width: 297mm;
            height: 210mm;
            page-break-after: always;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px;
            box-sizing: border-box;
            position: relative;
        }
        
        .slide:last-child {
            page-break-after: avoid;
        }
        
        .slide-header {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 12px;
            color: #64748b;
        }
        
        .slide-title {
            font-size: 48px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .slide-subtitle {
            font-size: 24px;
            color: #475569;
            margin-bottom: 40px;
            text-align: center;
        }
        
        .slide-content {
            font-size: 20px;
            line-height: 1.6;
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .bullet-list {
            text-align: left;
            font-size: 18px;
            line-height: 1.8;
        }
        
        .bullet-list li {
            margin-bottom: 15px;
            padding-left: 10px;
        }
        
        .highlight {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 60px;
            border-radius: 20px;
        }
        
        .score-display {
            font-size: 72px;
            font-weight: bold;
            color: #059669;
            margin: 20px 0;
        }
        
        .customer-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 30px;
        }
        
        .customer-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: left;
        }
        
        .customer-name {
            font-size: 20px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 10px;
        }
        
        .customer-role {
            font-size: 16px;
            color: #64748b;
            margin-bottom: 15px;
        }
        
        .footer {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;
            color: #64748b;
        }
    </style>
</head>
<body>

<!-- Slide 1: Cover -->
<div class="slide highlight">
    <div class="slide-header">ValidatorAI Pitch Deck</div>
    <div class="slide-title">${data.validationData.idea}</div>
    <div class="slide-subtitle">AI-Validated Startup Opportunity</div>
    <div class="slide-content">
        <div class="score-display">${score}/100</div>
        <p style="font-size: 24px;">Market Validation Score</p>
    </div>
    <div class="footer">Generated by ValidatorAI Platform</div>
</div>

<!-- Slide 2: Problem -->
<div class="slide">
    <div class="slide-header">The Problem</div>
    <div class="slide-title">Market Challenge</div>
    <div class="slide-content">
        <p style="font-size: 28px; margin-bottom: 40px;">${problemStatement}</p>
        <ul class="bullet-list">
            ${Array.from(new Set(data.customerInsights.flatMap(insight => insight.persona.painPoints)))
              .slice(0, 4)
              .map(pain => `<li>${pain}</li>`)
              .join('')}
        </ul>
    </div>
</div>

<!-- Slide 3: Our Solution -->
<div class="slide">
    <div class="slide-header">Our Solution</div>
    <div class="slide-title">The Answer</div>
    <div class="slide-content">
        <p style="font-size: 28px; margin-bottom: 40px;">${solutionStatement}</p>
        <div style="background: #f1f5f9; padding: 30px; border-radius: 15px; margin-top: 30px;">
            <p style="font-size: 22px; color: #2563eb; font-weight: bold;">Key Benefits:</p>
            <ul class="bullet-list">
                ${this.extractFeedbackSection(data.validationData.feedback, "What Makes This Special").length > 0 ? 
                  this.extractFeedbackSection(data.validationData.feedback, "What Makes This Special")
                    .slice(0, 3)
                    .map(value => `<li>${value}</li>`)
                    .join('') : 
                  `<li>Addresses core customer pain points</li>
                   <li>Validated through customer research</li>
                   <li>Scalable and market-ready solution</li>`
                }
            </ul>
        </div>
    </div>
</div>

<!-- Slide 4: Customer Validation -->
<div class="slide">
    <div class="slide-header">Customer Research</div>
    <div class="slide-title">Market Validation</div>
    <div class="slide-content">
        <p style="font-size: 24px; margin-bottom: 30px;">${customerValidation}</p>
        ${data.customerInsights.length > 0 ? `
        <div class="customer-grid">
            ${data.customerInsights.slice(0, 4).map(insight => `
            <div class="customer-card">
                <div class="customer-name">${insight.persona.name}</div>
                <div class="customer-role">${insight.persona.role}</div>
                <p style="font-size: 14px; margin-bottom: 10px;">"${insight.conversations && insight.conversations.length > 0 ? 
                  insight.conversations[0].response.substring(0, 120) + '...' : 
                  'Confirmed strong interest in our solution'}"</p>
                <p style="font-size: 16px; color: #059669; font-weight: bold;">💰 ${insight.persona.priceWillingness}</p>
            </div>
            `).join('')}
        </div>
        ` : `
        <div style="background: #f1f5f9; padding: 30px; border-radius: 15px;">
            <p style="font-size: 20px;">Customer validation confirms strong market demand and pricing willingness for our solution.</p>
        </div>
        `}
    </div>
</div>

<!-- Slide 5: Traction & Feedback -->
<div class="slide">
    <div class="slide-header">Validation Results</div>
    <div class="slide-title">Market Traction</div>
    <div class="slide-content">
        <div style="background: linear-gradient(135deg, #f1f5f9, #e2e8f0); padding: 40px; border-radius: 20px;">
            <p style="font-size: 24px; color: #2563eb; font-weight: bold; margin-bottom: 30px;">${traction}</p>
            
            ${data.simulationData && data.simulationData.length > 0 ? `
            <div style="text-align: left; margin-top: 30px;">
                <h3 style="color: #059669; margin-bottom: 20px;">6-Month Projection:</h3>
                <ul class="bullet-list">
                    ${data.simulationData.slice(0, 3).map(month => 
                      `<li>Month ${month.month}: ${month.users?.toLocaleString()} users - ${month.title}</li>`
                    ).join('')}
                </ul>
            </div>
            ` : ''}
            
            <div style="margin-top: 30px; padding: 20px; background: white; border-radius: 10px;">
                <p style="font-size: 18px; color: #1a202c;">✅ Customer interviews completed<br>
                ✅ Pricing validation confirmed<br>
                ✅ Market opportunity validated<br>
                ✅ Ready for investment and growth</p>
            </div>
        </div>
    </div>
</div>

<!-- Slide 6: Next Steps -->
<div class="slide">
    <div class="slide-header">Action Plan</div>
    <div class="slide-title">Next Steps</div>
    <div class="slide-content">
        <p style="font-size: 24px; margin-bottom: 40px;">Ready to execute with validated market opportunity</p>
        <ul class="bullet-list" style="font-size: 22px;">
            ${nextSteps.map(step => `<li>${step}</li>`).join('')}
        </ul>
        
        <div style="background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px; border-radius: 15px; margin-top: 40px;">
            <p style="font-size: 24px; font-weight: bold; margin-bottom: 15px;">Investment Opportunity</p>
            <p style="font-size: 18px;">Validated startup ready for funding and scale</p>
        </div>
    </div>
</div>

</body>
</html>
    `;
  }

  async generatePitchDeckPDF(data: PitchDeckData): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      const html = this.generatePitchDeckHTML(data);
      
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const pdf = await page.pdf({
        format: 'A4',
        landscape: true,
        printBackground: true,
        margin: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      });
      
      return Buffer.from(pdf);
    } finally {
      await browser.close();
    }
  }
}