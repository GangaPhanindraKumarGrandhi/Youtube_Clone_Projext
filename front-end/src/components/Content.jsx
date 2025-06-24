import UseFetchVideos from "../hook/UseFetchVideos";
import Videodetails from "./Videodetails";

function Content({ searchTerm ,varient}) {
  const { videos, err } = UseFetchVideos();

  if (err) return <div>{err}</div>;
  if (!videos) return <div>Loading videos...</div>; // ⛑️ Prevents null.filter crash

  
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`v ${varient}`} >
      
      <div className={`videos ${varient}`} >
      {filteredVideos.map((video) => (
        <Videodetails key={video._id} product={video} varient={varient} />
      ))}
    </div>
    

    </div>
    
  );
}

export default Content;
