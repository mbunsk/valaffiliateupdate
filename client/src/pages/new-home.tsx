import { useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ProductsGrid from "@/components/products-grid";
import ProductModal from "@/components/product-modal";
import NewsletterSignup from "@/components/newsletter-signup";
import TestimonialsSection from "@/components/testimonials-section";
import ThemeToggle from "@/components/theme-toggle";
import Footer from "@/components/footer";

interface Product {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  agents: number;
  sources: number;
  runtime: string;
  category: string;
  featured?: boolean;
  perfect?: boolean;
}

export default function NewHome() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handlePurchase = (product: Product, inputs: Record<string, string>) => {
    // This will be handled by your dev for Stripe integration
    console.log('Purchase initiated:', { product, inputs });
    
    // Track the purchase intent
    fetch('/api/track-product-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        product: product.id, 
        location: 'purchase',
        inputs: Object.keys(inputs).length 
      })
    });

    // Close modal
    setIsModalOpen(false);
    setSelectedProduct(null);

    // Show success message or redirect to Stripe
    alert(`Thank you! Your ${product.title} will be processed. You'll be redirected to secure checkout.`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Original Header */}
      <Header />

      {/* Theme toggle in top right */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Original Hero Section */}
      <Hero />

      {/* Products Grid */}
      <ProductsGrid onProductClick={handleProductClick} />

      {/* Section Divider */}
      <div className="py-12 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-primary/60"></div>
            <div className="mx-8 flex items-center gap-3 text-3xl">
              <span>⭐</span>
              <span>✨</span>
              <span>⭐</span>
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter Section */}
      <NewsletterSignup />

      {/* Footer */}
      <Footer />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onPurchase={handlePurchase}
      />
    </div>
  );
}