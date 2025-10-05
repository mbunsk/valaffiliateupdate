import { useParams } from "wouter";
import { useState, useEffect, useRef, JSX, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import mermaid from 'mermaid';
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

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#3b82f6',
    primaryTextColor: '#ffffff',
    primaryBorderColor: '#1e40af',
    lineColor: '#6b7280',
    secondaryColor: '#1f2937',
    tertiaryColor: '#111827'
  }
});

// Mermaid diagram rendering function
const renderMermaidDiagrams = (content: string): string => {
  const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/g;
  let diagramCounter = 0;
  
  return content.replace(mermaidRegex, (match, diagramCode) => {
    const diagramId = `mermaid-${Date.now()}-${diagramCounter++}`;
    
    // Create a placeholder div that will be replaced with the rendered diagram
    return `<div id="${diagramId}" class="mermaid-diagram my-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
      <div class="text-center text-gray-400 mb-2">Loading diagram...</div>
      <pre class="hidden">${diagramCode}</pre>
    </div>`;
  });
};

// Table conversion functions
const convertMarkdownTables = (content: string): string => {
  // Regular expression to match markdown tables
  const tableRegex = /(\|.*\|[\r\n]+)+(\|[\s\-\|]+[\r\n]+)+(\|.*\|[\r\n]*)+/g;
  
  return content.replace(tableRegex, (match) => {
    const lines = match.trim().split('\n').filter(line => line.trim());
    
    if (lines.length < 2) return match; // Need at least header and separator
    
    // Find separator line (contains only |, -, and spaces)
    let separatorIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/^\|[\s\-\|]+\|?$/.test(lines[i].trim())) {
        separatorIndex = i;
        break;
      }
    }
    
    if (separatorIndex === -1) return match; // No valid separator found
    
    // Extract header and data rows
    const headerRow = lines[0];
    const dataRows = lines.slice(separatorIndex + 1);
    
    // Parse header
    const headerCells = parseTableRow(headerRow);
    
    // Parse data rows
    const dataCells = dataRows.map(row => parseTableRow(row));
    
    // Generate HTML table
    let tableHtml = '<div class="overflow-x-auto my-4"><table class="table-auto border-collapse bg-black text-white w-full">';
    
    // Header row
    tableHtml += '<thead className="bg-black text-white border border-gray"><tr class="bg-black text-white">';
    headerCells.forEach(cell => {
      tableHtml += `<th class="align-middle text-center  px-4 py-2 text-left font-semibold text-base sm:text-m">${formatTableCell(cell)}</th>`;
    });
    tableHtml += '</tr></thead>';
    
    // Data rows
    tableHtml += '<tbody>';
    dataCells.forEach((row, index) => {
      const rowClass = 'bg-black';
      tableHtml += `<tr class="${rowClass} bg-black text-white">`;
      row.forEach(cell => {
        tableHtml += `<td class=" text-base sm:text-sm  leading-relaxed  px-4 py-2">${formatTableCell(cell)}</td>`;
      });
      tableHtml += '</tr>';
    });
    tableHtml += '</tbody>';
    
    tableHtml += '</table></div>';
    
    return tableHtml;
  });
};

const parseTableRow = (row: string): string[] => {
  // Split by | and clean up
  const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
  return cells;
};

const formatTableCell = (cell: string): string => {
  if (!cell) return '';
  
  // Convert markdown formatting within table cells
  let formatted = cell
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
    // Handle N/A and similar placeholders
    .replace(/N\/A/g, '<span class="text-gray-500 italic">N/A</span>')
    // Handle line breaks within cells
    .replace(/\n/g, '<br>');
  
  return formatted;
};

