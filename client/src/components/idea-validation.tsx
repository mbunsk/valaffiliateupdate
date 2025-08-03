import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader2, Lightbulb, Target, Users, Zap } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ValidationResponse {
  id: string;
  idea: string;
  targetCustomer: string;
  problemSolved: string;
  feedback: string;
  createdAt: string;
}

interface IdeaValidationProps {
  onValidationComplete?: (data: {
    idea: string;
    targetCustomer: string;
    problemSolved: string;
    feedback: string;
  }) => void;
}

export default function IdeaValidation({ onValidationComplete }: IdeaValidationProps) {
  const [idea, setIdea] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [problemSolved, setProblemSolved] = useState("");
  const [validationResult, setValidationResult] = useState<ValidationResponse | null>(null);
  const { toast } = useToast();

  const validateMutation = useMutation({
    mutationFn: async (data: { idea: string; targetCustomer: string; problemSolved: string }) => {
      const response = await apiRequest("POST", "/api/validate", data);
      return response.json() as Promise<ValidationResponse>;
    },
    onSuccess: (data) => {
      setValidationResult(data);
      
      // Pass validation data to parent component
      if (onValidationComplete) {
        onValidationComplete({
          idea: data.idea,
          targetCustomer: data.targetCustomer,
          problemSolved: data.problemSolved,
          feedback: data.feedback
        });
      }
      
      setTimeout(() => {
        const element = document.getElementById('validation-response');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to validate your idea. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleValidation = () => {
    if (!idea.trim() || !targetCustomer.trim() || !problemSolved.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all three fields!",
        variant: "destructive",
      });
      return;
    }
    validateMutation.mutate({ idea, targetCustomer, problemSolved });
  };

  const parseFeedback = (feedbackHtml: string) => {
    // The new AI response comes as HTML, so we'll return it as-is for direct rendering
    return feedbackHtml;
  };

  return (
    <section id="validate" className="py-20 bg-gradient-to-br from-accent/15 to-background relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 text-6xl opacity-20 animate-float">💡</div>
        <div className="absolute bottom-10 left-10 text-4xl opacity-20 animate-bounce-gentle">🚀</div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-lg bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
            <span className="w-8 h-8 bg-gradient-to-br from-primary to-accent text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 animate-pulse-slow">
              1
            </span>
            🎯 Idea Validation Lab
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black mb-6 gradient-text">
            What's Your Wild Idea? <span className="text-5xl emoji">🤔</span>
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Share any idea and our AI will give you thoughtful feedback, insights, and suggestions to explore it further!
            <br />
            <span className="text-primary font-semibold">No pressure, just fun exploration! ✨</span>
          </p>
        </div>

        <Card className="shadow-2xl border-2 border-primary/20 bg-card/80 backdrop-blur-sm animate-pulse-slow">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <span className="text-3xl">💭</span>
              <p className="text-lg font-semibold text-foreground mt-2">
                Tell us about your idea in 3 quick steps
              </p>
              <p className="text-sm text-foreground/60">
                Just the basics - we'll do the deep thinking for you! 🎨
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <label className="text-sm font-semibold text-foreground">What is your startup idea?</label>
                </div>
                <Textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  rows={3}
                  className="text-base resize-none border-2 border-primary/30 focus:border-primary rounded-xl bg-input text-foreground placeholder:text-muted-foreground"
                  placeholder="e.g., A sneaker display case that saves space and shows off collections..."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-accent" />
                  <label className="text-sm font-semibold text-foreground">Who is the target customer?</label>
                </div>
                <Input
                  value={targetCustomer}
                  onChange={(e) => setTargetCustomer(e.target.value)}
                  className="text-base border-2 border-accent/30 focus:border-accent rounded-xl bg-input text-foreground placeholder:text-muted-foreground"
                  placeholder="e.g., Sneaker collectors with 20+ pairs..."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-secondary" />
                  <label className="text-sm font-semibold text-foreground">What problem does it solve?</label>
                </div>
                <Input
                  value={problemSolved}
                  onChange={(e) => setProblemSolved(e.target.value)}
                  className="text-base border-2 border-secondary/30 focus:border-secondary rounded-xl bg-input text-foreground placeholder:text-muted-foreground"
                  placeholder="e.g., Limited space for sneaker storage and display..."
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button 
                onClick={handleValidation}
                disabled={validateMutation.isPending}
                size="lg"
                className="px-10 py-4 text-xl font-bold rounded-2xl shadow-2xl shadow-primary/30 bg-gradient-to-r from-primary via-accent to-primary hover:from-accent hover:via-primary hover:to-accent transition-all duration-300 transform hover:scale-110"
              >
                {validateMutation.isPending && <Loader2 className="mr-3 h-6 w-6 animate-spin" />}
                <span className="mr-2">🔬</span>
                {validateMutation.isPending ? "AI is analyzing..." : "Get AI Feedback!"}
                {!validateMutation.isPending && <span className="ml-2">✨</span>}
              </Button>
            </div>

            {validationResult && (() => {
              const feedbackHtml = parseFeedback(validationResult.feedback);
              return (
                <div id="validation-response" className="mt-8 space-y-6 animate-in slide-in-from-bottom-4 duration-600">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-black gradient-text mb-2">Val's Analysis is Ready! 🎉</h3>
                    <p className="text-lg text-foreground/70">Your warm, thoughtful startup mentor has insights for you</p>
                  </div>

                  {/* AI Analysis Content */}
                  <div className="space-y-6">
                    <div 
                      className="ai-feedback-content"
                      dangerouslySetInnerHTML={{ __html: feedbackHtml }}
                    />
                  </div>

                  {/* Landing Page Prompt Section */}
                  <Card className="shadow-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <span className="text-4xl">🚀</span>
                        <h4 className="text-3xl font-black gradient-text mb-3">Ready to Mock It Up?</h4>
                        <p className="text-foreground/70 mb-6">
                          Your custom landing page prompt is ready! Copy it and try each builder to see which you like best:
                        </p>
                      </div>

                      {/* Landing Page Prompt Box */}
                      <div className="bg-card/80 border-2 border-primary/20 rounded-xl p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="text-lg font-bold text-primary">Your Custom Landing Page Prompt</h5>
                          <Button
                            onClick={() => {
                              const promptText = `I am building ${validationResult.idea}, which helps ${validationResult.targetCustomer} solve ${validationResult.problemSolved} by [describe your unique solution approach based on your UVP insights]. My goal is to validate demand and collect emails from interested ${validationResult.targetCustomer}. Please create a landing page that clearly communicates this value proposition, includes a strong call-to-action for email signup, and allows users to express interest. Focus on the problem of ${validationResult.problemSolved} and how this solution specifically helps ${validationResult.targetCustomer}.`;
                              navigator.clipboard.writeText(promptText);
                              toast({
                                title: "Copied!",
                                description: "Landing page prompt copied to clipboard",
                              });
                            }}
                            size="sm"
                            className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
                          >
                            Copy Prompt
                          </Button>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm leading-relaxed border-l-4 border-primary">
                          "I am building {validationResult.idea}, which helps {validationResult.targetCustomer} solve {validationResult.problemSolved} by [describe your unique solution approach based on your UVP insights]. My goal is to validate demand and collect emails from interested {validationResult.targetCustomer}. Please create a landing page that clearly communicates this value proposition, includes a strong call-to-action for email signup, and allows users to express interest. Focus on the problem of {validationResult.problemSolved} and how this solution specifically helps {validationResult.targetCustomer}."
                        </div>
                      </div>

                      {/* Site Builder Instructions */}
                      <div className="text-center">
                        <p className="text-foreground/70 mb-4">
                          Try your prompt with each builder to see which creates the best landing page for your idea:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Button 
                            onClick={() => window.open('https://validatorai.com/click/?a=bubble', '_blank')}
                            size="lg"
                            className="px-6 py-3 text-lg font-bold rounded-xl shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-2 border-orange-400"
                          >
                            Try Bubble
                          </Button>
                          <Button 
                            onClick={() => window.open('https://validatorai.com/click/?a=lovable', '_blank')}
                            size="lg"
                            className="px-6 py-3 text-lg font-bold rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-2 border-purple-400"
                          >
                            Try Lovable
                          </Button>
                          <Button 
                            onClick={() => window.open('https://validatorai.com/click/?a=base44', '_blank')}
                            size="lg"
                            className="px-6 py-3 text-lg font-bold rounded-xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-2 border-blue-400"
                          >
                            Try Base44
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
