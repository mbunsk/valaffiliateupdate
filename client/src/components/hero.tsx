import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollToValidation = () => {
    const element = document.getElementById('validate');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-20 bg-gradient-to-br from-white via-blue-50/30 to-violet-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent">
              Validate Your Startup Idea
            </span>
            <br />
            in Seconds
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Get instant AI feedback, next steps, and launch support — and if it's good, we'll share it with{" "}
            <span className="font-semibold text-primary">200,000+ startup readers</span>.
          </p>
          <Button 
            onClick={scrollToValidation}
            size="lg"
            className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Start Validating
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
