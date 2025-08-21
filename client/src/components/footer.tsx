import { CheckCircle, Shield, Building2, Globe, Zap } from "lucide-react";
import { SiX, SiLinkedin, SiYoutube, SiTiktok } from "react-icons/si";
import validatorIcon from "@assets/Validator AI Icon_1754233923589.png";

export default function Footer() {
  return (
    <footer id="about" className="bg-gradient-to-br from-background via-muted/10 to-background border-t border-primary/20 text-foreground py-20 relative overflow-hidden grid-pattern">
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-muted/30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-foreground tracking-tight">ValidatorAI</span>
                <span className="text-xs text-primary font-semibold tracking-wider uppercase">Research Intelligence</span>
              </div>
            </div>
            <p className="text-foreground/70 mb-8 max-w-lg text-lg leading-relaxed">
              Leading enterprise research intelligence platform trusted by Fortune 500 companies worldwide. 
              Advanced AI-powered business analysis delivering strategic insights for critical decision-making since 2022.
            </p>
            
            {/* Enterprise Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground/80">SOC2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground/80">Global Coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground/80">Enterprise Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground/80">24/7 Support</span>
              </div>
            </div>
            <div className="flex space-x-6">
              <a href="https://x.com/validatoraiapp" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-all duration-300 transform hover:scale-110">
                <span className="sr-only">X (Twitter)</span>
                <SiX className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/aronmeystedt/" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-all duration-300 transform hover:scale-110">
                <span className="sr-only">LinkedIn</span>
                <SiLinkedin className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/channel/UCWlmPaoLVPQPT2xsAWfn3gg?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-all duration-300 transform hover:scale-110">
                <span className="sr-only">YouTube</span>
                <SiYoutube className="w-6 h-6" />
              </a>
              <a href="https://www.tiktok.com/@validatorai" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-all duration-300 transform hover:scale-110">
                <span className="sr-only">TikTok</span>
                <SiTiktok className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-black text-foreground tracking-wider mb-6">Solutions</h3>
            <ul className="space-y-4">
              <li><a href="/enterprise" className="text-foreground/70 hover:text-primary transition-all duration-300 text-base">Enterprise Intelligence</a></li>
              <li><a href="#products" className="text-foreground/70 hover:text-primary transition-all duration-300 text-base">Research Reports</a></li>
              <li><a href="/consulting" className="text-foreground/70 hover:text-primary transition-all duration-300 text-base">Strategic Consulting</a></li>
              <li><a href="/api" className="text-foreground/70 hover:text-primary transition-all duration-300 text-base">API Access</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-black text-foreground tracking-wider mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a href="/about" className="text-foreground/70 hover:text-primary transition-all duration-300 text-base">About Us</a></li>
              <li><a href="/security" className="text-foreground/70 hover:text-primary transition-all duration-300 text-base">Security & Compliance</a></li>
              <li><a href="/privacy" className="text-foreground/70 hover:text-primary transition-all duration-300 text-base">Privacy Policy</a></li>
              <li><a href="/terms" className="text-foreground/70 hover:text-primary transition-all duration-300 text-base">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground/60 text-sm mb-4 md:mb-0">
              © 2025 ValidatorAI Research Intelligence. Enterprise-grade business intelligence platform.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-foreground/60">Trusted by Fortune 500 companies</span>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">SOC2 Type II</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
