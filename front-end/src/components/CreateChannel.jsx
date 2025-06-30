// components/CreateChannel.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateChannel() {
  const [form, setForm] = useState({
    channelName: "",
    description: "",
    channelBanner: "",
  });

  const navigate = useNavigate();

  // Handles input field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      // Send POST request to create a new channel
      const res = await axios.post("http://localhost:5000/api/channel/create", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Channel created successfully!");
      console.log("Created channel:", res.data.channel);
      navigate("/"); // Redirect after creation
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
            <h4>Channel Name:</h4>
            <input
              type="text"
              name="channelName"
              onChange={handleChange}
              required
            />
            <br />

            <h4>Description:</h4>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              required
            />
            <br />

            <h4>Channel Banner URL:</h4>
            <input
              type="text"
              name="channelBanner"
              onChange={handleChange}
              required
            />
            <br />

            <div className="videoSubmitbtn">
              <button style={{ width: "150px" }} type="submit">
                Create Channel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateChannel;
