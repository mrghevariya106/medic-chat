import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

// import signinImage from "../assets/signup.jpg";
import signinImage from "../assets/MedicChatLogo.png";

const initialize = {
  fullName: "",
  userName: "",
  password: "",
  avatarURL: "",
  confirmPassword: "",
  phoneNumber: "",
};

const cookies = new Cookies();

const Auth = () => {
  const [form, setForm] = useState(initialize);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, userName, password, avatarURL, phoneNumber } = form;

    const URL = "http://localhost:5000/auth";

    const { data: { token, userId, hashedPassword }} = await axios.post(`${URL}/${isSignUp ? 'signup' : 'login'}`, {
      userName,password,avatarURL,phoneNumber,fullName
    });

    cookies.set("userName", userName);
    cookies.set("userId", userId);
    cookies.set("fullName", fullName);
    cookies.set("token", token);

    if (isSignUp) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarURL", avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }

    window.location.reload();
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignUp ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <lable htmlFor="fullName">Full Name</lable>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <lable htmlFor="userName">User Name</lable>
              <input
                name="userName"
                type="text"
                placeholder="User Name"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <lable htmlFor="phoneNumber">Phone Number</lable>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <lable htmlFor="avatarURL">Avatar URL</lable>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <lable htmlFor="password">Password</lable>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <lable htmlFor="confirmPassword">Confirm Password</lable>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignUp ? "Sign Up" : "Sign in"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignUp
                ? "Already have an acciount?"
                : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignUp ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="sign in" />
      </div>
    </div>
  );
};

export default Auth;
