import YoutubeLogo from "../Images/YoutubeLogo.png";
import Bello_Icon from "../Images/bell.png";
import Search from "../Images/searchsam.png";
import Logout from "../Images/logout.png";
import Login from "../Images/login.png";
import Google from "../Images/google.webp"
import Studio from "../Images/studio.png"
import Switch from "../Images/switch.png"
import Membership from "../Images/membership.jpeg"
import Data from "../Images/data.jpg"
import Location from "../Images/map.jpg"
import Restricted from "../Images/restricted.png"
import Keyboard from "../Images/keyboard.png"
import Setting from "../Images/setting.png"
import Help from "../Images/help.png"
import Feedback from "../Images/feedback.jpg"

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect,useContext } from "react";
import Sidebar from "./Sidebar";
import UserContext from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import ViewChannelContext from "../context/ViewChannelContext";


function Head({ side, searchTerm, setSearchTerm, sidebarOpen, sidePlay1 }) {

  const { user, logout} = useContext(UserContext);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const {viewChannel,setViewChannel} = useContext(ViewChannelContext)
  const [showUserSidebar, setShowUserSidebar] = useState(false);
  const navigate = useNavigate();
  const userAvatar = user?.avtar
  const userEmail = user?.Email
  const username = user?.UserName
  const userFirstLetter =  username ? username.charAt(0).toUpperCase() : "";

  function TruncatedText(text,textlength) {
  const maxLength = textlength;
  const displayText = text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return <span>{displayText}</span>;
}
  // Handle screen resize and update mobile state
  const handleResize = () => {
    const mobile = window.innerWidth <= 700;
    setIsMobile(mobile);
    if (!mobile) setIsSearchExpanded(false); // Collapse search on desktop
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle search bar visibility on small screens
  const toggleSearchBar = () => {
    setIsSearchExpanded(prev => !prev);
    setSearchClicked(!searchClicked);
  };

  // Fetch whether user already has a channel
  useEffect(() => {
    const checkUserChannel = async () => {
      const token = localStorage.getItem("token");
      const email = user?.Email
      if (!token || !email) return setViewChannel(false);

      try {
        const res = await axios.get(`http://localhost:5000/api/channel/user/${email}`);
        setViewChannel(res.data.exists); 
      } catch (err) {
        console.error("Error checking user channel:", err);
        setViewChannel(false);
      }
    };

    checkUserChannel();
  }, [user,setViewChannel]);

  // Handle search input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Create channel or warn user if already exists
  const handleCreateChannelClick = () => {
    if (viewChannel) {
      toast.info("A channel already exists for you.")
    } else {
      if (userEmail) {
        navigate("/channel/create");
      } else {
        toast.warn("You must be logged in to create a channel");
      }
    }
  };

  // Handle logout
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5000/api/user/logout", {}, {
        headers: { Authorization: `JWT ${token}` },
      });
    } catch (err) {
      console.error("Logout API failed:", err);
    }

    // Clear session data
    localStorage.removeItem("token");
    logout();
    setShowUserSidebar(false);
    toast.success("You have been logged out successfully");
    navigate("/");
  };

  const shouldShowInput = !isMobile || isSearchExpanded;
  const containerClass = `headalign2 ${isMobile ? (isSearchExpanded ? "expanded" : "collapsed") : ""}`;


  return (
    <header className="container1">
      <div className="head">
        <div className={searchClicked && isSearchExpanded ? "headalign1Search" : "headalign1"}>
          <button onClick={side}>☰</button>
          <img src={YoutubeLogo} alt="Youtube Logo" className="imageLogo" />
        </div>

        {/* Search Input Section */}
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
          <div className="search-icon" onClick={isMobile ? toggleSearchBar : undefined}>
            <img src={Search} alt="Search" className="image1" />
          </div>
        </div>

        {/* Right Side (Create, Bell, User/Profile/Login) */}
        <div className={searchClicked && isSearchExpanded ? "headalign1Search" : "headalign3"}>
          <button onClick={handleCreateChannelClick}>+ Create</button>
          <img src={Bello_Icon} alt="Bell Icon" className="icon" />

          {userEmail ? (
            <div className="user-avatar">
              
              {userAvatar != ""?(
                  <img src={userAvatar} style={{marginBottom:"10px"}} alt=""  className="avatarimage" onClick={() => setShowUserSidebar(!showUserSidebar)}/>
                ):(
                  <button onClick={() => setShowUserSidebar(!showUserSidebar)}>{userFirstLetter}</button>
                )}
            </div>
          ) : (
            <Link to="/login">
              <button className="loginbutton">
                <img src={Login} alt="Login" />Sign In
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar (User Options) */}
      {showUserSidebar && (
        <div className="user-sidebar">
          <div className="userDetails">
            <div style={{display:"flex",flexDirection:"row",gap:"10px"}}>
              <div className="user-avatar" style={{ margin: "0px" }}>
                {userAvatar != ""?(
                  <img src={userAvatar} alt=""  className="avatarimage"/>
                ):(
                  <button>{userFirstLetter}</button>
                )}
              
            </div>
            <div style={{ marginTop: "10px" }} className="truncated-multiline">
              <h3>{TruncatedText(username,15)}</h3>
              <h4 >{TruncatedText(userEmail,20)}</h4>
            </div>
            </div>
            <button
              style={{ marginLeft: "12px", marginRight: "12px" }}
              className="logoutbutton"
              onClick={handleLogout}
            >
              <img src={Logout} alt="Logout" />Logout
            </button>

            {viewChannel && (
              <Link to="/viewChannel">
                <button className="logoutbutton">View Channel</button>
              </Link>
            )}
          </div>

          {/* Sidebar Sections */}
          <div className="contentright">
            <div className="rightbtn">
              <button><img src={Google} alt="Google" className="rightsideimg"/>Google Account</button>
              <button><img src={Switch} alt="Switch"  className="rightsideimg"/>Switch Account</button>
            </div>
            <div className="rightbtn">
              <button><img src={Studio} alt="Studio"  className="rightsideimg"/>Youtube Studio</button>
              <button><img src={Membership} alt="Membership"  className="rightsideimg"/>Memberships</button>
              <button><img src={Data} alt="Data"  className="rightsideimg"/>Your data in Youtube</button>
            </div>
            <div className="rightbtn">
              <button><img src={Location} alt="location"  className="rightsideimg"/>Location: India</button>
              <button><img src={Restricted} alt="Mode"  className="rightsideimg"/>Restricted Mode: Off</button>
              <button><img src={Keyboard} alt="keyboard"  className="rightsideimg"/>Keyboard Shortcuts</button>
            </div>
            <div className="rightbtn">
              <button><img src={Setting} alt="Setting"  className="rightsideimg"/>Settings</button>
              <button><img src={Help} alt="help"  className="rightsideimg"/>Help</button>
              <button><img src={Feedback} alt="feedback"  className="rightsideimg"/>Send feedback</button>
            </div>
          </div>
        </div>
      )}

      {/* Left Navigation Sidebar */}
      <aside className={`asidebar ${sidebarOpen ? "expanded" : ""}`}>
        <Sidebar sidebarOpen={sidebarOpen} s={sidePlay1} />
      </aside>
    </header>
  );
}

export default Head;
