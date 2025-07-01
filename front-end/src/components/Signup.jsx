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

  // Update form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle avatar upload and convert to base64
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFormData((prev) => ({ ...prev, avtar: base64String }));
    };
    reader.readAsDataURL(file);
  };

  // Password validation
  const isValidPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPassword(formData.Password)) {
      alert(
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)."
      );
      return;
    }

    try {
      // Log the avatar (optional for debugging)
      console.log("Submitting avatar base64:", formData.avtar.slice(0, 50));

      await axios.post("http://localhost:5000/api/user/register", formData);
      toast.success("Registration completed! Please log in");
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err);

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
            />
            <br />

            <h4>UserName:</h4>
            <input
              type="text"
              name="UserName"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <br />

            <h4>Email:</h4>
            <input
              type="email"
              name="Email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <br />

            <h4>Password:</h4>
            <input
              type="password"
              name="Password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <br />

            <h4>Avatar:</h4>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
            <br />

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
