import { Star, Users, Award } from "lucide-react";

export function SocialProof() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Cal State Quote */}
          <div className="text-center lg:text-left">
            <blockquote className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
              "This is the future!"
            </blockquote>
            <cite className="text-sm text-gray-600 dark:text-gray-400">
              - Cal State Fullerton Entrepreneurship Center
            </cite>
          </div>

          {/* Product Hunt Badge & Rating */}
          <div className="flex flex-col items-center space-y-4">
            <a 
              href="https://www.producthunt.com/products/validator-ai?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-validator-ai&launch=validator-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                PH
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Featured on Product Hunt
              </span>
            </a>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">4.85/5</span>
            </div>
          </div>

          {/* User Stats */}
          <div className="text-center lg:text-right">
            <div className="flex justify-center lg:justify-end items-center space-x-1 mb-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                >
                  U
                </div>
              ))}
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              278,355 entrepreneurs
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              have validated their ideas
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}