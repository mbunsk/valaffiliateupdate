import { useParams } from "wouter";
import { useState, useEffect, useRef, JSX, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
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
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

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

interface ApiResponse {
        id?: string;
        processing_status?: string;
        [key: string]: any;
        
        }  

export default function ReportPage() {
  const { reportId } = useParams();
  const params = useParams();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  
  const [expandedSections, setExpandedSections] =useState<Set<any>>(new Set());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  
      const [finalResult, setFinalResult] = useState<ApiResponse | any>(null);
      const [lines, setLines] = useState<string[]>([]);
     const [results, setResults] = useState<ApiResponse[]>([]);
  const BASE_URL = "https://plan.validatorai.com/feasibility/api.php";
      const FLOW_TEMPLATE_ID = "bae9d61f-176f-4b5b-9a66-6c700e9f8604";
      const API_KEY = "oKEkzm4m8x65RL3GgFp1ZEuRuqtNEFTZdwa3OsLp3j8Pp-nK355eQ2DMhgJ3-KWZfAfcJ4q-4wD9iPnYdPsmwQ"; // <-- set your API key here
  
      // const BASE_URL = "https://api-public.fifthrow.com";
      //   ${BASE_URL }/api/v1/flow-executions/flow-templates/{$FLOW_TEMPLATE_ID};

      // ${BASE_URL }/api/v1/flow-executions/{$execution_id};

  const POLL_INTERVAL_SECONDS =  500;
  
       
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));



  
      const pollCount = useRef(0);

     

      const pollUntilComplete = async(execution_id : string) => {
        
        const MAX_POLLS = 8;
        let lastData: any = null;
    
          while(true) {
            setLoading(true);
            try {
              
                  const response = await fetch(`${BASE_URL}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                    },
                    credentials: 'include', // crucial for PHP session
                    body: JSON.stringify({ execution_id: execution_id })
                  });

                  const data = await response.json();
                  console.log('Data from PHP:', data);
                  
                  setResults(prev => [...prev, data]);

                  lastData = data;
                  pollCount.current++;
                  console.log("Connection count: ",  pollCount.current);
  
  
                  const status = data.processing_status;  
  
                  console.log(status);
                   setLines([`Status: ${status}`]);
                  
  
                  if (status === 'finished' || status === 'failed') {
                    setLoading(false);
                    setFinalResult(lastData);
                    return data;
                  
                      
                  }

            
          } catch (error) {
              console.log(error);
              console.warn('JSON parse error:', error);
             
              
          }
      await sleep(POLL_INTERVAL_SECONDS);
        }
    }
    
  
      useEffect(() => {
          const runFlow = async () => {
              const execution_id = reportId;
              if(!execution_id) return;
              const result = await pollUntilComplete(execution_id);
          setFinalResult(result);
          };
  
        
  
          runFlow();
          }, []);
  
         
          
          console.log(results);
          console.log(finalResult);
         
         
          
    

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  if (lines && lines[lines.length - 1] != "Status: finished") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg text-muted-foreground">Loading your research report...</p>
          <p className="text-lg text-muted-foreground">{lines}</p>
        </div>
      </div>
    );
  } 

  if (!reportId) {
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

  if (finalResult) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Report Header */}
        
        <Card className="mb-6 sm:mb-8 border-2 border-primary/20 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0">
              <div className="space-y-2 flex-1">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <FileText className="w-4 h-4 mr-2" />
                  Research Report
                </Badge>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  {finalResult.title}
                </CardTitle>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
                  
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
                <Button variant="outline" size="sm" data-testid="button-download-report" className="hidden sm:flex">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm" data-testid="button-share-report" className="w-full sm:w-auto">
                  <Share2 className="w-4 h-4 mr-2" />
                  <span className="sm:hidden">Share Report</span>
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {finalResult.description}
            </p>
          </CardContent>
        </Card>

        {/* Report Sections */}
        <div className="space-y-4 sm:space-y-6">
          {finalResult.flow_execution_steps.map((flow: { id: Key | null | any; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; raw_output: { split: (arg0: string) => { split: (arg0: string) => { (): any; new(): any; map: { (arg0: (line: any, lineIndex: any) => JSX.Element): string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; new(): any; }; length: number; }; }[]; }; }) => (
            <Card key={flow?.id} className="border border-muted shadow-sm">
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors touch-manipulation"
                onClick={() => toggleSection(flow?.id)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg sm:text-xl font-semibold flex items-center leading-tight">
                    {flow.id === 'target-customers' && <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
                    {flow.id === 'market-trends' && <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
                    {flow.id === 'regulatory-impact' && <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
                    {flow.id === 'strategic-implications' && <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
                    {flow.id === 'ai-marketplace-mindmap' && <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
                    {flow.id === 'profitability-forecast' && <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
                    {flow.id === 'technical-feasibility' && <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
                    {flow.id === 'risk-analysis' && <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
                    {flow.id === 'final-recommendations' && <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
                    <span className="pr-2">{flow.title}</span>
                  </CardTitle>
                  {expandedSections.has(flow.id) ? 
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" /> : 
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  }
                </div>
              </CardHeader>
              
              {expandedSections.has(flow.id) && (
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {flow.raw_output.split('\n\n').map((paragraph: { split: (arg0: string) => { (): any; new(): any; map: { (arg0: (line: any, lineIndex: any) => JSX.Element): string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; new(): any; }; length: number; }; }, index: Key | null | undefined) => (
                      <p key={index} className="text-white leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base break-words">
                        {paragraph.split('\n').map((line, lineIndex) => (
                          <span key={lineIndex}>
                             {line
                              .replace(/[*#]/g, '')
                              .replace(/\n\n\n\|/g, "<table>")
                              .replace(/\|\n\n\n/g, "</table>")}
                            {lineIndex < paragraph.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                  
                 
        </CardContent>

        )}
        </Card>
          ))}
        </div>
        </div>
        </div>
  )
}
}
