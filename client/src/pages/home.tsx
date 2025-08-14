import { useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import IdeaValidation from "@/components/idea-validation";
import StartupResources from "@/components/startup-resources";
import StartupSimulator from "@/components/startup-simulator";
import Testimonials from "@/components/testimonials";
import NewsletterSignup from "@/components/newsletter-signup";
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
      <Footer />
    </div>
  );
}
