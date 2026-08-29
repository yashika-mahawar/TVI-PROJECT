// lms-backend/config/supabase.js
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config(); // .env file load karne ke liye

const supabaseUrl = process.env.SUPABASE_URL; // VITE_ hata do
const supabaseKey = process.env.SUPABASE_KEY; // VITE_ hata do

export const supabase = createClient(supabaseUrl, supabaseKey);