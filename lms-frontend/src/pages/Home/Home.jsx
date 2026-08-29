import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import CourseCard from "../../components/CourseCard/CourseCard";
import Features from "../../components/Features/Features";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import CertificationTeaser from "../../components/CertificationTeaser/CertificationTeaser";
import FacultyCard from "../../components/FacultyCard/FacultyCard";
import Testimonials from "../../components/Testimonials/Testimonials";
import CTASection from "../../components/CTASection/CTASection";
import Footer from "../../components/Footer/Footer";

function Home() {
  const location = useLocation();

  // Navbar links to sections here via router state (e.g. { scrollTo: "courses" })
  // instead of scrolling immediately, since sections below the fold (images,
  // fetched course/faculty cards) can still be laying out right after
  // navigation — poll briefly for the element instead of a blind timeout.
  useEffect(() => {
    const id = location.state?.scrollTo;
    if (!id) return;

    let attempts = 0;
    let timer;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (attempts < 20) {
        attempts += 1;
        timer = setTimeout(tryScroll, 100);
      }
    };

    tryScroll();
    return () => clearTimeout(timer);
  }, [location.state]);

  return (
    <>
      <Navbar />
      <Hero />
      <CourseCard />
      <Features />
      <HowItWorks />
      <CertificationTeaser />
      <div id="faculty">
        <FacultyCard />
      </div>
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  );
}

export default Home;
