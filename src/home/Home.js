import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions";
import "./style.css";

const Home = ({ loggedInUser, logoutUser, setLoggedInUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5001/users");
        if (response.ok) {
          const users = await response.json();
          if (users.length > 0) {
            const currentUser = users[users.length - 1];
            setLoggedInUser(currentUser); 
          }
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [setLoggedInUser]);

  const formatTimestamp = (timestamp) => {
    if (timestamp && !isNaN(timestamp)) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } else {
      return "Invalid Date";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    logoutUser();
    navigate("/Login");
  };

  return (
    <div className="home-container">
      {loggedInUser && (
        <div className="home-info-container">
          <p className="home-greeting">Hello, {loggedInUser.email}!</p>
          <p className="home-info">Email: {loggedInUser.email}!</p>
          {loggedInUser.createdAt ? (
            <p className="home-info">
              Login Date: {formatTimestamp(loggedInUser.createdAt)}
            </p>
          ) : (
            <p className="home-info">Login Date: Not available</p>
          )}
        </div>
      )}

      <div className="home-links-container">
        <Link to="/Home" className="home-link">
          Home
        </Link>
        <Link to="/Notes" className="home-link">
          Notes
        </Link>
        <button className="home-link" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      {loggedInUser && (
        <Link to="/Notes" className="home">
          Go to Notes
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loggedInUser: state.loggedInUser,
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
