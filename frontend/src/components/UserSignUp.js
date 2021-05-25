import React, { useState } from "react";
import axios from "axios";

function UserSignUp() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const singup = (event) => {
    event.preventDefault();
    axios.post("/user/signup", { user }).then((res) => console.log(res.data));
  };

  return (
    <div>
      <form action="" onSubmit={singup}>
        <input type="text" onChange={handleChange} name="name" />

        <input type="email" onChange={handleChange} name="email" />
        <input type="password" onChange={handleChange} name="password" />
        <button type="submit">signup</button>
      </form>
    </div>
  );
}

export default UserSignUp;
