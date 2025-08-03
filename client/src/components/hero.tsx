import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollToValidation = () => {
    const element = document.getElementById('validate');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-20 bg-gradient-to-br from-background via-primary/10 via-accent/15 to-secondary/25 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-secondary/30 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Fullerton Quote and User Stats */}
          <div className="mb-8 space-y-6">
            <div className="flex justify-center items-center space-x-12">
              {/* Quote Section */}
              <div className="text-center">
                <blockquote className="text-lg font-medium text-white mb-2">
                  "This is the future!"
                </blockquote>
                <cite className="text-sm text-white/70">
                  - Cal State Fullerton Entrepreneurship Center
                </cite>
              </div>
              
              {/* User Stats Section */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center -space-x-1">
                  <img 
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNGRkE1MDAiLz4KPGNpcmNsZSBjeD0iOSIgY3k9IjEwIiByPSIxLjUiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMTUiIGN5PSIxMCIgcj0iMS41IiBmaWxsPSIjMzMzIi8+CjxwYXRoIGQ9Ik04IDE2QzggMTQgMTAgMTMgMTIgMTNDMTQgMTMgMTYgMTQgMTYgMTYiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIxLjUiIGZpbGw9Im5vbmUiLz4KPC9zdmc+Cg=="
                    alt="User"
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  />
                  <img 
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiM4QjVDRjYiLz4KPGNpcmNsZSBjeD0iOSIgY3k9IjEwIiByPSIxLjUiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMTUiIGN5PSIxMCIgcj0iMS41IiBmaWxsPSIjMzMzIi8+CjxwYXRoIGQ9Ik04IDE2QzggMTQgMTAgMTMgMTIgMTNDMTQgMTMgMTYgMTQgMTYgMTYiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIxLjUiIGZpbGw9Im5vbmUiLz4KPC9zdmc+Cg=="
                    alt="User"
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  />
                  <img 
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNFRjQ0NDQiLz4KPGNpcmNsZSBjeD0iOSIgY3k9IjEwIiByPSIxLjUiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMTUiIGN5PSIxMCIgcj0iMS41IiBmaWxsPSIjMzMzIi8+CjxwYXRoIGQ9Ik04IDE2QzggMTQgMTAgMTMgMTIgMTNDMTQgMTMgMTYgMTQgMTYgMTYiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIxLjUiIGZpbGw9Im5vbmUiLz4KPC9zdmc+Cg=="
                    alt="User"
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  />
                  <img 
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiMxMEI5ODEiLz4KPGNpcmNsZSBjeD0iOSIgY3k9IjEwIiByPSIxLjUiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iMTUiIGN5PSIxMCIgcj0iMS41IiBmaWxsPSIjMzMzIi8+CjxwYXRoIGQ9Ik04IDE2QzggMTQgMTAgMTMgMTIgMTNDMTQgMTMgMTYgMTQgMTYgMTYiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIxLjUiIGZpbGw9Im5vbmUiLz4KPC9zdmc+Cg=="
                    alt="User"
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                  />
                </div>
                <span className="text-lg font-bold text-white">278,355</span>
                <span className="text-sm text-white/80">entrepreneurs validated</span>
              </div>
            </div>
          </div>
          
          <div className="inline-block mb-6">
            <span className="text-4xl animate-bounce-gentle">🎯</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text">
              Explore Your Ideas
            </span>
            <br />
            <span className="text-foreground">With AI Feedback! 🚀</span>
          </h1>
          <p className="text-xl sm:text-2xl text-foreground/70 mb-8 max-w-4xl mx-auto leading-relaxed">
            Get instant AI feedback, mock up a landing page, and share your exploration with{" "}
            <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg animate-pulse-slow">200,000+ idea explorers</span>{" "}
            — every great idea deserves to be explored! 🦄
          </p>
          <Button 
            onClick={scrollToValidation}
            size="lg"
            className="inline-flex items-center px-10 py-5 text-xl font-bold rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 transform hover:scale-110 bg-gradient-to-r from-primary via-accent to-primary hover:from-accent hover:via-primary hover:to-accent animate-pulse-slow"
          >
            <span className="mr-3">🎮</span>
            Let's Explore Ideas!
            <ArrowRight className="ml-3 w-6 h-6 animate-bounce-gentle" />
          </Button>
          
          <div className="mt-8 flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">30 sec</div>
              <div className="text-sm text-foreground/60">to explore</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">1 min</div>
              <div className="text-sm text-foreground/60">to mock up</div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl px-4 py-2 shadow-lg border border-white/20">
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-sm text-white/80">possibilities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
