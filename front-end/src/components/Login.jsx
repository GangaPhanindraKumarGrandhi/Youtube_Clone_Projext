import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link } from "react-router-dom"

function LoginUser() {
  const [userName,setUserName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Send login request
      const res = await axios.post("http://localhost:5000/api/user/login", {
        Email: email,
        Password: password,
      });

      const token = res.data.token;

      // Step 2: Store token
      localStorage.setItem("token", token);

      // Step 3: Use token to fetch profile
      const profileRes = await axios.get("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      const user = profileRes.data.user;
      localStorage.setItem("userName", user.UserName); // <-- Correct casing
      localStorage.setItem("userEmail", user.Email);

      console.log("✅ Logged in user profile:", profileRes.data.user);

      alert("Login successful!");
      navigate("/");

    } catch (err) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginPage">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username:</label><br/>
        <input
        type="name"
       
        required
        value={userName}
        onChange={(e)=>setUserName(e.target.value)}
        /><br/>
        <label>Email:</label><br/>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        <label>Password:</label><br/>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <div className="loginbtns">
          <button type="submit">Login</button>
          <p>Or</p>
          <Link to="/signup"><button>Register</button></Link>
        </div>
        
      </form>
    </div>

    </div>
    
  );
}

export default LoginUser;
