import React, { useState, useEffect } from "react";
import { X, ShieldBan, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../pages/Signin.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth); // Get token from Redux store
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isFormComplete, setIsFormComplete] = useState(false);

  // Redirect the user if they're already logged in
  useEffect(() => {
    if (token) {
      // If token exists, user is logged in, redirect them to home or dashboard
      navigate("/");
    }
  }, [token, navigate]); // Rerun if token or navigate changes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const isComplete =
      formData.email.trim() !== "" && formData.password.trim() !== "";
    setIsFormComplete(isComplete);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete) {
      dispatch(loginUser(formData))
        .unwrap()
        .then((res) => {
          console.log("✅ Login successful:", res); // This shows the API response (tokens, etc.)
          navigate("/"); // Redirect to home/dashboard
        })
        .catch((err) => {
          console.error("❌ Login failed:", err); // This shows the error if login fails
        });
    }
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal112">
        <button className="close-btn" onClick={() => navigate("/")}>
          <X size={24} />
        </button>

        <img src={logo} alt="Feed the Nation Logo" className="logo-img1" />
        <h2 className="wb">Welcome back!</h2>
        <p>Enter your email or phone number to login.</p>
        <small>
          <ShieldBan
            size={24}
            style={{ position: "relative", top: "5px", color: "black" }}
          />{" "}
          Your information is 100% secured
        </small>

        <form onSubmit={handleSubmit}>
          <input
            className="curved-input"
            type="text"
            name="email"
            placeholder="Email or Mobile Number"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-container">
            <input
              className="curved-input"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password12"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              {isPasswordVisible ? <EyeOff /> : <Eye />}
            </span>
          </div>

          <button
            type="submit"
            className="signup-btn1"
            disabled={!isFormComplete}
            style={{
              backgroundColor: isFormComplete ? "#008000" : "#DAF0C6",
            }}
          >
            Submit
          </button>
        </form>

        <Link to="/resetpassword">
          <p className="signin2">Forgot password?</p>
        </Link>
        <p className="signin3">
          Don't have an account?{" "}
          <span className="signup1">
            <Link to="/Signup">Sign up</Link>
          </span>
        </p>
        <p className="signin40">
          For further support, you may visit the Help Center or contact our
          support team.
        </p>
      </div>
    </div>
  );
};

export default Signin;