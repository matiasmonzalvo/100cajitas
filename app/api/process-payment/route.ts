import { NextResponse } from "next/server";

const ACCESS_TOKEN =
  process.env.MERCADO_PAGO_ACCESS_TOKEN ||
  "TEST-2918243639657173-042411-844272ea566685b5bae5697ea7596188-1071562771";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      token,
      issuer_id,
      payment_method_id,
      transaction_amount,
      installments,
      description,
      payer,
    } = body;

    // Generate a unique idempotency key for this request
    const idempotencyKey = `payment_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        token,
        issuer_id,
        payment_method_id,
        transaction_amount,
        installments,
        description,
        payer,
      }),
    });

    const paymentData = await response.json();

    if (!response.ok) {
      // If payment fails, return error details
      return NextResponse.json(
        {
          error: true,
          message: paymentData.message || "Payment processing failed",
          details: paymentData,
        },
        { status: response.status }
      );
    }

    // Return successful payment data
    return NextResponse.json({
      success: true,
      payment: paymentData,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      {
        error: true,
        message: "An error occurred while processing the payment",
      },
      { status: 500 }
    );
  }
}
