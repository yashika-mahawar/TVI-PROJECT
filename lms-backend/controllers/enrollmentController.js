import { supabase } from "../config/supabase.js";
import { createNotification } from "../utils/createNotification.js";
export async function enrollCourse(req, res) {
  try {
    const user_id = req.user.id;
    // Removed Number() conversion: We now expect a UUID string
    const { course_id } = req.body; 

    if (!course_id) {
      return res.status(400).json({ message: "Course ID is required!" });
    }

    // 1. Check existing enrollment
    const { data: existing, error: checkError } = await supabase
      .from("enrollment")
      .select("*")
      .eq("user_id", user_id)
      .eq("course_id", course_id)
      .maybeSingle();

    if (existing) {
      return res.status(200).json({ message: "Already enrolled!" });
    }

    // 2. Insert as a UUID string
    const { data, error } = await supabase
      .from("enrollment")
      .insert([{ user_id, course_id }]); 

    if (error) {
        console.error("Insert Error:", error);
        return res.status(500).json({ message: error.message });
    }
const { data: course } = await supabase
  .from("courses")
  .select("title")
  .eq("id", course_id)
  .single();

const { data: student } = await supabase
  .from("users")
  .select("full_name")
  .eq("id", user_id)
  .single();

await createNotification(
  "admin",
  `${student.full_name} enrolled in ${course.title}`
);
    res.status(201).json({ message: "Course enrolled successfully", enrollment: data });
    
  } catch (err) {
    console.error("Unexpected error in enrollCourse:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getEnrolledCourses(req, res) {
  try {
    const user_id = req.user.id;

    const { data, error } = await supabase
      .from("enrollment")
      .select(`
        id,
        created_at,
        courses (
          id,
          title,
          fee,
          duration,
          image_url
        )
      `)
      .eq("user_id", user_id);

    if (error) {
      console.error("Fetch Error:", error);
      return res.status(500).json({ message: error.message });
    }

    res.status(200).json({
      message: "Enrolled courses fetched successfully",
      data: data || [], 
    });
  } catch (err) {
    console.error("Unexpected error in getEnrolledCourses:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}