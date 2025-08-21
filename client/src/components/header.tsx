import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, CheckCircle, Star, Sun, Moon, Zap, Shield } from "lucide-react";
import validatorIcon from "@assets/Validator AI Icon_1754233923589.png";
import { useLocation } from "wouter";
import { useTheme } from "next-themes";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { theme, setTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const goToHome = () => {
    if (location === '/') {
      // If already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to home page
      setLocation('/');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-primary/20 shadow-lg shadow-primary/10 tech-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button 
                onClick={goToHome}
                className="flex items-center space-x-4 hover:opacity-80 transition-all duration-300 group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-white tracking-tight">ValidatorAI</span>
                  <span className="text-xs text-primary font-semibold tracking-wider uppercase">Research Intelligence</span>
                </div>
              </button>
            </div>
          </div>
          
          <nav className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">

              
              {/* Product Hunt Rating */}
              <a 
                href="https://www.producthunt.com/products/validator-ai?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-validator-ai&launch=validator-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-muted/50 border border-primary/20 rounded-lg px-3 py-2 hover:bg-muted transition-all duration-200"
              >
                <div className="bg-orange-500 text-white px-1 py-0.5 rounded text-xs font-bold">
                  PH
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="relative h-3 w-3">
                      {i < 4 ? (
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      ) : i === 4 ? (
                        <>
                          <Star className="h-3 w-3 text-gray-300 dark:text-gray-600" />
                          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}>
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          </div>
                        </>
                      ) : (
                        <Star className="h-3 w-3 text-gray-300 dark:text-gray-600" />
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">4.85</span>
              </a>
              <button 
                onClick={() => scrollToSection('validate')}
                className="text-foreground/80 hover:text-primary px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-primary/10 hover:scale-105"
              >
                🚀 Validate Idea
              </button>
              <button 
                onClick={() => scrollToSection('resources')}
                className="text-foreground/80 hover:text-primary px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-primary/10 hover:scale-105"
              >
                🛠️ Resources
              </button>
              <button 
                onClick={() => scrollToSection('simulate')}
                className="text-foreground/80 hover:text-primary px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-primary/10 hover:scale-105"
              >
                💬 Customer Simulation
              </button>
              <a 
                href="/about"
                className="text-foreground/80 hover:text-primary px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-primary/10 hover:scale-105"
              >
                💡 About
              </a>
              
              {/* Theme Toggle Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-foreground/80 hover:text-primary px-3 py-2 rounded-full transition-all duration-300 hover:bg-primary/10 hover:scale-105"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </nav>
          
          <div className="flex items-center space-x-2">
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <button 
              onClick={() => scrollToSection('validate')}
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Validate Your Idea
            </button>
            <button 
              onClick={() => scrollToSection('resources')}
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Startup Resources
            </button>
            <button 
              onClick={() => scrollToSection('simulate')}
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Customer Simulation
            </button>
            <a 
              href="/about"
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              About
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
