import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function VideoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    thumbnailUrl: "",
    src: "",
    description: "",
    channelId: "",
    channelLogo: "",
    uploader: "",
    views: "",
    likes: "",
    dislikes: "",
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:5000/api/videos/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error("Error fetching video for edit:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/videos/${id}`, formData);
        alert("Video updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/videos", formData);
        alert("Video posted successfully");
      }
      navigate("/ChannelPage");
    } catch (err) {
      console.error("Error submitting video:", err);
    }
  };

  return (
    <div className="video-form">
      <div className="videoFormData">
        <div className="videoHeading">
            <h2>{isEdit ? "Edit Video" : "Add New Video"}</h2>
        </div>
        <div className="inputFields">
            <form onSubmit={handleSubmit}>
          <h4>Title:</h4>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />

          <h4>Category:</h4>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />

          <h4>Thumbnail URL:</h4>
          <input type="text" name="thumbnailUrl" value={formData.thumbnailUrl} onChange={handleChange} required />

          <h4>Video Source URL:</h4>
          <input type="text" name="src" value={formData.src} onChange={handleChange} required />

          <h4>Description:</h4>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />

          <h4>Channel ID:</h4>
          <input type="text" name="channelId" value={formData.channelId} onChange={handleChange} required />

          <h4>Channel Logo URL:</h4>
          <input type="text" name="channelLogo" value={formData.channelLogo} onChange={handleChange} required />

          <h4>Uploader Email:</h4>
          <input type="text" name="uploader" value={formData.uploader} onChange={handleChange} required />

          <h4>Views:</h4>
          <input type="number" name="views" value={formData.views} onChange={handleChange} required />

          <h4>Likes:</h4>
          <input type="number" name="likes" value={formData.likes} onChange={handleChange} required />

          <h4>Dislikes:</h4>
          <input type="number" name="dislikes" value={formData.dislikes} onChange={handleChange} required />
          <div className="videoSubmitbtn">
            <button type="submit">{isEdit ? "Update" : "Post"}</button>
          </div>
        </form>

        </div>
           
        
      </div>
    </div>
  );
}

export default VideoForm;
