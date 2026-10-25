import { Resend } from "resend";

export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing from environment variables.");
  }
  return new Resend(apiKey);
}

export type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  from?: string;
};

export async function sendEmail({
  to,
  subject,
  html,
  from = "SaaSCraft <onboarding@resend.dev>",
}: SendEmailParams) {
  const resend = getResendClient();
  return await resend.emails.send({
    from,
    to,
    subject,
    html,
  });
}

/**
 * Clean responsive HTML templates for Welcome and Payment receipts.
 */
export function getWelcomeEmailHtml(userName: string): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1c1a17;">
      <h2 style="color: #231f1c;">Welcome to the Platform, ${userName || "Builder"}!</h2>
      <p style="font-size: 16px; line-height: 1.6;">Your account has been successfully created. You can now access your dashboard and start building your product.</p>
      <div style="margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard" style="background-color: #231f1c; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Go to Dashboard &rarr;</a>
      </div>
      <p style="font-size: 14px; color: #666;">Need help? Reply directly to this email.</p>
    </div>
  `;
}

export function getReceiptEmailHtml(userName: string, planName: string, amount: string): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1c1a17;">
      <h2 style="color: #231f1c;">Payment Confirmation</h2>
      <p style="font-size: 16px; line-height: 1.6;">Thank you for your purchase, ${userName || "Customer"}! Your subscription has been activated.</p>
      <div style="background-color: #f9f9f9; padding: 16px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 4px 0;"><strong>Plan:</strong> ${planName}</p>
        <p style="margin: 4px 0;"><strong>Amount Paid:</strong> ${amount}</p>
        <p style="margin: 4px 0;"><strong>Status:</strong> Active</p>
      </div>
      <p style="font-size: 14px; color: #666;">You can view past invoices anytime in your Billing dashboard.</p>
    </div>
  `;
}
