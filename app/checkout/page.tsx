"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import PaymentForm from "@/components/payment-form";

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Calculate total amount
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  // Handle cart empty state
  useEffect(() => {
    setIsClient(true);

    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart, router]);

  const handleBackToCart = () => {
    router.push("/cart");
  };

  if (!isClient) {
    return null; // Don't render until client-side
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

        <PaymentForm
          amount={total}
          description="Purchase from our store"
          onBackToCart={handleBackToCart}
        />
      </div>
    </div>
  );
}
