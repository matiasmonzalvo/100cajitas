"use client";

import { useState } from "react";
import { Wallet } from "@mercadopago/sdk-react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { initMercadoPagoSDK } from "@/lib/mercadopago";

// Initialize Mercado Pago SDK
initMercadoPagoSDK();

interface MercadoPagoButtonProps {
  cart: any[];
  total: number;
}

export function MercadoPagoButton({ cart, total }: MercadoPagoButtonProps) {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createPreference = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "http://localhost:3001/api/create-preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cart,
            // backUrls: {
            //   success: `${window.location.origin}/checkout/success`,
            //   failure: `${window.location.origin}/checkout/failure`,
            //   pending: `${window.location.origin}/checkout/pending`,
            // },
          }),
        }
      );

      const data = await response.json();

      if (data.preferenceId) {
        setPreferenceId(data.preferenceId);
      } else {
        console.error("Error creating preference:", data.error);
      }
    } catch (error) {
      console.error("Error creating preference:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!preferenceId ? (
        <Button
          className="w-full cursor-pointer"
          size="lg"
          onClick={createPreference}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              Pagar con Mercado Pago
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      ) : (
        <div className="w-full">
          <Wallet initialization={{ preferenceId }} />
        </div>
      )}
    </div>
  );
}
