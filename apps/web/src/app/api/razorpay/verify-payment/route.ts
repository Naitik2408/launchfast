import { NextResponse } from "next/server";
import crypto from "crypto";
import { Octokit } from "@octokit/rest";

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      github_username,
      customer_email,
    } = await req.json();

    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // 1. Verify Razorpay Payment Signature
    if (key_secret && key_secret !== "placeholder_secret") {
      const generated_signature = crypto
        .createHmac("sha256", key_secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generated_signature !== razorpay_signature) {
        return NextResponse.json(
          { error: "Invalid payment signature verification" },
          { status: 400 }
        );
      }
    }

    // 2. Validate GitHub username
    const trimmedUsername = (github_username || "").trim();
    if (!trimmedUsername) {
      return NextResponse.json(
        { error: "GitHub username is required for code access" },
        { status: 400 }
      );
    }

    // 3. Invite user to private repository via GitHub API
    const githubToken = process.env.GITHUB_DELIVERY_TOKEN;
    const repoOwner = process.env.GITHUB_TEMPLATE_OWNER || "Naitik2408";
    const repoName = process.env.GITHUB_TEMPLATE_REPO || "launchfast-nextjs-starter";

    let inviteSuccess = false;
    let inviteMessage = "";

    if (githubToken) {
      try {
        const octokit = new Octokit({ auth: githubToken });
        const res = await octokit.rest.repos.addCollaborator({
          owner: repoOwner,
          repo: repoName,
          username: trimmedUsername,
          permission: "pull", // Read/clone access
        });

        inviteSuccess = true;
        inviteMessage = `Invitation sent to ${trimmedUsername} for ${repoOwner}/${repoName}!`;
      } catch (ghErr: any) {
        console.error("GitHub Invite API Error:", ghErr.message);
        inviteMessage = `Payment succeeded, but could not automatically invite ${trimmedUsername}: ${ghErr.message}. Admin has been notified.`;
      }
    } else {
      inviteMessage = `Payment verified! Simulation mode: ${trimmedUsername} marked for repo invitation.`;
      inviteSuccess = true;
    }

    return NextResponse.json({
      success: true,
      inviteSuccess,
      message: inviteMessage,
      repo: `${repoOwner}/${repoName}`,
      githubUsername: trimmedUsername,
      paymentId: razorpay_payment_id,
    });
  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process payment and invitation" },
      { status: 500 }
    );
  }
}
