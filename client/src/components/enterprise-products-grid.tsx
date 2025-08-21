import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, FileText, ArrowRight, CheckCircle, Sparkles, Target, BarChart3, Brain, Zap } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  agents: number;
  runtime: number;
  outputs: string;
  category: string;
  featured?: boolean;
  specs: string[];
}

const products: Product[] = [
  {
    id: "quick-idea-validation",
    name: "Quick Idea Validation",
    description: "Fast desirability assessment with market pain point analysis and adoption feasibility scoring.",
    price: 29,
    agents: 1,
    runtime: 3,
    outputs: "PDF + PowerPoint + Public Link",
    category: "Idea Validation",
    specs: [
      "Market pain analysis",
      "Customer adoption scoring",
      "Risk assessment",
      "Next steps roadmap"
    ]
  },
  {
    id: "market-opportunity-discovery", 
    name: "Market Opportunity Discovery",
    description: "Deep dive into market pain points, innovation gaps, and customer behavior patterns.",
    price: 49,
    agents: 3,
    runtime: 11,
    outputs: "PDF + PowerPoint + Public Link", 
    category: "Market Research",
    specs: [
      "Pain point mapping",
      "Innovation opportunities", 
      "Customer behavior analysis",
      "Market gap identification"
    ]
  },
  {
    id: "tam-analysis",
    name: "Total Addressable Market Analysis", 
    description: "Comprehensive market sizing with growth projections and profit margin estimates.",
    price: 89,
    agents: 5,
    runtime: 21,
    outputs: "PDF + PowerPoint + Public Link",
    category: "Market Sizing",
    specs: [
      "TAM/SAM/SOM breakdown",
      "Growth projections",
      "Profit margin analysis", 
      "Industry boundaries"
    ]
  },
  {
    id: "customer-research-analysis",
    name: "Customer Research Analysis",
    description: "Voice of customer insights with authentic data analysis and product-goal alignment.",
    price: 79,
    agents: 3, 
    runtime: 25,
    outputs: "PDF + PowerPoint + Public Link",
    category: "Customer Insights",
    specs: [
      "Voice of customer data",
      "Product-goal alignment",
      "Customer journey mapping",
      "Persona development"
    ]
  },
  {
    id: "revenue-stream-validation",
    name: "Revenue Stream Validation", 
    description: "Business model analysis with pricing strategies and revenue optimization recommendations.",
    price: 69,
    agents: 4,
    runtime: 15,
    outputs: "PDF + PowerPoint + Public Link",
    category: "Financial Analysis",
    specs: [
      "Revenue model analysis",
      "Pricing strategy",
      "Unit economics",
      "Monetization options"
    ]
  },
  {
    id: "new-product-feasibility",
    name: "New Product Feasibility Study",
    description: "Comprehensive analysis for new product launches with market validation and go-to-market strategy.",
    price: 119,
    agents: 10,
    runtime: 49,
    outputs: "PDF + PowerPoint + Public Link",
    category: "Product Strategy", 
    featured: true,
    specs: [
      "Market opportunity assessment",
      "Customer demand validation", 
      "Revenue projections",
      "Go-to-market strategy",
      "Risk mitigation plan",
      "Implementation roadmap"
    ]
  },
  {
    id: "market-intelligence-report",
    name: "Market Intelligence Report",
    description: "Strategic intelligence with competitor analysis, market trends, and positioning recommendations.",
    price: 99,
    agents: 5,
    runtime: 28, 
    outputs: "PDF + PowerPoint + Public Link",
    category: "Market Intelligence",
    specs: [
      "Competitor landscape",
      "Market trend analysis", 
      "Positioning strategy",
      "Opportunity identification"
    ]
  },
  {
    id: "enterprise-idea-assessment", 
    name: "Enterprise Idea Assessment",
    description: "Executive-level analysis with strategic recommendations, risk assessment, and implementation planning.",
    price: 149,
    agents: 10,
    runtime: 50,
    outputs: "PDF + PowerPoint + Public Link",
    category: "Strategic Analysis",
    specs: [
      "Executive summary",
      "Strategic recommendations",
      "Enterprise risk analysis", 
      "Implementation timeline",
      "Resource requirements",
      "ROI projections"
    ]
  }
];

const categoryIcons = {
  "Idea Validation": Target,
  "Market Research": BarChart3, 
  "Market Sizing": Users,
  "Customer Insights": Brain,
  "Financial Analysis": FileText,
  "Product Strategy": Zap,
  "Market Intelligence": CheckCircle,
  "Strategic Analysis": Sparkles
};

interface EnterpriseProductsGridProps {
  onProductClick?: (product: Product) => void;
}

export default function EnterpriseProductsGrid({ onProductClick }: EnterpriseProductsGridProps) {
  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product.name);
    onProductClick?.(product);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => {
        const IconComponent = categoryIcons[product.category as keyof typeof categoryIcons] || Target;
        
        return (
          <Card 
            key={product.id} 
            className={`group transition-smooth hover:shadow-lg cursor-pointer ${
              product.featured ? 'border-2 border-primary/30 shadow-lg' : 'border border-border hover:border-primary/50'
            }`}
            onClick={() => handleProductClick(product)}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  {product.featured && (
                    <Badge className="accent-gradient text-white">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground">
                    ${product.price}
                  </div>
                </div>
              </div>

              {/* Product info */}
              <div className="mb-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Specs grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {product.specs.slice(0, 4).map((spec, index) => (
                    <div key={index} className="flex items-center space-x-1.5">
                      <CheckCircle className="w-3 h-3 text-success" />
                      <span className="text-xs text-muted-foreground">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {product.runtime}m
                  </span>
                  <span className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {product.agents} agents
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {product.category}
                </Badge>
              </div>

              {/* CTA */}
              <Button 
                className="w-full group-hover:accent-gradient group-hover:text-white transition-smooth"
                variant={product.featured ? "default" : "outline"}
              >
                Start Analysis
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}