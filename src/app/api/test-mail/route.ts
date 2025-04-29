import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    // ✅ Debug log to ensure env vars are loaded
    console.log("[TEST-MAIL] SMTP Config:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS ? "✅ present" : "❌ missing",
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // Mailtrap uses 2525 (not TLS)
      tls: {
        rejectUnauthorized: false, // disable cert check (dev only)
      },
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"UniDays Test" <support@unidays.io>',
      to: 'youremail@example.com', // replace with your real email or test mailtrap inbox
      subject: '✅ Mailtrap SMTP Test',
      html: `<p>This is a <strong>test email</strong> sent using your current SMTP config.</p>`,
    });

    console.log("✅ Mail sent successfully:", info.messageId);

    return NextResponse.json({
      success: true,
      message: 'Mail sent successfully!',
      messageId: info.messageId,
    });

  } catch (error: any) {
    console.error("❌ Failed to send mail:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
