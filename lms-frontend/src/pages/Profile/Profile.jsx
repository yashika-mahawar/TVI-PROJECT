import React, { useState, useRef, useEffect } from 'react';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import { FaUserCircle, FaShieldAlt, FaCamera } from 'react-icons/fa';
import axios from "axios";
import "./Profile.css";
const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

 const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");

  return savedUser
    ? JSON.parse(savedUser)
    : {
        full_name: "",
        email: "",
        phone: "",
        program: "",
        profile_image: "",
      };
});

  // IMPORTANT: Yeh useEffect ensure karega ki agar tumne
  // EditProfile se data change kiya, toh Profile page turant update ho jaye
  useEffect(() => {
  const handleStorageChange = () => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  handleStorageChange();

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener("userUpdated", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener("userUpdated", handleStorageChange);
  };
}, []);

  const fileInputRef = useRef(null);

  const handleImageChange = async (event) => {

  const file = event.target.files[0];

  if (!file) return;


  try {

    // temporary preview
    const reader = new FileReader();

    reader.onloadend = async () => {

      const imageUrl = reader.result;


      const updatedUser = {
        ...user,
        profile_image: imageUrl
      };


      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
      window.dispatchEvent(new Event("userUpdated"));

      // Save image URL in database
      await axios.put(
  `${import.meta.env.VITE_API_URL}/api/auth/update-profile/${user.id}`,
  {
    profile_image: imageUrl
  }
);

    };


    reader.readAsDataURL(file);


  } catch(error){

    console.log(
      "Image Upload Error:",
      error
    );

  }

};

  return (
    <div className="profile-page">
      <div className="profile-banner">
        <div className="profile-avatar-shell">
          <div className="profile-avatar">
            {user.profile_image ? (
              <img src={user.profile_image} alt="Profile" />
            ) : (
              <FaUserCircle size={130} color="#c7d2fe" />
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
            accept="image/*"
          />

              <button 
                onClick={() => fileInputRef.current.click()} 
                style={{ position: 'absolute', bottom: '5px', right: '5px', background: '#4f46e5', border: '2px solid #fff', borderRadius: '50%', padding: '10px', cursor: 'pointer', color: '#fff' }}
              >
                <FaCamera size={14} />
              </button>
            </div>
            
            <div>
              {/* Ab yahan wahi naam aayega jo tumne Signup ya EditProfile mein dala hai */}
              <h1 style={{ margin: '0', fontSize: '2.5rem', letterSpacing: '-0.02em' }}>{user.full_name || "User Name"}</h1>
              <p style={{ margin: '8px 0', fontSize: '1.1rem', opacity: '0.9' }}>{user.program} | ICFAI University</p>
            </div>
          </div>

      <div className="profile-card">
        <div className="profile-tabs">
          {['profile', 'password'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? "active" : ""}
            >
              {tab === 'profile' ? <><FaUserCircle /> My Profile</> : <><FaShieldAlt /> Security</>}
            </button>
          ))}
        </div>

        {activeTab === 'profile' ? (
          <EditProfile />
        ) : (
          <ChangePassword />
        )}
      </div>
    </div>
  );
};

export default Profile;
