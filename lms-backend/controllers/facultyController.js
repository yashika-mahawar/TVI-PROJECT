import { supabase } from "../config/supabase.js";

export const getFaculty = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("faculty")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      faculty: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const addFaculty = async (req, res) => {
  try {
    const { name, designation, experience, contact, email, photo } = req.body;

    const { data, error } = await supabase
      .from("faculty")
      .insert([
        {
          name,
          designation,
          experience,
          contact,
          email,
          photo,
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

    res.status(201).json({
      success: true,
      message: "Faculty added successfully",
      faculty: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, experience, contact, email, photo } = req.body;

    const { data, error } = await supabase
      .from("faculty")
      .update({
        name,
        designation,
        experience,
        contact,
        email,
        photo,
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
      message: "Faculty updated successfully",
      faculty: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("faculty").delete().eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: "Faculty deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
