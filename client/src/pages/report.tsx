import { useParams } from "wouter";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

  // Mock data based on the sample report - in production this would come from FifthRow API
  useEffect(() => {
    // Simulate loading the report data
    setTimeout(() => {
      setReportData({
        title: "New Product Feasibility Study",
        duration: "25m 54s",
        sourceCount: 66,
        answers: "Complete feasibility analysis with market positioning, customer segmentation, competitive landscape assessment, and structured risk management framework to support your go/no-go decision.",
        sections: [
          {
            id: "customer-segments",
            title: "1. Target Customer Segments & Their Needs",
            content: "Below is a comprehensive analysis of target customer segments, their specific needs, and pain points. Each segment benefits from data-driven evaluations that improve confidence, efficiency, and market positioning.",
            tables: [
              {
                title: "Customer Segment Analysis",
                headers: ["Customer Segment", "Description", "Key Needs", "Pain Points", "Market Size"],
                rows: [
                  ["Early Adopters", "Tech-savvy users seeking innovative solutions", "• Cutting-edge features\n• Fast implementation\n• Competitive advantage", "• Limited proven solutions\n• High switching costs", "$2.5B"],
                  ["Enterprise Clients", "Large organizations with established processes", "• Scalability\n• Integration capabilities\n• Support & training", "• Complex approval processes\n• Risk aversion", "$8.1B"],
                  ["SMB Market", "Small to medium businesses", "• Cost-effective solutions\n• Easy implementation\n• Quick ROI", "• Limited budgets\n• Resource constraints", "$1.8B"]
                ]
              }
            ]
          },
          {
            id: "market-trends",
            title: "2. Market Trends, Innovations & Competitor Landscape",
            content: "Recent advancements in AI and technology are fundamentally reshaping how markets operate and how customers interact with products.",
            subsections: [
              {
                title: "Emerging Trends and Technological Advancements",
                content: "Key trends driving market evolution include AI-powered automation, real-time analytics, and enhanced user experiences that reduce operational costs while improving efficiency."
              },
              {
                title: "Competitor Landscape",
                content: "Leading competitors demonstrate strategies that align with technological advancements, focusing on data transparency, rapid transaction cycles, and integrated analytics platforms."
              }
            ]
          },
          {
            id: "regulatory-impact",
            title: "3. Regulatory Impact & Technology Advancements",
            content: "Integration of legal frameworks and advanced analytics is critical for market success, including compliance requirements and technological infrastructure needs."
          },
          {
            id: "strategic-implications",
            title: "4. Strategic Market Implications",
            content: "Analysis reveals key opportunities for enhanced market positioning, data-driven confidence building, regulatory assurance, and competitive differentiation through advanced technology integration."
          },
          {
            id: "mindmap",
            title: "5. Strategic Opportunity Mindmap",
            content: "Visual representation of key strategic opportunities and market relationships.",
            mindmap: {
              centralTopic: "Market Opportunity",
              branches: [
                {
                  title: "Target Customers",
                  items: ["Early Adopters", "Enterprise Clients", "SMB Market", "Industry Specialists"]
                },
                {
                  title: "Core Features",
                  items: ["AI-Powered Analytics", "Real-Time Insights", "Automated Processes", "Integration Capabilities"]
                },
                {
                  title: "Market Advantages",
                  items: ["First-Mover Advantage", "Technology Leadership", "Cost Efficiency", "Scalability"]
                },
                {
                  title: "Growth Strategies",
                  items: ["Partner Ecosystem", "Platform Expansion", "Geographic Growth", "Vertical Integration"]
                }
              ]
            }
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
                <Button variant="outline" size="sm" data-testid="button-share-report">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
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
                    {section.id === 'customer-segments' && <Users className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'market-trends' && <TrendingUp className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'regulatory-impact' && <Shield className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'strategic-implications' && <Target className="w-5 h-5 mr-3 text-primary" />}
                    {section.id === 'mindmap' && <BarChart3 className="w-5 h-5 mr-3 text-primary" />}
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