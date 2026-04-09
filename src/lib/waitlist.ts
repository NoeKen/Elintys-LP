import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "./firebase-admin";
import { getResend } from "./resend";
import waitlistConfirmationEmail from "./emails/WaitlistConfirmation";

export type WaitlistRole =
  | "organisateur"
  | "prestataire"
  | "gestionnaire"
  | "visiteur";

export interface WaitlistEntry {
  firstName: string;
  email: string;
  role: WaitlistRole;
  source: "hero" | "cta";
  locale: "fr" | "en";
  createdAt: ReturnType<typeof FieldValue.serverTimestamp>;
}

async function sendConfirmationEmail(
  firstName: string,
  email: string,
  role: WaitlistRole,
  locale: WaitlistEntry["locale"]
): Promise<boolean> {
  try {
    await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: locale === "fr" ? "Vous êtes sur la liste Elintys 🎉" : "You're on the Elintys list 🎉",
      html: waitlistConfirmationEmail({ firstName, role, email, locale }),
    });
    return true;
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    return false;
  }
}

export async function addToWaitlist(
  firstName: string,
  email: string,
  role: WaitlistRole,
  source: WaitlistEntry["source"] = "hero",
  locale: WaitlistEntry["locale"] = "fr"
): Promise<{ success: boolean; alreadyExists?: boolean; emailSent?: boolean }> {
  try {
    const normalizedFirstName = firstName.trim();
    const normalizedEmail = email.toLowerCase().trim();
    const waitlistRef = adminDb.collection("waitlist");
    const snapshot = await waitlistRef.where("email", "==", normalizedEmail).limit(1).get();

    if (!snapshot.empty) {
      return { success: true, alreadyExists: true };
    }

    const entry: WaitlistEntry = {
      firstName: normalizedFirstName,
      email: normalizedEmail,
      role,
      source,
      locale,
      createdAt: FieldValue.serverTimestamp(),
    };

    await waitlistRef.add(entry);

    const emailSent = await sendConfirmationEmail(normalizedFirstName, normalizedEmail, role, locale);

    return { success: true, alreadyExists: false, emailSent };
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return { success: false };
  }
}
