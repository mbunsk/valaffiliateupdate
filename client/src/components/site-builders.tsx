import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SiteBuilders() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const samplePrompt = `Create a modern landing page for "FitAI" - a mobile app that uses AI to create personalized workout plans based on fitness goals, available equipment, and schedule. Include a hero section highlighting the AI personalization, features section showing workout customization, testimonials from beta users, pricing plans (free and premium tiers), and a waitlist signup form. Use a clean, fitness-focused design with blue and green accent colors. Target audience: busy professionals who want effective home workouts.`;

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
      description: "Fastest no-code builder with backend support.",
      url: "https://replit.com",
      color: "bg-orange-600 hover:bg-orange-700",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      name: "Lovable",
      description: "Visual, drag-and-drop editor. Easy and sleek.",
      url: "https://lovable.dev",
      color: "bg-pink-600 hover:bg-pink-700",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      name: "Typedream",
      description: "Notion-style UI, perfect for fast pages.",
      url: "https://typedream.com",
      color: "bg-purple-600 hover:bg-purple-700",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <section id="build" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <span className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2">
              2
            </span>
            Build Your Landing Page
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Bring Your Idea to Life
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Pick one of our favorite site builders to create your landing page fast — no coding required.
          </p>
        </div>

        {/* Prompt Generator */}
        <Card className="mb-12 shadow-lg border border-gray-200">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📝 Generated Prompt for Your Site Builder</h3>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Copy this prompt and paste it into any of the builders below:</p>
              <div className="bg-white p-4 rounded-lg border border-gray-300 font-mono text-sm text-gray-800">
                {samplePrompt}
              </div>
              <Button
                onClick={copyPrompt}
                variant="outline"
                className="mt-3"
                size="sm"
              >
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copied!" : "Copy Prompt"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Site Builders */}
        <div className="grid md:grid-cols-3 gap-8">
          {builders.map((builder) => (
            <Card key={builder.name} className="shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${builder.iconBg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <div className={`w-8 h-8 ${builder.iconColor}`}>
                    {builder.name === "Replit" && (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    )}
                    {builder.name === "Lovable" && (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    )}
                    {builder.name === "Typedream" && (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                        <polyline points="14,2 14,8 20,8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10,9 9,9 8,9"/>
                      </svg>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{builder.name}</h3>
                <p className="text-gray-600 mb-6">{builder.description}</p>
                <Button asChild className={`w-full ${builder.color} transition-colors`}>
                  <a href={builder.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center">
                    Start with {builder.name}
                    <ExternalLink className="ml-2 w-4 h-4" />
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
