import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, ExternalLink } from "lucide-react";

export default function AudienceBuildingSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50/50 via-background to-green-50/50 dark:from-blue-950/20 dark:via-background dark:to-green-950/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border border-blue-200 bg-gradient-to-r from-blue-50/80 to-green-50/80 dark:from-blue-950/40 dark:to-green-950/40 dark:border-blue-800 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Build Your Own 200,000+ Member Audience
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              We built ValidatorAI's community to 200,000+ entrepreneurs by following proven audience-building strategies. 
              Now we're sharing exactly how we did it, so you can build your own engaged community around your validated idea.
            </p>
            
            <div className="flex items-center justify-center space-x-8 py-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">200K+</div>
                <div className="text-sm text-foreground/70">Community Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">Proven</div>
                <div className="text-sm text-foreground/70">Strategy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">Free</div>
                <div className="text-sm text-foreground/70">Resource</div>
              </div>
            </div>

            <p className="text-foreground/70">
              Learn the exact methods, tools, and strategies we used to grow from zero to 200,000+ engaged entrepreneurs. 
              This comprehensive guide covers everything from content creation to community management.
            </p>

            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <a href="/validation-strategy" target="_blank" className="inline-flex items-center">
                  <TrendingUp className="w-5 h-5 mr-3" />
                  Read Our Complete Audience Building Guide
                  <ExternalLink className="w-4 h-4 ml-3" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}