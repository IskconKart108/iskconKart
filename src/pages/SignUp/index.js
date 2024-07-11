import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./style.css";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "", // Add name to formFields state
    email: "",
    password: "",
    confirmPassword: "", // Correct the field name
  });

  const navigate = useNavigate();

  // Uncomment and define the validateEmail function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const signUp = async (e) => {
    setShowLoader(true);
    e.preventDefault();

    if (!validateEmail(formFields.email)) {
      alert("Please enter a valid email address");
      setShowLoader(false);
      return;
    }

    if (formFields.password !== formFields.confirmPassword) {
      alert("Password must be same");
      setShowLoader(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://iskcon-kart-backend.vercel.app/api/register",
        {
          userName: formFields.name,
          userEmail: formFields.email,
          Password: formFields.password,
          ConfirmPassword: formFields.confirmPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.message === "User already registered")
        alert("User from this email id already exists");
      else console.log("new user registered");

      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setShowLoader(false);
    }
  };

  const onChangeField = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <section className="signIn mb-5">
        <div className="breadcrumbWrapper res-hide">
          <div className="container-fluid">
            <ul className="breadcrumb breadcrumb2 mb-0">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>SignUp</li>
            </ul>
          </div>
        </div>

        <div className="loginWrapper">
          <div className="card shadow">
            <Backdrop
              sx={{
                color: "#000",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={showLoader}
              className="formLoader"
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <h3>SignUp</h3>
            <form className="mt-4">
              <div className="form-group mb-4 w-100">
                <TextField
                  id="name"
                  type="text"
                  name="name"
                  label="Name"
                  className="w-100"
                  onChange={onChangeField}
                  value={formFields.name}
                />
              </div>
              <div className="form-group mb-4 w-100">
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  label="Email"
                  className="w-100"
                  onChange={onChangeField}
                  value={formFields.email}
                />
              </div>
              <div className="form-group mb-4 w-100">
                <div className="position-relative">
                  <TextField
                    id="password"
                    type={showPassword === false ? "password" : "text"}
                    name="password"
                    label="Password"
                    className="w-100"
                    onChange={onChangeField}
                    value={formFields.password}
                  />
                  <Button
                    className="icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword === false ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </Button>
                </div>
              </div>

              <div className="form-group mb-4 w-100">
                <div className="position-relative">
                  <TextField
                    id="confirmPassword"
                    type={showPassword1 === false ? "password" : "text"}
                    name="confirmPassword"
                    label="Confirm Password"
                    className="w-100"
                    onChange={onChangeField}
                    value={formFields.confirmPassword}
                  />
                  <Button
                    className="icon"
                    onClick={() => setShowPassword1(!showPassword1)}
                  >
                    {showPassword1 === false ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </Button>
                </div>
              </div>

              <div className="form-group mt-5 mb-4 w-100">
                <Button className="btn btn-g btn-lg w-100" onClick={signUp}>
                  Sign Up
                </Button>
              </div>

              <p className="text-center">
                Already have an account
                <b>
                  {" "}
                  <Link to="/signIn">Sign In</Link>
                </b>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
