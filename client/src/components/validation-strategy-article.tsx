import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, TrendingUp, Users, Target, BarChart, Lightbulb } from "lucide-react";
import { Link } from "wouter";

export default function ValidationStrategyArticle() {
  return (
    <section className="py-16 bg-gradient-to-br from-accent/10 via-background to-primary/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-black mb-6 gradient-text">
            This is How Ideas Are Validated in 2026 and Beyond
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Are you using dated methods? Discover the modern approach to startup idea validation that's helping entrepreneurs build successful businesses faster than ever before.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Old vs New Methods */}
          <Card className="border border-red-200 bg-red-50/50 dark:bg-red-950/20 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400 flex items-center">
                <span className="mr-3 text-2xl">❌</span>
                Dated Validation Methods (2023 and Earlier)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-red-700 dark:text-red-300">Manual surveys that take weeks to get meaningful responses</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-red-700 dark:text-red-300">Building full prototypes before validating core assumptions</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-red-700 dark:text-red-300">Relying on friends and family feedback (hello, bias!)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-red-700 dark:text-red-300">Guessing at pricing without real customer conversations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-green-600 dark:text-green-400 flex items-center">
                <span className="mr-3 text-2xl">✅</span>
                Modern AI-Powered Validation (2026)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-700 dark:text-green-300">AI generates diverse customer personas based on your idea</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-700 dark:text-green-300">Simulated customer interviews reveal real pain points</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-700 dark:text-green-300">Data-driven pricing insights from customer willingness to pay</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-700 dark:text-green-300">6-month business simulation based on real customer feedback</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why This Matters */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Why Modern Validation Matters More Than Ever</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-bold mb-2">90% Startup Failure Rate</h4>
              <p className="text-sm text-foreground/70">Most startups fail because they build something nobody wants. AI validation helps you avoid this trap.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-bold mb-2">Customer-Centric Approach</h4>
              <p className="text-sm text-foreground/70">AI simulates diverse customer perspectives you might never have considered on your own.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-bold mb-2">Speed & Precision</h4>
              <p className="text-sm text-foreground/70">Get comprehensive validation in minutes instead of months of manual research.</p>
            </div>
          </div>
        </div>

        {/* The Future of Validation */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center">
              <Lightbulb className="w-6 h-6 mr-3 text-primary" />
              The Future is Here: AI-Powered Entrepreneurship
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              We're at an inflection point. The entrepreneurs who embrace AI-powered validation today will have a massive advantage over those still using outdated methods. Don't get left behind.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-primary/20">
                <BarChart className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-bold mb-1">Data-Driven Decisions</h4>
                <p className="text-sm text-foreground/70">Every recommendation backed by AI analysis and customer insights</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-primary/20">
                <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-bold mb-1">Reduced Risk</h4>
                <p className="text-sm text-foreground/70">Validate before you build, saving time and money</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/" className="inline-flex items-center">
                  Try AI Validation Free
                  <TrendingUp className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}