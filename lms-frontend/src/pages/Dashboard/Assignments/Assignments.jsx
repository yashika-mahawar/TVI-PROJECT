import React, { useState, useEffect } from "react";
import { FaClipboardList, FaClock } from "react-icons/fa";
import API from "../../../services/api";
import "./Assignments.css";
const Assignments = () => {
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {

      // Student enrolled courses
      const enrolledRes = await API.get(
  "/enrollments/my-courses"
);

      const enrolledTitles = enrolledRes.data.data.map(
        (item) => item.courses.title
      );

      // All assignments
      const assignmentRes = await API.get(
  "/assignments"
);
      // Sirf enrolled course ke assignments
      const filtered = (assignmentRes.data.data || []).filter((item) =>
        enrolledTitles.includes(item.courses?.title)
      );

      setFilteredAssignments(filtered);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assignments-page">
      <h1 className="assignments-title">Academic Assignments</h1>
      <p className="assignments-subtitle">
        Upload and track your continuous internal evaluations.
      </p>

      {loading ? (
        <p className="empty-state-text">Loading Assignments...</p>
      ) : filteredAssignments.length === 0 ? (
        <div className="assignments-empty">
          <FaClipboardList className="assignments-empty__icon" />
          <p>No assignments available.</p>
        </div>
      ) : (
        <div className="assignments-list">
          {filteredAssignments.map((task) => (
            <div key={task.id} className="assignment-card">
              <div className="assignment-card__main">
                <div className="assignment-card__icon">
                  <FaClipboardList size={20} />
                </div>

                <div>
                  <h3 className="assignment-card__title">{task.title}</h3>
                  <p className="assignment-card__course">{task.courses?.title}</p>
                  <p className="assignment-card__due">Due: {task.due_date}</p>

                  {task.description && (
                    <p className="assignment-card__desc">{task.description}</p>
                  )}

                  {task.file_url && (
                    <a
                      href={task.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="assignment-card__link"
                    >
                      View Assignment
                    </a>
                  )}
                </div>
              </div>

              <span className="assignment-card__status">
                <FaClock />
                Pending
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignments;
