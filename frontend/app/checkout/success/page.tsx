"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Home, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/lib/cart";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({
    paymentId: "",
    status: "",
    merchantOrderId: "",
  });

  useEffect(() => {
    // Get payment information from URL parameters
    const payment_id = searchParams.get("payment_id") || "";
    const status = searchParams.get("status") || "";
    const merchant_order_id = searchParams.get("merchant_order_id") || "";

    setPaymentInfo({
      paymentId: payment_id,
      status: status,
      merchantOrderId: merchant_order_id,
    });

    // Clear the cart since payment was successful
    clearCart();
  }, [searchParams, clearCart]);

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-12">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="pb-3">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-center">¡Pago exitoso!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            Tu pago ha sido procesado correctamente. Hemos enviado un correo con
            los detalles de tu compra.
          </p>
          {paymentInfo.paymentId && (
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">
                ID de Pago: {paymentInfo.paymentId}
              </p>
              <p className="text-sm">Estado: {paymentInfo.status}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button asChild className="w-full">
            <Link href="/orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Ver mis pedidos
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
