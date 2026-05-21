import { NextResponse } from "next/server";

import { saveContactSubmission } from "@/lib/contact-store";
import { contactSchema } from "@/lib/validators/contact";

const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const key = `${ip}:${Math.floor(now / windowMs)}`;
  const current = rateLimit.get(key) ?? { count: 0, resetTime: now + windowMs };
  if (now > current.resetTime) {
    current.count = 0;
    current.resetTime = now + windowMs;
  }
  if (current.count >= maxRequests) return false;
  current.count++;
  rateLimit.set(key, current);
  return true;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const sanitizedData = {
      name: parsed.data.name.trim(),
      email: parsed.data.email.toLowerCase().trim(),
      message: parsed.data.message.trim(),
    };

    await saveContactSubmission(sanitizedData);

    return NextResponse.json({
      success: true,
      message: "Thank you. Your message has been received.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to send message. Please try again." },
      { status: 500 },
    );
  }
}
