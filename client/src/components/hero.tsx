import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Brain, FileText, Clock, Rocket, Lightbulb } from "lucide-react";

export default function Hero() {
  const scrollToValidation = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-8 pb-20 bg-gradient-to-br from-background via-primary/10 via-accent/15 to-secondary/25 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-secondary/30 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Hero Top Section with Val and Stats */}
          <div className="mb-8 space-y-6">
            <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-8 xl:space-x-16">
              {/* Val's Quote Section */}
              <div className="flex items-center space-x-4 relative">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/30 shadow-lg flex-shrink-0">
                    <img 
                      src="/attached_assets/AIValFull_1754243498167.jpg" 
                      alt="Val - Your AI Mentor" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Online status indicator */}
                  <div className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full border border-white shadow-lg animate-pulse z-20"></div>
                </div>
                
                {/* Thought Bubble */}
                <div className="relative">
                  <div className="bg-white rounded-xl p-3 shadow-lg border border-white/20 max-w-xs">
                    <div className="text-xs text-gray-700 leading-tight">
                      <span className="font-semibold text-primary">Val - Super Research Assistant:</span> Deep market analysis, 
                      competitive intelligence, customer insights & strategic recommendations!
                    </div>
                    
                    {/* Bubble tail */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
                      <div className="w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Testimonial Section */}
              <div className="text-center">
                <blockquote className="text-lg font-medium text-white mb-2">
                  "This is the future!"
                </blockquote>
                <cite className="text-sm text-white/70">
                  - Cal State Fullerton Entrepreneurship Center
                </cite>
              </div>
              
              {/* User Stats Section */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center -space-x-1">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    alt="User"
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616c5e1b36e?w=100&h=100&fit=crop&crop=face"
                    alt="User"
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    alt="User"
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
                    alt="User"
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm object-cover"
                  />
                </div>
                <span className="text-lg font-bold text-white">278,355</span>
                <span className="text-sm text-white/80">entrepreneurs validated</span>
              </div>
            </div>
          </div>
          
          <div className="inline-block mb-6">
          </div>
          {/* Left/Right Split Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Information */}
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                <span className="gradient-text">
                  Professional Market
                </span>
                <br />
                <span className="text-gray-900 dark:text-gray-100">Research Platform</span>
              </h1>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Get <strong className="text-gray-900 dark:text-gray-100">enterprise-grade business intelligence</strong>, <strong className="text-gray-900 dark:text-gray-100">strategic market analysis</strong>, and <strong className="text-gray-900 dark:text-gray-100">competitive insights</strong> delivered in minutes. <strong className="text-primary">Starting at just $29!</strong>
              </p>



              <Button 
                onClick={scrollToValidation}
                size="lg"
                className="inline-flex items-center px-10 py-5 text-xl font-bold rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 transform hover:scale-110 bg-gradient-to-r from-primary via-accent to-primary hover:from-accent hover:via-primary hover:to-accent animate-pulse-slow"
              >
                Explore All Research Reports
                <ArrowRight className="ml-3 w-6 h-6 animate-bounce-gentle" />
              </Button>
            </div>

            {/* Right Side - Featured Product Card */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-indigo-950/20 rounded-3xl shadow-2xl border-2 border-blue-200/50 dark:border-blue-800/50 p-8 backdrop-blur-sm">
                {/* Floating decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-6 left-6 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-lg"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
                        <Lightbulb className="w-8 h-8 text-blue-600" />
                      </div>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        $29
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 line-through">$800</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    Quick Idea Validation
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Get an instant desirability score for your business idea based on customer pain points, problem severity, and adoption feasibility.
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-white/50 dark:bg-gray-800/30 rounded-xl border border-white/20">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Brain className="w-4 h-4 text-blue-600 mr-1" />
                        <div className="text-sm font-bold text-blue-600">1</div>
                      </div>
                      <div className="text-xs text-blue-700 dark:text-blue-300">AI Agent</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <FileText className="w-4 h-4 text-green-600 mr-1" />
                        <div className="text-sm font-bold text-green-600">17</div>
                      </div>
                      <div className="text-xs text-green-700 dark:text-green-300">Sources</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="w-4 h-4 text-purple-600 mr-1" />
                        <div className="text-sm font-bold text-purple-600">3m 19s</div>
                      </div>
                      <div className="text-xs text-purple-700 dark:text-purple-300">Delivery</div>
                    </div>
                  </div>

                  {/* Input Form */}
                  <div className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        What is your startup idea?
                      </label>
                      <textarea 
                        placeholder="e.g., A mobile app that helps people track their daily water intake with smart reminders and gamification..."
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none text-sm"
                        rows={4}
                      />
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Start Quick Validation - $29
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-4">
                    PDF + PowerPoint + Public Link • Delivered in 3 minutes • Perfect for first-time validation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
