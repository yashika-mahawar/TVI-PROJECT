import API from "./api";

// Get all courses
export const getCourses = async () => {
  const res = await API.get("/courses");
  return res.data;
};

// Get single course
export const getCourse = async (id) => {
  const res = await API.get(`/courses/${id}`);
  return res.data;
};

// Enroll course
export const enrollCourse = async (course_id) => {
  const res = await API.post("/enroll", {
    course_id,
  });

  return res.data;
};

// My Courses
export const getMyCourses = async () => {
  const res = await API.get("/enrolled-courses");

  return res.data.data;
};