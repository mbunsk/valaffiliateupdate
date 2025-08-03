import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Jessica Martinez",
    title: "Founder, MoodTracker",
    initials: "JM",
    color: "from-blue-400 to-blue-600",
    quote: "ValidatorAI helped me refine my mental health app concept. The AI feedback was spot-on, and getting featured in their newsletter brought me 2,000+ signups!"
  },
  {
    name: "Robert Chen",
    title: "Founder, EcoDelivery",
    initials: "RC",
    color: "from-green-400 to-green-600",
    quote: "The validation process saved me months of building the wrong thing. Now I have a sustainable delivery service with real customers."
  },
  {
    name: "Sarah Parker",
    title: "Founder, StudyBuddy",
    initials: "SP",
    color: "from-purple-400 to-purple-600",
    quote: "From validation to launch in 3 weeks! The site builder recommendations were perfect, and the newsletter feature got me early investors."
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-secondary/20 via-background to-primary/10 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl opacity-10 animate-float">🎉</div>
        <div className="absolute bottom-10 right-10 text-5xl opacity-10 animate-bounce-gentle">💫</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <span className="text-4xl animate-wiggle mb-4 block">🏆</span>
          <h2 className="text-3xl sm:text-5xl font-black mb-4 gradient-text">Success Stories!</h2>
          <p className="text-xl text-foreground/70">Real people who turned wild ideas into amazing startups 🚀</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.name} className="shadow-2xl border-2 border-primary/20 hover:border-primary/40 bg-card/80 backdrop-blur-sm hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105 animate-float" style={{animationDelay: `${index * 0.3}s`}}>
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.color} rounded-2xl flex items-center justify-center shadow-lg animate-bounce-gentle`} style={{animationDelay: `${index * 0.4}s`}}>
                    <span className="text-white font-black text-lg">{testimonial.initials}</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-black text-foreground text-lg">{testimonial.name}</p>
                    <p className="text-sm text-foreground/70 font-semibold">{testimonial.title}</p>
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute -top-2 -left-2 text-3xl text-primary/30">"</span>
                  <p className="text-foreground/80 italic leading-relaxed pl-6">{testimonial.quote}</p>
                  <span className="absolute -bottom-4 -right-2 text-3xl text-primary/30">"</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
