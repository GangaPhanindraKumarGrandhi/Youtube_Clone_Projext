import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Delete from "../Images/delete.png";
import Edit from "../Images/edit.png";
import axios from "axios";
import { toast } from "react-toastify";

function Videodetails(props) {
  const [imageLoading,setImageLoading] = useState(true)
  const [dotClickedVideoId, setDotClickedVideoId] = useState(null); // Tracks the dropdown state for a specific video
  const cardRef = useRef(null);

  // Handle edit navigation
  const handleEdit = () => {
    window.location.href = `/edit-video/${props.product._id}`;
  };

  // Handle video deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${props.product._id}`);
      toast.success("Video deleted successfully");
      window.location.reload(); // Refresh page to reflect deletion
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Convert raw view count string into formatted view counts (e.g., 1.5K, 2M)
  function formatViews(viewString) {
    if (!viewString) return "0";
    const cleaned = viewString.replace(/[^\d]/g, "");
    const num = Number(cleaned);
    if (isNaN(num)) return viewString;
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toString();
  }

  // Automatically close dropdown if card scrolls out of view
  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const isVisible = rect.top >= window.innerHeight * 0.5 && rect.bottom <= window.innerHeight;

      if (!isVisible && dotClickedVideoId === props.product._id) {
        setDotClickedVideoId(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dotClickedVideoId, props.product._id]);

  // Toggle the dropdown menu
  const handleDotClick = () => {
    setDotClickedVideoId(prev => (prev === props.product._id ? null : props.product._id));
  };

  const isDropdownOpen = dotClickedVideoId === props.product._id;

  return (
    <div className={`vCard ${props.varient}`} ref={cardRef}>
      <div className={`vimage ${props.varient}`}>
        <div className={`sampleimge ${props.varient}`}>
          <Link to={`/videos/${props.product._id}`}>
          {imageLoading && (
            <div style={{padding:"50px",textAlign:"center"}}>
              Loading...
            </div>
          )}
            <img
              src={props.product.thumbnailUrl}
              className={`samvideoImage ${props.varient}`}
              alt="thumbnail"
              onLoad={()=>setImageLoading(false)}
              onError={()=>setImageLoading(false)}
            />
          </Link>
        </div>

        <div className={`samdeatails ${props.varient}`}>
          {/* Channel logo */}
          <div className={`samcontainer ${props.varient}`}>
            <img
              src={props.product.channelLogo}
              className={`samlogo ${props.varient}`}
              alt="channel logo"
            />
          </div>

          {/* Video title and info */}
          <div className={`sampledetails ${props.varient}`}>
            <h4 className="truncated-multiline">{props.product.title}</h4>
            <p>{props.product.uploader}</p>
            <p>{formatViews(props.product.views)} views</p>
          </div>

          {/* Options menu for channel owner */}
          {props.channelbtn && (
            <div style={{ position: "relative" }}>
              <button 
                onClick={handleDotClick}
                className="channeldotbtn"
              >
                ⋮
              </button>

              {isDropdownOpen && (
                <div
                  className="channelupdatebtn"
                  style={{
                    position: "absolute",
                    top: "30px",
                    right: "0px",
                    background: "#fff",
                    padding: "8px",
                    borderRadius: "5px",
                    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                    zIndex: 10,
                  }}
                >
                  <button onClick={handleEdit}>
                    <img src={Edit} alt="edit" />Edit
                  </button>
                  <button onClick={handleDelete}>
                    <img src={Delete} alt="delete" />Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Videodetails;
