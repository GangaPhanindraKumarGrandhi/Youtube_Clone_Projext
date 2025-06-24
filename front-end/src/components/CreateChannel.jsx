// components/CreateChannel.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateChannel() {
  const [form, setForm] = useState({
    channelName: "",
    description: "",
    channelBanner: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a channel.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/channel/create", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Channel created successfully!");
      console.log("Created channel:", res.data.channel);
      navigate("/"); // Or redirect to /channel/:id

    } catch (err) {
      console.error("Channel creation failed:", err);
      alert(err.response?.data?.message || "Failed to create channel.");
    }
  };

  return (
    <div className="loginContainer"> 
      <div className="loginPage">
      <h2>Create Channel</h2>
      <form onSubmit={handleSubmit}>
        <label>ChannelName:</label><br />
        <input
          type="text"
          name="channelName"
          onChange={handleChange}
          required
        /><br />
        <label>Description::</label><br />
        <input
          type="text"
          name="description"
          onChange={handleChange}
          required
        /><br />
        <label>ChannelBannerUrl:</label><br />
        <input
          type="text"
          name="channelBanner"
          onChange={handleChange}
          required
        /><br />
        <div className="registerbtn" style={{marginTop:"50px"}}>
          <button type="submit">Create Channel</button>

        </div>
        
      </form>
    </div>

    </div>
    
  );
}

export default CreateChannel;
