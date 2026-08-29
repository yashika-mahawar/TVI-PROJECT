import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaBookOpen, FaClock, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./CourseCard.css";
import API from "../../services/api"; // path apne folder ke hisaab se dekh lena

const formatFee = (fee) => {
  const num = Number(fee);
  return Number.isFinite(num) ? `₹${num.toLocaleString("en-IN")}` : fee;
};

function CourseCard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || courses.length === 0) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [courses, updateScrollState]);

  const scrollByCard = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector(".course-card");
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || 0);
    const step = card ? card.offsetWidth + gap : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses"); // ya jo bhi endpoint ho
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
    <section className="courses-section" id="courses">
      <span className="eyebrow">Our Courses</span>
      <h2 className="course-heading">Learn From Industry Experts</h2>
      <p className="course-subheading">
        Live &amp; self-paced programs designed to get you job-ready, with a
        verified certificate on completion.
      </p>

      {loading && (
        <div className="course-container">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div className="course-card course-skeleton" key={idx}>
              <div className="skeleton-block skeleton-img" />
              <div className="course-content">
                <div className="skeleton-block skeleton-line" style={{ width: "70%" }} />
                <div className="skeleton-block skeleton-line" />
                <div className="skeleton-block skeleton-line" style={{ width: "85%" }} />
                <div className="skeleton-block skeleton-btn" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && courses.length === 0 && (
        <div className="course-empty">
          <FaBookOpen />
          <p>New courses are being added — check back soon!</p>
        </div>
      )}

      {!loading && courses.length > 0 && (
        <div className="course-carousel">
          {canScrollPrev && (
            <button
              type="button"
              className="course-scroll-btn course-scroll-prev"
              onClick={() => scrollByCard(-1)}
              aria-label="Scroll to previous courses"
            >
              <FaChevronLeft />
            </button>
          )}

          <div className="course-container" ref={scrollerRef}>
            {courses.map((course) => (
              <div className="course-card" key={course.id}>
                <div className="course-card-media">
                  <img src={course.image_url} alt={course.title} />
                  {course.duration && (
                    <span className="course-duration-badge">
                      <FaClock /> {course.duration}
                    </span>
                  )}
                </div>

                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>

                  <div className="course-price-row">
                    <span className="course-price-label">Course Fee</span>
                    <span className="course-price-amount">{formatFee(course.fee)}</span>
                  </div>

                  <Link
                    to="/course-details"
                    className="course-btn"
                    state={{ course }}
                    onClick={() => handleViewDetails(course)}
                  >
                    View Details <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {canScrollNext && (
            <button
              type="button"
              className="course-scroll-btn course-scroll-next"
              onClick={() => scrollByCard(1)}
              aria-label="Scroll to next courses"
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default CourseCard;
