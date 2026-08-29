import "./Testimonials.css";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Full Stack Web Development",
    quote:
      "The live classes and instant doubt support made all the difference. I finished my certificate while working a full-time job.",
  },
  {
    name: "Rohit Verma",
    role: "Data Analytics",
    quote:
      "Clean dashboard, real assignments, and faculty who actually reply. It doesn't feel like a typical recorded-video course.",
  },
  {
    name: "Priya Nair",
    role: "Digital Marketing",
    quote:
      "I added my TVI Academy certificate to my resume and got two interview calls the same week. Genuinely worth it.",
  },
];

function Testimonials() {
  return (
    <section className="testimonials-section">
      <span className="eyebrow">Student Stories</span>
      <h2 className="testimonials-heading">Loved by Learners Everywhere</h2>

      <div className="testimonials-grid">
        {testimonials.map((t, idx) => (
          <div className="testimonial-card" key={idx}>
            <FaQuoteLeft className="quote-icon" />
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => <FaStar key={i} />)}
            </div>
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.name.charAt(0)}</div>
              <div>
                <h4>{t.name}</h4>
                <span>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
