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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={goToHome}
              className="flex items-center space-x-3 hover:opacity-80 transition-smooth group"
            >
              <div className="w-8 h-8 accent-gradient rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="font-display">
                <span className="text-xl font-semibold text-foreground">ValidatorAI</span>
              </div>
            </button>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('products')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              How it Works
            </button>
            <a 
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              Case Studies
            </a>
            <a 
              href="/aron"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              Partners
            </a>
            <a 
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              About
            </a>
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 p-0"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            
            {/* Primary CTA */}
            <Button 
              onClick={() => scrollToSection('products')}
              className="accent-gradient text-white font-medium px-6"
            >
              Run a Quick Validation
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 p-0"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-6 py-4 space-y-2">
            <button 
              onClick={() => scrollToSection('products')}
              className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-3 transition-smooth"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-3 transition-smooth"
            >
              How it Works
            </button>
            <a 
              href="#testimonials"
              className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-3 transition-smooth"
            >
              Case Studies
            </a>
            <a 
              href="/aron"
              className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-3 transition-smooth"
            >
              Partners
            </a>
            <a 
              href="/about"
              className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-3 transition-smooth"
            >
              About
            </a>
            <div className="pt-4">
              <Button 
                onClick={() => scrollToSection('products')}
                className="w-full accent-gradient text-white font-medium"
              >
                Run a Quick Validation
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
