import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleImg from "../../assets/images/google.png";
import "./style.css";
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider , signInWithPopup } from "firebase/auth";
// import { app } from '../../firebase';
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import { useContext } from "react";

import { MyContext } from "../../App";

// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });

  const context = useContext(MyContext);

  const navigate = useNavigate();

  // Uncomment and define the validateEmail function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const onChangeField = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormFields(() => ({
      ...formFields,
      [name]: value,
    }));
  };

  // const signIn = () => {
  // setShowLoader(true);
  // signInWithEmailAndPassword(auth, formFields.email, formFields.password)
  //     .then((userCredential) => {
  //         // Signed in
  //         const user = userCredential.user;
  //         setShowLoader(false);
  //         setFormFields({
  //             email: '',
  //             password: '',
  //         });

  //         localStorage.setItem('isLogin',true);
  //         context.signIn();

  //         history('/');

  //         // ...
  //     })
  //     .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //     });

  // }

  async function signIn(e) {
    setShowLoader(true);
    e.preventDefault();
    if (!validateEmail(formFields.email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.post(
        "https://iskcon-kart-backend.vercel.app/api/login",
        {
          userEmail: formFields.email,
          Password: formFields.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data === "verify your mail first") {
        alert("Verify your Email first");
        navigate("/login");
      } else if (response.data !== "invalid in signin") {
        Cookies.set("token", response.data);
        navigate("/");
      } else {
        // setEmaill("");
        // setPasswordl("");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error occurred while making the request:", error.message);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  }

  const signInWithGoogle = () => {
    setShowLoader(true);
    // signInWithPopup(auth, googleProvider)
    // .then((result) => {

    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;
    //   // The signed-in user info.
    //   const user = result.user;

    //   setShowLoader(false);

    //   localStorage.setItem('isLogin',true);
    //   context.signIn();

    //   history('/');

    // }).catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   // ...
    // });
  };

  return (
    <>
      <section className="signIn mb-5">
        <div class="breadcrumbWrapper">
          <div class="container-fluid">
            <ul class="breadcrumb breadcrumb2 mb-0">
              <li>
                <Link to="/">Home</Link>{" "}
              </li>
              <li>Sign In</li>
            </ul>
          </div>
        </div>

        <div className="loginWrapper">
          <div className="card shadow">
            <Backdrop
              sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={showLoader}
              className="formLoader"
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <h3>Sign In</h3>
            <form className="mt-4">
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

              <div className="form-group mt-5 mb-4 w-100">
                <Button className="btn btn-g btn-lg w-100" onClick={signIn}>
                  Sign In
                </Button>
              </div>

              <div className="form-group mt-5 mb-4 w-100 signInOr">
                <p className="text-center">OR</p>
                <Button
                  className="w-100"
                  variant="outlined"
                  onClick={signInWithGoogle}
                >
                  <img src={GoogleImg} />
                  Sign In with Google
                </Button>
              </div>

              <p className="text-center">
                Not have an account
                <b>
                  {" "}
                  <Link to="/signup">Sign Up</Link>
                </b>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
