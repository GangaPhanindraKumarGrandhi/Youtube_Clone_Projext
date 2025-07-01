import { useState,useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
function LoginUser() {
  const [userName, setUserName] = useState(""); // Local state for username input
  const [email, setEmail] = useState("");       // Local state for email input
  const [password, setPassword] = useState(""); // Local state for password input
  const navigate = useNavigate();
  const { fetchUserProfile } = useContext(UserContext);
  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Authenticate user and receive token
      const res = await axios.post("http://localhost:5000/api/user/login", {
        Email: email,
        Password: password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      await fetchUserProfile();

      // Step 2: Use token to fetch profile
      const profileRes = await axios.get("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      const user = profileRes.data.user; 

      console.log("Logged in user profile:", user);

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="video-form">
      <div className="videoFormData">
        <div className="videoHeading">
          <h2>Login</h2>
        </div>

        <div className="inputFields">
          <form onSubmit={handleLogin}>
            <h4>Username:</h4>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            /><br />

            <h4>Email:</h4>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br />

            <h4>Password:</h4>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br />

            <div className="loginbtns">
              <button type="submit">Login</button>
              <p>Or</p>
              <Link to="/signup">
                <button type="button">Register</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
