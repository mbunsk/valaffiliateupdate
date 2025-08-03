import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, CheckCircle, Star } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-md border-b-2 border-primary/20 z-50 shadow-lg shadow-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                <img 
                  src="/attached_assets/Validator AI Icon_1754233923589.png" 
                  alt="ValidatorAI Logo" 
                  className="w-12 h-12"
                />
                <span className="text-2xl font-black text-white">ValidatorAI</span>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {/* Product Hunt Rating */}
              <a 
                href="https://www.producthunt.com/products/validator-ai?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-validator-ai&launch=validator-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg px-3 py-1 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="bg-orange-500 text-white px-1 py-0.5 rounded text-xs font-bold">
                  PH
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
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
                onClick={() => scrollToSection('build')}
                className="text-foreground/80 hover:text-primary px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-primary/10 hover:scale-105"
              >
                🎨 Build Page
              </button>
              <button 
                onClick={() => scrollToSection('submit')}
                className="text-foreground/80 hover:text-primary px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-primary/10 hover:scale-105"
              >
                💬 Get Feedback
              </button>
              <a 
                href="/about"
                className="text-foreground/80 hover:text-primary px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-primary/10 hover:scale-105"
              >
                💡 About
              </a>
            </div>
          </nav>
          
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
              onClick={() => scrollToSection('build')}
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Get a Landing Page
            </button>
            <button 
              onClick={() => scrollToSection('submit')}
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Get Feedback
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
