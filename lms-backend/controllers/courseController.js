import { supabase } from "../config/supabase.js";

export async function getCourses(req, res) {
  const { data, error } = await supabase
    .from("courses")
    .select("*");

  if (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

    res.status(200).json({
    success: true,
    courses: data,
  });
}

export async function getCourseById(req, res) {
  const id = req.params.id;

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(404).json({
      message: error.message,
    });
  }

  res.status(200).json(data);
}

export async function createCourse(req, res) {
  console.log("Body:", req.body);

  const { title, description, fee, image_url, duration } = req.body;

  const { data, error } = await supabase
    .from("courses")
    .insert([
      {
        title,
        description,
        fee,
        image_url,
        duration,
      },
    ])
    .select();

  console.log("Data:", data);
  console.log("Error:", error);

  if (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  res.status(201).json(data);
}

export async function updateCourse(req, res) {
  const { id } = req.params;
  const { title, description, fee, duration } = req.body;

  const { data, error } = await supabase
    .from("courses")
    .update({
      title,
      description,
      fee,
      duration,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      message: error.message,
    });
  }

  if (!data) {
    return res.status(404).json({
      message: "Course not found",
    });
  }

  res.status(200).json({
    message: "Course updated successfully",
    course: data,
  });
}