// Shared types for the frontend application

export interface Product {
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