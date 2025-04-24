"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  createPayment,
  getPaymentStatusClass,
  getPaymentStatusMessage,
} from "@/lib/mercadopago";
import { loadMercadoPago } from "@/lib/mercadopagoutils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Loader2,
} from "lucide-react";

const MERCADO_PAGO_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY ||
  "TEST-12345678-abcd-efgh-ijkl-123456789012";

interface PaymentFormProps {
  amount: number;
  description: string;
  onBackToCart: () => void;
}

export default function PaymentForm({
  amount,
  description,
  onBackToCart,
}: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    const initMp = async () => {
      try {
        setIsLoading(true);
        const mp = await loadMercadoPago(MERCADO_PAGO_PUBLIC_KEY);

        const cardForm = mp.cardForm({
          amount: amount.toString(),
          autoMount: false,
          form: {
            id: "form-checkout",
            cardholderName: {
              id: "form-checkout__cardholderName",
              placeholder: "Titular de la tarjeta",
            },
            cardholderEmail: {
              id: "form-checkout__cardholderEmail",
              placeholder: "E-mail",
            },
            cardNumber: {
              id: "form-checkout__cardNumber",
              placeholder: "Número de la tarjeta",
            },
            expirationDate: {
              id: "form-checkout__expirationDate",
              placeholder: "MM/YY",
            },
            securityCode: {
              id: "form-checkout__securityCode",
              placeholder: "Código de seguridad",
            },
            installments: {
              id: "form-checkout__installments",
              placeholder: "Cuotas",
            },
            identificationType: {
              id: "form-checkout__identificationType",
              placeholder: "Tipo de documento",
            },
            identificationNumber: {
              id: "form-checkout__identificationNumber",
              placeholder: "Número de documento",
            },
            issuer: {
              id: "form-checkout__issuer",
              placeholder: "Banco emisor",
            },
          },
          callbacks: {
            onFormMounted: (error: any) => {
              if (error) {
                console.warn("Form mounted with error:", error);
                setError(
                  "Could not initialize payment form. Please refresh and try again."
                );
              }
              setIsLoading(false);
            },
            onSubmit: async (event: Event) => {
              event.preventDefault();

              try {
                setIsProcessing(true);
                setError(null);

                const formData = cardForm.getCardFormData();

                if (!formData.token) {
                  throw new Error(
                    "Could not process card. Please check your details and try again."
                  );
                }

                const result = await createPayment({
                  token: formData.token,
                  issuerId: formData.issuerId,
                  paymentMethodId: formData.paymentMethodId,
                  transactionAmount: Number(formData.amount),
                  installments: Number(formData.installments),
                  description,
                  payer: {
                    email: formData.cardholderEmail,
                    identification: {
                      type: formData.identificationType,
                      number: formData.identificationNumber,
                    },
                  },
                });

                setPaymentResult(result.payment);
              } catch (error: any) {
                console.error("Payment error:", error);
                setError(error.message || "Payment failed. Please try again.");
              } finally {
                setIsProcessing(false);
              }
            },
            onFetching: (resource: string) => {
              const progressBar = document.querySelector(".progress-bar");
              if (progressBar) {
                progressBar.removeAttribute("value");
              }
              return () => {
                if (progressBar) {
                  progressBar.setAttribute("value", "0");
                }
              };
            },
          },
        });

        cardForm.mount();
      } catch (error) {
        console.error("Error initializing Mercado Pago:", error);
        setError("Could not initialize payment form. Please try again later.");
        setIsLoading(false);
      }
    };

    initMp();
  }, [amount, description]);

  if (paymentResult) {
    return (
      <Card className="p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          {paymentResult.status === "approved" ? (
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
          ) : paymentResult.status === "rejected" ? (
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          ) : (
            <Clock className="h-12 w-12 text-yellow-500 mx-auto" />
          )}

          <h2 className="text-2xl font-bold mt-4">
            {paymentResult.status === "approved"
              ? "Payment Successful"
              : paymentResult.status === "rejected"
              ? "Payment Failed"
              : "Payment Processing"}
          </h2>

          <p
            className={`mt-2 p-2 rounded ${getPaymentStatusClass(
              paymentResult.status
            )}`}
          >
            {getPaymentStatusMessage(paymentResult.status)}
          </p>
        </div>

        <div className="space-y-4 mt-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment ID:</span>
            <span className="font-medium">{paymentResult.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-medium">${amount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method:</span>
            <span className="font-medium capitalize">
              {paymentResult.payment_method_id}
            </span>
          </div>

          {paymentResult.status === "approved" && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">
                {new Date(paymentResult.date_approved).toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <Separator className="my-6" />

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBackToCart}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>

          {paymentResult.status === "approved" && (
            <Button onClick={() => router.push("/")}>Continue Shopping</Button>
          )}

          {paymentResult.status === "rejected" && (
            <Button
              onClick={() => {
                setPaymentResult(null);
                setError(null);
              }}
            >
              Try Again
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={onBackToCart}
        disabled={isProcessing}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </Button>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

        <div className="flex justify-between mb-4">
          <span className="text-muted-foreground">Total amount:</span>
          <span className="font-bold">${amount.toFixed(2)}</span>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading payment form...</span>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form id="form-checkout" ref={formRef} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div
                  id="form-checkout__cardNumber"
                  className="h-10 px-3 py-2 border rounded-md"
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration
                  </label>
                  <div
                    id="form-checkout__expirationDate"
                    className="h-10 px-3 py-2 border rounded-md"
                  ></div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Security Code
                  </label>
                  <div
                    id="form-checkout__securityCode"
                    className="h-10 px-3 py-2 border rounded-md"
                  ></div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <Input
                  type="text"
                  id="form-checkout__cardholderName"
                  className="w-full"
                  placeholder="As shown on card"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  id="form-checkout__cardholderEmail"
                  className="w-full"
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Type
                  </label>
                  <select
                    id="form-checkout__identificationType"
                    className="w-full h-10 px-3 py-2 border rounded-md bg-white"
                  ></select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document Number
                  </label>
                  <Input
                    type="text"
                    id="form-checkout__identificationNumber"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank
                </label>
                <select
                  id="form-checkout__issuer"
                  className="w-full h-10 px-3 py-2 border rounded-md bg-white"
                ></select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Installments
                </label>
                <select
                  id="form-checkout__installments"
                  className="w-full h-10 px-3 py-2 border rounded-md bg-white"
                ></select>
              </div>

              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Pay Now"
                )}
              </Button>

              <progress
                value="0"
                className="progress-bar w-full h-1 opacity-0"
              ></progress>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}
