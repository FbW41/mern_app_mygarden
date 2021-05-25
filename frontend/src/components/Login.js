import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const login = (event) => {
    event.preventDefault();
    axios.post("/user/login", { user }).then((res) => console.log(res.data));
  };

  return (
    <div>
      <form action="" onSubmit={login}>
        <input type="email" onChange={handleChange} name="email" />
        <input type="password" onChange={handleChange} name="password" />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default Login;
