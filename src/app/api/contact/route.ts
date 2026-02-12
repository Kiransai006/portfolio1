import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "kiransai2312@gmail.com";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Contact form is not configured. Please set RESEND_API_KEY." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name and message are required." },
        { status: 400 }
      );
    }

    const resp = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: TO_EMAIL,
      subject: `Portfolio message from ${name}`,
      html: `
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    console.log("Resend response:", resp);

    // Some SDK responses may include an `error` property or throw; handle both.
    if ((resp as any)?.error) {
      console.error("Resend send error:", (resp as any).error);
      return NextResponse.json(
        { error: (resp as any).error || "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Contact API error:", err);
    const message = err?.message || JSON.stringify(err) || "Something went wrong. Please try again.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
