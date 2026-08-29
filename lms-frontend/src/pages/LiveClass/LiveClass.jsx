import React, { useState, useEffect } from 'react';
import { FaVideo, FaCalendarAlt, FaClock, FaChalkboardTeacher, FaCheckCircle } from 'react-icons/fa';
import './LiveClass.css';
import axios from "axios";
import API from "../../services/api";
const LiveClass = () => {
  const [selectedCourse, setSelectedCourse] = useState('All');
const [liveSchedule, setLiveSchedule] = useState([]);
const [enrolledCourses, setEnrolledCourses] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchLiveClasses = async () => {
    try {
const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/live-classes`
);

console.log("Live Classes:", response.data);

const enrolledRes = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/enrollments/my-courses`,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

const enrolledTitles = enrolledRes.data.data.map(
  (item) => item.courses.title
);

setEnrolledCourses(enrolledTitles);

const filteredClasses = (response.data.data || []).filter(
  (live) => enrolledTitles.includes(live.courses?.title)
);

setLiveSchedule(filteredClasses);
    } catch (error) {
      console.error("Live class fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchLiveClasses();
}, []);

  const filteredSchedule =
  selectedCourse === "All"
    ? liveSchedule
    : liveSchedule.filter(
        (item) => item.courses?.title === selectedCourse
      );

const getClassStatus = (session) => {
  const now = new Date();

  // date + time ko ek Date object banao
  const classStart = new Date(`${session.date}T${session.time}`);

  // 1 hour duration maan rahe hain
  const classEnd = new Date(classStart.getTime() + 60 * 60 * 1000);

  if (now < classStart) {
    return "Upcoming";
  }

  if (now >= classStart && now <= classEnd) {
    return "Live";
  }

  return "Completed";
};

  // Poore 10 course types short aliases filter navigation list ke liye
const coursePillsList = [
  "All",
  ...enrolledCourses,
];

  return (
    <div className="live-class-page">
      <div className="live-header-meta">
        <div className="live-header-text">
          <h1>Live Lectures Hub</h1>
          <p>Join streaming webinars, interactive workshops, and clear doubts live.</p>
        </div>

        {/* 10 COURSE COMPLETE FILTER PILLS */}
        <div className="course-filter-container">
          {coursePillsList.map((course) => (
            <button
              key={course}
              onClick={() => setSelectedCourse(course)}
              className={`filter-pill-btn ${selectedCourse === course ? 'active' : ''}`}
            >
              {course === 'B.Tech Computer Science' ? 'B.Tech' : course === 'Diploma in IT' ? 'Diploma' : course}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="empty-state-text">Loading Live Classes...</p>
      ) : filteredSchedule.length === 0 ? (
        <div className="live-class-empty">
          <FaVideo className="live-class-empty__icon" />
          <p>No live classes scheduled for this course yet.</p>
        </div>
      ) : (
        <div className="schedule-cards-list">
          {filteredSchedule.map((session) => {
            const status = getClassStatus(session);

            return (
              <div key={session.id} className="schedule-card-item">
                <div className="schedule-card-item__info">
                  <span className="course-badge-tag">
                    {session.courses?.title}
                  </span>
                  <h3 className="class-title-text">{session.topic}</h3>
                  <div className="meta-info-row">
                    <FaChalkboardTeacher className="meta-icon meta-icon--muted" />
                    <span>Faculty: {session.faculty}</span>
                  </div>
                </div>

                <div className="date-time-box">
                  <div className="meta-info-row meta-info-row--strong">
                    <FaCalendarAlt className="meta-icon meta-icon--primary" />
                    <span>{session.date}</span>
                  </div>
                  <div className="meta-info-row">
                    <FaClock className="meta-icon meta-icon--success" />
                    <span>
                      {new Date(`1970-01-01T${session.time}`).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                      })}
                    </span>
                  </div>
                </div>

                <div className="action-btn-zone">
                  {status === "Live" ? (
                    <a href={session.meet_link} target="_blank" rel="noreferrer">
                      <button className="live-btn-broadcast">
                        <FaVideo /> Join Now
                      </button>
                    </a>
                  ) : status === "Upcoming" ? (
                    <button disabled className="upcoming-btn-disabled">
                      Class Scheduled
                    </button>
                  ) : (
                    <button disabled className="completed-btn-disabled">
                      <FaCheckCircle /> Session Concluded
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LiveClass;
