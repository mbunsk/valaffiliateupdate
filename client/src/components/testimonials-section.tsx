import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "FifthRow played a key role in exploring the potential of venture ideas by automating the research activities and efficiently scaling our operations. We were able to assess the marketability and desirability of ideas.",
      author: "Giacomo Manzoni",
      title: "Corporate Venture Building Team",
      company: "a2A"
    },
    {
      quote: "Our new hire told us that in his previous job at our competitor they used FifthRow extensively and it was one of the most powerful tools in the innovation toolbox.",
      author: "VP of Innovation",
      title: "Sustainable Engineering Consultancy",
      company: "Fortune 500 Company"
    },
    {
      quote: "We are re-doing all our innovation processes based on FifthRow.",
      author: "Head of Innovation",
      title: "French Energy Company",
      company: "Major European Utility"
    },
    {
      quote: "Being enabled by this platform is making me 2-3x more productive.",
      author: "Innovation Associate",
      title: "F500 Insurance Company",
      company: "Fortune 500 Insurer"
    },
    {
      quote: "We have proven 5 viable B2C businesses in the past 10 months with FifthRow.",
      author: "Director of Innovation",
      title: "F500 Automotive Company",
      company: "Global Automotive Leader"
    },
    {
      quote: "Having worked in Corporate Innovation, Strategy, & Investments over the years, FifthRow platform is a godsend for early investigative work. I have used the platform myself and it's fantastic!",
      author: "Kartikay Chaudhry",
      title: "Senior Manager for New Ventures",
      company: "QCells"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 border-yellow-300 text-yellow-600 dark:border-yellow-700 dark:text-yellow-400">
            <Star className="w-4 h-4 mr-2" />
            Trusted by Fortune 500
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            Trusted by Business{" "}
            <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Leaders
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            See what executives and strategy teams at Fortune 500 companies say about our market intelligence platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white/90 to-gray-50/50 dark:from-gray-900/90 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start space-x-2">
                  <Quote className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <p className="text-foreground/80 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-1">
                    <div className="font-bold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">{testimonial.title}</div>
                    <div className="text-xs text-foreground/60">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company logos */}
        <div className="mt-16 text-center">
          <p className="text-sm text-foreground/60 mb-8">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-lg font-bold text-foreground/70">Samsung</div>
            <div className="text-lg font-bold text-foreground/70">Forbes</div>
            <div className="text-lg font-bold text-foreground/70">Cisco</div>
            <div className="text-lg font-bold text-foreground/70">T-Mobile</div>
            <div className="text-lg font-bold text-foreground/70">Swiss Re</div>
            <div className="text-lg font-bold text-foreground/70">Bridgestone</div>
          </div>
        </div>
      </div>
    </section>
  );
}