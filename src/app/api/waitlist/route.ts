import { NextRequest, NextResponse } from "next/server";
import { addToWaitlist, type WaitlistRole } from "@/lib/waitlist";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_ROLES: WaitlistRole[] = [
  "organisateur",
  "prestataire",
  "gestionnaire",
  "visiteur",
];

// In-memory rate limiter: IP -> array of timestamps
const ipRequests = new Map<string, number[]>();
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipRequests.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  ipRequests.set(ip, timestamps);
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  let body: {
    firstName?: string;
    email?: string;
    source?: string;
    locale?: "fr" | "en";
    role?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Email invalide" }, { status: 400 });
  }

  const { firstName, email, source, locale = "fr", role } = body;

  if (!firstName || typeof firstName !== "string" || firstName.trim().length < 1) {
    return NextResponse.json({ success: false, error: "Prénom requis" }, { status: 400 });
  }

  if (firstName.trim().length > 50) {
    return NextResponse.json({ success: false, error: "Prénom requis" }, { status: 400 });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ success: false, error: "Email invalide" }, { status: 400 });
  }

  if (!role || !VALID_ROLES.includes(role as WaitlistRole)) {
    return NextResponse.json({ success: false, error: "Rôle invalide" }, { status: 400 });
  }

  if (source !== "hero" && source !== "cta") {
    return NextResponse.json({ success: false, error: "Source invalide" }, { status: 400 });
  }

  if (locale !== "fr" && locale !== "en") {
    return NextResponse.json({ success: false, error: "Langue invalide" }, { status: 400 });
  }

  try {
    const result = await addToWaitlist(firstName, email, role as WaitlistRole, source, locale);

    if (!result.success) {
      return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
    }

    return NextResponse.json({ success: true, alreadyExists: result.alreadyExists ?? false });
  } catch {
    return NextResponse.json({ success: false, error: "Erreur serveur" }, { status: 500 });
  }
}
