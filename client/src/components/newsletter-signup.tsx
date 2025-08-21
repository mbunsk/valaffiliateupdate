import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    // Track signup
    fetch('/api/track-product-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: 'newsletter-signup', location: 'footer', email: email })
    });

    console.log('Newsletter signup:', email);
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-white/90 to-indigo-50/50 dark:from-gray-900/90 dark:to-indigo-950/30">
          <CardHeader className="text-center pb-6">
            <Badge variant="outline" className="mx-auto mb-4 border-indigo-300 text-indigo-600 dark:border-indigo-700 dark:text-indigo-400">
              <Mail className="w-4 h-4 mr-2" />
              Stay Updated
            </Badge>
            <CardTitle className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">
              Get Research Insights & New Reports
            </CardTitle>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Join 10,000+ entrepreneurs and executives getting the latest business research trends, 
              product updates, and exclusive discounts on premium reports.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex space-x-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-12 text-base"
                    required
                  />
                  <Button 
                    type="submit"
                    size="lg"
                    className="h-12 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-2">
                  Thank You!
                </h3>
                <p className="text-foreground/70">
                  You'll receive our latest research insights and exclusive offers.
                </p>
              </div>
            )}
            
            <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-indigo-200 dark:border-indigo-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">Weekly</div>
                <div className="text-sm text-indigo-700 dark:text-indigo-300">Research Insights</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">Exclusive</div>
                <div className="text-sm text-purple-700 dark:text-purple-300">Early Access</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">20% Off</div>
                <div className="text-sm text-green-700 dark:text-green-300">Member Discounts</div>
              </div>
            </div>
            
            <p className="text-xs text-center text-foreground/60">
              No spam. Unsubscribe anytime. 10,000+ professionals trust our insights.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}