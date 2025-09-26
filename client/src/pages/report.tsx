import { useParams } from "wouter";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Clock, 
  Database, 
  Users, 
  TrendingUp, 
  Shield, 
  Lightbulb,
  ExternalLink,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  Globe,
  BarChart3,
  Target,
  Zap
} from "lucide-react";

interface ReportData {
  title: string;
  duration: string;
  sourceCount: number;
  answers: string;
  sections: ReportSection[];
  sources: Source[];
  qaQuestions: QAQuestion[];
}

interface ReportSection {
  id: string;
  title: string;
  content: string;
  subsections?: ReportSubsection[];
  tables?: TableData[];
  mindmap?: MindmapData;
}

interface ReportSubsection {
  title: string;
  content: string;
}

interface TableData {
  title: string;
  headers: string[];
  rows: string[][];
}

interface Source {
  title: string;
  url: string;
  description?: string;
}

interface QAQuestion {
  question: string;
  duration?: string;
  sourceCount?: number;
  isAnswered?: boolean;
}

interface MindmapData {
  centralTopic: string;
  branches: MindmapBranch[];
}

interface MindmapBranch {
  title: string;
  items: string[];
}

export default function ReportPage() {
  const params = useParams();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock data based on the sample report - in production this would come from FifthRow API
  useEffect(() => {
    // Simulate loading the report data
    setTimeout(() => {
      setReportData({
        title: "New Product Feasibility Study",
        duration: "25m 54s",
        sourceCount: 88,
        answers: "Complete feasibility analysis with market positioning, customer segmentation, competitive landscape assessment, profitability forecasting, technical resource review, risk analysis, and structured go/no-go evaluation framework to support your strategic decision-making.",
        sections: [
          {
            id: "opportunity-mapping",
            title: "1. Opportunity Mapping & Market Insights",
            content: "Comprehensive analysis of target customer segments, market trends, innovations, and competitive landscape to identify strategic opportunities.",
            subsections: [
              {
                title: "Target Customer Segments & Their Needs",
                content: "Below is a comprehensive analysis of target customer segments, their specific needs, and pain points. Each segment benefits from data-driven evaluations that improve confidence, efficiency, and market positioning."
              },
              {
                title: "Market Trends, Innovations & Competitor Landscape", 
                content: "Recent advancements in AI are fundamentally reshaping how markets operate. Key trends include AI-powered autonomous agents, domain-specific AI models, real-time analytics, and enhanced efficiency through automation."
              },
              {
                title: "Regulatory Impact & Technology Advancements",
                content: "Integration of legal frameworks and advanced analytics is critical, including compliance requirements, security enhancements, and advanced AI & analytics deployment."
              }
            ],
            tables: [
              {
                title: "Target Customer Segments Analysis",
                headers: ["Customer Segment", "Description", "Key Needs", "Pain Points", "Sources"],
                rows: [
                  ["Early Adopters", "Tech-savvy users seeking innovative solutions", "• Predictive insights\n• Data-driven scoring\n• Transparency", "• Opaque valuations\n• Limited market data", "BCG, CMSWire"],
                  ["Enterprise Clients", "Large organizations with established processes", "• Automated valuations\n• Efficiency tools\n• Rapid liquidity", "• Manual evaluation\n• High operational costs", "Flippa, Afternic"],
                  ["SMB Market", "Small to medium businesses", "• Instant evaluation\n• Transaction efficiency\n• Low overhead", "• Scalability issues\n• Administrative costs", "DNIB, Afternic"],
                  ["Digital Asset Managers", "Firms managing large inventories", "• Dynamic analytics\n• System integration\n• Real-time tracking", "• Data overload\n• Operational inefficiencies", "Relevance AI, Medium"]
                ]
              }
            ]
          },
          {
            id: "profitability-forecast",
            title: "2. Profitability Forecast & Cost Modeling",
            content: "Detailed financial analysis including development costs, revenue projections, and profitability scenarios based on industry benchmarks and market data.",
            subsections: [
              {
                title: "Development & Production Cost Estimate",
                content: "Itemized breakdown of estimated development and production costs for launching the product, including pre-development, design, engineering, AI integration, testing, and ongoing maintenance."
              },
              {
                title: "Revenue & Profitability Projection",
                content: "Analysis of multiple revenue streams, market size assessments, and projected profitability scenarios across a 3-year timeline with realistic growth assumptions."
              }
            ],
            tables: [
              {
                title: "Development Cost Breakdown",
                headers: ["Category", "Low-End Estimate", "High-End Estimate", "Details"],
                rows: [
                  ["Pre-Development & Planning", "$6,000", "$16,000", "Market research, business model, feature planning"],
                  ["Design", "$5,000", "$30,000+", "UI/UX wireframes, mockups, custom design"],
                  ["Core Development", "$60,000", "$150,000+", "Frontend, backend, mobile development"],
                  ["Advanced Add-Ons", "$13,000", "$55,000+", "AI integration, legal/IP tools, security"],
                  ["Testing & Launch", "$7,000", "$25,000", "QA testing, beta launch, marketing"],
                  ["Annual Maintenance", "$5,000/yr", "$15,000/yr", "Updates, hosting, scaling costs"]
                ]
              },
              {
                title: "Revenue Projection (3-Year Scenario)",
                headers: ["Metric", "Year 1", "Year 2", "Year 3"],
                rows: [
                  ["Product Sales", "1,000", "2,500", "7,500"],
                  ["Average Transaction Value", "$250", "$300", "$350"],
                  ["Gross Sales", "$250,000", "$750,000", "$2,625,000"],
                  ["Revenue (10% Commission)", "$25,000", "$75,000", "$262,500"],
                  ["Additional Revenue Streams", "$275,000", "$550,000", "$1,375,000"],
                  ["Total Revenue", "$300,000", "$625,000", "$1,637,500"]
                ]
              }
            ]
          },
          {
            id: "technical-feasibility",
            title: "3. Technical Feasibility & Resource Review",
            content: "Assessment of core technology requirements, architecture design, scalability considerations, and technical innovations needed for successful implementation.",
            subsections: [
              {
                title: "Core Technology and Architecture",
                content: "Implementation requires multimodal AI/ML models, real-time data engineering pipelines, blockchain integration, and scalable cloud infrastructure with GPU optimization."
              },
              {
                title: "Technical Innovations",
                content: "Hybrid AI models with recursive learning, explainable AI (XAI) techniques, interactive dashboards, and user feedback loops for continuous model refinement."
              }
            ],
            tables: [
              {
                title: "Technical Architecture Components",
                headers: ["Layer", "Technology", "Purpose", "Implementation"],
                rows: [
                  ["AI/ML Model Layer", "Deep Learning, NLP, Graph Neural Networks", "Evaluate quality, brand potential, SEO metrics", "Multimodal analysis with XAI"],
                  ["Data Engineering", "Real-time pipelines, ETL processes", "Integrate WHOIS, DNS, sales data", "Continuous data quality assurance"],
                  ["Blockchain Integration", "Smart contracts, Multisig wallets", "Secure transactions, escrow automation", "2-of-3 schemes, tamper-proof recording"],
                  ["API Layer", "RESTful/GraphQL interfaces", "External integrations, CRM connectivity", "Modular design for partnerships"],
                  ["Cloud Infrastructure", "GPU-optimized, Kubernetes", "Scalability, real-time processing", "Sub-second response times"]
                ]
              }
            ]
          },
          {
            id: "strategic-risk",
            title: "4. Strategic Risk & Exposure Analysis",
            content: "Comprehensive risk assessment covering algorithmic, operational, regulatory, and market risks with specific mitigation strategies for each identified threat.",
            tables: [
              {
                title: "Risk Assessment & Mitigation Strategies",
                headers: ["Risk Category", "Impact Level", "Mitigation Strategy", "Implementation"],
                rows: [
                  ["Algorithmic Mispricing & Model Bias", "High", "Implement robust XAI, continuous audits", "SHAP, LIME analysis, human oversight"],
                  ["Data Vulnerabilities", "Medium", "Automated ETL with anomaly detection", "Diverse data sources, adversarial testing"],
                  ["Regulatory & Legal Risks", "High", "Automated legal/IP vetting modules", "Compliance documentation, human-in-loop"],
                  ["Transparency Issues", "Medium", "Interactive visual XAI dashboards", "Model cards, detailed scoring rubrics"],
                  ["Operational Risks", "Medium", "Cloud-native auto-scaling", "Kubernetes orchestration, redundancy"],
                  ["Market Confidence Risk", "High", "Constant feedback loops, anomaly detection", "Rapid corrective measures, model retraining"]
                ]
              }
            ]
          },
          {
            id: "synthesis-evaluation",
            title: "5. Synthesis Go/No-Go Evaluation",
            content: "Final strategic recommendations based on comprehensive analysis of market opportunity, financial viability, technical feasibility, and risk assessment.",
            subsections: [
              {
                title: "Final Recommendations",
                content: "The feasibility study shows strong market demand, viable revenue models, and technically proven solutions. The integration of advanced AI scoring, blockchain escrow, and compliance frameworks lays a solid foundation."
              },
              {
                title: "Key Success Factors",
                content: "Prioritize transparency through explainable AI, deploy smart escrow systems, monitor competitive fee structures, invest in continuous compliance, and implement feedback loops for model refinement."
              }
            ],
            tables: [
              {
                title: "Go/No-Go Decision Matrix",
                headers: ["Evaluation Criteria", "Score (1-10)", "Weight", "Weighted Score", "Comments"],
                rows: [
                  ["Market Opportunity", "9", "25%", "2.25", "Strong demand, growing TAM of $500M+"],
                  ["Financial Viability", "8", "25%", "2.0", "Multiple revenue streams, 60-80% margins"],
                  ["Technical Feasibility", "8", "20%", "1.6", "Proven technologies, scalable architecture"],
                  ["Competitive Position", "7", "15%", "1.05", "Differentiated AI approach, established competitors"],
                  ["Risk Management", "7", "15%", "1.05", "Identifiable risks with mitigation strategies"],
                  ["Total Score", "", "100%", "7.95", "STRONG GO - Proceed with implementation"]
                ]
              }
            ]
          }
        ],
        sources: [
          {
            title: "BCG – How AI Agents Are Opening the Golden Era of Customer Experience",
            url: "https://www.bcg.com/publications/2025/how-ai-agents-opening-golden-era-customer-experience",
            description: "Comprehensive analysis of AI impact on customer experience"
          },
          {
            title: "PYMNTS – AI to Power Personalized Shopping Experiences in 2025",
            url: "https://www.pymnts.com/artificial-intelligence-2/2024/ai-to-power-personalized-shopping-experiences-in-2025/",
            description: "Market trends in AI-powered personalization"
          },
          {
            title: "AiThority – AI Trends for 2025: The Rise of Agents and Adaptive Experiences",
            url: "https://aithority.com/machine-learning/ai-trends-for-2025-the-rise-of-agents-and-adaptive-experiences/",
            description: "Future trends in AI technology and applications"
          }
        ],
        qaQuestions: [
          {
            question: "What are the latest trends, innovations, and challenges shaping the target market in 2024-2025?",
            duration: "4m 17s",
            sourceCount: 12,
            isAnswered: false
          },
          {
            question: "How can AI-driven personalization be further enhanced to meet evolving customer expectations?",
            duration: "3m 45s", 
            sourceCount: 8,
            isAnswered: false
          },
          {
            question: "What are the projected growth rates and potential market disruptions for 2025-2027?",
            duration: "5m 22s",
            sourceCount: 15,
            isAnswered: false
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [params]);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg text-muted-foreground">Loading your research report...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-bold">Report Not Found</h1>
          <p className="text-muted-foreground">The requested report could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Header */}
        <Card className="mb-8 border-2 border-primary/20 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <FileText className="w-4 h-4 mr-2" />
                  Research Report
                </Badge>
                <CardTitle className="text-3xl font-bold text-foreground">
                  {reportData.title}
                </CardTitle>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{reportData.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4" />
                    <span>{reportData.sourceCount} sources</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" data-testid="button-download-report">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {reportData.answers}
            </p>
          </CardContent>
        </Card>

        {/* Report Sections */}
        <div className="space-y-6">
          {reportData.sections.map((section) => (
            <Card key={section.id} className="border border-muted shadow-sm">
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    {section.id === 'opportunity-mapping' && <Users className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'profitability-forecast' && <TrendingUp className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'technical-feasibility' && <BarChart3 className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'strategic-risk' && <Shield className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'synthesis-evaluation' && <Target className="w-5 h-5 mr-3 text-primary" />}
                    {section.title}
                  </CardTitle>
                  {expandedSections.has(section.id) ? 
                    <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  }
                </div>
              </CardHeader>
              
              {expandedSections.has(section.id) && (
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  
                  {/* Tables */}
                  {section.tables?.map((table, tableIndex) => (
                    <div key={tableIndex} className="space-y-3">
                      <h4 className="font-semibold text-lg">{table.title}</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border border-muted rounded-lg overflow-hidden">
                          <thead className="bg-muted/50">
                            <tr>
                              {table.headers.map((header, headerIndex) => (
                                <th key={headerIndex} className="px-4 py-3 text-left font-semibold text-sm">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {table.rows.map((row, rowIndex) => (
                              <tr key={rowIndex} className="border-t border-muted hover:bg-muted/20">
                                {row.map((cell, cellIndex) => (
                                  <td key={cellIndex} className="px-4 py-3 text-sm leading-relaxed">
                                    {cell.split('\n').map((line, lineIndex) => (
                                      <div key={lineIndex} className={lineIndex > 0 ? 'mt-1' : ''}>
                                        {line}
                                      </div>
                                    ))}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}

                  {/* Subsections */}
                  {section.subsections?.map((subsection, subsectionIndex) => (
                    <div key={subsectionIndex} className="space-y-3">
                      <h4 className="font-semibold text-lg flex items-center">
                        <Lightbulb className="w-4 h-4 mr-2 text-primary" />
                        {subsection.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed pl-6">{subsection.content}</p>
                    </div>
                  ))}

                  {/* Mindmap */}
                  {section.mindmap && (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6">
                        <div className="text-center mb-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-3">
                            <Zap className="w-8 h-8 text-primary" />
                          </div>
                          <h4 className="text-xl font-bold">{section.mindmap.centralTopic}</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {section.mindmap.branches.map((branch, branchIndex) => (
                            <Card key={branchIndex} className="bg-background/50 border-primary/20">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-semibold">{branch.title}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-2">
                                  {branch.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="text-sm text-muted-foreground flex items-center">
                                      <div className="w-2 h-2 bg-primary/60 rounded-full mr-3"></div>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Sources Section */}
        <Card className="mt-8 border border-muted">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-3 text-primary" />
              Key Industry Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {reportData.sources.map((source, sourceIndex) => (
                <div key={sourceIndex} className="flex items-start space-x-3 p-3 rounded-lg border border-muted hover:bg-muted/20 transition-colors">
                  <ExternalLink className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline"
                    >
                      {source.title}
                    </a>
                    {source.description && (
                      <p className="text-sm text-muted-foreground">{source.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Q&A Section */}
        <Card className="mt-8 border border-muted">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="w-5 h-5 mr-3 text-primary" />
              Additional Research Questions
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              These questions can be explored for deeper insights into your market opportunity.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.qaQuestions.map((qa, qaIndex) => (
                <div key={qaIndex} className="border border-muted rounded-lg p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <h4 className="font-semibold text-foreground leading-relaxed">{qa.question}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        {qa.duration && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{qa.duration}</span>
                          </div>
                        )}
                        {qa.sourceCount && (
                          <div className="flex items-center space-x-1">
                            <Database className="w-3 h-3" />
                            <span>{qa.sourceCount} sources</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="ml-4" data-testid={`button-explore-${qaIndex}`}>
                      Explore
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="mt-8 text-center space-y-4">
          <Separator />
          <div className="flex justify-center space-x-4">
            <Button variant="outline" data-testid="button-new-report">
              <FileText className="w-4 h-4 mr-2" />
              Order New Report
            </Button>
            <Button variant="outline" data-testid="button-contact-support">
              Contact Support
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Report generated by FifthRow AI Research Platform • SOC2 & GDPR Compliant
          </p>
        </div>
      </div>
    </div>
  );
}