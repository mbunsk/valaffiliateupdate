import Header from "@/components/header";
import NewHero from "@/components/new-hero";
import EnterpriseProductsGrid from "@/components/enterprise-products-grid";
import TestimonialsGrid from "@/components/testimonials-grid";
import Footer from "@/components/footer";

export default function EnterpriseHome() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <NewHero />
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 lg:py-32 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-display-2 text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                Professional research delivered through automated AI agent workflows
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Submit Inputs",
                  description: "Provide your business idea, target market, or research question"
                },
                {
                  step: "02", 
                  title: "Agents Run",
                  description: "Multiple AI agents analyze markets, customers, and opportunities"
                },
                {
                  step: "03",
                  title: "Report Generated", 
                  description: "Comprehensive analysis with charts, insights, and recommendations"
                },
                {
                  step: "04",
                  title: "Share or Iterate",
                  description: "Download, share publicly, or run additional research"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full accent-gradient text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Products Grid */}
        <section id="products" className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-display-2 text-foreground mb-4">
                Research Products
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                Enterprise-grade analysis powered by AI agents. Choose the depth and focus that matches your needs.
              </p>
            </div>
            <EnterpriseProductsGrid onProductClick={(product) => console.log('Product clicked:', product)} />
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 lg:py-32 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-display-2 text-foreground mb-4">
                Trusted by Decision Makers
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                Real insights from entrepreneurs and business leaders who trust ValidatorAI
              </p>
            </div>
            <TestimonialsGrid />
          </div>
        </section>

        {/* Trust & Compliance */}
        <section className="py-16 bg-background border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground mb-2">SOC2 Compliant</div>
                <div className="text-muted-foreground">Enterprise security standards for your data</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground mb-2">200,000+ Reports</div>
                <div className="text-muted-foreground">Generated for entrepreneurs worldwide</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground mb-2">Cited Sources</div>
                <div className="text-muted-foreground">Every insight backed by authoritative data</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}