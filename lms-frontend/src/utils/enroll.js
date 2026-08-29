import axios from "axios";


export const enrollCourse = async (course) => {
  try {
    const token = localStorage.getItem("token");
    
    // 🔥 Yahan backend API call zaroori hai
    const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/enrollments/enroll`,
  { course_id: course.id },
  { headers: { Authorization: `Bearer ${token}` } }
);
    console.log("Database Enrollment Success:", response.data);

    // Database success hone ke baad hi localStorage update karo
    let myCourses = JSON.parse(localStorage.getItem("myCourses")) || [];
    const exists = myCourses.find((c) => c.id === course.id);

    if (!exists) {
      myCourses.push({ ...course, progress: 0, enrolledAt: new Date().toISOString() });
      localStorage.setItem("myCourses", JSON.stringify(myCourses));
    }
  } catch (err) {
    console.error("Enrollment API Error:", err.response?.data || err.message);
  }
};