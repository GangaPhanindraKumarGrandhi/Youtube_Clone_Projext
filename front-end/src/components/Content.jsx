import UseFetchVideos from "../hook/UseFetchVideos";
import Videodetails from "./Videodetails";
import { useOutletContext } from "react-router-dom";

function Content({category = "All" }) {
  const { videos, err } = UseFetchVideos();
  const {searchTerm,varient} = useOutletContext()

  if (err) return <div>{err}</div>;
  if (!videos) return <div>Loading videos...</div>;

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || video.category?.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`v ${varient}`}>
      <div className={`videos ${varient}`}>
        {filteredVideos.map((video) => (
          <Videodetails key={video._id} product={video} varient={varient} />
        ))}
      </div>
    </div>
  );
}

export default Content;
