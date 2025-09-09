import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login-img.png";
import googleIcon from "../assets/googleIcon.svg";
import fbIcon from "../assets/fbIcon.svg";
import userIcon from "../assets/userIcon.svg";
import mailIcon from "../assets/mailIcon.svg";
import passwordIcon from "../assets/passwordIcon.svg";
import eyeIcon from "../assets/eyeIcon.svg";
import "../styles/Login.css";

function LoginPage({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (form.username !== "emilys") return "Username must be 'emilys'";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email format";
    if (form.password.length < 8)
      return "Password must be at least 8 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          expiresInMins: 30,
        }),
      });

      const data = await res.json();
      if (data.accessToken) {
        setIsAuthenticated(true);
        localStorage.setItem("authToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/home");
      } else {
        setError("Login failed!");
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };
  return (
    <div className="login-card">
      <div className="login-image">
        <img src={loginImage} alt="login banner" />
      </div>
      <div className="login-form">
        <h2>
          Welcome to <span>Unstop</span>
        </h2>
        <div className="social-login">
          <button type="button">
            <img
              src={googleIcon}
              alt="Google"
              style={{ width: "32px", height: "32px" }}
            />
            <span>Login with Google</span>
          </button>
          <button type="button">
            <img
              src={fbIcon}
              alt="Facebook"
              style={{ width: "32px", height: "32px" }}
            />
            <span style={{ width: "164px" }}>Login with Facebook</span>
          </button>
        </div>
        <div className="divider">
          <span>OR</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="formFieldsWrapper">
            <div className="formField">
              <div>
                <img src={userIcon} alt="username" className="fieldIcon" />
              </div>
              <div className="inputRightSide">
                <label htmlFor="username">User name</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="formField">
              <div>
                <img src={mailIcon} alt="email" className="fieldIcon" />
              </div>
              <div className="inputRightSide">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="formField passwordField">
              <div className="passwordLeftside">
                <div>
                  <img
                    src={passwordIcon}
                    alt="password"
                    className="fieldIcon"
                  />
                </div>
                <div className="passwordMidPart">
                  <label htmlFor="password">Password</label>
                  {showPassword ? (
                    <input
                      type="text"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  )}
                </div>
              </div>
              <div className="passwordRightside">
                <img
                  src={eyeIcon}
                  alt="eye icon"
                  className="fieldIcon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
          </div>
          {error && (
            <p className="error" style={{ color: "red", marginTop: "8px" }}>
              {error}
            </p>
          )}
          <div className="form-options">
            <div>
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <div className="forgetText">Forgot Password?</div>
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
        <p className="register-text">
          Don’t have an account? <span>Register</span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
