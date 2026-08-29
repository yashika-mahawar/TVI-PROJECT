import { supabase } from "../config/supabase.js";
import { createNotification } from "../utils/createNotification.js";
// Sabhi videos laane ke liye (Admin ke liye)
export const getAllVideos = async (req, res) => {
    const { data, error } = await supabase.from('videos').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
};

// Course ke hisaab se videos lane ke liye (Student ke liye)
export const getVideosByCourse = async (req, res) => {
    const { course_id } = req.params;
    
    const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('course_id', course_id)
        .order('id', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
    
};

export const addVideo = async (req, res) => {
  try {
    const {
      course_id,
      title,
      video_url,
      duration,
      module_number,
    } = req.body;

    if (!course_id || !title || !video_url) {
      return res.status(400).json({
        success: false,
        message: "Course, title and video URL are required",
      });
    }

    const { data, error } = await supabase
      .from("videos")
      .insert([
        {
          course_id,
          title,
          video_url,
          duration,
          module_number,
        },
      ])
      .select();

    if (error) {
  console.log("SUPABASE ERROR:", error);
const { data: students } = await supabase
  .from("users")
  .select("id")
  .eq("role", "student");

// Admin
await createNotification(
  "admin",
  `New Video Added`
);

// Students
for (const student of students) {
  await createNotification(
    "student",
    `New Video Added`,
    student.id
  );
}
  return res.status(500).json({
    success: false,
    message: error.message,
    error,
  });
}

    res.status(201).json({
      success: true,
      message: "Video added successfully",
      video: data[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("videos")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      video_url,
      duration,
      module_number,
    } = req.body;

    const { data, error } = await supabase
      .from("videos")
      .update({
        title,
        video_url,
        duration,
        module_number,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Video updated successfully",
      video: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};