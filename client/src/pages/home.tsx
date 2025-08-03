import Header from "@/components/header";
import Hero from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import IdeaValidation from "@/components/idea-validation";
import SiteBuilders from "@/components/site-builders";
import NewsletterForm from "@/components/newsletter-form";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <SocialProof />
      <IdeaValidation />
      <SiteBuilders />
      <NewsletterForm />
      <Testimonials />
      <Footer />
    </div>
  );
}
