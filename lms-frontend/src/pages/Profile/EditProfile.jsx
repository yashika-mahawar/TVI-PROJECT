import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import './EditProfile.css';

const EditProfile = () => {
  // 1. Initial state ab localStorage se aayegi
  const [formData, setFormData] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
  const user = JSON.parse(savedUser);

  return {
    name: user.full_name || "",
    email: user.email || "",
    phone: user.phone || "",
  };
}

return {
  name: "",
  email: "",
  phone: "",
};
  });
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.phone && (formData.phone.length !== 10 || isNaN(formData.phone))) {
      setMsg('Error: Phone number must be 10 digits!');
      return;
    }

    // 2. Save Changes karte hi localStorage update karo
const oldUser = JSON.parse(localStorage.getItem("user"));

const updatedUser = {
  ...oldUser,
  full_name: formData.name,
  email: formData.email,
  phone: formData.phone,
};

localStorage.setItem("user", JSON.stringify(updatedUser));
window.dispatchEvent(new Event("userUpdated"));
    setMsg('Profile Updated Successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <div className="edit-profile-heading">
        <h3>Edit Personal Information</h3>
        <p>Update your contact details below.</p>
      </div>

      <div className="edit-profile-input-group">
        <label>Full Name</label>
        <div className="edit-profile-input-wrap">
          <FaUser className="edit-profile-input-icon" />
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
      </div>

      <div className="edit-profile-input-group">
        <label>Email Address</label>
        <div className="edit-profile-input-wrap">
          <FaEnvelope className="edit-profile-input-icon" />
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>

      <div className="edit-profile-input-group">
        <label>Phone Number</label>
        <div className="edit-profile-input-wrap">
          <FaPhone className="edit-profile-input-icon" />
          <input
            type="text"
            value={formData.phone || ""}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>
      </div>

      {msg && (
        <p className={`edit-profile-msg ${msg.startsWith('Error') ? 'is-error' : 'is-success'}`}>
          {msg}
        </p>
      )}

      <button type="submit" className="edit-profile-save-btn">
        Save Changes
      </button>
    </form>
  );
};

export default EditProfile;