const parseMarkdownContent = (content: string): string => {
  if (!content) return '';
  
  // First, render Mermaid diagrams
  let html = renderMermaidDiagrams(content);
  
  // Then, convert markdown tables to HTML
  html = convertMarkdownTables(html);
  
  // Then convert other markdown-like content to HTML
  html = html
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
    // Lists
    .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4">$2</li>')
    // Line breaks
    .replace(/\n/g, '<br>')
    .replace(/###/g, '');
  
  // Wrap lists in ul tags
  html = html.replace(/(<li class="ml-4">.*<\/li>)/g, '<ul class="list-disc ml-6 mb-4">$1</ul>');
  
  return html;
};

export default function ReportPage() {
  const { reportId } = useParams();
  const params = useParams();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  
  const [expandedSections, setExpandedSections] =useState<Set<any>>(new Set());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Declare all state variables first
  const [finalResult, setFinalResult] = useState<ApiResponse | any>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [results, setResults] = useState<ApiResponse[]>([]);

  console.log('ReportPage component mounted');
  console.log('reportId from params:', reportId);
  console.log('all params:', params);

  // Render Mermaid diagrams after content is loaded
  useEffect(() => {
    const renderMermaidDiagrams = async () => {
      const diagrams = document.querySelectorAll('.mermaid-diagram');
      diagrams.forEach(async (diagram) => {
        const pre = diagram.querySelector('pre');
        if (pre) {
          const diagramCode = pre.textContent;
          if (diagramCode) {
            try {
              const { svg } = await mermaid.render(diagram.id, diagramCode);
              diagram.innerHTML = svg;
            } catch (error) {
              console.error('Mermaid rendering error:', error);
              diagram.innerHTML = '<div class="text-red-400 text-center">Error rendering diagram</div>';
            }
          }
        }
      });
    };

    if (results.length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(renderMermaidDiagrams, 100);
    }
  }, [results]);
  const BASE_URL = "https://plan.validatorai.com/feasibility/api.php";
      const FLOW_TEMPLATE_ID = "bae9d61f-176f-4b5b-9a66-6c700e9f8604";
      const API_KEY = "oKEkzm4m8x65RL3GgFp1ZEuRuqtNEFTZdwa3OsLp3j8Pp-nK355eQ2DMhgJ3-KWZfAfcJ4q-4wD9iPnYdPsmwQ"; // <-- set your API key here
  
      // const BASE_URL = "https://api-public.fifthrow.com";
      //   ${BASE_URL }/api/v1/flow-executions/flow-templates/{$FLOW_TEMPLATE_ID};

      // ${BASE_URL }/api/v1/flow-executions/{$execution_id};

  const POLL_INTERVAL_SECONDS =  6000;
  
       
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));



  
      const pollCount = useRef(0);

     

      const pollUntilComplete = async(execution_id : string) => {
        console.log('pollUntilComplete called with execution_id:', execution_id);
        console.log('BASE_URL:', BASE_URL);
        
        const MAX_POLLS = 8;
        let lastData: any = null;
    
          while(true) {
            setLoading(true);
            try {
              console.log('Making API call to:', BASE_URL);
              console.log('Request body:', JSON.stringify({ execution_id: execution_id }));
              
                  const response = await fetch(`${BASE_URL}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                    },
                    credentials: 'include', // crucial for PHP session
                    body: JSON.stringify({ execution_id: execution_id })
                  });

                  console.log('Response status:', response.status);
                  console.log('Response ok:', response.ok);

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
              console.error('API call failed:', error);
              if (error instanceof Error) {
                console.error('Error details:', {
                  message: error.message,
                  stack: error.stack,
                  name: error.name
                });
              }
             
              
          }
      await sleep(POLL_INTERVAL_SECONDS);
        }
    }
    
  
      useEffect(() => {
          console.log('useEffect triggered, reportId:', reportId);
          const runFlow = async () => {
              const execution_id = reportId;
              console.log('runFlow called with execution_id:', execution_id);
              if(!execution_id) {
                console.log('No execution_id, returning early');
                return;
              }
              console.log('Starting pollUntilComplete...');
              const result = await pollUntilComplete(execution_id);
              console.log('pollUntilComplete completed, result:', result);
              setFinalResult(result);
          };

          console.log('Calling runFlow...');
          runFlow();
          }, [reportId]);
  
         
          
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

  console.log('Render check - lines:', lines);
  console.log('Render check - loading:', loading);
  console.log('Render check - results:', results);
  console.log('Render check - finalResult:', finalResult);

  if (lines && lines[lines.length - 1] != "Status: finished") {
    console.log('Showing loading screen');
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg text-muted-foreground">Loading your research report.  We have 10 AI agents doing the work of professional analysts.  The report will load here and be emailed to you in approximately 20 minutes.</p>
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
    console.log('Rendering finalResult content');
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
                  <div 
                    className="report-div prose prose-sm dark:prose-invert text-white text-base sm:text-s leading-relaxed  max-w-4xl  px-[1px]"
                    dangerouslySetInnerHTML={{ 
                      __html: parseMarkdownContent(typeof flow.raw_output === 'string' ? flow.raw_output : '') 
                    }}
                  />
        </CardContent>

        )}
        </Card>
          ))}
        </div>
        </div>
        </div>
  )
  }

  // Fallback case - no finalResult
  console.log('No finalResult, showing fallback');
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
        <h1 className="text-2xl font-bold">No Report Data</h1>
        <p className="text-muted-foreground">No report data available. Check console for debugging info.</p>
        <div className="text-sm text-gray-500">
          <p>reportId: {reportId}</p>
          <p>results.length: {results.length}</p>
          <p>finalResult: {finalResult ? 'exists' : 'null'}</p>
        </div>
      </div>
    </div>
  );
}
