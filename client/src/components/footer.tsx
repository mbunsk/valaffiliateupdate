import { CheckCircle } from "lucide-react";
import { SiX, SiLinkedin, SiYoutube } from "react-icons/si";

export default function Footer() {
  return (
    <footer id="about" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-violet-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ValidatorAI</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Helping entrepreneurs validate their startup ideas with AI-powered feedback and connect them with the tools and community they need to succeed.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">X (Twitter)</span>
                <SiX className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <SiLinkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <SiYoutube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © 2024 ValidatorAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
