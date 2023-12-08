import React from "react";
import { Link } from "react-router-dom";
import './NotFound.css'; 

const NotFound = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <div>
      <h2>Page Not Found</h2>
      <p>Sorry, but it seems you indicated the wrong path :(.</p>
      <p>
      <Link to={isAuthenticated ? "/Home" : "/Login"} style={{ color: "green" }}>
      {isAuthenticated ? "Go to Home" : "Go to Login"}
      </Link>

      </p>
    </div>
  );
};

export default NotFound;
