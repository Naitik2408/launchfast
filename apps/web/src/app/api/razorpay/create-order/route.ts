import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { planId = "starter" } = await req.json();

    const key_id = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder";
    const key_secret = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret";

    // Amount in INR paise (e.g. ₹3,999 = 399900 paise, ₹6,999 = 699900 paise)
    const amount = planId === "complete" ? 699900 : 399900;
    const currency = "INR";

    const instance = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount,
      currency,
      receipt: `rcpt_${Date.now()}`,
      notes: {
        product: "LaunchFast Next.js Boilerplate",
        plan: planId,
      },
    };

    const order = await instance.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
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
