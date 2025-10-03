import { line } from 'drizzle-orm/pg-core';
import React from 'react'
import { useState, useEffect, useRef } from 'react';
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
import { dataTagSymbol } from '@tanstack/react-query';



interface ApiResponse {
        id?: string;
        processing_status?: string;
        [key: string]: any;
        
        }  

const Api = () => {
    const [resp, setResp] = useState<ApiResponse | any>([]);
    const [finalResult, setFinalResult] = useState<ApiResponse | any>(null);
    const [lines, setLines] = useState<string[]>([]);
    const [results, setResults] = useState<ApiResponse| string>([]);
    const [expandedSections, setExpandedSections] =useState<Set<any>>(new Set());
    const BASE_URL = "https://plan.validatorai.com/feasibility/api.php";
    const FLOW_TEMPLATE_ID = "bae9d61f-176f-4b5b-9a66-6c700e9f8604";
    const API_KEY = "oKEkzm4m8x65RL3GgFp1ZEuRuqtNEFTZdwa3OsLp3j8Pp-nK355eQ2DMhgJ3-KWZfAfcJ4q-4wD9iPnYdPsmwQ"; // <-- set your API key here


    const POLL_INTERVAL_SECONDS =  60 * 100;

     
     const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


    const startFlow = async (): Promise<any | null> => {
        try {
            const response = await fetch(`${BASE_URL}`, 
                { method : 'POST',  
               headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          
        },
  credentials: 'include',
        body: JSON.stringify({
          flow_execution_variables: [
            { name: "TARGET_MARKET", variable_value: "Maritime Logistics" },
            { name: "PRODUCT_IDEA", variable_value: "An AI-powered ETA & route optimizer that ingests weather, port congestion, and fuel cost data to recommend routes and schedules — reduces delays and bunker costs while improving on-time delivery." }
          ]
        })
      });

      
            let data = await response.text();
            let cleaned = data.replace(/<hr\s*\/?>/gi, "");

            let finalData = JSON.parse(cleaned);
           console.log(finalData);

            
            setResp(finalData);
            
            if (!response.ok) {
              
              throw new Error(`API request failed with status ${response.status}.`);
            }   



           return data;
        } catch (error) {
            console.log(error);
          
            console.error('JSON parse error:', error);
         
            
       
            return null;
        }
    }
    

    const pollCount = useRef(0);
    const pollUntilComplete = async(execution_id : string) => {
      const MAX_POLLS = 8;

     
        try {
       
        for (let i = 0; i < MAX_POLLS; i++) {
                const response = await fetch(`${BASE_URL}`, 
                { method : 'GET',  
                headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          "execution_id" : "1fcda3d7-f470-4e8f-9c9a-47a48543b5b0"
        })
      });

      pollCount.current++;
                console.log("Connection count: ",  pollCount.current);

                
            
            let data = await response.text();
            let cleaned = data.replace(/<hr\s*\/?>/gi, "");

            let finalData = JSON.parse(cleaned);
           console.log(finalData);
            
            setResults(finalData);
            const status = finalData.processing_status;  

            console.log(status);
                setLines(prev => [...prev, `Status: ${status}`]);
                

                if (status === 'finished' || status === 'failed') {
                  break;
                    
                }

                await sleep(POLL_INTERVAL_SECONDS);
              
            }
          
        } catch (error) {
            console.log(error);
            console.error('JSON parse error:', error);
           console.log(results);
            return null;
        }
    
  }
  

    useEffect(() => {
        const runFlow = async () => {
            const execution_id = await startFlow();
            if(!execution_id) return;
            const result = await pollUntilComplete(execution_id);
        setFinalResult(result);
        };

        console.log(resp);

        runFlow();
        }, []);

       
        console.log(lines);
        console.log("Results:", results);
        console.log("Response:", resp);
        

        const toggleSection = (sectionId: any) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };
    

    return(
<div></div>
      
    //   <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background">
    //        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
    //          Report Header
    //          <Card className="mb-6 sm:mb-8 border-2 border-primary/20 shadow-lg">
    //            <CardHeader className="pb-4">
    //              <div className="flex flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0">
    //                <div className="space-y-2 flex-1">
    //                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
    //                    <FileText className="w-4 h-4 mr-2" />
    //                    Research Report
    //                  </Badge>
    //                  <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
    //                    {resp?.title}
    //                  </CardTitle>
    //                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
    //                    <div className="flex items-center space-x-2">
                         
    //                      <span></span>
    //                    </div>
    //                    <div className="flex items-center space-x-2">
    //                      <Database className="w-4 h-4" />
    //                      <span></span>
    //                    </div>
    //                  </div>
    //                </div>
    //                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
    //                  <Button variant="outline" size="sm" data-testid="button-download-report" className="hidden sm:flex">
    //                    <Download className="w-4 h-4 mr-2" />
    //                    Download PDF
    //                  </Button>
    //                  <Button variant="outline" size="sm" data-testid="button-share-report" className="w-full sm:w-auto">
    //                    <Share2 className="w-4 h-4 mr-2" />
    //                    <span className="sm:hidden">Share Report</span>
    //                    <span className="hidden sm:inline">Share</span>
    //                  </Button>
    //                </div>
    //              </div>
    //            </CardHeader>
    //            <CardContent>
    //              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
    //                {/* {resp?.description} */}
    //              </p>
    //            </CardContent>
    //          </Card>

    //          <div className="space-y-4 sm:space-y-6">
    //                    {resp?.flow_execution_steps.map((steps: { id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
    //                      <Card key={steps?.id} className="border border-muted shadow-sm">
    //                        <CardHeader 
    //                          className="cursor-pointer hover:bg-muted/50 transition-colors touch-manipulation"
    //                          onClick={() => toggleSection(steps?.id)}
    //                        >
    //                          <div className="flex items-center justify-between">
    //                            <CardTitle className="text-lg sm:text-xl font-semibold flex items-center leading-tight">
    //                              {/* {section.id === 'target-customers' && <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
    //                              {section.id === 'market-trends' && <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
    //                              {section.id === 'regulatory-impact' && <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
    //                              {section.id === 'strategic-implications' && <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
    //                              {section.id === 'ai-marketplace-mindmap' && <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
    //                              {section.id === 'profitability-forecast' && <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
    //                              {section.id === 'technical-feasibility' && <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
    //                              {section.id === 'risk-analysis' && <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" />}
    //                              {section.id === 'final-recommendations' && <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-primary flex-shrink-0" /> */}
    //                              <span className="pr-2">{steps?.title}</span>
    //                            </CardTitle>
    //                            {expandedSections.has(steps?.id) ? 
    //                              <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" /> : 
    //                              <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
    //                            }
    //                          </div>
    //                        </CardHeader>
                           
                          
    //                      </Card>
    //                    ))}
    //                  </div>
             
    //  </div>
    //  </div>

    )
}

export default Api
