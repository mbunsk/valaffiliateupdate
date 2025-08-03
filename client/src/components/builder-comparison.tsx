import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

export default function BuilderComparison() {
  const builders = [
    {
      name: "Base44",
      bestFor: "Tech Products",
      speed: 5,
      ease: 4,
      features: ["AI-powered", "No code needed", "Fast setup"],
      price: "Free",
      recommended: true,
    },
    {
      name: "Lovable",
      bestFor: "Beautiful Design",
      speed: 4,
      ease: 5,
      features: ["Visual editor", "Templates", "Responsive"],
      price: "Free",
    },
    {
      name: "Bubble",
      bestFor: "Complex Apps",
      speed: 3,
      ease: 3,
      features: ["Database", "Logic flows", "Powerful"],
      price: "Free tier",
    },
  ];

  return (
    <Card className="shadow-lg border-2 border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5 mb-8">
      <CardContent className="p-6">
        <h4 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
          🏆 Which Builder Is Right for You?
        </h4>
        
        <div className="grid md:grid-cols-3 gap-4">
          {builders.map((builder) => (
            <div key={builder.name} className="bg-card/50 rounded-lg p-4 border border-accent/10">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-bold text-foreground">{builder.name}</h5>
                {builder.recommended && (
                  <Badge className="bg-orange-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Top Pick
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-primary font-semibold mb-2">
                Best for: {builder.bestFor}
              </p>
              
              <div className="space-y-1 mb-3">
                {builder.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-xs">
                    <Check className="w-3 h-3 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Speed: {"★".repeat(builder.speed)}</span>
                <span className="font-semibold text-green-600">{builder.price}</span>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground mt-4 text-center">
          💡 Pro tip: Try your prompt with all three to see which style matches your vision best!
        </p>
      </CardContent>
    </Card>
  );
}