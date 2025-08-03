import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart, Lightbulb } from "lucide-react";

export default function MeetVal() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-16 text-4xl opacity-20 animate-float">✨</div>
        <div className="absolute bottom-10 left-16 text-3xl opacity-20 animate-bounce-gentle">💭</div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Card className="shadow-2xl border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Val's Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl animate-pulse-slow">
                  <img 
                    src="/attached_assets/AIValFull_1754243498167.jpg" 
                    alt="Val - Your AI Startup Mentor" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <h2 className="text-3xl font-black gradient-text mb-2">
                    Meet Val <span className="text-2xl">👋</span>
                  </h2>
                  <p className="text-lg text-primary font-semibold">Your warm, thoughtful AI startup mentor</p>
                </div>
                
                <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                  Val is your personal AI mentor who loves helping entrepreneurs explore their wildest ideas! 
                  She provides thoughtful feedback, practical insights, and encouragement to help you discover 
                  if your concept has potential. No judgment, just genuine support for your entrepreneurial journey.
                </p>
                
                {/* Val's specialties */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-xl">
                    <Lightbulb className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">Idea Analysis</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-xl">
                    <Heart className="w-6 h-6 text-accent flex-shrink-0" />
                    <span className="text-sm font-medium">Supportive Feedback</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-xl">
                    <Sparkles className="w-6 h-6 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium">Growth Insights</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}