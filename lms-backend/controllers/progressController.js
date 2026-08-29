import { supabase } from "../config/supabase.js";

export const saveProgress = async (req, res) => {
  try {
    const { user_id, video_id, is_completed } = req.body;

    // Validation
    if (!user_id || !video_id) {
      return res.status(400).json({
        success: false,
        error: "user_id and video_id are required",
      });
    }

    const { data, error } = await supabase
      .from("progress")
      .upsert(
        {
          user_id,
          video_id,
          is_completed: is_completed ?? true,
        },
        {
          onConflict: "user_id,video_id",
        }
      )
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
    if (is_completed) {

  // Video title
  const { data: video } = await supabase
    .from("videos")
    .select("title")
    .eq("id", video_id)
    .single();

  await supabase.from("activities").insert([
    {
      user_id,
      title: "Video Completed",
      description: `Completed ${video?.title}`,
      type: "video_completed",
    },
  ]);

}

    return res.status(200).json({
      success: true,
      message: "Progress saved successfully",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
export const getCourseProgress = async (req, res) => {
  try {
    const { courseId, userId } = req.params;

    // Total videos
    const { data: videos, error: videoError } = await supabase
      .from("videos")
      .select("id")
      .eq("course_id", courseId);

    if (videoError) {
      return res.status(500).json({ error: videoError.message });
    }

    const totalVideos = videos.length;

    const videoIds = videos.map((v) => v.id);

    // Completed videos
    const { data: completed, error: progressError } = await supabase
      .from("progress")
      .select("video_id")
      .eq("user_id", userId)
      .eq("is_completed", true)
      .in("video_id", videoIds);

    if (progressError) {
      return res.status(500).json({ error: progressError.message });
    }

    const completedVideos = completed.length;

    const progress =
      totalVideos === 0
        ? 0
        : Math.round((completedVideos / totalVideos) * 100);

    res.json({
      totalVideos,
      completedVideos,
      progress,
      completedIds: completed.map((v) => v.video_id),
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
export const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    // User ke enrolled courses
    const { data: enrollment, error: enrollError } = await supabase
      .from("enrollment")
      .select(`
        course_id,
        courses (
          id,
          title
        )
      `)
      .eq("user_id", userId);

    if (enrollError) {
      return res.status(500).json({
        success: false,
        error: enrollError.message,
      });
    }

    const courseProgress = [];

    let totalCompleted = 0;
    let totalVideos = 0;
    let completedCourses = 0;

    for (const item of enrollment) {
      const courseId = item.course_id;

      // Course ke videos
      const { data: videos } = await supabase
        .from("videos")
        .select("id")
        .eq("course_id", courseId);

      const ids = videos.map((v) => v.id);

      // Completed videos
      const { data: completed } = await supabase
        .from("progress")
        .select("video_id")
        .eq("user_id", userId)
        .eq("is_completed", true)
        .in("video_id", ids);

      const completedVideos = completed.length;
      const total = videos.length;

      const percent =
        total === 0
          ? 0
          : Math.round((completedVideos / total) * 100);

      if (percent === 100) completedCourses++;

      totalCompleted += completedVideos;
      totalVideos += total;

      courseProgress.push({
        courseId,
        title: item.courses.title,
        totalVideos: total,
        completedVideos,
        progress: percent,
      });
    }

    res.json({
      success: true,
      courses: courseProgress,
      enrolledCourses: enrollment.length,
      completedCourses,
      inProgress: enrollment.length - completedCourses,
      overallProgress:
        totalVideos === 0
          ? 0
          : Math.round((totalCompleted / totalVideos) * 100),
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};