import React, { useState, useMemo, useEffect } from 'react';
import { FaEdit, FaTrash, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './AdminDashboard.css';
import axios from "axios";
import API from "../../services/api";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
const ManageStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [students, setStudents] = useState([]);
const [loading, setLoading] = useState(true);
const fetchStudents = async () => {
  try {
    const response = await API.get(
  "/admin/students"
);

    setStudents(response.data.students);

  } catch (error) {
    console.log("Fetch Students Error:", error);
  } finally {
    setLoading(false);
  }
};
const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this student?"
  );

  if(!confirmDelete) return;

  try {

    await API.delete(
  `/admin/students/${id}`
);

    // refresh data
    fetchStudents();

  } catch(error){

    console.log("Delete Error:", error);

  }

};
useEffect(() => {
  fetchStudents();
}, []);
  const filtered = useMemo(() =>
  students.filter(s =>
    s.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.program?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.college_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.father_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  ),
[searchTerm, students]);

  const currentData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
<AdminHeader
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
/>
   <div className="glass-header">
          <h1>Student Directory</h1>
        </div>

        <div className="table-container">
          <table className="unique-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Course</th>
                <th>College</th>
                <th>Father's Name</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

{
 loading ? (
   <tr>
    <td colSpan="4">
      Loading Students...
    </td>
   </tr>
 )
 :
 currentData.length === 0 ? (
   <tr>
    <td colSpan="4">
      No Students Found
    </td>
   </tr>
 )
 :
 currentData.map((s)=>(
   <tr key={s.id}>
      <td>
        <div className="avatar-name">

    {
      s.profile_image ? (
        <img
          src={s.profile_image}
          alt={s.full_name}
          className="student-avatar"
        />
      )
      :
      (
        <span>
          {s.full_name?.[0]}
        </span>
      )
    }

    {s.full_name}

  </div>
      </td>

      <td>
        <span className="course-tag">
          {s.program}
        </span>
      </td>

      <td>{s.college_name || "—"}</td>
      <td>{s.father_name || "—"}</td>
      <td>{s.phone || "—"}</td>

      <td>
        <span className="status-dot active">
          Active
        </span>
      </td>

      <td>
  <div className="actions">
    <button className="glow-btn edit">
      <FaEdit />
    </button>

    <button
      className="glow-btn delete"
      onClick={() => handleDelete(s.id)}
    >
      <FaTrash />
    </button>
  </div>
</td>

   </tr>
 ))
}

</tbody>
          </table>
        </div>

        <div className="modern-pagination">
          <button onClick={() => setCurrentPage(p => Math.max(1, p-1))}><FaChevronLeft /></button>
          <span className="page-info">Page {currentPage}</span>
          <button onClick={() => setCurrentPage(p => p + 1)}><FaChevronRight /></button>
        </div>
    </div>
  );
};
export default ManageStudents;