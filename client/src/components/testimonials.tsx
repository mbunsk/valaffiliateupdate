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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600">See what founders have achieved with ValidatorAI</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="shadow-lg border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-semibold text-sm">{testimonial.initials}</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.quote}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
