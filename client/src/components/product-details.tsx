import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, FileText, Target, TrendingUp, Lightbulb, Brain, Zap } from "lucide-react";

interface Agent {
  id: number;
  name: string;
  description: string;
}

interface ProductDetailsProps {
  productId: string;
  inputs: string[];
  agents: Agent[];
}

const productConfigurations: Record<string, { inputs: string[]; agents: Agent[] }> = {
  "idea-desirability-assessment": {
    inputs: ["IDEA"],
    agents: [
      {
        id: 1,
        name: "Customer Problem Validation",
        description: "Analyze customer pain points and validate the core problem your idea addresses using market research and customer feedback data."
      }
    ]
  },
  "market-pain-points-analysis": {
    inputs: ["COMPANY", "INDUSTRY", "TARGET_MARKET"],
    agents: [
      {
        id: 1,
        name: "Market Research Agent",
        description: "Conduct comprehensive market analysis to identify key pain points and unmet needs in your target industry."
      },
      {
        id: 2,
        name: "Customer Behavior Analyst",
        description: "Analyze customer behavior patterns and preferences to understand market dynamics and opportunity gaps."
      },
      {
        id: 3,
        name: "Innovation Opportunity Mapper",
        description: "Map innovation opportunities by identifying gaps between current solutions and customer needs in the market."
      }
    ]
  },
  "tam-assessment-for-ideas": {
    inputs: ["IDEA", "TARGET_MARKET", "GEOGRAPHIC_SCOPE"],
    agents: [
      {
        id: 1,
        name: "Market Size Calculator",
        description: "Calculate total addressable market (TAM) using industry data, market research, and statistical analysis methods."
      },
      {
        id: 2,
        name: "Industry Growth Analyst",
        description: "Analyze industry growth trends, projections, and market expansion opportunities for accurate TAM assessment."
      },
      {
        id: 3,
        name: "Competitive Landscape Mapper",
        description: "Map competitive landscape to understand market saturation and identify addressable market segments."
      },
      {
        id: 4,
        name: "Geographic Market Evaluator",
        description: "Evaluate geographic market potential and regional variations in market size and opportunity."
      },
      {
        id: 5,
        name: "Revenue Potential Estimator",
        description: "Estimate revenue potential and profit margins based on market analysis and competitive positioning data."
      }
    ]
  },
  "voice-of-customer-insights": {
    inputs: ["PRODUCT_CONCEPT", "TARGET_CUSTOMERS", "RESEARCH_FOCUS"],
    agents: [
      {
        id: 1,
        name: "Customer Feedback Analyzer",
        description: "Analyze customer feedback, reviews, and testimonials to extract actionable insights about user needs and preferences."
      },
      {
        id: 2,
        name: "Voice of Customer Synthesizer",
        description: "Synthesize customer voice data from multiple sources to identify patterns and priority customer requirements."
      },
      {
        id: 3,
        name: "User Journey Mapper",
        description: "Map customer journeys and touchpoints to understand pain points and optimization opportunities."
      }
    ]
  },
  "revenue-opportunity-validation": {
    inputs: ["BUSINESS_MODEL", "REVENUE_STREAMS", "TARGET_MARKET"],
    agents: [
      {
        id: 1,
        name: "Revenue Model Analyzer",
        description: "Analyze revenue model viability and scalability potential using market data and business model frameworks."
      },
      {
        id: 2,
        name: "Pricing Strategy Evaluator",
        description: "Evaluate pricing strategies and models to optimize revenue potential and market penetration."
      },
      {
        id: 3,
        name: "Market Monetization Assessor",
        description: "Assess market monetization opportunities and revenue stream diversification potential."
      },
      {
        id: 4,
        name: "Financial Projection Modeler",
        description: "Create financial projections and revenue forecasts based on market analysis and business model validation."
      }
    ]
  },
  "new-product-feasibility-study": {
    inputs: ["COMPANY", "IDEA", "MARKET_CONTEXT"],
    agents: [
      {
        id: 1,
        name: "Organization Strategic Goals Mapping",
        description: "Outline growth areas and investment priorities to build a solid foundation for market analysis and business opportunity assessment."
      },
      {
        id: 2,
        name: "Idea Strategic Alignment",
        description: "Score the idea's alignment with corporate goals using evidence-based business analysis techniques."
      },
      {
        id: 3,
        name: "Innovation Field & Market Trends",
        description: "Examine industry trends, ecosystem strength, and innovation potential to validate your market opportunity."
      },
      {
        id: 4,
        name: "Internal Capability & Skill Audit",
        description: "Evaluate internal technical skills, supply chain strengths, and key resources needed for successful business execution."
      },
      {
        id: 5,
        name: "Business Problem Statement Validation",
        description: "Validate problem statements with evidence to confirm market demand and guide product strategy."
      },
      {
        id: 6,
        name: "Customer Pain Point Extraction",
        description: "Identify authentic customer pain points from feedback, reviews, and research for accurate opportunity mapping."
      },
      {
        id: 7,
        name: "Market Opportunity Analysis",
        description: "Contextualize the business opportunity by analyzing market size, growth trends, and competitive dynamics."
      },
      {
        id: 8,
        name: "Solution Readiness & Feasibility Check",
        description: "Assess technical feasibility and solution readiness to determine implementation viability and resource requirements."
      },
      {
        id: 9,
        name: "Unique Value Proposition Scoring",
        description: "Evaluate the innovation and disruptive potential of your idea to highlight its competitive advantage."
      },
      {
        id: 10,
        name: "Risk & Strengths Synthesis",
        description: "Consolidate evaluation results to highlight actionable steps that improve validation and success."
      }
    ]
  },
  "market-intelligence-report": {
    inputs: ["INDUSTRY", "COMPETITORS", "MARKET_SEGMENT"],
    agents: [
      {
        id: 1,
        name: "Competitive Intelligence Analyst",
        description: "Analyze competitor strategies, market positioning, and competitive advantages to inform strategic decisions."
      },
      {
        id: 2,
        name: "Market Dynamics Evaluator",
        description: "Evaluate market dynamics, trends, and forces shaping industry evolution and competitive landscape."
      },
      {
        id: 3,
        name: "Industry Trend Forecaster",
        description: "Forecast industry trends and identify emerging opportunities based on market intelligence and data analysis."
      },
      {
        id: 4,
        name: "Strategic Positioning Advisor",
        description: "Provide strategic positioning recommendations based on market intelligence and competitive analysis."
      },
      {
        id: 5,
        name: "Market Entry Strategy Planner",
        description: "Develop market entry strategies and tactical recommendations for competitive advantage."
      }
    ]
  },
  "enterprise-idea-assessment": {
    inputs: ["COMPANY", "IDEA", "STRATEGIC_CONTEXT", "RESOURCES"],
    agents: [
      {
        id: 1,
        name: "Strategic Alignment Evaluator",
        description: "Evaluate idea alignment with enterprise strategic goals and long-term business objectives."
      },
      {
        id: 2,
        name: "Resource Requirement Analyst",
        description: "Analyze resource requirements including capital, human resources, and technological capabilities needed."
      },
      {
        id: 3,
        name: "Market Opportunity Assessor",
        description: "Assess market opportunity size, growth potential, and competitive landscape for enterprise-scale deployment."
      },
      {
        id: 4,
        name: "Risk & Compliance Evaluator",
        description: "Evaluate risks, regulatory compliance requirements, and potential barriers to implementation."
      },
      {
        id: 5,
        name: "Financial Impact Modeler",
        description: "Model financial impact including ROI projections, cost-benefit analysis, and investment requirements."
      },
      {
        id: 6,
        name: "Implementation Roadmap Designer",
        description: "Design implementation roadmap with milestones, dependencies, and success metrics for enterprise execution."
      },
      {
        id: 7,
        name: "Technology Feasibility Assessor",
        description: "Assess technology feasibility, integration requirements, and technical implementation challenges."
      },
      {
        id: 8,
        name: "Stakeholder Impact Analyzer",
        description: "Analyze stakeholder impact and change management requirements for successful enterprise adoption."
      },
      {
        id: 9,
        name: "Competitive Advantage Evaluator",
        description: "Evaluate competitive advantages and differentiation potential in enterprise market contexts."
      },
      {
        id: 10,
        name: "Enterprise Readiness Scorer",
        description: "Score overall enterprise readiness and provide recommendations for successful idea implementation."
      }
    ]
  }
};

