"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ShoppingCart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart";
import { CartItem } from "@/components/cart-item";
import { MercadoPagoButton } from "@/components/mp-button";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const router = useRouter();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal - discount + shipping;

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[60vh] px-4 py-8 md:px-6 md:py-20">
        <ShoppingCart className="h-16 w-16 text-muted-foreground" />
        <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-center text-muted-foreground">
          Looks like you haven't added any gift boxes to your cart yet.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full container flex py-8 md:py-20">
      <div className="w-full flex flex-col space-y-6">
        <div className="w-full flex justify-between gap-8">
          <div className="md:col-span-7 lg:col-span-8 relative w-full">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold tracking-tight">
                Shopping Cart
              </h1>
              <button
                onClick={clearCart}
                className="px-0 flex items-center text-sm cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4 -mt-[1.5px]" />
                Vaciar carrito
              </button>
            </div>
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={`${item.id}-${item.selectedOption || ""}`}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continuar comprando
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-4 relative w-1/2">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>

              <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <Button
                      variant="outline"
                      onClick={applyPromoCode}
                      disabled={promoApplied || !promoCode}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-green-600">
                      Promo code WELCOME10 applied!
                    </p>
                  )}
                </div>

                <MercadoPagoButton cart={cart} total={total} />

                <p className="text-xs text-center text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
