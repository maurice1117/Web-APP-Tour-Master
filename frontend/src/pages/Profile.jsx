import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Profile.css";

function Profile() {
  const [account, setAccount] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = () => {
    api
      .get("/api/user/info/")
      .then((res) => res.data)
      .then((data) => {
        setAccount(data);
      })
      .catch((err) => alert(err));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);

    api
      .post("/api/user/change-password/", { old_password: oldPassword, new_password: newPassword })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Password changed successfully!");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          setMessage("Failed to change password. Please check your inputs.");
        }
      })
      .catch((err) => {
        setMessage("Failed to change password. Please check your inputs.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (account === null) {
    return <div>Loading...</div>;
  }

  const formattedDate = new Date(account.date_joined).toLocaleDateString("zh-TW");

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>

      <div className="profile-details">
        <p><strong>ID:</strong> {account.id}</p>
        <p><strong>Email:</strong> {account.email}</p>
        <p><strong>Create Time:</strong> {formattedDate}</p>
      </div>

      <div className="password-change">
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isSubmitting}>Change Password</button>
        </form>
        {message && <p className={`message ${message.includes("successfully") ? 'success' : 'error'}`}>{message}</p>}
      </div>
    </div>
  );
}

export default Profile;
