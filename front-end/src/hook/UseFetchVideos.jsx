import { useState, useEffect } from "react";
import axios from "axios";

function UseFetchVideos() {
  const [videos, setVideos] = useState(null);
  const [err, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/videos")
      .then((res) => setVideos(res.data)) // ✅ Only set the data, not the full response
      .catch((err) => setError(err));
  }, []);

  return { videos, err };
}

export default UseFetchVideos;
