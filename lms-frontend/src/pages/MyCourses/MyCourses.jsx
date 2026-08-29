import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookReader, FaClock, FaBookOpen } from "react-icons/fa";
import "./MyCourses.css";
import axios from 'axios';
import API from "../../services/api";

function MyCourses() {
  const [myEnrolledCourses, setMyEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
const [progressMap, setProgressMap] = useState({});
  // MyCourses.jsx
// --- YAHAN FIX HAI ---
useEffect(() => {
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/enrollments/my-courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Backend Response:", response.data);

      if (response.data && response.data.data) {
        // Galti yahan thi: tum 'setEnrolledCourses' use kar rahi thi
        // Lekin tumhara state variable 'myEnrolledCourses' hai!
        setMyEnrolledCourses(response.data.data);
        const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  const progressRes = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/progress/user/${user.id}`
);

  const map = {};

  progressRes.data.courses.forEach((course) => {
    map[course.courseId] = course;
  });

  setProgressMap(map);
}
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCourses();
}, []);


  return (
    <div className="my-courses-page">
      <h1 className="my-courses-title">My Enrolled Courses</h1>

      {loading ? (
        <p className="empty-state-text">Loading...</p>
      ) : myEnrolledCourses.length === 0 ? (
        <div className="my-courses-empty">
          <FaBookOpen className="my-courses-empty__icon" />
          <p>No courses enrolled yet!</p>
        </div>
      ) : (
        <div className="my-courses-grid">
          {myEnrolledCourses.map((item) => {
            const course = item.courses;
            const progress = progressMap[course?.id];
            if (!course) return null;

            const imagePath =
  !course.image_url
    ? "/Course1.jpg"
    : course.image_url.startsWith("http")
    ? course.image_url
    : course.image_url.startsWith("/")
    ? course.image_url
    : `/${course.image_url}`;

            return (
              <div key={item.id} className="my-course-card">
                <img
                  src={imagePath}
                  alt={course.title}
                  className="my-course-card__image"
                />

                <div className="my-course-card__body">
                  <h3 className="my-course-card__title">{course.title}</h3>

                  <div className="my-course-card__meta">
                    <FaClock />
                    <span>{course.duration || "Self Paced"}</span>
                  </div>

                  <div className="my-course-card__progress">
                    <div className="my-course-card__track">
                      <div
                        className="my-course-card__fill"
                        style={{ width: `${progress?.progress || 0}%` }}
                      />
                    </div>

                    <div className="my-course-card__progress-meta">
                      <span>{progress?.completedVideos || 0} / {progress?.totalVideos || 0} Videos</span>
                      <strong>{progress?.progress || 0}% Complete</strong>
                    </div>
                  </div>

                  <Link
                    to={`/learning/${course.id}`}
                    state={{ course }}
                    className="my-course-card__btn"
                  >
                    <FaBookReader /> Continue Learning
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyCourses;
