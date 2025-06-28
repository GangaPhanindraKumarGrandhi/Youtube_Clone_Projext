import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Delete from "../Images/delete.png"
import Edit from "../Images/edit.png"

function Videodetails(props) {
  const [dotClickedVideoId, setDotClickedVideoId] = useState(null);
  const cardRef = useRef(null);

  function formatViews(viewString) {
    if (!viewString) return "0";
    const cleaned = viewString.replace(/[^\d]/g, "");
    const num = Number(cleaned);
    if (isNaN(num)) return viewString;
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return num.toString();
  }

  // Close dropdown if the card is scrolled out of view
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

  const handleDotClick = () => {
    if (dotClickedVideoId === props.product._id) {
      setDotClickedVideoId(null);
    } else {
      setDotClickedVideoId(props.product._id);
    }
  };

  const isDropdownOpen = dotClickedVideoId === props.product._id;

  return (
    <div className={`vCard ${props.varient}`} ref={cardRef}>
      <div className={`vimage ${props.varient}`}>
        <div className={`sampleimge ${props.varient}`}>
          <Link to={`/videos/${props.product._id}`}>
            <img
              src={props.product.thumbnailUrl}
              className={`samvideoImage ${props.varient}`}
              alt="thumbnail"
            />
          </Link>
        </div>

        <div className={`samdeatails ${props.varient}`}>
          <div className={`samcontainer ${props.varient}`}>
            <img
              src={props.product.channelLogo}
              className={`samlogo ${props.varient}`}
              alt="channel logo"
            />
          </div>

          <div className={`sampledetails ${props.varient}`}>
            <h4 className="truncated-multiline">{props.product.title}</h4>
            <p>{props.product.uploader}</p>
            <p>{formatViews(props.product.views)} views</p>
          </div>

          {props.channelbtn && (
            <div style={{ position: "relative" }}>
              <button
                onClick={handleDotClick}
                className="channeldotbtn"
              >
                ⋮
                {/* or use image: <img src={ThreeDotsIcon} alt="options" /> */}
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
                  {/* Replace below with Edit/Delete options */}
                  <button><img src={Edit} />Edit</button>
                  <button><img src={Delete} />Delete</button>
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
