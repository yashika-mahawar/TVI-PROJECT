import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import API from "../../services/api";
import "./Pricing.css";
import { FaCheck, FaBookOpen } from "react-icons/fa";

const formatFee = (fee) => {
  const num = Number(fee);
  return Number.isFinite(num) ? `₹${num.toLocaleString("en-IN")}` : fee;
};

const INCLUDED = [
  "Live + recorded lectures",
  "Assignments with faculty feedback",
  "Verified certificate on completion",
];

function Pricing() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data.courses || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (course) => {
    localStorage.setItem("lastCourse", JSON.stringify(course));
  };

  return (
    <>
      <Navbar />

      <section className="pricing-hero">
        <span className="eyebrow">Pricing</span>
        <h1>Pay Per Course, Nothing Hidden</h1>
        <p>Every course includes live classes, faculty support and a verified certificate.</p>
      </section>

      <section className="pricing-section">
        {!loading && courses.length === 0 && (
          <div className="course-empty">
            <FaBookOpen />
            <p>New courses are being added — check back soon!</p>
          </div>
        )}

        <div className="pricing-grid">
          {courses.map((course, idx) => (
            <div
              className={`pricing-card ${idx === 1 ? "pricing-card-highlight" : ""}`}
              key={course.id}
            >
              {idx === 1 && <span className="pricing-badge">Most Enrolled</span>}

              <h3>{course.title}</h3>
              <p className="pricing-tagline">{course.duration}</p>

              <div className="pricing-price">
                <span className="price-amount">{formatFee(course.fee)}</span>
              </div>

              <ul className="pricing-features">
                {INCLUDED.map((f, i) => (
                  <li key={i}><FaCheck /> {f}</li>
                ))}
              </ul>

              <Link
                to="/course-details"
                state={{ course }}
                onClick={() => handleViewDetails(course)}
                className={idx === 1 ? "btn-gradient pricing-btn" : "btn-outline pricing-btn"}
              >
                Enroll Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Pricing;
