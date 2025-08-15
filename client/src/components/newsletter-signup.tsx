import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Loader2, Mail, Users, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterData = z.infer<typeof newsletterSchema>;

export default function NewsletterSignup() {
  const { toast } = useToast();

  const form = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: NewsletterData) => {
      // For now, we'll just simulate a successful subscription
      // Later this can be connected to an actual newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: "Successfully subscribed!" };
    },
    onSuccess: () => {
      toast({
        title: "Welcome to the community!",
        description: "You've successfully joined our newsletter with 200,000+ entrepreneurs!",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Subscription failed",
        description: "Please try again or contact us for help.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: NewsletterData) => {
    subscribeMutation.mutate(data);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/10 to-accent/20 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl opacity-20 animate-float">📧</div>
        <div className="absolute top-20 right-20 text-5xl opacity-20 animate-bounce-gentle">🌟</div>
        <div className="absolute bottom-10 left-1/4 text-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}>🚀</div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-lg bg-gradient-to-r from-primary/20 to-accent/30 border-primary/30">
            <Mail className="w-5 h-5 mr-2" />
            Join Our Community
          </Badge>
          
          <h2 className="text-3xl sm:text-5xl font-black mb-6 gradient-text">
            Join 200,000+ Entrepreneurs! <span className="emoji">📬</span>
          </h2>
          
          <p className="text-xl text-foreground/70 mb-8 max-w-3xl mx-auto">
            Get exclusive startup insights, featured projects, and validation tips delivered weekly. 
            Be part of the largest group of idea-explorers on the Internet!
          </p>
        </div>

        <Card className="shadow-lg border-2 border-purple-400 hover:border-purple-500 shadow-purple-200/50 dark:shadow-purple-900/50 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">Stay In The Loop!</h3>
              <p className="text-foreground/70 text-lg">Join thousands of entrepreneurs getting weekly startup insights</p>
            </div>
            
            <div className="text-center">
              <Button
                onClick={() => window.open('https://forms.gle/REPLACE-WITH-YOUR-GOOGLE-FORM-ID', '_blank')}
                size="lg"
                className="h-14 px-8 text-lg font-bold rounded-xl shadow-xl shadow-primary/30 bg-gradient-to-r from-primary via-accent to-primary hover:from-accent hover:via-primary hover:to-accent transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              >
                Join Newsletter with Google Auth
                <span className="ml-2">🚀</span>
              </Button>
              <p className="text-sm text-foreground/60 mt-4">
                Secure signup with Google authentication - no spam, no bots!
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-foreground/60">
                ✨ Free forever • 📧 Weekly updates • 🔒 No spam, ever
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}