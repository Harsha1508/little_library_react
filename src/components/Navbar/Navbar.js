import React, { useState } from "react";
import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";
import logoImage from "../../assets/lllogo.jpeg";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import InputLabel from "@material-ui/core/InputLabel";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [value, setValue] = useState(sessionStorage.getItem("username") || "");
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove token and username from the sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");

    // update login status
    // navigate to login page
    navigate("/Login");
    window.location.reload();
  };
  const handleChange = (event) => {
    const val = event.target.value;

    if (val === "Logout") {
      handleLogout();
    } else {
      setValue(val);
    }
  };
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logoImage} alt="Little Library Logo" className="logo" />
      </div>

      <div className="nav-links">
        <Link to="/Home">Home</Link>
        <Link to="/Browse">Browse</Link>
        <Link to="/Account">Account</Link>
      </div>

      <div className="login">
        <FormControl className={classes.formControl}>
          <Select
            value={value}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={sessionStorage.getItem("username")}>
              <em>{sessionStorage.getItem("username")}</em>
            </MenuItem>
            <MenuItem value="Logout">Logout</MenuItem>
          </Select>
        </FormControl>
      </div>
    </nav>
  );
};

export default Navbar;
