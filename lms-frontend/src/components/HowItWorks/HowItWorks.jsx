import "./HowItWorks.css";
import { FaSearch, FaUserPlus, FaLaptop, FaCertificate } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch />,
    title: "Pick a Course",
    desc: "Browse live and self-paced courses across tech, business and more.",
  },
  {
    icon: <FaUserPlus />,
    title: "Create Your Account",
    desc: "Sign up in under a minute and unlock your personal student dashboard.",
  },
  {
    icon: <FaLaptop />,
    title: "Attend & Learn",
    desc: "Join live classes, watch recorded lectures, and submit assignments.",
  },
  {
    icon: <FaCertificate />,
    title: "Get Certified",
    desc: "Complete the course and download your verified certificate instantly.",
  },
];

function HowItWorks() {
  return (
    <section className="how-section">
      <span className="eyebrow">How It Works</span>
      <h2 className="how-heading">Start Learning in 4 Simple Steps</h2>

      <div className="how-steps">
        {steps.map((s, idx) => (
          <div className="how-step" key={idx}>
            <div className="how-step-number">{String(idx + 1).padStart(2, "0")}</div>
            <div className="how-step-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
