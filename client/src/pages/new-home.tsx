import { useState } from "react";
import NewHero from "@/components/new-hero";
import ProductsGrid from "@/components/products-grid";
import ProductModal from "@/components/product-modal";
import NewsletterSignup from "@/components/newsletter-signup";
import TestimonialsSection from "@/components/testimonials-section";
import ThemeToggle from "@/components/theme-toggle";

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
      {/* Header with theme toggle */}
      <header className="absolute top-0 right-0 z-50 p-4">
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <NewHero />

      {/* Products Grid */}
      <ProductsGrid onProductClick={handleProductClick} />

      {/* Newsletter Section */}
      <NewsletterSignup />

      {/* Testimonials */}
      <TestimonialsSection />

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