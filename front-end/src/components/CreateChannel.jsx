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
    <div className="video-form"> 
      <div className="videoFormData">
        <div className="videoHeading">
          <h2>Create Channel</h2>
        </div>
        <div className="inputFields">
          <form onSubmit={handleSubmit}>
        <h4>ChannelName:</h4>
        <input
          type="text"
          name="channelName"
          onChange={handleChange}
          required
        /><br />
    <h4>Description:</h4>
        <input
          type="text"
          name="description"
          onChange={handleChange}
          required
        /><br />
        <h4>ChannelBannerUrl:</h4>
        <input
          type="text"
          name="channelBanner"
          onChange={handleChange}
          required
        /><br />
        <div className="videoSubmitbtn"  >
          <button style={{width:"150px"}} type="submit">Create Channel</button>
        </div>
      </form>
        </div>
    </div>
    </div>
  );
}

export default CreateChannel;
