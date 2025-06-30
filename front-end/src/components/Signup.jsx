// Signup.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [formData, setFormData] = useState({
    UserId: "",
    UserName: "",
    Email: "",
    Password: "",
    avtar: "",
  });

  const navigate = useNavigate();

  // Update form state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Password must be strong
  const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  // Handle registration form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPassword(formData.Password)) {
      alert(
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)."
      );
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/user/register", formData);
      toast.success("Registration completed! Please log in");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="video-form">
      <div className="videoFormData">
        <div className="videoHeading">
          <h2>Register</h2>
        </div>

        <div className="inputFields">
          <form onSubmit={handleSubmit}>
            <h4>UserId:</h4>
            <input
              type="text"
              name="UserId"
              placeholder="User ID"
              onChange={handleChange}
              required
            /><br />

            <h4>UserName:</h4>
            <input
              type="text"
              name="UserName"
              placeholder="Username"
              onChange={handleChange}
              required
            /><br />

            <h4>Email:</h4>
            <input
              type="email"
              name="Email"
              placeholder="Email"
              onChange={handleChange}
              required
            /><br />

            <h4>Password:</h4>
            <input
              type="password"
              name="Password"
              placeholder="Password"
              onChange={handleChange}
              required
            /><br />

            <h4>Avtar:</h4>
            <input
              type="text"
              name="avtar"
              placeholder="Avatar URL"
              onChange={handleChange}
            /><br />

            <div className="videoSubmitbtn">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
