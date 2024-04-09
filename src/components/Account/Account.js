import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Account.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";

const Account = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const activeUsername = sessionStorage.getItem("username");
        const response = await axios.post(
          "http://localhost:4000/user/updateprofile",
          { username: activeUsername }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:4000/user/updateprofile", user);
      setOpenAlert(true); // Open the success alert dialog
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Close the dialog
  const handleClose = () => {
    setOpenAlert(false);
    window.location.reload();
  };

  return (
    <div className="account-container">
      <h1 className="account-header">Account Settings</h1>
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            className="input"
            disabled
          />
        </div>
        <div className="form-field">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="input"
            disabled
          />
        </div>
        <div className="form-field">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <button type="submit" className="submit-button">
          Update Profile
        </button>
      </form>

      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Profile updated successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Account;
