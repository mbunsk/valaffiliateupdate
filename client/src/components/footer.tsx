import { CheckCircle } from "lucide-react";
import { SiX, SiLinkedin, SiYoutube } from "react-icons/si";

export default function Footer() {
  return (
    <footer id="about" className="bg-gradient-to-br from-primary/20 via-foreground to-accent/20 text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-indigo-900/90"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary via-accent to-secondary rounded-2xl flex items-center justify-center animate-pulse-slow shadow-lg">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-black gradient-text">ValidatorAI</span>
            </div>
            <p className="text-white/80 mb-8 max-w-md text-lg leading-relaxed">
              Where wild ideas become real startups! We help dreamers validate their concepts, build amazing landing pages, and connect with an incredible community of startup explorers.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-white transition-all duration-300 transform hover:scale-110">
                <span className="sr-only">X (Twitter)</span>
                <SiX className="w-7 h-7" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-all duration-300 transform hover:scale-110">
                <span className="sr-only">LinkedIn</span>
                <SiLinkedin className="w-7 h-7" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-all duration-300 transform hover:scale-110">
                <span className="sr-only">YouTube</span>
                <SiYoutube className="w-7 h-7" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-black text-white tracking-wider mb-6">🚀 Explore</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/70 hover:text-white transition-all duration-300 transform hover:scale-105 hover:translate-x-2 text-lg">About Our Mission</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-all duration-300 transform hover:scale-105 hover:translate-x-2 text-lg">Success Stories</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-all duration-300 transform hover:scale-105 hover:translate-x-2 text-lg">Join Our Team</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-all duration-300 transform hover:scale-105 hover:translate-x-2 text-lg">Get in Touch</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-black text-white tracking-wider mb-6">📋 Legal Stuff</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/70 hover:text-white transition-all duration-300 transform hover:scale-105 hover:translate-x-2 text-lg">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-all duration-300 transform hover:scale-105 hover:translate-x-2 text-lg">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-all duration-300 transform hover:scale-105 hover:translate-x-2 text-lg">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="text-center">
            <p className="text-white/80 text-lg font-semibold mb-2">
              🎯 Ready to turn your wild idea into reality?
            </p>
            <p className="text-white/60 text-sm">
              © 2024 ValidatorAI. Made with ❤️ for dreamers and builders everywhere.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