export default function ProductDetails({ productId }: { productId: string }) {
  const config = productConfigurations[productId];
  
  if (!config) {
    return null;
  }

  const { inputs, agents } = config;

  return (
    <div className="space-y-8">
      {/* What You Get Section */}
      <div className="bg-gradient-to-br from-background via-muted/5 to-background rounded-2xl p-8 border border-primary/20">
        <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
          <CheckCircle className="w-6 h-6 text-primary mr-3" />
          What You Get
        </h3>
        
        {/* Your Inputs */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <FileText className="w-5 h-5 text-primary mr-2" />
            Your Inputs
          </h4>
          <div className="flex flex-wrap gap-3">
            {inputs.map((input, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2 text-sm font-medium border-primary/30 text-primary bg-primary/10">
                {input.replace(/_/g, ' ')}
              </Badge>
            ))}
          </div>
        </div>

        {/* AI Agents */}
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-6 flex items-center">
            <Brain className="w-5 h-5 text-primary mr-2" />
            AI Research Agents ({agents.length} agents working on your analysis)
          </h4>
          
          <div className="grid gap-4">
            {agents.map((agent) => (
              <Card key={agent.id} className="border border-primary/20 bg-card/50 hover:bg-card/80 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-foreground flex items-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-primary">{agent.id}</span>
                    </div>
                    {agent.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-foreground/70 leading-relaxed">{agent.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Information */}
      <div className="bg-gradient-to-br from-primary/5 to-green-400/5 rounded-2xl p-6 border border-primary/20">
        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 text-primary mr-2" />
          What You'll Receive
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground/80">Comprehensive PDF Report</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground/80">PowerPoint Presentation</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground/80">Shareable Public Link</span>
          </div>
        </div>
      </div>
    </div>
  );
}