import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader2, Lightbulb } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ValidationResponse {
  id: string;
  idea: string;
  feedback: string;
  createdAt: string;
}

export default function IdeaValidation() {
  const [idea, setIdea] = useState("");
  const [validationResult, setValidationResult] = useState<ValidationResponse | null>(null);
  const { toast } = useToast();

  const validateMutation = useMutation({
    mutationFn: async (ideaText: string) => {
      const response = await apiRequest("POST", "/api/validate", { idea: ideaText });
      return response.json() as Promise<ValidationResponse>;
    },
    onSuccess: (data) => {
      setValidationResult(data);
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
    if (!idea.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your startup idea first!",
        variant: "destructive",
      });
      return;
    }
    validateMutation.mutate(idea);
  };

  const parseFeedback = (feedbackJson: string) => {
    try {
      return JSON.parse(feedbackJson);
    } catch {
      return {
        marketFit: "Analysis completed successfully.",
        strengths: "Your idea shows potential for development.",
        nextSteps: ["Continue research", "Build an MVP", "Test with users"],
        concerns: "Consider market competition and user acquisition.",
        tip: "Focus on your unique value proposition."
      };
    }
  };

  return (
    <section id="validate" className="py-20 bg-gradient-to-br from-accent/10 to-background relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 text-6xl opacity-10 animate-float">💡</div>
        <div className="absolute bottom-10 left-10 text-4xl opacity-10 animate-bounce-gentle">🚀</div>
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
            What's Your Wild Idea? 🤔
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Share any idea and our AI will give you thoughtful feedback, insights, and suggestions to explore it further!
            <br />
            <span className="text-primary font-semibold">No pressure, just fun exploration! ✨</span>
          </p>
        </div>

        <Card className="shadow-2xl border-2 border-primary/20 bg-card/80 backdrop-blur-sm animate-pulse-slow">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <span className="text-2xl">💭</span>
              <p className="text-lg font-semibold text-foreground mt-2">
                Describe any idea you're curious about
              </p>
              <p className="text-sm text-foreground/60">
                Business ideas, app concepts, or anything interesting! 🎨
              </p>
            </div>
            
            <Textarea
              id="idea-input"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              rows={5}
              className="text-lg resize-none border-2 border-primary/30 focus:border-primary rounded-xl bg-background/50 backdrop-blur-sm"
              placeholder="e.g., A dating app for plants where people swipe to help their houseplants find compatible roommate plants, with AI-powered care tips and a social community for plant parents... 🌱💚"
            />
            
            <div className="mt-8 flex justify-center">
              <Button 
                onClick={handleValidation}
                disabled={validateMutation.isPending}
                size="lg"
                className="px-10 py-4 text-xl font-bold rounded-2xl shadow-2xl shadow-primary/30 bg-gradient-to-r from-primary via-accent to-primary hover:from-accent hover:via-primary hover:to-accent transition-all duration-300 transform hover:scale-110"
              >
                {validateMutation.isPending && <Loader2 className="mr-3 h-6 w-6 animate-spin" />}
                <span className="mr-2">🔬</span>
                {validateMutation.isPending ? "AI is thinking..." : "Validate My Idea!"}
                {!validateMutation.isPending && <span className="ml-2">✨</span>}
              </Button>
            </div>

            {validationResult && (
              <div id="validation-response" className="mt-8 p-8 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-2xl border-2 border-primary/30 shadow-2xl animate-in slide-in-from-bottom-4 duration-600 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black gradient-text mb-2">🎉 Your Idea Analysis!</h3>
                  <p className="text-foreground/70">Here's what our AI thinks about your startup idea:</p>
                </div>
                
                <div className="grid gap-6">
                  {(() => {
                    const feedback = parseFeedback(validationResult.feedback);
                    return (
                      <>
                        <div className="p-4 bg-card/60 rounded-xl border border-primary/20">
                          <div className="flex items-center mb-2">
                            <span className="text-xl mr-2">🎯</span>
                            <strong className="text-lg text-foreground">Market Fit:</strong>
                          </div>
                          <p className="text-foreground/80">{feedback.marketFit}</p>
                        </div>
                        
                        <div className="p-4 bg-card/60 rounded-xl border border-accent/20">
                          <div className="flex items-center mb-2">
                            <span className="text-xl mr-2">💪</span>
                            <strong className="text-lg text-foreground">Key Strengths:</strong>
                          </div>
                          <p className="text-foreground/80">{feedback.strengths}</p>
                        </div>
                        
                        <div className="p-4 bg-card/60 rounded-xl border border-secondary/20">
                          <div className="flex items-center mb-2">
                            <span className="text-xl mr-2">🚀</span>
                            <strong className="text-lg text-foreground">Next Steps:</strong>
                          </div>
                          <ul className="space-y-2">
                            {feedback.nextSteps.map((step: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <span className="text-primary mr-2 mt-1">•</span>
                                <span className="text-foreground/80">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-card/60 rounded-xl border border-orange-300/20">
                          <div className="flex items-center mb-2">
                            <span className="text-xl mr-2">⚠️</span>
                            <strong className="text-lg text-foreground">Things to Consider:</strong>
                          </div>
                          <p className="text-foreground/80">{feedback.concerns}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl border border-primary/30">
                  <div className="flex items-center">
                    <Lightbulb className="w-6 h-6 text-primary mr-3 animate-wiggle" />
                    <div>
                      <strong className="text-lg text-foreground">💡 Pro Tip:</strong>
                      <p className="text-foreground/80 mt-1">{parseFeedback(validationResult.feedback).tip}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-sm text-foreground/60">
                    Ready to visualize it? Scroll down to mock up a free landing page! 👇
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
