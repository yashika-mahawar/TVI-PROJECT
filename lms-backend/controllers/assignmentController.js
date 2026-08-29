import { supabase } from "../config/supabase.js";
import { createNotification } from "../utils/createNotification.js";

// ==================== GET ====================

export const getAssignments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("assignments")
      .select(`
        *,
        courses(title)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ==================== ADD ====================

export const addAssignment = async (req, res) => {
  try {
    const {
      title,
      description,
      due_date,
      course_id,
      file_url,
    } = req.body;

    const { data, error } = await supabase
      .from("assignments")
      .insert([
        {
          title,
          description,
          due_date,
          course_id,
          file_url,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    // Course title
    const { data: course } = await supabase
      .from("courses")
      .select("title")
      .eq("id", course_id)
      .single();

    // Students of same course
    const { data: enrollments } = await supabase
      .from("enrollment")
      .select("user_id")
      .eq("course_id", course_id);

    if (enrollments) {
      for (const student of enrollments) {
        await createNotification(
          "student",
          `New Assignment added for ${course.title}`,
          student.user_id
        );
      }
    }

    res.status(201).json({
      success: true,
      message: "Assignment added successfully",
      assignment: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ==================== UPDATE ====================

export const updateAssignment = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      title,
      description,
      due_date,
      course_id,
      file_url,
    } = req.body;

    const { data, error } = await supabase
      .from("assignments")
      .update({
        title,
        description,
        due_date,
        course_id,
        file_url,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: "Assignment updated successfully",
      assignment: data,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }

};

// ==================== DELETE ====================

export const deleteAssignment = async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await supabase
      .from("assignments")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: "Assignment deleted successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }

};