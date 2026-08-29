import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import './AdminDashboard.css';
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import axios from "axios";
import API from "../../services/api";
const ManageVideos = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;
  const [selectedCourse, setSelectedCourse] = useState("all");
const [videos, setVideos] = useState([]);
  const [edit, setEdit] = useState({ courseId: null, moduleIdx: null });
  const [tempUrl, setTempUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

const [editVideoId, setEditVideoId] = useState(null);

const [videoForm, setVideoForm] = useState({
  course_id: "",
  title: "",
  video_url: "",
  duration: "",
  module_number: "",
});
  useEffect(() => {
  fetchCourses();
  fetchVideos();
}, []);
useEffect(() => {
  setCurrentPage(1);
}, [selectedCourse, searchTerm]);
useEffect(() => {
  const search = searchTerm.trim().toLowerCase();

  if (!search) {
    setSelectedCourse("all");
    return;
  }

  const matchedCourse = courses.find((course) =>
    course.title.toLowerCase().includes(search)
  );

  if (matchedCourse) {
    setSelectedCourse(matchedCourse.id);
  }
}, [searchTerm, courses]);
const fetchCourses = async () => {
  try {
    const res = await API.get("/courses");
    setCourses(res.data.courses);
  } catch (err) {
    console.log(err);
  }
};

const fetchVideos = async () => {
  try {
    const res = await API.get("/videos");
    setVideos(res.data);
  } catch (err) {
    console.log(err);
  }
};
  const startEdit = (courseId, video) => {
  setEdit({
    courseId,
    moduleIdx: video.id,
  });

  setEditVideoId(video.id);

  setVideoForm({
    course_id: video.course_id,
    title: video.title,
    video_url: video.video_url,
    duration: video.duration,
    module_number: video.module_number,
  });
};
  const saveEdit = async () => {
  try {
    await API.put(
  `/videos/${editVideoId}`,
  videoForm
);

    fetchVideos();

    setEditVideoId(null);

    setEdit({
      courseId: null,
      moduleIdx: null,
    });

  } catch (err) {
    console.log(err);
  }
};
const deleteVideo = async (id) => {
  if (!window.confirm("Delete this video?")) return;

  try {
    await API.delete(`/videos/${id}`);

    fetchVideos();

  } catch (err) {
    console.log(err);
  }
};
const handleAddVideo = async () => {
  try {
    await API.post(
  "/videos",
  videoForm
);

    fetchVideos();

    setShowModal(false);

    setVideoForm({
      course_id: "",
      title: "",
      video_url: "",
      duration: "",
      module_number: "",
    });

  } catch (err) {
    console.log(err);
  }
};

const filteredVideos = videos.filter((video) => {
  const search = searchTerm.toLowerCase();

  // Is video ka course nikaalo
  const course = courses.find((c) => c.id === video.course_id);

  const matchCourse =
    selectedCourse === "all"
      ? true
      : video.course_id === selectedCourse;

  const matchSearch =
    video.title?.toLowerCase().includes(search) ||
    video.video_url?.toLowerCase().includes(search) ||
    String(video.duration || "").toLowerCase().includes(search) ||
    String(video.module_number).includes(search) ||
    course?.title?.toLowerCase().includes(search);

  return matchCourse && matchSearch;
});
const currentVideos = filteredVideos.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
  return (
    <div>
        <AdminHeader
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  placeholder="Search videos..."
/>
        <div className="header-box">
  <div>
    <h1>Manage Videos</h1>
    <p>
      Total Videos: <strong>{videos.length}</strong>
    </p>
  </div>

  <button
    className="glow-btn"
    onClick={() => setShowModal(true)}
  >
    <FaPlus />
    &nbsp; Add Video
  </button>
</div>
<div className="course-tabs">

  <button
    className={selectedCourse === "all" ? "active-tab" : ""}
    onClick={() => setSelectedCourse("all")}
  >
    All
  </button>

  {courses.map((course) => (
    <button
      key={course.id}
      className={selectedCourse === course.id ? "active-tab" : ""}
      onClick={() => setSelectedCourse(course.id)}
    >
      {course.title}
    </button>
  ))}

</div>
        <div
  style={{
    marginBottom: "40px",
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
  }}
>
  <table className="course-table">      
            
              <thead>
<tr>
  <th>Title</th>
  <th>Video URL</th>
  <th>Duration</th>
  <th>Module</th>
  <th>Actions</th>
</tr>
</thead>
<tbody>
  {currentVideos.length === 0 ? (
    <tr>
      <td colSpan="5">No videos found.</td>
    </tr>
  ) : (
    currentVideos.map((video) => (
      <tr key={video.id}>
        <td>
          {editVideoId === video.id ? (
            <input
              value={videoForm.title}
              onChange={(e) =>
                setVideoForm({
                  ...videoForm,
                  title: e.target.value,
                })
              }
            />
          ) : (
            video.title
          )}
        </td>

        <td>
          {editVideoId === video.id ? (
            <input
              value={videoForm.video_url}
              onChange={(e) =>
                setVideoForm({
                  ...videoForm,
                  video_url: e.target.value,
                })
              }
            />
          ) : (
            video.video_url
          )}
        </td>

        <td>
          {editVideoId === video.id ? (
            <input
              value={videoForm.duration}
              onChange={(e) =>
                setVideoForm({
                  ...videoForm,
                  duration: e.target.value,
                })
              }
            />
          ) : (
            video.duration
          )}
        </td>

        <td>
          {editVideoId === video.id ? (
            <input
              value={videoForm.module_number}
              onChange={(e) =>
                setVideoForm({
                  ...videoForm,
                  module_number: e.target.value,
                })
              }
            />
          ) : (
            video.module_number
          )}
        </td>

        <td>
          {editVideoId === video.id ? (
            <>
              <button className="icon-btn" onClick={saveEdit}>
                <FaSave color="green" />
              </button>

              <button
                className="icon-btn"
                onClick={() => {
                  setEditVideoId(null);
                  setEdit({
                    courseId: null,
                    moduleIdx: null,
                  });
                }}
              >
                <FaTimes color="gray" />
              </button>
            </>
          ) : (
            <>
              <button
                className="icon-btn"
                onClick={() => startEdit(video.course_id, video)}
              >
                <FaEdit color="#4318ff" />
              </button>

              <button
                className="icon-btn"
                onClick={() => deleteVideo(video.id)}
              >
                <FaTrash color="red" />
              </button>
            </>
          )}
        </td>
      </tr>
    ))
  )}
</tbody>
            </table>
            <div className="modern-pagination">
  <button
    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
    disabled={currentPage === 1}
  >
    ◀
  </button>

  <span className="page-info">
    Page {currentPage}
  </span>

  <button
    onClick={() =>
      setCurrentPage((p) =>
        p < Math.ceil(filteredVideos.length / itemsPerPage)
          ? p + 1
          : p
      )
    }
    disabled={
      currentPage >=
      Math.ceil(filteredVideos.length / itemsPerPage)
    }
  >
    ▶
  </button>
</div>
          </div>
        
        {showModal && (
  <div className="modal-overlay">
    <div className="course-modal">

      <h2>Add New Video</h2>

      <select
        value={videoForm.course_id}
        onChange={(e) =>
          setVideoForm({
            ...videoForm,
            course_id: e.target.value,
          })
        }
      >
        <option value="">Select Course</option>
{courses.map((course) => (
          <option
            key={course.id}
            value={course.id}
          >
            {course.title}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Video Title"
        value={videoForm.title}
        onChange={(e) =>
          setVideoForm({
            ...videoForm,
            title: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Video URL"
        value={videoForm.video_url}
        onChange={(e) =>
          setVideoForm({
            ...videoForm,
            video_url: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Duration"
        value={videoForm.duration}
        onChange={(e) =>
          setVideoForm({
            ...videoForm,
            duration: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Module Number"
        value={videoForm.module_number}
        onChange={(e) =>
          setVideoForm({
            ...videoForm,
            module_number: e.target.value,
          })
        }
      />

      <div className="modal-buttons">

        <button
          className="glow-btn"
          onClick={handleAddVideo}
        >
          Save
        </button>

        <button
          className="cancel-btn"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>

      </div>

    </div>
  </div>
)}
    </div>
  );
};

export default ManageVideos;