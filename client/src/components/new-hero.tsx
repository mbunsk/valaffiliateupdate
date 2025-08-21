import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Clock, Users, FileText, Sparkles, CheckCircle, Target } from "lucide-react";
// import { trackEvent } from "@/lib/analytics";

const featuredProduct = {
  id: "new-product-feasibility",
  name: "New Product Feasibility Study",
  price: 119,
  agents: 10,
  runtime: 49,
  outputs: "PDF + PowerPoint + Public Link",
  description: "Comprehensive analysis for new product launches with market validation, customer insights, and financial projections.",
  specs: [
    "10 AI research agents",
    "49-minute deep analysis", 
    "Market opportunity assessment",
    "Customer demand validation",
    "Revenue projections",
    "Go-to-market strategy"
  ]
};

export default function NewHero() {
  const [idea, setIdea] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!idea.trim()) return;
    
    setIsLoading(true);
    // trackEvent('featured_product_start', 'hero', featuredProduct.name);
    console.log('Featured product started:', featuredProduct.name);
    
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      // Could integrate with product modal or redirect to checkout
    }, 2000);
  };

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 subtle-grid opacity-50" />
      
      {/* Gradient corner accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Messaging */}
          <div>
            {/* Trust indicator */}
            <div className="flex items-center space-x-2 mb-8">
              <Badge variant="secondary" className="px-3 py-1">
                <CheckCircle className="w-3 h-3 mr-1.5" />
                SOC2 Compliant
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Users className="w-3 h-3 mr-1.5" />
                200,000+ Users
              </Badge>
            </div>

            {/* Main headline */}
            <h1 className="font-display text-display-1 text-foreground mb-6 leading-tight">
              AI Research, 
              <br />
              <span className="text-accent">Ready in Minutes</span>
            </h1>
            
            <p className="text-body-lg text-muted-foreground mb-8 leading-relaxed">
              Market analysis, TAM, customer insights, and feasibility reports. 
              Enterprise quality, automated by AI agents in under an hour.
            </p>

            {/* Value props */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-start space-x-3">
                <Target className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-foreground">Replace $15,000+ consultant costs</div>
                  <div className="text-sm text-muted-foreground">Get professional insights at fraction of the price</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-foreground">Minutes, not months</div>
                  <div className="text-sm text-muted-foreground">Instant analysis with cited sources</div>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={scrollToProducts}
                className="accent-gradient text-white font-semibold px-8"
              >
                Run a Quick Validation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => window.open('/sample-report', '_blank')}
              >
                <FileText className="mr-2 w-4 h-4" />
                View Sample Report
              </Button>
            </div>
          </div>

          {/* Right Column - Featured Product Card */}
          <div>
            <Card className="p-8 border-2 border-primary/20 bg-card">
              {/* Featured badge */}
              <div className="flex items-center justify-between mb-6">
                <Badge className="accent-gradient text-white px-3 py-1">
                  <Sparkles className="w-3 h-3 mr-1.5" />
                  Most Popular
                </Badge>
                <div className="text-2xl font-bold text-foreground">
                  ${featuredProduct.price}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-display text-display-3 text-foreground mb-3">
                  {featuredProduct.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {featuredProduct.description}
                </p>
                
                {/* Specs */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {featuredProduct.specs.map((spec, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-muted-foreground">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Describe your product idea:
                  </label>
                  <Textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="e.g., A mobile app that helps remote workers find co-working spaces in their city..."
                    className="min-h-[100px] resize-none"
                    disabled={isLoading}
                  />
                </div>
                
                <Button 
                  className="w-full accent-gradient text-white font-semibold"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!idea.trim() || isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full w-4 h-4 border-2 border-white border-t-transparent mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Start Analysis
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                  <div className="flex items-center space-x-4">
                    <span>⚡ {featuredProduct.runtime} min runtime</span>
                    <span>📊 {featuredProduct.agents} AI agents</span>
                  </div>
                  <span>{featuredProduct.outputs}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}