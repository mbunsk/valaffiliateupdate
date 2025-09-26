import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, FileText, ArrowRight, Star, TrendingUp, Zap, Brain, Rocket, DollarSign, Shield, CheckCircle, Sparkles, Target, BarChart3, Lightbulb, Building2, Globe, Cpu } from "lucide-react";
import { Product } from "@shared/types";

const products: Product[] = [
  {
    id: "idea-desirability-assessment",
    name: "Idea Desirability Assessment",
    title: "Quick Idea Validation",
    description: "Get an instant desirability score for your business idea based on customer pain points, problem severity, and adoption feasibility.",
    price: 29,
    originalPrice: 800,
    agents: 1,
    sources: 17,
    runtime: "3m 19s",
    category: "Idea Validation",
    perfect: true
  },
  {
    id: "market-pain-points-analysis",
    name: "Market Pain Points Analysis",
    title: "Market Opportunity Discovery",
    description: "Uncover market pain points and innovation opportunities through comprehensive user and industry analysis.",
    price: 49,
    originalPrice: 3000,
    agents: 3,
    sources: 69,
    runtime: "11m 48s",
    category: "Market Research",
    perfect: true
  },
  {
    id: "tam-assessment-for-ideas", 
    name: "TAM Assessment for Ideas",
    title: "Total Addressable Market Analysis",
    description: "Map your total addressable market opportunity with clear industry boundaries, growth projections, and profit margin estimates.",
    price: 89,
    originalPrice: 15000,
    agents: 5,
    sources: 61,
    runtime: "21m 16s",
    category: "Market Sizing"
  },
  {
    id: "voice-of-customer-insights",
    name: "Voice of Customer Insights",
    title: "Customer Research Analysis", 
    description: "Extract actionable customer insights aligned with your product goals using authentic Voice of Customer data analysis.",
    price: 79,
    originalPrice: 9000,
    agents: 3,
    sources: 112,
    runtime: "25m 20s",
    category: "Customer Insights"
  },
  {
    id: "revenue-opportunity-validation",
    name: "Revenue Opportunity Analysis",
    title: "Revenue Stream Validation",
    description: "Map and validate potential revenue streams with high-value market segments and competitor benchmarking.",
    price: 95,
    originalPrice: 15200,
    agents: 4,
    sources: 50,
    runtime: "25m 34s",
    category: "Financial Analysis"
  },
  {
    id: "porter-5-forces-analysis",
    name: "Porter's 5 Forces Analysis",
    title: "Competitive Market Analysis",
    description: "Analyze market dynamics using Porter's 5 Forces framework to assess competitive pressures and market attractiveness.",
    price: 109,
    originalPrice: 15200,
    agents: 4,
    sources: 156,
    runtime: "34m 15s",
    category: "Market Intelligence"
  },
  {
    id: "new-product-feasibility-study",
    name: "New Product Feasibility Study",
    title: "Complete Feasibility Analysis",
    description: "Comprehensive market positioning analysis with customer segmentation and structured risk management for go/no-go decisions.",
    price: 119,
    originalPrice: 15000,
    agents: 5,
    sources: 66,
    runtime: "25m 54s",
    category: "Idea Validation",
    featured: true
  },
  {
    id: "business-idea-evaluation",
    name: "Business Opportunity Evaluation",
    title: "Enterprise Idea Assessment",
    description: "Comprehensive business opportunity evaluation with strategic alignment scoring, market trends analysis, and capability audits.",
    price: 149,
    originalPrice: 58000,
    agents: 10,
    sources: 267,
    runtime: "49m 46s",
    category: "Idea Validation"
  }
];

interface ProductsGridProps {
  onProductClick: (product: Product) => void;
}

