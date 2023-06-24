import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../UserContext";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(userContext);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
        credentials: "include",
      });
      if (response.status === 200) {
        alert("Login successful");
        response.json().then((data) => {
          setUserInfo(data);
          setRedirect(true);
        });
      } else {
        alert("Login failed, Try again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <form className="login" onSubmit={login}>
        <h1>Login page</h1>
        <input
          type="text"
          placeholder="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
