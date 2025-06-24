import { useState, useEffect, } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Head from "./Head";
import Sidebar from "./Sidebar";
import Like from "../Images/like.png"
import Dislike from "../Images/dislike.png"
import Share from "../Images/share.png"
import Download from "../Images/download.png"
import Bell from "../Images/bell.png"
import Content from "./Content";

function VideoPlay() {
  const [newComment, setNewComment] = useState("");
const [editingCommentId, setEditingCommentId] = useState(null);
const [editedText, setEditedText] = useState("");
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const s = false
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
   const username = localStorage.getItem("userName")


 const handleAddComment = async () => {
  if(!username){
    alert("Please Login to Add a Comment")
    return
  }
  if (!newComment.trim()) return;

  try {
    const res = await axios.post(`http://localhost:5000/api/videos/${id}/comments`, {
      text: newComment,
      userId: `@${username}` // Replace this later with real user
    }); 

    setVideo(prev => ({ ...prev, comments: [...prev.comments, res.data] }));
    setNewComment("");
  } catch (err) {
    console.error("Error adding comment", err.message);
  }
};

const handleEditComment = async (commentId) => {
  if(!username){
    alert("Please Login to edit Comment")
    return
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

const handleDeleteComment = async (commentId) => {
  if(!username){
    alert("Please login to Delete a Comment")
    return
  }
  try {
    await axios.delete(`http://localhost:5000/api/videos/${id}/comments/${commentId}`);
    setVideo(prev => ({
      ...prev,
      comments: prev.comments.filter(c => c.commentId !== commentId)
    }));
  } catch (err) {
    console.error("Error deleting comment", err.message);
  }
};

 
  function side() {
    setSideBarOpen(!sidebarOpen);
  }

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error: ${error}`}</div>;
  if (!video) return <div>No video data found.</div>;


  return (
    <>
    <div className="container1">
        <Head side={side} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
       <aside className={`asidebar ${sidebarOpen ? "expanded" : ""}`}>
          <Sidebar sidebarOpen={sidebarOpen} s = {s}/>
        </aside>

     <div className="playPage">
      <div className="videoInformation">
        <iframe 
    
        width="100%" 
        height="520px" 
        style={{ borderRadius: "10px" }} 
        src={video.src} 
        title={video.title} 
        frameBorder="0" 
        allow="autoplay; encrypted-media" 
        allowFullScreen>
      </iframe>
      <div className="det">
        <h3 style={{margin:"10px"}}>{video.title}</h3>
        <div className="videobtn">
          <div className="videol">
            <img src={video.channelLogo} alt="channelLogo" style={{width:"40px",height:"40px",borderRadius:"50%"}}/>
             <p>{video.uploader}</p>
             <button><img src={Bell} className="icon"/><p>Subscribe</p></button>
          </div>
          <div className="btns">
            <div className="btnlike">
              <button style={{borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px",borderRight:"2px solid black"}}><img src={Like} alt="Like Logo" className="icon"/><p>{video.likes}</p></button>
              <button style={{borderTopRightRadius:"20px",borderBottomRightRadius:"20px"}}><img src={Dislike} alt="DisLike Logo" className="icon"/><p>{video.dislikes}</p></button>
            </div>
            <div className="sharebtn">
              <button ><img src={Share} alt="Share Icon " className="icon"/><p>Share</p></button>
              <button><img src={Download} alt="Download Logo" className="icon" /><p>Download</p></button>
            </div>
          </div>
        </div>
        <div>
          <p>{video.description}</p>
        </div>
        <div className="commentData">
  <h2>Comments ({video.comments.length})</h2>
<div className="commentAdd">
  <input
    type="text"
    placeholder="Add a comment"
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
  />
  <button onClick={handleAddComment}>Post</button>
</div>
               {video.comments.map((c) => (
  <div key={c.commentId} className="comment">
    <div style={{ display: "flex", alignItems: "center", gap: "10px",justifyContent:"space-between" }}>
      <div style={{display:"flex", alignItems:"center"}}>
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
       
        border:"2px solid black"
      }}>
        {(c.userId.startsWith("@") ? c.userId[1] : c.userId[0]).toUpperCase()}
      </div>
       <h5 style={{marginLeft:"15px"}}>{c.userId}</h5>
      </div>
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
        {editingCommentId === c.commentId ? "Save" : "Edit"}
      </button>

      {/* Delete stays unchanged */}
      <button onClick={() => handleDeleteComment(c.commentId)}>Delete</button>
       </div>
    </div>
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

</div>

      </div>
       </div>
       <div className="relatedVideos" >
        <div className="sample">
          <Content searchTerm={searchTerm} varient="play"/>

        </div>
        
       </div>
    </div>
    </>
   
  );
}

export default VideoPlay;
