import YoutubeLogo from "../Images/YoutubeLogo.png";
import Bello_Icon from "../Images/bell.png";
import { Link } from "react-router-dom";
import Search from "../Images/searchsam.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Sidebar from "./Sidebar";


function Head({side, searchTerm, setSearchTerm ,sidebarOpen,sidePlay1}){
   const [isSearchExpanded, setIsSearchExpanded] = useState(false);
   const [searchClicked,setSearchClicked] = useState(false)
      const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
      const handleResize = () => {
        const mobile = window.innerWidth <= 700;
        setIsMobile(mobile);
        if (!mobile) {
           
          setIsSearchExpanded(false); // Reset on resize
         
          
        }
      };

      useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
const toggleSearchBar = () => {
  setIsSearchExpanded(prev => !prev);
  setSearchClicked(!searchClicked)


} 

 const shouldShowInput = !isMobile || isSearchExpanded;
      const containerClass = `headalign2 ${isMobile ? (isSearchExpanded ? "expanded" : "collapsed") : ""}`;
    
  const [viewchannel,setView] = useState(false)
  useEffect(() => {
  const checkUserChannel = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail"); 

    if (!token || !email) {
      setView(false);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/channel/user/${email}`);
      console.log(res.data.channel)
      setView(res.data.exists); // true if user has a channel
    } catch (err) {
      console.error("Error checking user channel:", err);
      setView(false);
    }
  };

  checkUserChannel();
}, []); // runs only once on mount

    
    const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const navigate = useNavigate()
  const [showUserSidebar, setShowUserSidebar] = useState(false);

  const handleCreateChannelClick = ()=>{
      navigate("/channel/create"); 
  
  }

  const clearSearch = () => {
    setSearchTerm("");
  };
   const handleLogout = async () => {
  const token = localStorage.getItem("token");

  try {
    await axios.post("http://localhost:5000/api/user/logout", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error("Logout API failed:", err);
  }

  // Clear frontend session regardless
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");  // <-- Add this line
  setShowUserSidebar(false);
  navigate("/");
};
  
  const userEmail = localStorage.getItem("userEmail");
  const username = localStorage.getItem("userName")
  const userFirstLetter = userEmail ? userEmail.charAt(0).toUpperCase() : "";
    return(
      <header className="container1">
        <div className="head">
            <div className= {searchClicked && isSearchExpanded?"headalign1Search":"headalign1"}>
              <button onClick={side}>☰</button>
              <img src={YoutubeLogo} alt="Youtube Logo" className="imageLogo" />
            </div>
              <div className={containerClass}>
                {shouldShowInput && (
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              id="search-input"
              placeholder="Search"
             
            />
          )}
                  {shouldShowInput && searchTerm && (
            <span className="cross" onClick={clearSearch}>&times;</span>
          )}
                  <div className="search-icon" onClick={toggleSearchBar}>
                    <img src={Search} alt="Search Logo" className="image1" />
                  </div>
            </div>
      
    <div className={searchClicked && isSearchExpanded?"headalign1Search":"headalign3"}>
      <button onClick={handleCreateChannelClick}>+ Create</button>
   
   <img src={Bello_Icon} alt="bell_Icon" className="icon" />

   {userEmail ? (
    <div className="user-avatar">
     <button onClick={() => setShowUserSidebar(!showUserSidebar)}>
      {userFirstLetter}
     </button>
    </div>
     ) : (
    <Link to="/login">
      <button>Sign In</button> 
    </Link>
     )}
</div>
 </div>

 {showUserSidebar && (
  <div className="user-sidebar">
    <div className="userDetails">
      <div className="user-avatar" style={{margin:"0px"}}>
        <button>{userFirstLetter}</button>
      </div>
      <div style={{marginTop:"10px"}} >
        <h3>{username}</h3>
        <h4>{userEmail}</h4>
      </div>
      <button className="logoutbutton" onClick={handleLogout}>Logout</button>
      {viewchannel && (<Link to="/viewChannel"><button className="logoutbutton">View Channel</button></Link>)}
    </div>
    <div className="contentright">
      <div className="rightbtn">
        <button>Google Account</button>
     <button>Switch Account</button>
      </div>
      <div className="rightbtn">
        <button>Youtube Studio</button>
     <button>Purchaces and memberships</button>
     <button>Your data in Youtube</button>
      </div>
     <div className="rightbtn">
      <button>Location : India</button>
     <button>Restricted Mode: Off</button>
     <button>Keyboard Shortcuts</button>
     </div>
     <div className="rightbtn">
       <button>Setting</button>
     <button>Help</button>
     <button>Send feedback</button>
     </div>
    </div>
  </div>
  )}
  <aside className={`asidebar ${sidebarOpen ? "expanded" : ""}`}>
          <Sidebar sidebarOpen={sidebarOpen} s = {sidePlay1}/>
        </aside>
  </header>
  )
}
export default Head