import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Clock, Users, FileText, DollarSign, CheckCircle, Shield, Mail } from "lucide-react";
import ProductDetails from "./product-details";
import { Product } from "@shared/types";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (product: Product, inputs: Record<string, string>) => void;
}

// Define input requirements for each product
const productInputs: Record<string, { name: string; label: string; placeholder: string; type?: string }[]> = {
  "new-product-feasibility-study": [
    { name: "targetMarket", label: "Target Market", placeholder: "e.g., Remote workers, Small business owners..." },
    { name: "productIdea", label: "Product Idea", placeholder: "Describe your product or service idea in detail..." }
  ],
  "idea-desirability-assessment": [
    { name: "idea", label: "Business Idea", placeholder: "Describe your business idea..." }
  ],
  "tam-assessment-for-ideas": [
    { name: "idea", label: "Business Idea", placeholder: "Describe your business idea..." }
  ],
  "business-idea-evaluation": [
    { name: "company", label: "Company Name", placeholder: "Your company name..." },
    { name: "idea", label: "Business Idea", placeholder: "Describe your business idea..." }
  ],
  "porter-5-forces-analysis": [
    { name: "market", label: "Market/Industry", placeholder: "e.g., SaaS software, E-commerce, Healthcare..." }
  ],
  "voice-of-customer-insights": [
    { name: "questions", label: "Research Questions", placeholder: "What specific questions do you want answered?" },
    { name: "persona", label: "Target Persona", placeholder: "Describe your target customer persona..." },
    { name: "productOrDomain", label: "Product/Domain", placeholder: "Your product or business domain..." }
  ],
  "market-pain-points-analysis": [
    { name: "market", label: "Market/Industry", placeholder: "e.g., SaaS software, E-commerce, Healthcare..." },
    { name: "topic", label: "Specific Topic", placeholder: "Specific area of focus within the market..." }
  ],
  "revenue-opportunity-validation": [
    { name: "industry", label: "Industry", placeholder: "e.g., Fintech, Healthcare, E-commerce..." },
    { name: "area", label: "Business Area", placeholder: "Specific business area or opportunity..." }
  ]
};

export default function ProductModal({ product, isOpen, onClose, onPurchase }: ProductModalProps) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [showInputs, setShowInputs] = useState(false);

  if (!product) return null;

  const requiredInputs = productInputs[product.id] || [];

  const handleInputChange = (name: string, value: string) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleBuyNow = () => {
    if (requiredInputs.length === 0) {
      // No inputs required, proceed directly
      onPurchase(product, {});
    } else {
      setShowInputs(true);
    }
  };

  const handleSubmitInputs = () => {
    // Validate all required inputs are filled
    const missingInputs = requiredInputs.filter(input => !inputs[input.name]?.trim());
    if (missingInputs.length > 0) {
      alert('Please fill in all required fields');
      return;
    }
    
    onPurchase(product, inputs);
  };

  const getSavingsPercentage = () => {
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Product details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">{product.category}</Badge>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Agent breakdown */}
            <Card className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-950/30 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  {product.agents} AI Agents Working Simultaneously
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                    <div className="font-bold text-blue-600">{product.agents}</div>
                    <div className="text-xs text-blue-700 dark:text-blue-300">AI Agents</div>
                  </div>
                  <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                    <FileText className="w-6 h-6 mx-auto mb-1 text-green-600" />
                    <div className="font-bold text-green-600">{product.sources}</div>
                    <div className="text-xs text-green-700 dark:text-green-300">Sources</div>
                  </div>
                  <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                    <Clock className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                    <div className="font-bold text-purple-600">{product.runtime}</div>
                    <div className="text-xs text-purple-700 dark:text-purple-300">Runtime</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details with Agent Breakdown */}
            <ProductDetails productId={product.id} />

            {/* Savings callout */}
            <Card className="bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-950/30 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-green-700 dark:text-green-300">You Save</div>
                  <div className="text-2xl font-black text-green-600">${(product.originalPrice - product.price).toLocaleString()}</div>
                  <div className="text-sm text-green-600">({getSavingsPercentage()}% off consultant rates)</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Purchase form */}
          <div className="space-y-6">
            {!showInputs ? (
              /* Initial purchase card */
              <Card className="shadow-xl border-2 border-blue-200 dark:border-blue-800">
                <CardHeader className="text-center">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-3xl font-black text-blue-600">${product.price}</span>
                      <span className="text-lg text-foreground/60 line-through">${product.originalPrice.toLocaleString()}</span>
                    </div>
                    <Badge variant="outline" className="border-green-300 text-green-600">
                      Save {getSavingsPercentage()}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={handleBuyNow}
                    size="lg"
                    className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <DollarSign className="w-5 h-5 mr-2" />
                    Get This Report
                  </Button>
                  
                  <div className="text-center space-y-2">
                    <p className="text-sm text-foreground/70">
                      One-time payment • No subscription required
                    </p>
                    <div className="flex items-center justify-center text-xs text-foreground/60">
                      <Mail className="w-3 h-3 mr-1" />
                      Delivered to your email in {product.runtime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Input form */
              <Card className="shadow-xl border-2 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-lg">Complete Your Order</CardTitle>
                  <p className="text-sm text-foreground/70">
                    Provide the details below and you'll be taken to secure checkout.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {requiredInputs.map((input) => (
                    <div key={input.name}>
                      <Label htmlFor={input.name} className="text-sm font-medium">
                        {input.label}
                      </Label>
                      {input.name.includes('idea') || input.name.includes('questions') ? (
                        <Textarea
                          id={input.name}
                          placeholder={input.placeholder}
                          value={inputs[input.name] || ''}
                          onChange={(e) => handleInputChange(input.name, e.target.value)}
                          rows={3}
                          className="mt-1"
                        />
                      ) : (
                        <Input
                          id={input.name}
                          type={input.type || 'text'}
                          placeholder={input.placeholder}
                          value={inputs[input.name] || ''}
                          onChange={(e) => handleInputChange(input.name, e.target.value)}
                          className="mt-1"
                        />
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center justify-center space-x-3 py-2 px-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <span className="text-xl font-black text-blue-600">${product.price}</span>
                      <span className="text-sm text-foreground/60">One-time payment</span>
                    </div>
                    
                    <Button 
                      onClick={handleSubmitInputs}
                      size="lg"
                      className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700"
                    >
                      Proceed to Checkout
                    </Button>
                    
                    <p className="text-xs text-center text-foreground/60">
                      Report delivered via email in {product.runtime} • Secure payment processing • You can leave after payment
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trust indicators */}
            <div className="text-center space-y-3">
              <div className="text-sm font-medium text-foreground/80">Trusted by Fortune 500 Companies</div>
              <div className="grid grid-cols-3 gap-4 text-xs text-foreground/60">
                <div>
                  <Shield className="w-4 h-4 mx-auto mb-1" />
                  SOC2 Compliant
                </div>
                <div>
                  <CheckCircle className="w-4 h-4 mx-auto mb-1" />
                  GDPR Protected
                </div>
                <div>
                  <Mail className="w-4 h-4 mx-auto mb-1" />
                  Email Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}