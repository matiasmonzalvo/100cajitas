"use client";

import { loadMercadoPago, initCardForm } from "./mercadopagoutils";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export interface PaymentData {
  token: string;
  issuerId: string;
  paymentMethodId: string;
  transactionAmount: number;
  installments: number;
  description: string;
  payer: {
    email: string;
    identification: {
      type: string;
      number: string;
    };
  };
}

export const createPayment = async (paymentData: PaymentData) => {
  try {
    const response = await fetch("/api/process-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error processing payment");
    }

    return await response.json();
  } catch (error) {
    console.error("Payment error:", error);
    throw error;
  }
};

export const getPaymentStatusClass = (status: string) => {
  switch (status) {
    case "approved":
      return "text-green-600 bg-green-50";
    case "in_process":
    case "pending":
      return "text-yellow-600 bg-yellow-50";
    case "rejected":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

export const getPaymentStatusMessage = (status: string) => {
  switch (status) {
    case "approved":
      return "Payment approved! Your purchase was successful.";
    case "in_process":
      return "Payment is being processed. We'll update you when it's complete.";
    case "pending":
      return "Payment is pending. Please check your email for further instructions.";
    case "rejected":
      return "Payment was rejected. Please try with a different payment method.";
    default:
      return "Payment status unknown. Please contact customer support.";
  }
};
