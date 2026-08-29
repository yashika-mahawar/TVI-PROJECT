import React, { useState, useEffect, useRef } from "react";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { FaPlus, FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";
import API from "../../services/api";
import "./AdminDashboard.css";

const emptyForm = {
  name: "",
  designation: "",
  experience: "",
  contact: "",
  email: "",
  photo: "",
};

const ManageFaculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [facultyForm, setFacultyForm] = useState(emptyForm);
  const [reloadIndex, setReloadIndex] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await API.get("/faculty");
        setFacultyList(res.data.faculty || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, [reloadIndex]);

  const refetchFaculty = () => setReloadIndex((index) => index + 1);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFacultyForm((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const openAddModal = () => {
    setEditingId(null);
    setFacultyForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (faculty) => {
    setEditingId(faculty.id);
    setFacultyForm({
      name: faculty.name || "",
      designation: faculty.designation || "",
      experience: faculty.experience || "",
      contact: faculty.contact || "",
      email: faculty.email || "",
      photo: faculty.photo || "",
    });
    setShowModal(true);
  };

  const handleSaveFaculty = async () => {
    try {
      if (editingId) {
        await API.put(`/faculty/${editingId}`, facultyForm);
      } else {
        await API.post("/faculty", facultyForm);
      }

      setShowModal(false);
      setEditingId(null);
      setFacultyForm(emptyForm);
      refetchFaculty();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this faculty member?")) return;

    try {
      await API.delete(`/faculty/${id}`);
      refetchFaculty();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredFaculty = facultyList.filter((f) => {
    const search = searchTerm.toLowerCase();

    return (
      f.name?.toLowerCase().includes(search) ||
      f.designation?.toLowerCase().includes(search) ||
      f.email?.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <AdminHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="Search faculty..."
      />

      <div className="header-box">
        <div>
          <h1>Manage Faculty</h1>
          <p>
            Total Faculty: <strong>{facultyList.length}</strong>
          </p>
        </div>

        <button className="glow-btn" onClick={openAddModal}>
          <FaPlus />
          &nbsp; Add Faculty
        </button>
      </div>

      <table className="course-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Experience</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                Loading Faculty...
              </td>
            </tr>
          ) : filteredFaculty.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                No Faculty Found
              </td>
            </tr>
          ) : (
            filteredFaculty.map((f) => (
              <tr key={f.id}>
                <td>
                  {f.photo ? (
                    <img src={f.photo} alt={f.name} className="student-avatar" />
                  ) : (
                    <FaUserCircle size={40} color="#cbd5e1" />
                  )}
                </td>
                <td>{f.name}</td>
                <td>{f.designation}</td>
                <td>{f.experience}</td>
                <td>{f.contact}</td>
                <td>{f.email}</td>
                <td>
                  <div className="actions">
                    <button className="glow-btn edit" onClick={() => openEditModal(f)}>
                      <FaEdit />
                    </button>

                    <button className="glow-btn delete" onClick={() => handleDelete(f.id)}>
                      <FaTrash />
                    </button>
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
            <h2>{editingId ? "Edit Faculty" : "Add Faculty"}</h2>

            <div className="faculty-photo-upload">
              <div className="faculty-photo-preview">
                {facultyForm.photo ? (
                  <img src={facultyForm.photo} alt="Preview" />
                ) : (
                  <FaUserCircle size={70} color="#cbd5e1" />
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />

              <button
                type="button"
                className="glow-btn"
                onClick={() => fileInputRef.current.click()}
              >
                Upload Photo
              </button>
            </div>

            <input
              type="text"
              placeholder="Full Name"
              value={facultyForm.name}
              onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Designation (e.g. Professor)"
              value={facultyForm.designation}
              onChange={(e) => setFacultyForm({ ...facultyForm, designation: e.target.value })}
            />

            <input
              type="text"
              placeholder="Experience (e.g. 10+ Years)"
              value={facultyForm.experience}
              onChange={(e) => setFacultyForm({ ...facultyForm, experience: e.target.value })}
            />

            <input
              type="text"
              placeholder="Contact Number"
              value={facultyForm.contact}
              onChange={(e) => setFacultyForm({ ...facultyForm, contact: e.target.value })}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={facultyForm.email}
              onChange={(e) => setFacultyForm({ ...facultyForm, email: e.target.value })}
            />

            <div className="modal-buttons">
              <button className="glow-btn" onClick={handleSaveFaculty}>
                {editingId ? "Update" : "Save"}
              </button>

              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFaculty;
