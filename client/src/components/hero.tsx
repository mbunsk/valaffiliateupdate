import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Brain, FileText, Clock, Rocket, Lightbulb, Shield, BarChart3, Globe, Cpu, Building2 } from "lucide-react";
import { Product } from "@shared/types";

interface HeroProps {
  onProductClick?: (product: Product) => void;
}

export default function Hero({ onProductClick }: HeroProps) {
  // Define the featured product with FifthRow specifications
  const featuredProduct: Product = {
    id: "new-product-feasibility-study",
    name: "New Product Feasibility Study",
    title: "Feasibility Analysis & Market Positioning",
    description: "Comprehensive feasibility analysis and market positioning with real-time agent collaboration. Professional-grade business intelligence for strategic decision-making.",
    price: 49,
    originalPrice: 3000,
    agents: 1, // Multiple agents as specified by FifthRow
    sources: 1500, // Using credits instead of sources count
    runtime: "25m 54s",
    category: "Idea Validation",
    featured: true
  };


  const handleFeasibilityClick = () => {
    // Track the click for analytics
    fetch('/api/track-product-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        product: featuredProduct.id, 
        location: 'hero'
      })
    });

    // Navigate directly to the report page (dev will handle Stripe integration before this)
    window.location.href = '/report/new-product-feasibility-study';
  };

  return (
    <section className="pt-2 pb-12 bg-gradient-to-br from-background via-muted/5 to-background relative overflow-hidden grid-pattern">
      {/* Corporate tech elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl tech-glow"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary/15 rounded-full blur-xl" style={{animationDelay: '1s'}}></div>
        
        {/* Tech grid overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Hero Top Section with Val and Stats */}
          <div className="mb-1 space-y-1">
            <div className="flex flex-col lg:flex-row justify-center items-center space-y-2 lg:space-y-0 lg:space-x-6 xl:space-x-12">
              {/* Val's Quote Section */}
              <div className="flex items-center space-x-4 relative">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 shadow-lg flex-shrink-0">
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
                      <span className="font-semibold text-primary">Val - Super Research Assistant:</span> I analyze markets, assess risks, forecast profitability & deliver clear go/no-go recommendations!
                    </div>
                    
                    {/* Bubble tail */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
                      <div className="w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quote Section */}
              <div className="text-center bg-muted/20 rounded-xl p-4 border border-primary/20">
                <blockquote className="text-lg font-medium text-white mb-2">
                  "This is the future!"
                </blockquote>
                <cite className="text-sm text-white/70">
                  - Cal State Fullerton Business School
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
          
          {/* Spacing */}
          <div className="mb-12"></div>
          <div className="mb-12"></div>
          <div className="mb-12"></div>
          
          {/* Left/Right Split Layout */}
          <div className="grid lg:grid-cols-2 gap-6 items-start max-w-7xl mx-auto">
            {/* Left Side - Information */}
            <div className="space-y-4">
              <div className="space-y-3">
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                  <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                    Deep Market Research
                  </span>
                  <br />
                  <span className="text-gray-900 dark:text-gray-100">for Your Idea</span>
                </h1>
              </div>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Get a comprehensive <strong className="text-primary">New Product Feasibility Study</strong> powered by 
                <strong className="text-gray-900 dark:text-gray-100">10+ AI agents</strong> that analyzes market opportunity, 
                assesses profitability, evaluates technical feasibility, and identifies risks to help you make confident 
                <strong className="text-primary">go/no-go decisions</strong>. Save $15,000+ vs. hiring consultants.
              </p>
              
              <div className="bg-muted/20 rounded-xl p-4 backdrop-blur-sm border border-primary/20 tech-border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">10+ AI Agents</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Enterprise Analysis</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">$15,000+ Saved</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">vs. Consultants</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">SOC2 Secure</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Enterprise Ready</div>
                  </div>
                </div>
              </div>



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
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        $49
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 line-through">$3,000</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    New Product Feasibility Study
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Comprehensive feasibility analysis and market positioning with real-time agent collaboration. Professional-grade business intelligence for strategic decision-making.
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-white/50 dark:bg-gray-800/30 rounded-xl border border-white/20">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Brain className="w-4 h-4 text-blue-600 mr-1" />
                        <div className="text-sm font-bold text-blue-600">Multiple</div>
                      </div>
                      <div className="text-xs text-blue-700 dark:text-blue-300">AI Agents</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <FileText className="w-4 h-4 text-green-600 mr-1" />
                        <div className="text-sm font-bold text-green-600">90+</div>
                      </div>
                      <div className="text-xs text-green-700 dark:text-green-300">hours of research saved</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="w-4 h-4 text-purple-600 mr-1" />
                        <div className="text-sm font-bold text-purple-600">25m 54s</div>
                      </div>
                      <div className="text-xs text-purple-700 dark:text-purple-300">Runtime</div>
                    </div>
                  </div>

                  {/* Input Form */}
                  <div className="space-y-3 mb-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        TARGET MARKET
                      </label>
                      <textarea 
                        placeholder="e.g., Maritime Logistics"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none text-sm"
                        rows={1}
                        data-testid="input-target-market"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        PRODUCT IDEA
                      </label>
                      <textarea 
                        placeholder="A concept, initiative, or proposal being explored or evaluated"
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none text-sm"
                        rows={2}
                        data-testid="input-product-idea"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleFeasibilityClick}
                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                    data-testid="button-start-feasibility"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Start Feasibility Study - $49
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <div className="space-y-2 mt-4">
                    <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                      PDF + PowerPoint + Public Link • Real-time agent collaboration • SOC2 & GDPR compliant
                    </p>
                    <p className="text-xs text-center font-semibold text-blue-600 dark:text-blue-400">
                      ~$49 · 25M 54S vs ~$3,000 · 92 HOURS analysts • Access to all 100+ apps
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
