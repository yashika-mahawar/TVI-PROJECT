import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import './ChangePassword.css';

const ChangePassword = () => {
  const [pass, setPass] = useState({ old: '', new: '', confirm: '' });
  const [show, setShow] = useState({ old: false, new: false, confirm: false }); // Visibility state
  const [msg, setMsg] = useState('');

  const handleUpdate = () => {
    if (pass.new !== pass.confirm) { setMsg('Error: Passwords do not match!'); return; }
    if (pass.new.length < 6) { setMsg('Error: Password too short!'); return; }
    setMsg('Password Updated Successfully!');
  };

  return (
    <div className="change-password-form">
      <h3 className="change-password-heading">Security Settings</h3>

      {/* Old Password */}
      <div className="change-password-input-wrap">
        <FaLock className="change-password-input-icon" />
        <input
          type={show.old ? "text" : "password"}
          placeholder="Old Password"
          onChange={e => setPass({...pass, old: e.target.value})}
        />
        <span onClick={() => setShow({...show, old: !show.old})} className="change-password-toggle">
          {show.old ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* New Password & Confirm Password */}
      <div className="change-password-row">
        <div className="change-password-input-wrap">
          <FaLock className="change-password-input-icon" />
          <input
            type={show.new ? "text" : "password"}
            placeholder="New Password"
            onChange={e => setPass({...pass, new: e.target.value})}
          />
          <span onClick={() => setShow({...show, new: !show.new})} className="change-password-toggle">
            {show.new ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="change-password-input-wrap">
          <FaLock className="change-password-input-icon" />
          <input
            type={show.confirm ? "text" : "password"}
            placeholder="Confirm New Password"
            onChange={e => setPass({...pass, confirm: e.target.value})}
          />
          <span onClick={() => setShow({...show, confirm: !show.confirm})} className="change-password-toggle">
            {show.confirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      {msg && (
        <p className={`change-password-msg ${msg.startsWith('Error') ? 'is-error' : 'is-success'}`}>
          {msg}
        </p>
      )}

      <button onClick={handleUpdate} className="change-password-submit-btn">
        Update Password
      </button>
    </div>
  );
};

export default ChangePassword;
