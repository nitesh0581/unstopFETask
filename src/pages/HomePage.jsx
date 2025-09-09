import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { useState } from "react";
import userImage from "../assets/userImage.png";

function HomePage({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    console.log("logged out");
    navigate("/auth/login");
  };

  return (
    <div className="home-container">
      {user ? (
        <>
          <h2>
            Welcome to <span>Unstop</span>
          </h2>

          <div className="user-card">
            <img
              src={userImage || user.image}
              alt="profile"
              className="user-avatar"
            />
            <div className="user-Name">
              <h3>{user.firstName + " " + user.lastName}</h3>
              <div className="userInfo">
                <p>{user.email}</p>
                <p>{user.gender}</p>
              </div>
            </div>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <div>Loading user details...</div>
      )}
    </div>
  );
}

export default HomePage;
