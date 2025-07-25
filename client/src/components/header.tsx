import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, CheckCircle } from "lucide-react";

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
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-violet-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">ValidatorAI</span>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('validate')}
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Validate Your Idea
              </button>
              <button 
                onClick={() => scrollToSection('build')}
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Get a Landing Page
              </button>
              <button 
                onClick={() => scrollToSection('submit')}
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Submit to Newsletter
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </button>
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
              Submit to Newsletter
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              About
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
