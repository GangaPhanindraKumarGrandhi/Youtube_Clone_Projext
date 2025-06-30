import YoutubeLogo from "../Images/YoutubeLogo.png";
import Bello_Icon from "../Images/bell.png";
import Search from "../Images/searchsam.png";
import Logout from "../Images/logout.png";
import Login from "../Images/login.png";

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

function Head({ side, searchTerm, setSearchTerm, sidebarOpen, sidePlay1 }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [viewchannel, setView] = useState(false);
  const [showUserSidebar, setShowUserSidebar] = useState(false);

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const username = localStorage.getItem("userName");
  const userFirstLetter = userEmail ? userEmail.charAt(0).toUpperCase() : "";

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
      const email = localStorage.getItem("userEmail");
      if (!token || !email) return setView(false);

      try {
        const res = await axios.get(`http://localhost:5000/api/channel/user/${email}`);
        setView(res.data.exists); // true if user has a channel
        console.log(res.data.channel);
      } catch (err) {
        console.error("Error checking user channel:", err);
        setView(false);
      }
    };

    checkUserChannel();
  }, []);

  // Handle search input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Create channel or warn user if already exists
  const handleCreateChannelClick = () => {
    if (viewchannel) {
      const confirmed = window.confirm("A channel already exists. Do you want to create an additional one?");
      if (confirmed) navigate("/channel/create");
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
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Logout API failed:", err);
    }

    // Clear session data
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    setShowUserSidebar(false);
    toast.success("You have been logged out successfully");
    navigate("/");
  };

  const shouldShowInput = !isMobile || isSearchExpanded;
  const containerClass = `headalign2 ${isMobile ? (isSearchExpanded ? "expanded" : "collapsed") : ""}`;

  return (
    <header className="container1">
      <div className="head">
        {/* Logo + Toggle Button */}
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
          <div className="search-icon" onClick={toggleSearchBar}>
            <img src={Search} alt="Search" className="image1" />
          </div>
        </div>

        {/* Right Side (Create, Bell, User/Profile/Login) */}
        <div className={searchClicked && isSearchExpanded ? "headalign1Search" : "headalign3"}>
          <button onClick={handleCreateChannelClick}>+ Create</button>
          <img src={Bello_Icon} alt="Bell Icon" className="icon" />

          {userEmail ? (
            <div className="user-avatar">
              <button onClick={() => setShowUserSidebar(!showUserSidebar)}>
                {userFirstLetter}
              </button>
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
            <div className="user-avatar" style={{ margin: "0px" }}>
              <button>{userFirstLetter}</button>
            </div>
            <div style={{ marginTop: "10px" }}>
              <h3>{username}</h3>
              <h4>{userEmail}</h4>
            </div>
            <button
              style={{ marginLeft: "12px", marginRight: "12px" }}
              className="logoutbutton"
              onClick={handleLogout}
            >
              <img src={Logout} alt="Logout" />Logout
            </button>

            {viewchannel && (
              <Link to="/viewChannel">
                <button className="logoutbutton">View Channel</button>
              </Link>
            )}
          </div>

          {/* Sidebar Sections */}
          <div className="contentright">
            <div className="rightbtn">
              <button>Google Account</button>
              <button>Switch Account</button>
            </div>
            <div className="rightbtn">
              <button>Youtube Studio</button>
              <button>Purchases and memberships</button>
              <button>Your data in Youtube</button>
            </div>
            <div className="rightbtn">
              <button>Location: India</button>
              <button>Restricted Mode: Off</button>
              <button>Keyboard Shortcuts</button>
            </div>
            <div className="rightbtn">
              <button>Settings</button>
              <button>Help</button>
              <button>Send feedback</button>
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
