import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const key_id = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder";
    const key_secret = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret";

    // $49 USD converted to INR paise for Razorpay
    // Razorpay standard accounts process in INR: $49 ≈ ₹4,199 (419900 paise)
    const amountInPaise = 419900;
    const currency = "INR";

    const instance = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: amountInPaise,
      currency,
      receipt: `rcpt_${Date.now()}`,
      notes: {
        product: "LaunchFast Next.js 16 Starter Template",
        usdPrice: "$49",
      },
    };

    const order = await instance.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      displayAmount: "$49",
      keyId: key_id,
    });
  } catch (error: any) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
