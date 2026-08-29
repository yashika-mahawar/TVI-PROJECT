import React from "react";
import { FaUserGraduate } from "react-icons/fa";
import "./RecentEnrollments.css";

const RecentEnrollments = ({ enrollments }) => {
  return (
    <div className="admin-recent-enrollments">
      <h3 className="admin-panel-title">
        <span className="admin-panel-title-icon"><FaUserGraduate /></span>
        Recent Course Enrollments
      </h3>

      <div className="table-container">
        <table className="course-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan={3} className="admin-recent-enrollments__empty">
                  No enrollments to show yet.
                </td>
              </tr>
            ) : (
              enrollments.map((item) => {
                const isActive = (item.status || "active").toLowerCase() !== "inactive";

                return (
                  <tr key={item.id}>
                    <td>
                      <div className="enrollment-student">
                        <img
                          src={item.users?.profile_image || "https://ui-avatars.com/api/?name=Student"}
                          alt=""
                          className="student-avatar"
                        />
                        {item.users?.full_name}
                      </div>
                    </td>
                    <td>{item.courses?.title}</td>
                    <td>
                      <span className={`status-dot ${isActive ? "active" : "inactive"}`}>
                        {isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentEnrollments;
