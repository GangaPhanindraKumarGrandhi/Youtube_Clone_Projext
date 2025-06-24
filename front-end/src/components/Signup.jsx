// Signup.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    UserId: "",
    UserName: "",
    Email: "",
    Password: "",
    avtar: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // 🔐 Password Validator
  const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPassword(formData.Password)) {
      alert("Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*).");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/user/register", formData);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="loginContainer">
       <div className="loginPage">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>UserId:</label><br />
        <input type="text" name="UserId" placeholder="User ID" onChange={handleChange} required /><br />
        <label >UserName:</label><br />
        <input type="text" name="UserName" placeholder="Username" onChange={handleChange} required /><br />
        <label >Email:</label><br />
        <input type="email" name="Email" placeholder="Email" onChange={handleChange} required /><br />
        <label >Password:</label><br />
        <input type="password" name="Password" placeholder="Password" onChange={handleChange} required /><br />
        <label >Avtar:</label><br />
        <input type="text" name="avtar" placeholder="Avatar URL" onChange={handleChange} /><br />
          <div className="registerbtn">
            <button type="submit">Register</button>
            </div>
        
      </form>
    </div>

    </div>
   
  );
}

export default Signup;
