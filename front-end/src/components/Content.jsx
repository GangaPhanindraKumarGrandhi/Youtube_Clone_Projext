import UseFetchVideos from "../hook/UseFetchVideos";
import Videodetails from "./Videodetails";
import { useOutletContext } from "react-router-dom";

function Content({ category = "All", channelbtn = false }) {
  const { videos, err } = UseFetchVideos(); // Custom hook to fetch videos
  const { searchTerm, varient } = useOutletContext(); // Context props from parent layout

  // Handle error during video fetch
  if (err) return <div>{err}</div>;

  // Show loading until videos are fetched
  if (!videos) return <div>Loading videos...</div>;

  // Filter videos by search term and category
  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === "All" || video.category?.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`v ${varient}`}>
      <div className={`videos ${varient}`}>
        {filteredVideos.map((video) => (
          <Videodetails
            key={video._id}
            product={video}
            varient={varient}
            channelbtn={channelbtn}
          />
        ))}
      </div>
    </div>
  );
}

export default Content;
