"use client";

import { initMercadoPago } from "@mercadopago/sdk-react";

export const initMercadoPagoSDK = () => {
  const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;

  if (!publicKey) {
    console.error("Mercado Pago public key is missing");
    return;
  }

  initMercadoPago(publicKey, { locale: "es-AR" });
};
