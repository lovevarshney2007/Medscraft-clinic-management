import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  login02,
  loginicon01,
  loginicon02,
  loginicon03,
  medscraftLogo,
} from "../../imagepath";
import { Eye, EyeOff } from "feather-icons-react/build/IconComponents";
import { authAPI } from "../../../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!passwordVisible1);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await authAPI.register({
        name,
        email,
        password,
        role,
      });

      // Redirect to login or appropriate dashboard
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setErrorMessage(err.message || "Failed to register account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="main-wrapper login-body">
        <div className="container-fluid px-0">
          <div className="row">
            {/* Login logo */}
            <div className="col-lg-6 login-wrap">
              <div className="login-sec">
                <div className="log-img">
                  <img className="img-fluid" src={login02} alt="Logo" />
                </div>
              </div>
            </div>

            {/* Login Content */}
            <div className="col-lg-6 login-wrap-bg">
              <div className="login-wrapper">
                <div className="loginbox">
                  <div className="login-right">
                    <div className="login-right-wrap">
                      <div className="account-logo">
                        <Link to="/" className="logo">
                          <img src={medscraftLogo} width={40} height={40} alt="" />{" "}
                          <span style={{ width: "100px", height: "25px" }}>Medscraft</span>
                        </Link>
                      </div>
                      <h2>Getting Started</h2>

                      {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                          {errorMessage}
                        </div>
                      )}

                      {/* Form */}
                      <form onSubmit={handleSignup}>
                        <div className="form-group">
                          <label>
                            Full Name <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>
                            Email <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>
                            Account Role <span className="login-danger">*</span>
                          </label>
                          <select
                            className="form-control"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          >
                            <option value="PATIENT">Patient</option>
                            <option value="DOCTOR">Doctor</option>
                            <option value="CLINIC_ADMIN">Clinic Administrator</option>
                            <option value="STAFF">Medical Staff</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>
                            Password <span className="login-danger">*</span>
                          </label>
                          <input
                            type={passwordVisible ? "text" : "password"}
                            className="form-control pass-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                          />
                          <span
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                            style={{ cursor: "pointer" }}
                          >
                            {passwordVisible ? (
                              <EyeOff className="react-feather-custom" />
                            ) : (
                              <Eye className="react-feather-custom" />
                            )}
                          </span>
                        </div>
                        <div className="form-group">
                          <label>
                            Confirm Password <span className="login-danger">*</span>
                          </label>
                          <input
                            type={passwordVisible1 ? "text" : "password"}
                            className="form-control pass-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                          />
                          <span
                            className="toggle-password"
                            onClick={togglePasswordVisibility1}
                            style={{ cursor: "pointer" }}
                          >
                            {passwordVisible1 ? (
                              <EyeOff className="react-feather-custom" />
                            ) : (
                              <Eye className="react-feather-custom" />
                            )}
                          </span>
                        </div>
                        <div className="form-group login-btn">
                          <button
                            className="btn btn-primary btn-block w-100"
                            type="submit"
                            disabled={isLoading}
                          >
                            {isLoading ? "Creating Account..." : "Sign up"}
                          </button>
                        </div>
                      </form>

                      <div className="next-sign">
                        <p className="account-subtitle">
                          Already have an account? <Link to="/login">Login</Link>
                        </p>
                        <div className="social-login">
                          <Link to="#">
                            <img src={loginicon01} alt="#" />
                          </Link>
                          <Link to="#">
                            <img src={loginicon02} alt="#" />
                          </Link>
                          <Link to="#">
                            <img src={loginicon03} alt="#" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Login Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
