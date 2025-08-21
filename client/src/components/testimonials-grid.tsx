import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Building2, Shield, TrendingUp } from "lucide-react";

const testimonials = [
  {
    initial: "J",
    name: "Jessica Chen",
    title: "Chief Strategy Officer",
    company: "TechGlobal Solutions",
    quote: "ValidatorAI's enterprise intelligence platform has revolutionized our strategic planning process. The depth of market analysis rivals our top-tier consulting partners."
  },
  {
    initial: "D",
    name: "Dr. Ivan Romano",
    title: "VP of Innovation",
    company: "Substancy Corp",
    quote: "The AI-powered research capabilities delivered insights that would have taken our team months to compile. Exceptional enterprise-grade analysis."
  },
  {
    initial: "T",
    name: "Travis Morrison",
    title: "Professor of Business Strategy",
    company: "Cal State Business School",
    quote: "ValidatorAI's research intelligence platform provides Fortune 500-grade strategic insights with remarkable speed and accuracy."
  },
  {
    initial: "D",
    name: "David Fox",
    title: "CEO & Founder",
    company: "Zapt Technologies",
    quote: "The competitive intelligence and market analysis from ValidatorAI significantly accelerated our strategic decision-making process."
  },
  {
    initial: "J",
    name: "Jennifer Adams",
    title: "Director of Market Research",
    company: "Innovation Partners",
    quote: "We've replaced multiple research vendors with ValidatorAI's comprehensive business intelligence platform. The ROI is exceptional."
  },
  {
    initial: "A",
    name: "Andrew Bouras",
    title: "Chief Technology Officer",
    company: "Varos Technologies",
    quote: "ValidatorAI consistently delivers enterprise-grade strategic insights that inform our most critical business decisions."
  }
];

export default function TestimonialsGrid() {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/5 to-background grid-pattern relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl tech-glow"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary/15 rounded-full blur-xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <Badge className="bg-primary/20 text-primary border-primary/30 tech-glow mb-6">
            <Building2 className="w-4 h-4 mr-2" />
            Enterprise Client Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black mb-6">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-3xl mx-auto">
            Fortune 500 companies and enterprise organizations rely on ValidatorAI for strategic intelligence and market research
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="shadow-lg border-2 border-primary/20 hover:border-primary/40 bg-card/80 backdrop-blur-sm hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105 animate-float" 
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                {/* Avatar and Name */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    {testimonial.initial}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-xs text-primary font-semibold">{testimonial.title}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
                
                {/* Quote */}
                <p className="text-foreground/80 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}