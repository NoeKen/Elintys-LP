import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export async function addToWaitlist(
  email: string,
  source: string,
  locale: string,
  role?: string
): Promise<{ success: boolean; alreadyExists?: boolean }> {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    const waitlistRef = collection(db, "waitlist");
    const q = query(waitlistRef, where("email", "==", normalizedEmail));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return { success: true, alreadyExists: true };
    }

    await addDoc(waitlistRef, {
      email: normalizedEmail,
      role: role ?? null,
      source,
      locale,
      createdAt: serverTimestamp(),
    });

    return { success: true, alreadyExists: false };
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return { success: false };
  }
}
