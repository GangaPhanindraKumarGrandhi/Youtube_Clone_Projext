import { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import Like from "../Images/like.png"
import Dislike from "../Images/dislike.png"
import Save from "../Images/save.png"
import Delete from "../Images/delete.png"
import Edit from "../Images/edit.png"
import Upload from "../Images/upload.png"
import Share from "../Images/share.png"
import Download from "../Images/download.png"
import ThreeDots from "../Images/threedots.png"
import Bell from "../Images/bell.png"
import Content from "./Content";
import { toast } from "react-toastify";

function VideoPlay() {
  const {user} = useContext(UserContext)
  const [iframeLoading,setIframeLoafing] = useState(true)
  const [newComment, setNewComment] = useState("");
  const [dotClickedCommentId, setDotClickedCommentId] = useState(null); // Track which comment dropdown is open

  const [editingCommentId, setEditingCommentId] = useState(null); // Track which comment is being edited
  const [editedText, setEditedText] = useState(""); // Hold edited text input

  const { id } = useParams(); // Get video ID from URL
  const [video, setVideo] = useState(null); // Store video data
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true); // Loading state

  const username = user?.UserName

  const [showAllComments, setShowAllComments] = useState(false); // For mobile toggle
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000); // Detect mobile layout

  // Responsive handler for mobile view detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add a new comment
  const handleAddComment = async () => {
    if (!username) {
      toast.warn("Please Login to Add a Comment");
      return;
    }

    if (!newComment.trim()) return;

    try {
      const res = await axios.post(`http://localhost:5000/api/videos/${id}/comments`, {
        text: newComment,
        userId: `@${username}` 
      });

      setVideo(prev => ({ ...prev, comments: [...prev.comments, res.data] }));
      setNewComment("");
      toast.success("Comment added Successfully");
    } catch (err) {
      console.error("Error adding comment", err.message);
    }
  };

  // Edit an existing comment
  const handleEditComment = async (commentId) => {
    if (!username) {
      toast.warn("Please Login to edit Comment");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/api/videos/${id}/comments/${commentId}`, {
        text: editedText,
      });

      setVideo(prev => ({
        ...prev,
        comments: prev.comments.map(c => c.commentId === commentId ? res.data : c)
      }));

      setEditingCommentId(null);
      setEditedText("");
    } catch (err) {
      console.error("Error updating comment", err.message);
    }
  };

  // Delete a comment
  const handleDeleteComment = async (commentId) => {
    if (!username) {
      toast.warn("Please login to Delete a Comment");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}/comments/${commentId}`);
      setVideo(prev => ({
        ...prev,
        comments: prev.comments.filter(c => c.commentId !== commentId)
      }));
      toast.success("Comment deleted successfully");
    } catch (err) {
      console.error("Error deleting comment", err.message);
    }
  };

  // Fetch video data on load
  useEffect(() => {
    axios.get(`http://localhost:5000/api/videos/${id}`)
      .then((res) => {
        setVideo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Loading or error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error: ${error}`}</div>;
  if (!video) return <div>No video data found.</div>;

  return (
    <>
      <div className="playPage">
        <div className="videoInformation">
          {/* Video Player */}
          {iframeLoading && (
            <div style={{position:"absolute",padding:"50px",textAlign:"center"}}>
              Loading...
            </div>
          )}
          <iframe 
            className="iframeVideo"
            src={video.src}
            title={video.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            onLoad={()=>setIframeLoafing(false)}
            style={{visibility: iframeLoading ? "hidden":"visible"}}
          ></iframe>

          {/* Video Details */}
          <div className="det">
            <h3 style={{ marginTop: "10px" }}>{video.title}</h3>

            {/* Channel and interaction buttons */}
            <div className="videobtn">
              <div className="videol">
                <div style={{ display: "flex" }}>
                  <img src={video.channelLogo} alt="channelLogo" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                  <p>{video.uploader}</p>
                </div>
                <button><img src={Bell} className="icon" /><p>Subscribe</p></button>
              </div>

              {/* Like/Dislike + Share/Download buttons */}
              <div className="btns">
                <div className="btnlike">
                  <button style={{ borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px", borderRight: "2px solid black" }}>
                    <img src={Like} alt="Like Logo" className="icon" /><p>{video.likes}</p>
                  </button>
                  <button style={{ borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}>
                    <img src={Dislike} alt="DisLike Logo" className="icon" /><p>{video.dislikes}</p>
                  </button>
                </div>

                <div className="sharebtn">
                  <button><img src={Share} alt="Share Icon" className="icon" /><p>Share</p></button>
                  <button><img src={Download} alt="Download Logo" className="icon" /><p>Download</p></button>
                </div>
              </div>
            </div>

            <div>
              <p>{video.description}</p>
            </div>

            {/* Comment Section */}
            <div className="commentData">
              <h2>Comments ({video.comments.length})</h2>

              {/* Add Comment */}
              <div className="commentAdd">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px" }}>
                    <img style={{ marginLeft: "4px" }} src={Upload} /> Post
                  </div>
                </button>
              </div>

              {/* Display Comments */}
              {(isMobile && !showAllComments ? video.comments.slice(0, 1) : video.comments).map((c) => (
                <div key={c.commentId} className="comment">
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {/* Avatar */}
                      <div style={{
                        backgroundColor: "#333",
                        color: "#fff",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        border: "2px solid black"
                      }}>
                        {(c.userId.startsWith("@") ? c.userId[1] : c.userId[0]).toUpperCase()}
                      </div>
                      <h5 style={{ marginLeft: "15px" }}>{c.userId}</h5>
                    </div>

                    {/* Dropdown Options */}
                    <div className="threeDotsbtn">
                      {dotClickedCommentId === c.commentId && (
                        <div className="commentbtn">
                          <button
                            onClick={() => {
                              if (editingCommentId === c.commentId) {
                                handleEditComment(c.commentId);
                              } else {
                                setEditingCommentId(c.commentId);
                                setEditedText(c.text);
                              }
                            }}
                          >
                            {editingCommentId === c.commentId ? (
                              <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px" }}>
                                <img style={{ marginLeft: "4px" }} src={Save} alt="Save" /> Save
                              </div>
                            ) : (
                              <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px" }}>
                                <img style={{ marginLeft: "4px" }} src={Edit} alt="Edit" /> Edit
                              </div>
                            )}
                          </button>

                          <button onClick={() => handleDeleteComment(c.commentId)}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <img style={{ marginRight: "4px" }} src={Delete} alt="Delete" /> Delete
                            </div>
                          </button>
                        </div>
                      )}

                      {/* Three Dots Toggle */}
                      <button
                        onClick={() =>
                          setDotClickedCommentId(
                            dotClickedCommentId === c.commentId ? null : c.commentId
                          )
                        }
                      >
                        ⋮
                      </button>
                    </div>
                  </div>

                  {/* Comment Text or Input */}
                  <div className="commentedit">
                    {editingCommentId === c.commentId ? (
                      <input
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        style={{ marginLeft: "40px" }}
                      />
                    ) : (
                      <p style={{ marginLeft: "40px" }}>{c.text}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Mobile Toggle Button */}
              {isMobile && video.comments.length > 1 && (
                <div className="showmorebtn">
                  <button onClick={() => setShowAllComments(prev => !prev)}>
                    {showAllComments ? "Show Less" : "Show More"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Videos Section */}
        <div className="relatedVideos">
          <div className="sample">
            <Content />
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPlay;
