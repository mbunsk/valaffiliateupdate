import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Brain, Clock, DollarSign, FileText, Users } from "lucide-react";
import { useState } from "react";

export default function NewHero() {
  const [idea, setIdea] = useState("");
  const [targetMarket, setTargetMarket] = useState("");

  const handleFeasibilityStudy = () => {
    // Track click for analytics
    fetch('/api/track-product-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: 'new-product-feasibility-study', location: 'hero' })
    });

    // Handle purchase flow - you'll implement Stripe integration
    console.log('Feasibility study clicked:', { idea, targetMarket });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-indigo-50/50 dark:from-background dark:via-blue-950/20 dark:to-indigo-950/30 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Company info and messaging */}
          <div className="space-y-8">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-800">
              <Brain className="w-4 h-4 mr-2" />
              Enterprise-Grade Research Platform
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-6xl font-black leading-tight">
                Deep Research &{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Analysis Reports
                </span>
              </h1>
              
              <p className="text-xl text-foreground/80 leading-relaxed max-w-2xl">
                Access professional-grade market research and strategic analysis that was previously only available to Fortune 500 companies with dedicated consultant teams.
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">$15,000+</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Consultant Costs Saved</div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">70+ Hours</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Research Time Saved</div>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-foreground/70">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-blue-500" />
                  <span>5 AI Agents</span>
                </div>
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-indigo-500" />
                  <span>60+ Sources</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-purple-500" />
                  <span>25 Min Runtime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Featured product form */}
          <div className="lg:ml-8">
            <Card className="shadow-2xl border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-white/90 to-blue-50/50 dark:from-gray-900/90 dark:to-blue-950/30 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <Badge variant="outline" className="mx-auto mb-3 border-blue-300 text-blue-600 dark:border-blue-700 dark:text-blue-400">
                  Most Popular
                </Badge>
                <CardTitle className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  New Product Feasibility Study
                </CardTitle>
                <p className="text-foreground/70 leading-relaxed">
                  Get a comprehensive analysis of your product idea's market viability, positioning strategy, and go/no-go recommendation.
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 py-4 px-2 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">5</div>
                    <div className="text-xs text-blue-700 dark:text-blue-300">AI Agents</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">66</div>
                    <div className="text-xs text-green-700 dark:text-green-300">Sources</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">26min</div>
                    <div className="text-xs text-purple-700 dark:text-purple-300">Runtime</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="target-market" className="text-sm font-medium">Target Market</Label>
                    <Textarea
                      id="target-market"
                      placeholder="e.g., Remote workers, Small business owners, Tech startups..."
                      value={targetMarket}
                      onChange={(e) => setTargetMarket(e.target.value)}
                      rows={2}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="product-idea" className="text-sm font-medium">Product Idea</Label>
                    <Textarea
                      id="product-idea"
                      placeholder="Describe your product or service idea in detail..."
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="text-3xl font-black text-green-600">$197</div>
                    <div className="text-sm text-foreground/70 line-through">$15,000</div>
                  </div>
                  
                  <Button 
                    onClick={handleFeasibilityStudy}
                    disabled={!idea.trim() || !targetMarket.trim()}
                    size="lg"
                    className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <DollarSign className="w-5 h-5 mr-2" />
                    Get Feasibility Study
                  </Button>
                  
                  <p className="text-xs text-foreground/60 text-center">
                    ✅ PDF + PowerPoint delivery • 📧 Email notification when ready • 🔒 SOC2 & GDPR compliant
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}