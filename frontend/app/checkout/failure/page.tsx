"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, ArrowLeft, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CheckoutFailurePage() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id") || "";
  const status = searchParams.get("status") || "rejected";

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-12">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="pb-3">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl text-center">
            Pago no completado
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            Hubo un problema al procesar tu pago. No se ha realizado ningún
            cargo a tu cuenta.
          </p>
          {paymentId && (
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium">ID de Pago: {paymentId}</p>
              <p className="text-sm">Estado: {status}</p>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            Puedes intentar nuevamente con otro método de pago o contactar a
            nuestro equipo de soporte.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button asChild className="w-full">
            <Link href="/cart">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Volver al carrito
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
