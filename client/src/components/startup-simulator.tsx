import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MessageCircle, TrendingUp, Download, CheckCircle, AlertCircle } from "lucide-react";

interface StartupSimulatorProps {
  validationData?: {
    idea: string;
    targetCustomer: string;
    problemSolved: string;
    feedback: string;
  };
}

interface Customer {
  id: number;
  name: string;
  role: string;
  background: string;
  avatar: string;
  personality: string;
  painPoints: string[];
}

interface Message {
  id: number;
  customerId: number;
  isUser: boolean;
  text: string;
  timestamp: Date;
}

interface SimulationPhase {
  month: number;
  title: string;
  challenges: string[];
  wins: string[];
  revenue: number;
  users: number;
  keyDecisions: string[];
}

export default function StartupSimulator({ validationData }: StartupSimulatorProps) {
  const [bubbleUrl, setBubbleUrl] = useState("");
  const [currentPhase, setCurrentPhase] = useState<'url' | 'interviews' | 'simulation' | 'results'>('url');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [interviewsCompleted, setInterviewsCompleted] = useState<number[]>([]);
  const [simulationData, setSimulationData] = useState<SimulationPhase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateBubbleUrl = (url: string) => {
    const bubblePatterns = [
      /bubble\.io/i,
      /bubbleapps\.io/i,
      /preview.*bubble/i
    ];
    return bubblePatterns.some(pattern => pattern.test(url));
  };

  const startSimulation = async () => {
    if (!bubbleUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter your Bubble preview URL first",
        variant: "destructive"
      });
      return;
    }

    if (!validateBubbleUrl(bubbleUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Bubble.io preview URL",
        variant: "destructive"
      });
      return;
    }

    if (!validationData) {
      toast({
        title: "Validation Required",
        description: "Please complete the idea validation first",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Generate customer personas from validation data
      const response = await apiRequest("POST", "/api/generate-customers", {
        idea: validationData.idea,
        targetCustomer: validationData.targetCustomer,
        problemSolved: validationData.problemSolved,
        bubbleUrl: bubbleUrl
      });

      const data = await response.json();
      setCustomers(data.customers);
      setCurrentPhase('interviews');
      
      toast({
        title: "Customers Generated!",
        description: "Ready to start customer interviews"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate customer personas",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startCustomerInterview = (customer: Customer) => {
    setActiveCustomer(customer);
    setMessages([
      {
        id: 1,
        customerId: customer.id,
        isUser: false,
        text: `Hi! I'm ${customer.name}. I understand you're working on something that might help with ${validationData?.problemSolved}. I'd love to hear more about it!`,
        timestamp: new Date()
      }
    ]);
  };

  const sendMessage = async () => {
    if (!currentQuestion.trim() || !activeCustomer) return;

    const userMessage: Message = {
      id: messages.length + 1,
      customerId: activeCustomer.id,
      isUser: true,
      text: currentQuestion,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentQuestion("");
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/customer-interview", {
        customerId: activeCustomer.id,
        customerData: activeCustomer,
        userMessage: currentQuestion,
        conversationHistory: messages,
        validationData
      });

      const data = await response.json();
      
      const customerResponse: Message = {
        id: messages.length + 2,
        customerId: activeCustomer.id,
        isUser: false,
        text: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, customerResponse]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get customer response",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const completeInterview = () => {
    if (activeCustomer && !interviewsCompleted.includes(activeCustomer.id)) {
      setInterviewsCompleted(prev => [...prev, activeCustomer.id]);
    }
    setActiveCustomer(null);
  };

  const moveToSimulation = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/generate-simulation", {
        validationData,
        bubbleUrl,
        customerInterviews: messages,
        customersInterviewed: interviewsCompleted.length
      });

      const data = await response.json();
      setSimulationData(data.simulation);
      setCurrentPhase('simulation');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate simulation",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReport = async () => {
    try {
      const response = await apiRequest("POST", "/api/generate-report", {
        validationData,
        bubbleUrl,
        customerInterviews: messages,
        simulation: simulationData
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Startup-Reality-Check-Report.pdf';
      a.click();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="simulate" className="py-20 bg-gradient-to-br from-accent/25 via-background to-secondary/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-lg">
            <span className="w-8 h-8 bg-gradient-to-br from-accent to-secondary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
              3
            </span>
            🎮 Startup Reality Check
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black mb-6 gradient-text">
            Test Your Idea Like a Real Founder! <span className="text-4xl">🚀</span>
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            Chat with AI customers, discover insights, and see your 6-month startup journey simulation
          </p>
        </div>

        {currentPhase === 'url' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2" />
                Step 1: Share Your Bubble Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="https://your-app.bubbleapps.io/version-test..."
                  value={bubbleUrl}
                  onChange={(e) => setBubbleUrl(e.target.value)}
                  className="text-lg p-4"
                />
                <p className="text-sm text-muted-foreground">
                  Must be a Bubble.io preview URL to continue
                </p>
                <Button
                  onClick={startSimulation}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? "Generating Customers..." : "Start Reality Check"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentPhase === 'interviews' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Customer List */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Your Potential Customers</h3>
              {customers.map((customer) => (
                <Card 
                  key={customer.id} 
                  className={`cursor-pointer transition-all ${
                    activeCustomer?.id === customer.id ? 'ring-2 ring-primary' : ''
                  } ${
                    interviewsCompleted.includes(customer.id) ? 'bg-green-50 dark:bg-green-900/20' : ''
                  }`}
                  onClick={() => startCustomerInterview(customer)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{customer.avatar}</div>
                      <div>
                        <h4 className="font-semibold">{customer.name}</h4>
                        <p className="text-sm text-muted-foreground">{customer.role}</p>
                        {interviewsCompleted.includes(customer.id) && (
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {interviewsCompleted.length >= 1 && (
                <Button onClick={moveToSimulation} className="w-full" size="lg">
                  Generate Journey Simulation
                </Button>
              )}
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-2">
              {activeCustomer ? (
                <Card className="h-96">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="mr-2" />
                      Interview with {activeCustomer.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                      {messages
                        .filter(m => m.customerId === activeCustomer.id)
                        .map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.isUser
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              {message.text}
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="flex space-x-2">
                      <Textarea
                        placeholder="Ask about their pain points, budget, timeline..."
                        value={currentQuestion}
                        onChange={(e) => setCurrentQuestion(e.target.value)}
                        className="flex-1"
                        rows={2}
                      />
                      <div className="flex flex-col space-y-2">
                        <Button onClick={sendMessage} disabled={isLoading}>
                          Send
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={completeInterview}
                          size="sm"
                        >
                          Done
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-96 flex items-center justify-center">
                  <CardContent className="text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Click on a customer to start the interview
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {currentPhase === 'simulation' && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Your 6-Month Startup Journey</h3>
              <p className="text-muted-foreground">
                Based on your customer interviews and market analysis
              </p>
            </div>

            <div className="grid gap-6">
              {simulationData.map((phase, index) => (
                <Card key={phase.month} className="relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/20 to-primary/40" />
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Month {phase.month}: {phase.title}</span>
                      <Badge variant="outline">
                        ${phase.revenue.toLocaleString()} Revenue
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Wins & Progress
                        </h4>
                        <ul className="space-y-1">
                          {phase.wins.map((win, i) => (
                            <li key={i} className="text-sm text-green-600 dark:text-green-400">
                              • {win}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2 text-amber-500" />
                          Challenges & Learnings
                        </h4>
                        <ul className="space-y-1">
                          {phase.challenges.map((challenge, i) => (
                            <li key={i} className="text-sm text-amber-600 dark:text-amber-400">
                              • {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Users: {phase.users.toLocaleString()}</span>
                        <span>Growth Rate: {index > 0 ? '+' + Math.round(((phase.users - simulationData[index-1]?.users || 0) / (simulationData[index-1]?.users || 1)) * 100) + '%' : 'Launch'}</span>
                      </div>
                      <Progress value={(phase.users / Math.max(...simulationData.map(p => p.users))) * 100} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button onClick={downloadReport} size="lg" className="bg-gradient-to-r from-primary to-secondary">
                <Download className="mr-2 w-5 h-5" />
                Download Complete Report & Pitch Deck
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}