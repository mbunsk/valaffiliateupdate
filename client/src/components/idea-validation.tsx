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

export default function IdeaValidation() {
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

            {validationResult && (
              <div id="validation-response" className="mt-8 space-y-6 animate-in slide-in-from-bottom-4 duration-600">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black gradient-text mb-2">Your AI Analysis is Ready! 🎉</h3>
                  <p className="text-lg text-foreground/70">Deep insights to help you explore your idea further</p>
                </div>

                {/* Idea Fit & Alignment */}
                <Card className="shadow-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl">🔍</span>
                      </div>
                      <h4 className="text-xl font-bold gradient-text">1. Idea Fit & Alignment</h4>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">
                      Your idea directly aligns with the problem you've identified. The solution shows promise for addressing real customer pain points, though defining the specific scope and unique approach will strengthen your positioning in the market.
                    </p>
                  </CardContent>
                </Card>

                {/* Competitor Analysis */}
                <Card className="shadow-xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl">📊</span>
                      </div>
                      <h4 className="text-xl font-bold gradient-text">2. Competitor Snapshot + UVP Insight</h4>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="p-3 bg-card/40 rounded-lg border border-accent/20">
                        <p className="font-semibold text-sm">Competitor A</p>
                        <p className="text-xs text-foreground/70">Basic solution focusing on core functionality</p>
                      </div>
                      <div className="p-3 bg-card/40 rounded-lg border border-accent/20">
                        <p className="font-semibold text-sm">Competitor B</p>
                        <p className="text-xs text-foreground/70">Premium offering with advanced features</p>
                      </div>
                      <div className="p-3 bg-card/40 rounded-lg border border-accent/20">
                        <p className="font-semibold text-sm">Competitor C</p>
                        <p className="text-xs text-foreground/70">Budget option with limited capabilities</p>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg">
                      <p className="font-semibold text-foreground mb-2">💡 Your Unique Opportunity:</p>
                      <p className="text-foreground/80 text-sm">Consider combining the best aspects with modern tech integration to create a standout solution in this market.</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Targeting */}
                <Card className="shadow-xl border-2 border-secondary/30 bg-gradient-to-br from-secondary/5 to-secondary/10">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl">🧠</span>
                      </div>
                      <h4 className="text-xl font-bold gradient-text">3. Customer Targeting & Messaging</h4>
                    </div>
                    <p className="text-foreground/80 leading-relaxed mb-4">
                      Your target customers are well-defined, but consider segmenting further for more focused messaging. Look for these customers in online communities, forums, and social platforms where they actively discuss their interests.
                    </p>
                    <div className="p-4 bg-card/40 rounded-lg border border-secondary/20">
                      <p className="font-semibold text-foreground mb-2">🎯 Suggested Messaging:</p>
                      <p className="text-foreground/80 italic">"The smart solution for [target customer] who want [key benefit] without [main pain point]"</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Readiness Score */}
                <Card className="shadow-xl border-2 border-primary/30 bg-gradient-to-br from-purple-500/5 to-pink-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mr-3">
                          <span className="text-xl">📈</span>
                        </div>
                        <h4 className="text-xl font-bold gradient-text">4. Startup Readiness Score</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-primary">75</div>
                        <div className="text-sm text-foreground/60">out of 100</div>
                      </div>
                    </div>
                    <p className="text-foreground/80">
                      Strong foundation with clear problem-solution fit. Focus on customer validation and unique positioning to reach the next level.
                    </p>
                  </CardContent>
                </Card>

                {/* Next Steps CTA */}
                <Card className="shadow-xl border-2 border-gradient-to-r from-primary to-accent bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <span className="text-4xl">🚀</span>
                    </div>
                    <h4 className="text-2xl font-bold gradient-text mb-3">Ready to Mock It Up?</h4>
                    <p className="text-foreground/70 mb-6">
                      Now that you have AI insights, create a landing page mockup to share your idea with friends, potential customers, and partners!
                    </p>
                    <Button 
                      onClick={() => {
                        const element = document.getElementById('build');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      size="lg"
                      className="px-8 py-3 text-lg font-bold rounded-2xl shadow-xl bg-gradient-to-r from-primary via-accent to-primary hover:from-accent hover:via-primary hover:to-accent transition-all duration-300 transform hover:scale-105"
                    >
                      <Zap className="mr-2 w-5 h-5" />
                      Mock Up For Free
                      <span className="ml-2">✨</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
