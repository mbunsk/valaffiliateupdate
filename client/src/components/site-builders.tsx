import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SiteBuilders() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const samplePrompt = `Create a landing page mockup for "FitAI" - an app concept that uses AI to create personalized workout plans. Include a hero section highlighting the AI personalization, features section showing workout customization, testimonials section, and a signup form to collect interest. Use a clean, fitness-focused design with blue and green accent colors. Perfect for showing the concept to potential partners, friends, or collaborators who might be interested in the idea.`;

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(samplePrompt);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy prompt",
        variant: "destructive",
      });
    }
  };

  const builders = [
    {
      name: "Replit",
      description: "Free builder with powerful features — no credit card needed!",
      url: "https://replit.com",
      color: "bg-orange-600 hover:bg-orange-700",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      name: "Lovable",
      description: "Beautiful visual editor — start creating instantly for free!",
      url: "https://lovable.dev",
      color: "bg-pink-600 hover:bg-pink-700",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      name: "Typedream",
      description: "Simple as Notion — mock up pages in minutes for free!",
      url: "https://typedream.com",
      color: "bg-purple-600 hover:bg-purple-700",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <section id="build" className="py-20 bg-gradient-to-br from-secondary/25 via-background to-primary/15 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 text-5xl opacity-20 animate-float">🎨</div>
        <div className="absolute bottom-20 right-20 text-4xl opacity-20 animate-bounce-gentle">⚡</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-lg bg-gradient-to-r from-secondary/30 to-primary/20 border-secondary/30">
            <span className="w-8 h-8 bg-gradient-to-br from-secondary to-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 animate-pulse-slow">
              2
            </span>
            🎨 Build Your Landing Page
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black mb-6 gradient-text">
            Mock Up Your Idea! <span className="emoji">🚀</span>
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            Create a free landing page to show partners, customers, and friends what you're exploring!
            <br />
            <span className="text-primary font-semibold">Perfect for sharing your concept and getting feedback! ✨</span>
          </p>
        </div>

        {/* Prompt Generator */}
        <Card className="mb-12 shadow-2xl border-2 border-accent/30 bg-card/80 backdrop-blur-sm animate-pulse-slow">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <span className="text-3xl animate-wiggle">📝</span>
              <h3 className="text-2xl font-black gradient-text mt-2">Free Landing Page Prompt!</h3>
              <p className="text-foreground/70 mt-2">Copy this and create your mockup in minutes — completely free!</p>
            </div>
            
            <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-6 border-2 border-accent/20">
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-semibold text-foreground">✨ Copy & paste to get started free:</p>
                <Button
                  onClick={copyPrompt}
                  variant="outline"
                  className="rounded-full border-2 border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                  size="sm"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? "🎉 Copied!" : "📋 Copy Prompt"}
                </Button>
              </div>
              
              <div className="bg-card/90 p-6 rounded-xl border-2 border-primary/20 font-mono text-sm text-foreground shadow-inner backdrop-blur-sm">
                {samplePrompt}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Site Builders */}
        <div className="grid md:grid-cols-3 gap-8">
          {builders.map((builder, index) => (
            <Card key={builder.name} className="shadow-2xl border-2 border-primary/20 hover:border-primary/40 bg-card/80 backdrop-blur-sm hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105 animate-float" style={{animationDelay: `${index * 0.2}s`}}>
              <CardContent className="p-8 text-center">
                <div className={`w-20 h-20 ${builder.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 animate-bounce-gentle shadow-lg`} style={{animationDelay: `${index * 0.3}s`}}>
                  <div className={`w-10 h-10 ${builder.iconColor}`}>
                    {builder.name === "Replit" && (
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    )}
                    {builder.name === "Lovable" && (
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    )}
                    {builder.name === "Typedream" && (
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                        <polyline points="14,2 14,8 20,8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10,9 9,9 8,9"/>
                      </svg>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-foreground mb-3">{builder.name}</h3>
                <p className="text-foreground/70 mb-6 text-lg">{builder.description}</p>
                <Button asChild className={`w-full ${builder.color} transition-all duration-300 transform hover:scale-105 rounded-2xl py-6 text-lg font-bold shadow-lg hover:shadow-xl`}>
                  <a href={builder.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center">
                    <span className="mr-2">🎨</span>
                    Mock Up For Free
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
