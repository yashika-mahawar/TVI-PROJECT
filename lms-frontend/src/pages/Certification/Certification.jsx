import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Certification.css";
import {
  FaCertificate,
  FaCheckCircle,
  FaShareAlt,
  FaSearch,
  FaFileSignature,
  FaLaptopCode,
  FaClipboardCheck,
  FaAward,
} from "react-icons/fa";

const reasons = [
  {
    icon: <FaShareAlt />,
    title: "Recruiter Ready",
    desc: "Add it straight to your resume or LinkedIn — each certificate links to a verifiable public page.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Skill Verified",
    desc: "Certificates are only issued after you clear graded assignments and a final assessment.",
  },
  {
    icon: <FaSearch />,
    title: "Instantly Verifiable",
    desc: "Every certificate carries a unique ID that anyone can check against our records.",
  },
];

const steps = [
  { icon: <FaFileSignature />, title: "Enroll in a Course", desc: "Choose any live or self-paced course from TVI Academy." },
  { icon: <FaLaptopCode />, title: "Complete the Curriculum", desc: "Attend lectures, submit assignments and track your progress." },
  { icon: <FaClipboardCheck />, title: "Clear the Assessment", desc: "Pass the final graded assessment for the course." },
  { icon: <FaAward />, title: "Receive Your Certificate", desc: "Your certificate is generated instantly with a unique verification ID." },
];

function Certification() {
  return (
    <>
      <Navbar />

      <section className="cert-hero">
        <span className="eyebrow eyebrow-light">Certification</span>
        <h1>Turn Learning Into a Certificate That Opens Doors</h1>
        <p>
          Every course on TVI Academy ends with a verified, shareable
          certificate — proof that you didn&apos;t just watch, you learned.
        </p>
      </section>

      <section className="cert-showcase">
        <div className="cert-showcase-card">
          <div className="cert-card-header">
            <FaCertificate />
            <span>TVI Academy</span>
          </div>
          <p className="cert-card-label">Certificate of Completion</p>
          <h3 className="cert-card-name">Student Name</h3>
          <p className="cert-card-course">has successfully completed</p>
          <p className="cert-card-course-name">Full Stack Web Development</p>
          <div className="cert-card-meta">
            <div>
              <span className="meta-label">Issued On</span>
              <span className="meta-value">12 Jul 2026</span>
            </div>
            <div>
              <span className="meta-label">Duration</span>
              <span className="meta-value">12 Weeks</span>
            </div>
          </div>
          <div className="cert-card-footer">
            <span>ID: TVI-CERT-2026-00482</span>
            <span>Verified ✓</span>
          </div>
        </div>

        <div className="cert-showcase-text">
          <h2>Why Our Certification Matters</h2>
          <div className="cert-reasons">
            {reasons.map((r, idx) => (
              <div className="cert-reason" key={idx}>
                <div className="cert-reason-icon">{r.icon}</div>
                <div>
                  <h4>{r.title}</h4>
                  <p>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cert-steps-section">
        <span className="eyebrow">The Process</span>
        <h2 className="cert-steps-heading">From Enrollment to Certificate</h2>

        <div className="cert-steps">
          {steps.map((s, idx) => (
            <div className="cert-step" key={idx}>
              <div className="cert-step-number">{String(idx + 1).padStart(2, "0")}</div>
              <div className="cert-step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cert-cta">
        <h2>Your Certificate Is One Course Away</h2>
        <p>Pick a course, show up, and let your certificate do the talking.</p>
        <a href="/#courses" className="btn-gradient">Browse Courses</a>
      </section>

      <Footer />
    </>
  );
}

export default Certification;
