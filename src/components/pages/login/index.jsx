import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login02, loginicon01, loginicon02, loginicon03, medscraftLogo } from "../../imagepath";
import { Eye, EyeOff } from "feather-icons-react/build/IconComponents";
import { authAPI } from "../../../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@medscraft.com");
  const [password, setPassword] = useState("Admin@123");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      const user = response.user;

      // Role-based redirect
      if (user.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (user.role === "DOCTOR") {
        navigate("/doctor-dashboard");
      } else if (user.role === "CLINIC_ADMIN") {
        navigate("/clinic-dashboard");
      } else if (user.role === "PATIENT") {
        navigate("/patient-dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setErrorMessage(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="container-fluid px-0">
          <div className="row">
            {/* Login banner */}
            <div className="col-lg-6 login-wrap">
              <div className="login-sec">
                <div className="log-img">
                  <img className="img-fluid" src={login02} alt="#" />
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
                      <h2>Login</h2>

                      {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                          {errorMessage}
                        </div>
                      )}

                      {/* Form */}
                      <form onSubmit={handleLogin}>
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
                            Password <span className="login-danger">*</span>
                          </label>
                          <input
                            type={passwordVisible ? "text" : "password"}
                            className="form-control pass-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
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
                        <div className="forgotpass">
                          <div className="remember-me">
                            <label className="custom_check mr-2 mb-0 d-inline-flex remember-me">
                              {" "}
                              Remember me
                              <input type="checkbox" name="remember" />
                              <span className="checkmark" />
                            </label>
                          </div>
                          <Link to="/forgotpassword">Forgot Password?</Link>
                        </div>
                        <div className="form-group login-btn">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block w-100"
                            disabled={isLoading}
                          >
                            {isLoading ? "Signing in..." : "Login"}
                          </button>
                        </div>
                      </form>

                      <div className="next-sign">
                        <p className="account-subtitle">
                          Need an account? <Link to="/signup">Sign Up</Link>
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
    </>
  );
};

export default Login;
