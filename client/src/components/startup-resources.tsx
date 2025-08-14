import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

import bubbleLogo from "@assets/bubble-icon-logo-png_seeklogo-448116_1754234608565.png";
import beehiivLogo from "@assets/beehiivlogopng_1755201488531.png";
import liveplanLogo from "@assets/liveplanlogo_1755201488533.png";
import gammaLogo from "@assets/gamma_1755201488532.png";
import miroLogo from "@assets/mirologo_1755201488533.png";
import notionLogo from "@assets/notionlogopng_1755201488534.png";

interface StartupResourcesProps {
  validationData?: {
    idea: string;
    targetCustomer: string;
    problemSolved: string;
    feedback: string;
  };
}

export default function StartupResources({ validationData }: StartupResourcesProps) {
  // Only show if validation is complete
  if (!validationData) return null;

  const resources = [
    {
      name: "Bubble",
      title: "Mock Up Your Website",
      description: "Create a professional landing page mockup in minutes. No coding required - perfect for validating your idea with real visitors.",
      url: "https://bubble.pxf.io/e1kn1O",
      logo: bubbleLogo,
      color: "bg-purple-600 hover:bg-purple-700",
      category: "Website Builder"
    },
    {
      name: "Beehiiv",
      title: "Build Your Audience",
      description: "The best way to validate is to build an audience! Create newsletters and grow your subscriber base to validate demand before you build.",
      url: "https://beehiiv.com",
      logo: beehiivLogo,
      color: "bg-yellow-600 hover:bg-yellow-700",
      category: "Audience Building"
    },
    {
      name: "LivePlan",
      title: "Turn Into Business Plan",
      description: "Transform your validated idea into a comprehensive business plan with financial projections and investor-ready documents.",
      url: "https://liveplan.com",
      logo: liveplanLogo,
      color: "bg-blue-600 hover:bg-blue-700",
      category: "Business Planning"
    },
    {
      name: "Gamma",
      title: "Create Pitch Deck",
      description: "Build beautiful pitch decks powered by AI. Turn your idea validation into compelling presentation slides in minutes.",
      url: "https://gamma.app",
      logo: gammaLogo,
      color: "bg-green-600 hover:bg-green-700",
      category: "Presentations"
    },
    {
      name: "Miro",
      title: "Whiteboard Your Idea",
      description: "Visualize and map out your startup concept with collaborative whiteboarding. Perfect for brainstorming and team planning.",
      url: "https://miro.com",
      logo: miroLogo,
      color: "bg-orange-600 hover:bg-orange-700",
      category: "Collaboration"
    },
    {
      name: "Notion",
      title: "Organize & Analyze",
      description: "Keep all your startup research, customer feedback, and business insights organized in one powerful workspace.",
      url: "https://notion.so",
      logo: notionLogo,
      color: "bg-gray-600 hover:bg-gray-700",
      category: "Organization"
    }
  ];

  return (
    <section id="resources" className="py-20 bg-gradient-to-br from-accent/10 via-background to-primary/10 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 text-5xl opacity-20 animate-float">🚀</div>
        <div className="absolute bottom-20 right-20 text-4xl opacity-20 animate-bounce-gentle">💼</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-lg bg-gradient-to-r from-secondary/30 to-primary/20 border-secondary/30">
            <span className="w-8 h-8 bg-gradient-to-br from-secondary to-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 animate-pulse-slow">
              2
            </span>
            🛠️ Your Startup Resources Kit
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black mb-6 gradient-text">
            Ready to Build? <span className="emoji">⚡</span>
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            Your idea is validated! Now choose your next step with our trusted partner tools.
            <br />
            <span className="text-primary font-semibold">Each tool is specifically chosen to help turn your validated idea into reality! ✨</span>
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {resources.map((resource, index) => (
            <Card 
              key={resource.name} 
              className="shadow-2xl border-2 border-primary/20 hover:border-primary/40 bg-card/80 backdrop-blur-sm hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105 animate-float" 
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6 text-center">
                {/* Logo */}
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg p-2">
                  {resource.logo ? (
                    <img 
                      src={resource.logo}
                      alt={`${resource.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-2xl font-bold text-gray-400">
                      {resource.name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
                  {resource.category}
                </div>
                
                <h3 className="text-xl font-black text-foreground mb-2">{resource.title}</h3>
                
                <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                  {resource.description}
                </p>
                
                <Button 
                  asChild 
                  className={`w-full ${resource.color} transition-all duration-300 transform hover:scale-105 rounded-xl py-4 text-sm font-bold shadow-lg hover:shadow-xl`}
                >
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center">
                    <span className="mr-2">🚀</span>
                    Try {resource.name}
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Step Call-to-Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-2xl border border-primary/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-black gradient-text mb-4">
              Ready to Test with Real Customers? 
            </h3>
            <p className="text-lg text-foreground/80 mb-6">
              Now that you have the tools to build, let's simulate real customer conversations to refine your go-to-market strategy.
            </p>
            <div className="flex justify-center">
              <a href="#simulate" className="scroll-smooth">
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
                >
                  <span className="mr-2">💬</span>
                  Simulate Customer Conversations
                  <span className="ml-2">✨</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}