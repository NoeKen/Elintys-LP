import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "./firebase-admin";
import { getResend } from "./resend";
import waitlistConfirmationEmail from "./emails/WaitlistConfirmation";

async function sendConfirmationEmail(email: string): Promise<boolean> {
  try {
    await getResend().emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject: "Vous êtes sur la liste Elintys 🎉",
      html: waitlistConfirmationEmail(email),
    });
    return true;
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    return false;
  }
}

export async function addToWaitlist(
  email: string,
  source: string,
  locale: string,
  role?: string
): Promise<{ success: boolean; alreadyExists?: boolean; emailSent?: boolean }> {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    const waitlistRef = adminDb.collection("waitlist");
    const snapshot = await waitlistRef.where("email", "==", normalizedEmail).limit(1).get();

    if (!snapshot.empty) {
      return { success: true, alreadyExists: true };
    }

    await waitlistRef.add({
      email: normalizedEmail,
      role: role ?? null,
      source,
      locale,
      createdAt: FieldValue.serverTimestamp(),
    });

    const emailSent = await sendConfirmationEmail(normalizedEmail);

    return { success: true, alreadyExists: false, emailSent };
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return { success: false };
  }
}
