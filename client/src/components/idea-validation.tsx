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
    <section id="validate" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">
              1
            </span>
            Idea Validation
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tell Us About Your Idea
          </h2>
          <p className="text-lg text-gray-600">
            We'll analyze your idea and give you instant feedback, market fit tips, and next steps to help you move forward.
          </p>
        </div>

        <Card className="shadow-lg border border-gray-200">
          <CardContent className="p-8">
            <label htmlFor="idea-input" className="block text-sm font-medium text-gray-700 mb-3">
              Describe your idea in a sentence or two
            </label>
            <Textarea
              id="idea-input"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              rows={4}
              className="text-lg resize-none"
              placeholder="e.g., A mobile app that uses AI to create personalized workout plans based on your fitness goals, available equipment, and schedule..."
            />
            
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleValidation}
                disabled={validateMutation.isPending}
                size="lg"
                className="px-8 py-3 shadow-md hover:shadow-lg"
              >
                {validateMutation.isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {validateMutation.isPending ? "Analyzing..." : "Run Validation"}
              </Button>
            </div>

            {validationResult && (
              <div id="validation-response" className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200 shadow-sm animate-in slide-in-from-bottom-4 duration-600">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">✨ Analysis Complete!</h3>
                    <div className="space-y-3 text-gray-700">
                      {(() => {
                        const feedback = parseFeedback(validationResult.feedback);
                        return (
                          <>
                            <p><strong>Market Fit:</strong> {feedback.marketFit}</p>
                            <p><strong>Key Strengths:</strong> {feedback.strengths}</p>
                            <div>
                              <p><strong>Next Steps:</strong></p>
                              <ul className="list-disc list-inside space-y-1 ml-4">
                                {feedback.nextSteps.map((step: string, index: number) => (
                                  <li key={index}>{step}</li>
                                ))}
                              </ul>
                            </div>
                            <p><strong>Potential Concerns:</strong> {feedback.concerns}</p>
                          </>
                        );
                      })()}
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <Lightbulb className="inline w-4 h-4 mr-1" />
                        <strong>Pro Tip:</strong> {parseFeedback(validationResult.feedback).tip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
