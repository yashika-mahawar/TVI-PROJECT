import { supabase } from "../config/supabase.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { createNotification } from "../utils/createNotification.js";
import { sendWhatsAppOtp } from "../utils/sendWhatsAppOtp.js";
export async function registerUser(req, res) {
  const {
    full_name,
    email,
    password,
    role,
    program,
    phone,
    college_name,
    father_name,
  } = req.body;

  // Validation
  if (!full_name || !email || !password || !role) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (role === "student" && (!phone || !program || !college_name || !father_name)) {
    return res.status(400).json({
      message: "Phone, Program, College Name and Father's Name are required for student registration",
    });
  }

  // Check Existing User
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  // Password Hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        full_name,
        email,
        password: hashedPassword,
        role,
        program,
        phone,
        college_name,
        father_name,
      },
    ])
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
await createNotification(
  "admin",
  `${full_name} registered as a new student`
);
  const token = jwt.sign(
    {
      id: data.id,
      email: data.email,
      role: data.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.status(201).json({
    message: "User Registered Successfully",
    token,
    user: data,
  });
}

// authController.js mein loginUser function:
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // FIX: Use maybeSingle() instead of single()
    // authController.js
const { data: user, error } = await supabase
  .from("users")
  .select("*")
  .eq("email", email)
  .maybeSingle(); // Yeh crash nahi hone dega

if (error) {
  return res.status(500).json({ message: "DB Error" });
}

if (!user) {
  return res.status(404).json({ message: "User nahi mila!" });
}

    // Password comparison
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}
export async function getProfile(req, res) {
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user,
  });
}
// ================= FORGOT PASSWORD (WhatsApp OTP) =================

function generateOtp() {
  return crypto.randomInt(100000, 999999).toString();
}

const OTP_TTL_MS = 10 * 60 * 1000;

export async function forgotPassword(req, res) {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "WhatsApp number is required" });
  }

  // Match on the last 10 digits so it doesn't matter whether the number was
  // stored (at signup) or entered here with a country code, spaces, or dashes.
  const last10 = String(phone).replace(/\D/g, "").slice(-10);

  if (last10.length < 10) {
    return res.status(400).json({ message: "Enter a valid 10-digit WhatsApp number" });
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, phone")
    .ilike("phone", `%${last10}`)
    .maybeSingle();

  if (error) {
    console.error("[forgotPassword] DB lookup failed for", last10, ":", error.message);
    return res.status(500).json({ message: "DB Error", error: error.message });
  }
  if (!user) {
    console.warn("[forgotPassword] no user found for phone ending in:", last10);
    return res.status(404).json({ message: "No account found with this WhatsApp number" });
  }

  const otp = generateOtp();
  const otpExpiresAt = new Date(Date.now() + OTP_TTL_MS).toISOString();

  const { error: updateError } = await supabase
    .from("users")
    .update({ otp_code: otp, otp_expires_at: otpExpiresAt, otp_verified: false })
    .eq("id", user.id);

  if (updateError) {
    console.error("[forgotPassword] failed to store OTP for user", user.id, ":", updateError.message);
    return res.status(500).json({ message: updateError.message });
  }

  try {
    await sendWhatsAppOtp(user.phone, otp);
  } catch (err) {
    console.error("[forgotPassword] WhatsApp send failed for user", user.id, ":", err.message);
    return res.status(500).json({ message: err.message });
  }

  console.log("[forgotPassword] OTP sent via WhatsApp to user", user.id);
  res.status(200).json({ success: true, message: "OTP sent via WhatsApp", email: user.email });
}

export async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("id, otp_code, otp_expires_at")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("[verifyOtp] DB lookup failed for", email, ":", error.message);
    return res.status(500).json({ message: "DB Error", error: error.message });
  }

  const isExpired = !user?.otp_expires_at || new Date(user.otp_expires_at) < new Date();

  if (!user || !user.otp_code || isExpired || user.otp_code !== otp) {
    console.warn("[verifyOtp] rejected OTP for", email, "- expired:", isExpired, "hasCode:", !!user?.otp_code);
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const { error: updateError } = await supabase
    .from("users")
    .update({ otp_code: null, otp_verified: true })
    .eq("id", user.id);

  if (updateError) {
    console.error("[verifyOtp] failed to mark OTP verified for user", user.id, ":", updateError.message);
    return res.status(500).json({ message: updateError.message });
  }

  console.log("[verifyOtp] OTP verified for user", user.id);
  res.status(200).json({ success: true, message: "OTP verified" });
}

export async function resetPassword(req, res) {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and new password are required" });
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("id, otp_verified, otp_expires_at")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("[resetPassword] DB lookup failed for", email, ":", error.message);
    return res.status(500).json({ message: "DB Error", error: error.message });
  }
  if (!user) {
    console.warn("[resetPassword] no user found for email:", email);
    return res.status(404).json({ message: "Email not found" });
  }

  const isExpired = !user.otp_expires_at || new Date(user.otp_expires_at) < new Date();

  if (!user.otp_verified || isExpired) {
    console.warn("[resetPassword] rejected for user", user.id, "- verified:", user.otp_verified, "expired:", isExpired);
    return res.status(400).json({ message: "OTP verification required before resetting password" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const { error: updateError } = await supabase
    .from("users")
    .update({
      password: hashedPassword,
      otp_code: null,
      otp_verified: false,
      otp_expires_at: null,
    })
    .eq("id", user.id);

  if (updateError) {
    console.error("[resetPassword] failed to update password for user", user.id, ":", updateError.message);
    return res.status(500).json({ message: updateError.message });
  }

  console.log("[resetPassword] password reset for user", user.id);
  res.status(200).json({ success: true, message: "Password reset successfully" });
}

export async function updateProfileImage(req, res) {
  try {
    const { id } = req.params;
    const { profile_image } = req.body;

    const { data, error } = await supabase
      .from("users")
      .update({
        profile_image: profile_image,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    res.status(200).json({
      message: "Profile image updated",
      user: data,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}