export default function ProductsGrid({ onProductClick }: ProductsGridProps) {
  const trackProductClick = (productId: string) => {
    fetch('/api/track-product-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: productId, location: 'grid' })
    });
  };

  const handleProductClick = (product: Product) => {
    trackProductClick(product.id);
    onProductClick(product);
  };

  // Separate featured and perfect products for special positioning
  const featuredProducts = products.filter(p => p.featured);
  const perfectProducts = products.filter(p => p.perfect && !p.featured);
  const regularProducts = products.filter(p => !p.featured && !p.perfect);

  return (
    <section id="products" className="py-24 bg-gradient-to-br from-background via-muted/5 to-background grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="space-y-6">

            
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              Strategic Business Intelligence{" "}
              <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                Platform
              </span>
            </h2>
            
            <p className="text-xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
              Advanced AI-powered research platform delivering Fortune 500-grade business intelligence, 
              competitive analysis, and strategic insights. Trusted by enterprise decision-makers worldwide.
            </p>
            
            {/* Enterprise Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <div className="flex items-center space-x-2 bg-muted/20 rounded-lg px-4 py-2 border border-primary/20">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">SOC2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2 bg-muted/20 rounded-lg px-4 py-2 border border-primary/20">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">500+ Enterprise Clients</span>
              </div>
              <div className="flex items-center space-x-2 bg-muted/20 rounded-lg px-4 py-2 border border-primary/20">
                <Cpu className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">AI-Powered Analysis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Analysis Starter Suite */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-6 py-3 text-lg bg-primary/20 text-primary border-primary/30 tech-glow">
              <Rocket className="w-5 h-5 mr-2" />
              Strategic Analysis Starter Suite
            </Badge>
            <h3 className="text-3xl font-bold text-foreground">Enterprise-Grade Market Intelligence</h3>
            <p className="text-lg text-foreground/60 mt-2">Comprehensive analysis tools for strategic decision-making</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {perfectProducts.map((product, index) => {
              const isFirst = index === 0;
              const iconClass = isFirst ? "w-8 h-8 text-emerald-600" : "w-8 h-8 text-blue-600";
              const Icon = isFirst ? Zap : Target;
              
              return (
                <Card 
                  key={product.id}
                  className="group relative overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-blue-950/30 hover:shadow-3xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-2"
                  onClick={() => handleProductClick(product)}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>

                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 backdrop-blur-sm">
                          <Icon className={iconClass} />
                        </div>
                        <Badge variant="outline" className="border-emerald-300 text-emerald-600 dark:border-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Perfect Start
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                          ${product.price}
                        </div>
                        <div className="text-xs text-foreground/60 line-through">${product.originalPrice}</div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                      {product.title}
                    </CardTitle>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 space-y-4">
                    <div className="grid grid-cols-3 gap-3 p-4 bg-gradient-to-r from-emerald-50/50 via-blue-50/50 to-purple-50/50 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-purple-950/30 rounded-xl border border-white/20">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Brain className="w-4 h-4 text-emerald-600 mr-1" />
                          <div className="text-sm font-bold text-emerald-600">{product.agents}</div>
                        </div>
                        <div className="text-xs text-emerald-700 dark:text-emerald-300">AI Agents</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <FileText className="w-4 h-4 text-blue-600 mr-1" />
                          <div className="text-sm font-bold text-blue-600">{product.sources}</div>
                        </div>
                        <div className="text-xs text-blue-700 dark:text-blue-300">Sources</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="w-4 h-4 text-purple-600 mr-1" />
                          <div className="text-sm font-bold text-purple-600">{product.runtime}</div>
                        </div>
                        <div className="text-xs text-purple-700 dark:text-purple-300">Delivery</div>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold py-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                      size="lg"
                    >
                      <Rocket className="w-5 h-5 mr-2" />
                      Start Analysis
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* All Research Reports */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground">Complete Research Suite</h3>
            <p className="text-foreground/70">Professional analysis for every stage of your business journey</p>
          </div>
          
          <div className="space-y-6">
            {[...featuredProducts, ...regularProducts].map((product, index) => {
              const isFeatured = product.featured;
              const icons = [BarChart3, TrendingUp, Target, Lightbulb, DollarSign, Shield];
              const Icon = icons[index % icons.length];
              const gradients = [
                'from-blue-500/20 to-indigo-500/20',
                'from-purple-500/20 to-pink-500/20', 
                'from-green-500/20 to-emerald-500/20',
                'from-orange-500/20 to-red-500/20',
                'from-cyan-500/20 to-blue-500/20',
                'from-yellow-500/20 to-orange-500/20'
              ];
              const gradient = gradients[index % gradients.length];
              
              return (
                <Card 
                  key={product.id}
                  className={`group relative overflow-hidden shadow-2xl border-0 hover:shadow-3xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-2 ${
                    isFeatured 
                      ? 'bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30 dark:from-blue-950/50 dark:via-indigo-950/30 dark:to-purple-950/20' 
                      : 'bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-700/30'
                  }`}
                  onClick={() => handleProductClick(product)}
                >
                  {/* Animated background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Floating elements */}
                  <div className={`absolute top-3 right-3 w-16 h-16 bg-gradient-to-br ${gradient} rounded-full blur-xl group-hover:scale-150 transition-transform duration-700`}></div>
                  {isFeatured && (
                    <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full blur-lg animate-pulse"></div>
                  )}

                  <div className="relative z-10 p-6 flex items-center justify-between">
                    {/* Left side - Icon, Category, and Details */}
                    <div className="flex items-center space-x-6 flex-1">
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${gradient} backdrop-blur-sm flex-shrink-0`}>
                        <Icon className="w-10 h-10 text-blue-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="outline" className="text-xs border-blue-300 text-blue-600 dark:border-blue-700 dark:text-blue-400">
                            {product.category}
                          </Badge>
                          {isFeatured && (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-foreground/70 text-sm leading-relaxed mb-4 max-w-2xl">
                          {product.description}
                        </p>
                        
                        {/* Stats Row */}
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-1 text-sm">
                            <Brain className="w-4 h-4 text-blue-600" />
                            <span className="font-bold text-blue-600">{product.agents}</span>
                            <span className="text-blue-700 dark:text-blue-300">AI Agents</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm">
                            <FileText className="w-4 h-4 text-green-600" />
                            <span className="font-bold text-green-600">{product.sources}</span>
                            <span className="text-green-700 dark:text-green-300">Sources</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm">
                            <Clock className="w-4 h-4 text-purple-600" />
                            <span className="font-bold text-purple-600">{product.runtime}</span>
                            <span className="text-purple-700 dark:text-purple-300">Delivery</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Pricing and CTA Button */}
                    <div className="flex items-center space-x-4 flex-shrink-0 ml-6">
                      <div className="text-right">
                        <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ${product.price}
                        </div>
                        <div className="text-sm text-foreground/60 line-through">${product.originalPrice}</div>
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                        size="lg"
                      >
                        <Rocket className="w-5 h-5 mr-2" />
                        Start Analysis
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>


      </div>
    </section>
  );
}