import "./CTASection.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-blob cta-blob1"></div>
      <div className="cta-blob cta-blob2"></div>

      <h2>Ready to Start Learning?</h2>
      <p>Join thousands of students already learning live and getting certified on TVI Academy.</p>

      <div className="cta-buttons">
        <Link to="/signup" className="cta-btn-white">
          Get Started Free <FaArrowRight />
        </Link>
        <Link to="/pricing" className="cta-btn-outline">
          View Pricing
        </Link>
      </div>
    </section>
  );
}

export default CTASection;
