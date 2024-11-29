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
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = () => {
    api
      .get("/api/user/info/")
      .then((res) => {
        console.log("Account Data:", res.data);
        setAccount(res.data);

        if (res.data.avatar) {
          setAvatarPreview(`${import.meta.env.VITE_API_URL}${res.data.avatar}`);
        } else {
          setAvatarPreview("https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg");
        }
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      // setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    if (!avatar) {
      setMessage("Please select an avatar.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    api
      .post("/api/user/upload-avatar/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Avatar updated successfully!");
          setAccount({ ...account, avatar: res.data.avatar });
          setAvatarPreview(`${import.meta.env.VITE_API_URL}${res.data.avatar}`);
        }
      })
      .catch((err) => {
        setMessage("Failed to update avatar.");
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
        <img src={avatarPreview} alt="Avatar" className="avatar-img" />

        {/* Avatar */}
        <div className="avatar-section">
          <h2>Change/Upload Avatar</h2>
          <form onSubmit={handleAvatarSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            {/* Disable the button until a file is selected */}
            <button type="submit" disabled={!avatar}>Upload Avatar</button>
          </form>
        </div>
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