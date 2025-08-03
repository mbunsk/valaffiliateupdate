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
import SaveResults from "@/components/save-results";

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
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-4 border-green-500 shadow-lg animate-bounce-gentle">
                      <img 
                        src="/attached_assets/AIValFull_1754243498167.jpg" 
                        alt="Val - Your AI Mentor" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-3xl font-black gradient-text mb-2">Val's Analysis is Ready! <span className="text-3xl">🎉</span></h3>
                    <p className="text-lg text-foreground/70">Your warm, thoughtful startup mentor has insights for you</p>
                  </div>

                  {/* AI Analysis Content */}
                  <div className="space-y-6">
                    <div 
                      className="ai-feedback-content"
                      dangerouslySetInnerHTML={{ __html: feedbackHtml }}
                    />
                  </div>

                  {/* Save Results Component */}
                  <div className="mt-6">
                    <SaveResults validationData={validationResult} />
                  </div>

                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
