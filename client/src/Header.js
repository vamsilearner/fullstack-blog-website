import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "./UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(userContext);

  useEffect(() => {
    try {
      fetch("http://localhost:4000/profile",
       {
        credentials: "include",
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            console.log(data);
            setUserInfo(data);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  const userName = userInfo ? userInfo.username : null;

  return (
    <div>
      <header>
        <Link to="" className="logo">
          My Blog
        </Link>
        <nav>
          {userName ? (
            <>
              <Link to="/create">Create New Post</Link>
              <a onClick={logout}>Logout</a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
