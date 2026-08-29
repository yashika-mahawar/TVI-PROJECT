import "./CertificationTeaser.css";
import { Link } from "react-router-dom";
import { FaCertificate, FaCheckCircle, FaShieldAlt } from "react-icons/fa";

function CertificationTeaser() {
  return (
    <section className="cert-teaser">
      <div className="cert-teaser-left">
        <span className="eyebrow eyebrow-light">Certification</span>
        <h2>A Certificate That Actually Counts</h2>
        <p>
          Every course on TVI Academy ends with an assessment. Pass it, and
          you get a uniquely numbered certificate that anyone — recruiters
          included — can verify online in seconds.
        </p>

        <ul className="cert-points">
          <li><FaCheckCircle /> Issued instantly on course completion</li>
          <li><FaCheckCircle /> Shareable on LinkedIn &amp; your resume</li>
          <li><FaCheckCircle /> Verifiable with a unique certificate ID</li>
        </ul>

        <Link to="/certification" className="btn-gradient">
          <FaShieldAlt /> Explore Certification
        </Link>
      </div>

      <div className="cert-teaser-right">
        <div className="cert-card">
          <div className="cert-card-header">
            <FaCertificate />
            <span>TVI Academy</span>
          </div>
          <p className="cert-card-label">Certificate of Completion</p>
          <h3 className="cert-card-name">Student Name</h3>
          <p className="cert-card-course">has successfully completed</p>
          <p className="cert-card-course-name">Full Stack Web Development</p>
          <div className="cert-card-footer">
            <span>ID: TVI-CERT-2026-00482</span>
            <span>Verified ✓</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CertificationTeaser;
