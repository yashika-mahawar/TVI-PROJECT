import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import API from '../../services/api';
import './FacultyCard.css';

const FacultyCard = () => {
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await API.get('/faculty');
        setFacultyList(res.data.faculty || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFaculty();
  }, []);

  if (facultyList.length === 0) return null;

  return (
    <section className="faculty-section">
      <h2 className="faculty-title">Meet Our Expert Faculty</h2>
      <div className="faculty-grid">
        {facultyList.map((f) => (
          <div key={f.id} className="faculty-card">
            <div className="faculty-card-photo">
              {f.photo ? (
                <img src={f.photo} alt={f.name} />
              ) : (
                <FaUserCircle size={70} color="#cbd5e1" />
              )}
            </div>
            <h3>{f.name}</h3>
            {f.designation && <p className="faculty-designation">{f.designation}</p>}
            {f.experience && <p><strong>Exp:</strong> {f.experience}</p>}
            {f.contact && <p><strong>Contact:</strong> {f.contact}</p>}
            {f.email && <p><strong>Email:</strong> {f.email}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FacultyCard;
