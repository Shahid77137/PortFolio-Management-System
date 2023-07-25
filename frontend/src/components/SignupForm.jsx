import React, { useState, useRef } from "react";
import { signup, login } from "../Utils/post";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from "./Loading";

const SignupForm = () => {
  let navigator=useNavigate()
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [role, setRole] = useState("");
  const [showSecretKey, setShowSecretKey] = useState(false);
  const username = useRef("");
  const lpass = useRef("");
  const firstName = useRef("");
  const lastName = useRef("");
  const email = useRef("");
  const password = useRef("");
  const bio = useRef("");
  const secret = useRef("");

  const HandleSubmitSignup = () => {

        console.log('dfhdfbc---',)
        // const signUpData = {
        //   username : username.current.value,
        //   lpass :  lpass.current.value,
        //   firstName :  firstName.current.value,
        //   lastName :  lastName.current.value,
        //   email :  email.current.value,
        //   password :  password.current.value,
        //   bio :  bio.current.value,
        //   secret :  secret.current.value,
        // }


        // console.log(signUpData);



  }

  const handleFormToggle = () => {
    setShowLoginForm((prevState) => !prevState);
  };

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
    setShowSecretKey(selectedRole === "ADMIN");
  };
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const HandleSubmitLogIn = async (event) => {
    event.preventDefault();
    const obj = {
      email: username.current.value,
      password: lpass.current.value,
    };
    const response = await login(obj);
    let message=""
    if (response==200){
      message="Logged In Successfully"
      toast.success(message)
      localStorage.setItem("email",username.current.value)
      
      navigator('/home')
      
      return
    }else if (response==403){
      message="You are Logged In from other Device"
    }else if(response==404){
      message="User with this email not found"
    }else{
      message="Wrong Credentials"
    }
    toast.warning(message)

  };

  return (
    <div>
      
      <div className="container">
        {loading ? <Loading /> : <></>}
        {showLoginForm ? (
          <form onSubmit={HandleSubmitLogIn}>
            <h2>Login</h2>
            <div class="form-group">
              <label for="login-email">Email</label>
              <input
                ref={username}
                type="email"
                id="login-email"
                name="login-email"
                required
              />
            </div>
            <div class="form-group">
              <label for="login-password">Password</label> <br />
              <input
                ref={lpass}
                type="password"
                id="login-password"
                name="login-password"
                required
              />
            </div>

            <div className="form-group">
              <button type="submit">Login</button>
            </div>
            <div className="switch-form">
              <p>
                New user?{" "}
                <button type="button" onClick={handleFormToggle}>
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={HandleSubmitSignup}>
            <h2>Sign Up</h2>
            <div className="form-group">
              <label htmlFor="signup-firstName">Name</label>
              <input
                ref={firstName}
                type="text"
                id="signup-firstName"
                name="signup-firstName"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-lastName">Name</label>
              <input
                ref={lastName}
                type="text"
                id="signup-lastName"
                name="signup-lastName"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email">Email</label>
              <input
                ref={email}
                type="email"
                id="signup-email"
                name="signup-email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                ref={password}
                type="password"
                id="signup-password"
                name="signup-password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-role">Role</label>
              <select
                id="signup-role"
                name="signup-role"
                value={role}
                onChange={handleRoleChange}
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="ADMIN">ADMIN</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            {showSecretKey && (
              <div className="form-group">
                <label htmlFor="signup-secret-key">Secret Key</label>
                <input
                  ref={secret}
                  type="password"
                  id="signup-secret-key"
                  name="signup-secret-key"
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="signup-bio">Bio</label>
              <textarea
                ref={bio}
                id="signup-bio"
                name="signup-bio"
                rows="4"
              ></textarea>
            </div>
            <div className="form-group">
              <button type="submit">Sign Up</button>
            </div>
            <div className="switch-form">
              <p>
                Already have an account?{" "}
                <button type="button" onClick={handleFormToggle}>
                  Login
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
