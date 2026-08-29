import "./CourseDetails.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaClock,
  FaChalkboardTeacher,
  FaBullseye,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

function formatFee(fee) {
  if (fee === undefined || fee === null || fee === "") return fee;
  const numeric = Number(String(fee).replace(/[^0-9.]/g, ""));
  if (Number.isNaN(numeric)) return fee;
  return `₹${numeric.toLocaleString("en-IN")}`;
}

function CourseDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const course = location.state?.course;

  // Enroll ka logic with performance metrics
  const handleEnroll = () => {
  const existing = JSON.parse(localStorage.getItem("myCourses") || "[]");

  if (!existing.find((c) => c.id === course.id)) {
    const courseWithMetrics = {
      ...course,
      progress: 0,
      attendance: 90,
      cgpa: 8.5,
    };

    localStorage.setItem(
      "myCourses",
      JSON.stringify([...existing, courseWithMetrics])
    );
  }

  navigate("/payment", { state: { course } });
};
  if (!course) {
    return (
      <>
        <Navbar />
        <div className="no-course">
          <h2>No Course Selected</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="course-details">
        {/* LEFT IMAGE */}
        <div className="course-image">
          <img src={course.image_url || course.image} alt={course.title} />
        </div>

        {/* RIGHT CONTENT */}
        <div className="course-info">
          <span className="course-badge">
            <FaGraduationCap />
            Admissions Open 2026
          </span>

          <h1>{course.title}</h1>

          <p className="course-text">
            {course.description}
          </p>

          {/* HIGHLIGHTS */}
          <h2 className="section-heading">Course Highlights</h2>
          <ul className="highlights">
            <li><FaCheckCircle /> Industry-Oriented Curriculum</li>
            <li><FaCheckCircle /> Experienced Faculty Members</li>
            <li><FaCheckCircle /> Hands-on Projects</li>
            <li><FaCheckCircle /> Placement Assistance</li>
            <li><FaCheckCircle /> Internship Opportunities</li>
            <li><FaCheckCircle /> Modern Computer Labs</li>
          </ul>

          {/* ENROLLMENT CARD */}
          <div className="enroll-card">
            <div className="enroll-card-fee-row">
              <div>
                <span className="enroll-card-label">Program Fee</span>
                <div className="enroll-card-amount">{formatFee(course.fee)}</div>
              </div>
              <div className="enroll-card-badge">
                <FaShieldAlt /> Secure Checkout
              </div>
            </div>

            <ul className="enroll-card-meta">
              <li>
                <FaClock className="enroll-card-icon" />
                <span className="enroll-card-meta-label">Duration</span>
                <strong>{course.duration}</strong>
              </li>
              <li>
                <FaChalkboardTeacher className="enroll-card-icon" />
                <span className="enroll-card-meta-label">Mode</span>
                <strong>Online / Offline</strong>
              </li>
              <li>
                <FaBullseye className="enroll-card-icon" />
                <span className="enroll-card-meta-label">Eligibility</span>
                <strong>10+2</strong>
              </li>
            </ul>

            <button
              className="enroll-btn"
              onClick={handleEnroll}
            >
              Enroll Now
            </button>
            <p className="enroll-card-note">Instant confirmation &middot; No hidden charges</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default CourseDetails;
