import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { FaPlayCircle, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import "./Learning.css";
import { supabase } from "../../config/supabase.js";
import axios from "axios";
import API from "../../services/api";
const Learning = () => {
  console.log("Learning Component Render ho raha hai!");
  const { id } = useParams();
  const [modules, setModules] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0); // <--- YE MISSING THA
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({
  totalVideos: 0,
  completedVideos: 0,
  progress: 0,
  completedIds: [],
});
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      console.log("ID from URL:", id); // Check: kya yahan ID print ho rahi hai?

      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .eq("course_id", id)
        .order("module_number", { ascending: true }); // Sequence ke liye ye zaroori hai

      if (error) {
        console.error("Supabase Error:", error);
      } else {
        console.log("Data aaya:", data); // Check: kya yahan data array aa raha hai?
        setModules(data || []);
      }
      setLoading(false);
    };

    fetchVideos();
  }, [id]);

  useEffect(() => {
    const savedModule = localStorage.getItem(`lastModule_${id}`);
    if (savedModule !== null) {
      setActiveIdx(parseInt(savedModule));
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`lastModule_${id}`, activeIdx);
  }, [activeIdx, id]);
  
  useEffect(() => {
  const fetchProgress = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !id) return;

    try {
      const response = await API.get(`/api/progress/${id}/${user.id}`);

     const result = response.data;
      if (result.success) {
        setProgress(result);
      }
    } catch (err) {
      console.error("Progress Error:", err);
    }
  };

  fetchProgress();
}, [id]);

  const handleVideoEnd = async () => {
  // Purana code hatao aur ye use karo
  const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  alert("Please login first!");
  return;
}// Yahan se user sahi milega
  
  // Ab tumhara payload sahi jayega
  const payload = {
    user_id: user.id,
    video_id: currentModule.id,
        is_completed: true,
  };

  console.log("SENDING DATA:", payload);

  try {
    const response = await API.post("/progress/update", payload);
    const result = response.data;
    console.log("SERVER RESPONSE:", result);
    const progressResponse = await API.get(
  `/api/progress/${id}/${user.id}`
);
const progressData = progressResponse.data;
if (progressData.success) {
  setProgress(progressData);
}
if (activeIdx < modules.length - 1) {
  setActiveIdx((prev) => prev + 1);
} else {
  alert("🎉 Course Completed!");
}
  } catch (err) {
    console.error("FETCH ERROR:", err);
  }
};

  if (loading) return <div>Loading course content...</div>;
  if (!modules || modules.length === 0)
    return <div>No videos found for this course.</div>;

  const currentModule = modules[activeIdx];

  if (!currentModule) return <div>Loading or No Data Available...</div>;
const getEmbedUrl = (url) => {
  const videoId = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&]+)/
  )?.[1];

  return videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}`
    : "";
};
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      <aside
        style={{
          width: "260px",
          minWidth: "260px",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <Sidebar />
      </aside>

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <main
          style={{
            padding: "32px",
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Link
            to="/my-courses"
            style={{
              color: "#4f46e5",
              textDecoration: "none",
              fontWeight: "600",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaArrowLeft /> Back to Courses
          </Link>
           
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "28px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div className="video-container">
                <div className="player-wrapper">
                  <iframe
  src={`${getEmbedUrl(currentModule.video_url)}?rel=0`}
  width="100%"
  height="100%"
  title="Course Video"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h2 style={{ margin: 0 }}>{currentModule.title}</h2>
                <button
                  onClick={handleVideoEnd}
                  style={{
                    marginTop: "20px",
                    padding: "12px 24px",
                    backgroundColor: "#4f46e5",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    width: "100%",
                  }}
                >
                  Mark as Completed & Next
                </button>
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                padding: "20px",
                height: "fit-content",
              }}
            >
              <h3 style={{ margin: "0 0 16px 0" }}>Course Syllabus</h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {modules.map((module, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    style={{
                      padding: "12px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      background: activeIdx === idx ? "#f5f3ff" : "#fff",
                      border:
                        activeIdx === idx
                          ? "1px solid #4f46e5"
                          : "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {progress.completedIds.includes(module.id) ? (
  <FaCheckCircle color="#22c55e" />
) : activeIdx === idx ? (
  <FaPlayCircle color="#4f46e5" />
) : (
  <FaPlayCircle color="#94a3b8" />
)}
                    <span style={{ fontSize: "0.85rem", fontWeight: "500" }}>
                      {module.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Learning;
