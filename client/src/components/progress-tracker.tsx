import { CheckCircle, Circle, ArrowRight } from "lucide-react";

interface ProgressTrackerProps {
  currentStep: 1 | 2 | 3;
}

export default function ProgressTracker({ currentStep }: ProgressTrackerProps) {
  const steps = [
    { number: 1, title: "Get AI Feedback", description: "Validate your idea" },
    { number: 2, title: "Create Mockup", description: "Build landing page" },
    { number: 3, title: "Share & Test", description: "Get real feedback" }
  ];

  return (
    <div className="bg-card/50 rounded-2xl p-6 border border-primary/10 mb-8">
      <h3 className="text-lg font-bold text-center mb-6 text-primary">Your Idea Journey</h3>
      <div className="flex items-center justify-between max-w-md mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step.number <= currentStep 
                  ? 'bg-primary text-white' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step.number <= currentStep ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </div>
              <div className="text-center mt-2">
                <div className="text-xs font-semibold">{step.title}</div>
                <div className="text-xs text-muted-foreground">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-muted-foreground mx-2 mt-[-20px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}