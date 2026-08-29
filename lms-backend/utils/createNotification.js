import { supabase } from "../config/supabase.js";

export const createNotification = async (
  role,
  message,
  user_id = null
) => {
  try {

    await supabase
      .from("notifications")
      .insert([
        {
          role,
          user_id,
          message,
          is_read: false,
        },
      ]);

  } catch (err) {

    console.log(err);

  }
};