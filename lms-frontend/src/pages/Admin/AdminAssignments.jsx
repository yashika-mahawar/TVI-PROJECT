import React, { useState, useEffect } from "react";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";
import API from "../../services/api";
import "./AdminDashboard.css";

const AdminAssignments = () => {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editAssignmentId, setEditAssignmentId] = useState(null);

  const [assignmentForm, setAssignmentForm] = useState({
    course_id: "",
    title: "",
    description: "",
    due_date: "",
  });

  useEffect(() => {
    fetchCourses();
    fetchAssignments();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");

      setCourses(res.data.courses);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAssignments = async () => {
  try {
    const res = await API.get("/assignments");

    setAssignments(res.data.data || []);

  } catch (err) {
    console.log(err);
    setAssignments([]);
  }
};

  const handleAddAssignment = async () => {
    try {
      await API.post(
  "/assignments",
  assignmentForm
);

      fetchAssignments();

      setShowModal(false);

      setAssignmentForm({
        course_id: "",
        title: "",
        description: "",
        due_date: "",
      });

    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (assignment) => {

    setEditAssignmentId(assignment.id);

    setAssignmentForm({
      course_id: assignment.course_id,
      title: assignment.title,
      description: assignment.description,
      due_date: assignment.due_date,
    });

  };

  const saveEdit = async () => {

    try {

      await API.put(
  `/assignments/${editAssignmentId}`,
  assignmentForm
);

      fetchAssignments();

      setEditAssignmentId(null);

    } catch (err) {
      console.log(err);
    }

  };

  const deleteAssignment = async (id) => {

    if (!window.confirm("Delete Assignment?")) return;

    try {

      await API.delete(
  `/assignments/${id}`
);

      fetchAssignments();

    } catch (err) {
      console.log(err);
    }

  };

const filteredAssignments = Array.isArray(assignments)
  ? assignments.filter((assignment) => {
      const search = searchTerm.toLowerCase();

      return (
        assignment.title?.toLowerCase().includes(search) ||
        assignment.description?.toLowerCase().includes(search) ||
        assignment.courses?.title?.toLowerCase().includes(search)
      );
    })
  : [];

  return (

    <div>

        <AdminHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search Assignments..."
        />

        <div className="header-box">

          <div>

            <h1>Manage Assignments</h1>

            <p>
              Total Assignments :
              <strong> {assignments.length}</strong>
            </p>

          </div>

          <button
            className="glow-btn"
            onClick={() => setShowModal(true)}
          >
            <FaPlus />
            &nbsp; Add Assignment
          </button>

        </div>
                <table className="course-table">

          <thead>
            <tr>
              <th>Course</th>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredAssignments.length === 0 ? (

              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Assignments Found
                </td>
              </tr>

            ) : (

              filteredAssignments.map((assignment) => (

                <tr key={assignment.id}>

  <td>
    {assignment.courses?.title || "N/A"}
  </td>


  <td>
    {editAssignmentId === assignment.id ? (

      <input
        value={assignmentForm.title}
        onChange={(e) =>
          setAssignmentForm({
            ...assignmentForm,
            title: e.target.value,
          })
        }
      />

    ) : (
      assignment.title
    )}
  </td>


  <td>
    {editAssignmentId === assignment.id ? (

      <input
        value={assignmentForm.description}
        onChange={(e) =>
          setAssignmentForm({
            ...assignmentForm,
            description: e.target.value,
          })
        }
      />

    ) : (
      assignment.description
    )}
  </td>


  <td>
    {editAssignmentId === assignment.id ? (

      <input
        type="date"
        value={assignmentForm.due_date}
        onChange={(e) =>
          setAssignmentForm({
            ...assignmentForm,
            due_date: e.target.value,
          })
        }
      />

    ) : (
      assignment.due_date
    )}
  </td>


  <td>

    <div
      className="actions"
      style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap:"12px"
      }}
    >

    {editAssignmentId === assignment.id ? (

      <>
        <button
          className="icon-btn"
          onClick={saveEdit}
        >
          <FaSave color="green"/>
        </button>


        <button
          className="icon-btn"
          onClick={() => setEditAssignmentId(null)}
        >
          <FaTimes color="gray"/>
        </button>
      </>

    ) : (

      <>

        <button
          className="icon-btn"
          onClick={() => startEdit(assignment)}
        >
          <FaEdit color="#4318ff"/>
        </button>


        <button
          className="icon-btn"
          onClick={() => deleteAssignment(assignment.id)}
        >
          <FaTrash color="red"/>
        </button>

      </>

    )}

    </div>

  </td>

</tr>

              ))

            )}

          </tbody>

        </table>

        {showModal && (

          <div className="modal-overlay">

            <div className="course-modal">

              <h2>Add Assignment</h2>

              <select
                value={assignmentForm.course_id}
                onChange={(e) =>
                  setAssignmentForm({
                    ...assignmentForm,
                    course_id: e.target.value,
                  })
                }
              >

                <option value="">
                  Select Course
                </option>

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
                placeholder="Assignment Title"
                value={assignmentForm.title}
                onChange={(e) =>
                  setAssignmentForm({
                    ...assignmentForm,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                rows="4"
                placeholder="Description"
                value={assignmentForm.description}
                onChange={(e) =>
                  setAssignmentForm({
                    ...assignmentForm,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="date"
                value={assignmentForm.due_date}
                onChange={(e) =>
                  setAssignmentForm({
                    ...assignmentForm,
                    due_date: e.target.value,
                  })
                }
              />

              <div className="modal-buttons">

                <button
                  className="glow-btn"
                  onClick={handleAddAssignment}
                >
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
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

export default AdminAssignments;