import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="gradient-text">Terms of Service</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>

        <Card className="bg-card/50 backdrop-blur border-primary/20 shadow-lg">
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-foreground/80 leading-relaxed">
                Welcome to ValidatorAI.com ("Validator AI," "we," "us," or "our"). By accessing or using our website and services, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Services Provided</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Validator AI offers the following free services:
              </p>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>An AI startup mentor phone call that provides users with guidance on their business ideas.</li>
                <li>An AI idea generator that suggests potential business ideas based on user input.</li>
                <li>A follow-up email summarizing key points from the AI startup mentor call, including links to third-party service providers who may help users move their ideas forward.</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.1 Third-Party Service Providers</h3>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>We allow third-party service providers to be featured in follow-up emails sent after AI startup mentor calls. These providers pay us for inclusion in these emails.</li>
                <li>We do not share user data (email addresses, phone numbers, or other personal details) with these service providers.</li>
                <li>Users who choose to engage with third-party service providers are responsible for reviewing the terms and conditions of each provider.</li>
                <li>Some third-party service providers may integrate with our AI phone call system via API. However, we do not share sensitive user data through these integrations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. User Eligibility & Restrictions</h2>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>Our services are intended for users 18 years or older.</li>
                <li>Users must not use our AI services for ideas related to illegal, harmful, or pornographic businesses.</li>
                <li>Users self-regulate and are responsible for ensuring their ideas align with ethical and legal standards.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Privacy and Data Handling</h2>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>User discussions with the AI are private. We do not access or act upon user ideas.</li>
                <li>We do not monitor call transcripts unless a user requests review or for internal quality assurance purposes.</li>
                <li>We may review follow-up emails to ensure our AI system is functioning correctly.</li>
                <li>We respect all user requests to delete their personal information from our database.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. No Guarantees & Limitation of Liability</h2>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">5.1 Educational & Entertainment Purposes Only</h3>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>ValidatorAI.com is an educational tool. The AI startup mentor call and idea generator are designed to teach users about idea validation and market opportunities.</li>
                <li>We do not guarantee the success, viability, or profitability of any idea suggested or discussed.</li>
                <li>Our AI does not replace professional business, legal, or financial advice.</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">5.2 Liability Waiver</h3>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>Users acknowledge that they are fully responsible for any business decisions made based on Validator AI's recommendations.</li>
                <li>Validator AI shall not be liable for any losses, damages, or missed opportunities resulting from reliance on AI-generated advice or suggestions.</li>
                <li>We assume no responsibility for any actions taken based on AI discussions or idea generation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Account Termination</h2>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>We reserve the right to terminate or suspend accounts if users violate these Terms.</li>
                <li>If users wish to delete their personal information, we will honor their request promptly.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Future Paid Services & Refund Policy</h2>
              <ul className="list-disc list-inside text-foreground/80 space-y-2 ml-4">
                <li>Validator AI currently offers all services for free.</li>
                <li>If we introduce paid services in the future, all sales of digital products will be final, and no refunds will be provided.</li>
                <li>Payments will be processed through Stripe.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Modifications to These Terms</h2>
              <p className="text-foreground/80 leading-relaxed">
                We may update these Terms at any time. Continued use of our services after updates constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Us</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                If you have any questions regarding these Terms and Conditions, please contact us:
              </p>
              <div className="bg-background/50 p-4 rounded-lg border border-primary/20">
                <p className="text-foreground/80"><strong>Email:</strong> info@napkin.com</p>
                <p className="text-foreground/80 mt-2"><strong>Mailing Address:</strong></p>
                <p className="text-foreground/80">
                  ValidatorAI.com<br />
                  Irvine, California 92618
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}