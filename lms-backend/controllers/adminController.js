import { supabase } from "../config/supabase.js";
import { createNotification } from "../utils/createNotification.js";
export const getDashboardStats = async (req, res) => {
  try {
    const [
      { count: students },
      { count: courses },
      { count: videos },
      { count: enrollments },
    ] = await Promise.all([
      supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("role", "student"),

      supabase
        .from("courses")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("videos")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("enrollment")
        .select("*", { count: "exact", head: true }),
    ]);

    res.json({
      success: true,
      students,
      courses,
      videos,
      enrollments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// ================= RECENT ENROLLMENTS =================

export const getRecentEnrollments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("enrollment")
      .select(`
        id,
        created_at,
        users (
          full_name,
          profile_image
        ),
        courses (
          title
        )
      `)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      enrollments: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// ================= NOTIFICATIONS =================

export const getNotifications = async (req, res) => {
  try {

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
        .eq("role", "admin")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      notifications: data,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }
};
// ================= RECENT STUDENTS =================

export const getRecentStudents = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, full_name, email, program, profile_image, phone, college_name, father_name")
      .eq("role", "student")
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      students: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// Get All Students
export const getStudents = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, full_name, email, program, role, profile_image, phone, college_name, father_name")
      .eq("role", "student")
      .order("full_name");

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      students: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Delete Student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting student:", id);


    // 1. Pehle enrollment delete karo
    const { error: enrollmentError } = await supabase
      .from("enrollment")
      .delete()
      .eq("user_id", id);


    if (enrollmentError) {
      return res.status(500).json({
        success: false,
        error: enrollmentError.message,
      });
    }


    // 2. Ab user delete karo
    const { error: userError } = await supabase
      .from("users")
      .delete()
      .eq("id", id);


    if (userError) {
      return res.status(500).json({
        success: false,
        error: userError.message,
      });
    }


    res.json({
      success: true,
      message: "Student deleted successfully",
    });


  } catch (err) {

    console.log("Delete Student Error:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });

  }
};
// ================= GET ALL COURSES =================
export const getCourses = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("title");

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    res.json({
      success: true,
      courses: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ================= ADD COURSE =================
export const addCourse = async (req, res) => {
  try {
    const { title, description, duration, fee, image_url } = req.body;

    const { data, error } = await supabase
      .from("courses")
      .insert([
        {
          title,
              description,
          duration,
          fee,
          image_url,
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
// Sab students nikalo
const { data: students } = await supabase
  .from("users")
  .select("id")
  .eq("role", "student");

// Admin notification
await createNotification(
  "admin",
  `New Course Added: ${title}`
);

// Students notification
for (const student of students) {
  await createNotification(
    "student",
    `New Course Added: ${title}`,
    student.id
  );
}
    res.status(201).json({
  success: true,
  message: "Course added successfully",
  course: data,
});
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ================= UPDATE COURSE =================
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, fee } = req.body;

    const { data, error } = await supabase
      .from("courses")
      .update({
        title,
        description,
        duration,
        fee,
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
      course: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ================= DELETE COURSE =================
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Courses have dependent rows in several tables (videos, assignments,
    // live_classes, enrollment) whose foreign keys block a plain delete.
    // Remove those first, in dependency order, so the course can actually
    // be deleted instead of failing with a foreign key constraint error.
    const { data: videos, error: videosFetchError } = await supabase
      .from("videos")
      .select("id")
      .eq("course_id", id);

    if (videosFetchError) {
      return res.status(500).json({
        success: false,
        error: videosFetchError.message,
      });
    }

    const videoIds = (videos || []).map((v) => v.id);

    if (videoIds.length > 0) {
      const { error: progressError } = await supabase
        .from("progress")
        .delete()
        .in("video_id", videoIds);

      if (progressError) {
        return res.status(500).json({
          success: false,
          error: progressError.message,
        });
      }
    }

    const { error: videosError } = await supabase
      .from("videos")
      .delete()
      .eq("course_id", id);

    if (videosError) {
      return res.status(500).json({
        success: false,
        error: videosError.message,
      });
    }

    const { error: assignmentsError } = await supabase
      .from("assignments")
      .delete()
      .eq("course_id", id);

    if (assignmentsError) {
      return res.status(500).json({
        success: false,
        error: assignmentsError.message,
      });
    }

    const { error: liveClassesError } = await supabase
      .from("live_classes")
      .delete()
      .eq("course_id", id);

    if (liveClassesError) {
      return res.status(500).json({
        success: false,
        error: liveClassesError.message,
      });
    }

    const { error: enrollmentError } = await supabase
      .from("enrollment")
      .delete()
      .eq("course_id", id);

    if (enrollmentError) {
      return res.status(500).json({
        success: false,
        error: enrollmentError.message,
      });
    }

    const { error } = await supabase
      .from("courses")
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
      message: "Course deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};