import { useState, useEffect } from "react";
import axios from "axios";
// Custom hook to fetch all videos from the backend API
function UseFetchVideos() {
  const [videos, setVideos] = useState(null);
  const [err, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/videos")
      .then((res) => setVideos(res.data)) // Only set the data, not the full response
      .catch((err) => setError(err));
  }, []);
 // Return both the video list and any error encountered
  return { videos, err };
}

export default UseFetchVideos;
