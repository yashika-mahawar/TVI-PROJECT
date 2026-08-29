import twilio from "twilio";

// Accepts local Indian numbers (e.g. "98765 43210") as well as full E.164
// numbers (e.g. "+919876543210") since the signup form collects a plain
// phone number with no country-code picker.
export function toE164(phone) {
  const trimmed = String(phone || "").trim();
  if (trimmed.startsWith("+")) return trimmed;
  const digits = trimmed.replace(/\D/g, "");
  return `+91${digits}`;
}

// Built lazily (not at module load) so an invalid/placeholder SID only
// breaks the OTP feature, not the entire server's startup.
function getClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    throw new Error(
      "WhatsApp OTP is not configured. Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in lms-backend/.env"
    );
  }
  if (!accountSid.startsWith("AC")) {
    throw new Error(
      "TWILIO_ACCOUNT_SID looks invalid (a real Twilio Account SID starts with 'AC'). Check the value in lms-backend/.env against your Twilio Console."
    );
  }

  return twilio(accountSid, authToken);
}

export async function sendWhatsAppOtp(phone, otp) {
  const rawFrom = process.env.TWILIO_WHATSAPP_FROM;
  if (!rawFrom) {
    throw new Error("TWILIO_WHATSAPP_FROM is not set in lms-backend/.env");
  }

  // Accept the env var whether or not it already includes the "whatsapp:"
  // prefix, so it works regardless of how it was pasted in.
  const whatsappFrom = rawFrom.replace(/^whatsapp:/i, "");

  const client = getClient();

  await client.messages.create({
    from: `whatsapp:${whatsappFrom}`,
    to: `whatsapp:${toE164(phone)}`,
    body: `Your ICFAI University password reset code is *${otp}*. It expires in 10 minutes. Do not share this code with anyone.`,
  });
}
