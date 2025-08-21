import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, FileText, ArrowRight, Star, TrendingUp } from "lucide-react";

interface Product {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  agents: number;
  sources: number;
  runtime: string;
  category: string;
  featured?: boolean;
  perfect?: boolean;
}

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
    <section id="products" className="py-20 bg-gradient-to-br from-background via-gray-50/30 to-blue-50/20 dark:from-background dark:via-gray-900/30 dark:to-blue-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            Professional Market Intelligence{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Reports
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Strategic analysis powered by AI research teams working with multiple data sources. 
            Get enterprise-grade business intelligence delivered in minutes, not months.
          </p>
        </div>

        {/* Perfect for Ideas Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-lg border-green-300 text-green-600 dark:border-green-700 dark:text-green-400">
              <Star className="w-4 h-4 mr-2" />
              Ideal for Early-Stage Analysis
            </Badge>
            <h3 className="text-2xl font-bold text-foreground">Start Here - Essential Market Intelligence</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {perfectProducts.map((product) => (
              <Card 
                key={product.id}
                className="shadow-lg border-2 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-950/30 dark:to-emerald-950/20 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handleProductClick(product)}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                      {product.category}
                    </Badge>
                    {product.perfect && (
                      <Badge variant="outline" className="text-xs border-green-300 text-green-600 dark:border-green-700 dark:text-green-400">
                        ⚡ Quick
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold text-green-900 dark:text-green-100">
                    {product.title}
                  </CardTitle>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 py-3 px-2 bg-green-50/50 dark:bg-green-950/30 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm font-bold text-green-600 dark:text-green-400">{product.agents}</div>
                      <div className="text-xs text-green-700 dark:text-green-300">Agents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{product.sources}</div>
                      <div className="text-xs text-blue-700 dark:text-blue-300">Sources</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-purple-600 dark:text-purple-400">{product.runtime}</div>
                      <div className="text-xs text-purple-700 dark:text-purple-300">Runtime</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-black text-green-600">${product.price}</span>
                      <span className="text-sm text-foreground/60 line-through">${product.originalPrice.toLocaleString()}</span>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Get Analysis
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Research Reports */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground">Complete Research Suite</h3>
            <p className="text-foreground/70">Professional analysis for every stage of your business journey</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...featuredProducts, ...regularProducts].map((product) => (
              <Card 
                key={product.id}
                className={`shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  product.featured 
                    ? 'border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-950/30 dark:to-indigo-950/20' 
                    : 'border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
                onClick={() => handleProductClick(product)}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    {product.featured && (
                      <Badge variant="outline" className="text-xs border-blue-300 text-blue-600 dark:border-blue-700 dark:text-blue-400">
                        ⭐ Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg font-bold">
                    {product.title}
                  </CardTitle>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-foreground/60">
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {product.agents} agents
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-3 h-3 mr-1" />
                      {product.sources} sources
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {product.runtime}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-black text-blue-600">${product.price}</span>
                      <span className="text-xs text-foreground/60 line-through">${product.originalPrice.toLocaleString()}</span>
                    </div>
                    <Button 
                      size="sm"
                      variant={product.featured ? "default" : "outline"}
                      className={product.featured ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">100+</div>
              <div className="text-sm text-foreground/70">Available Reports</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">SOC2</div>
              <div className="text-sm text-foreground/70">Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">$58K+</div>
              <div className="text-sm text-foreground/70">Value Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">600+</div>
              <div className="text-sm text-foreground/70">Hours Saved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}