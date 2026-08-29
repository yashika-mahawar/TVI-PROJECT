import "./Features.css";
import { FaVideo, FaCertificate, FaChalkboardTeacher, FaChartLine, FaClock, FaComments } from "react-icons/fa";

const features = [
  {
    icon: <FaVideo />,
    title: "Live & Recorded Lectures",
    desc: "Join live classes with faculty or learn at your own pace with HD recorded lectures, available anytime.",
  },
  {
    icon: <FaCertificate />,
    title: "Verified Certification",
    desc: "Earn a shareable, verifiable certificate for every course you complete — recognized by employers.",
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Expert Faculty",
    desc: "Learn from industry practitioners and experienced educators who bring real-world context to every topic.",
  },
  {
    icon: <FaChartLine />,
    title: "Progress Tracking",
    desc: "Track assignments, attendance and course completion from a single, easy-to-read student dashboard.",
  },
  {
    icon: <FaClock />,
    title: "Learn On Your Schedule",
    desc: "Flexible, self-paced modules mean you can learn around your job, college or family commitments.",
  },
  {
    icon: <FaComments />,
    title: "Doubt Support",
    desc: "Get your questions answered by faculty through live sessions and assignment feedback.",
  },
];

function Features() {
  return (
    <section className="features-section">
      <span className="eyebrow">Why TVI Academy</span>
      <h2 className="features-heading">Everything You Need to Learn &amp; Get Certified</h2>
      <p className="features-subheading">
        One platform for lectures, live classes, assignments and certification.
      </p>

      <div className="features-grid">
        {features.map((f, idx) => (
          <div className="feature-card" key={idx}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
