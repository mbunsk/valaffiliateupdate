import { useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import IdeaValidation from "@/components/idea-validation";
import StartupResources from "@/components/startup-resources";
import StartupSimulator from "@/components/startup-simulator";
import TestimonialsGrid from "@/components/testimonials-grid";
import NewsletterSection from "@/components/newsletter-section";
import FinalCTA from "@/components/final-cta";
import Footer from "@/components/footer";

export default function Home() {
  const [validationData, setValidationData] = useState<{
    idea: string;
    targetCustomer: string;
    problemSolved: string;
    feedback: string;
  } | undefined>();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <IdeaValidation onValidationComplete={setValidationData} />
      <StartupResources validationData={validationData} />
      <StartupSimulator validationData={validationData} />
      
      {/* Section Divider */}
      <div className="py-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center">
            {/* Full width horizontal line behind everything */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            </div>
            {/* Stars on top of the line */}
            <div className="relative px-6 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 text-primary/60">
              <div className="flex items-center gap-2 text-2xl">
                <span>⭐</span>
                <span>✨</span>
                <span>⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <TestimonialsGrid />
      <NewsletterSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
