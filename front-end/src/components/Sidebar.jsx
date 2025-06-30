import { useNavigate } from "react-router-dom";

// Importing sidebar icons/images
import HomeLogo from "../Images/HomeLogo.png";
import Shorts from "../Images/ShortsLogo.jpg";
import Subscription from "../Images/SubscriptionLogo.webp";
import Human from "../Images/Human.png";
import History from "../Images/History.png";
import PlayList from "../Images/Playlist.png";
import VideoLogo from "../Images/Video.png";
import Course from "../Images/Courses.avif";
import Podcast from "../Images/Podcast.png";
import Watch from "../Images/watch.webp";
import Liked from "../Images/Liked.png";
import Etv from "../Images/Etv.jpg";
import Internshala from "../Images/internshal.png";
import Mango from "../Images/Mango.jpg";
import Sony from "../Images/sony.jpg";
import Zee from "../Images/Zee.png";
import Adithya from "../Images/Adithya.jpg";
import Music from "../Images/music.png";
import Movies from "../Images/Movies.png";
import Shopping from "../Images/shopping.png";
import Trending from "../Images/Trending.jpg";
import Setting from "../Images/setting.png";
import Report from "../Images/report.png";
import Help from "../Images/help.png";
import Feedback from "../Images/feedback.jpg";

function Sidebar({ sidebarOpen, s }) {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${sidebarOpen ? "expanded" : ""}`}>

      {/* Top Navigation (Home, Shorts, Subscriptions) */}
      {(s || sidebarOpen) && (
        <>
          <button onClick={() => navigate("/")}>
            <img src={HomeLogo} alt="Home" /> Home
          </button>
          <button>
            <img src={Shorts} alt="Shorts" /> Shorts
          </button>
          <button>
            <img src={Subscription} alt="Subscriptions" /> Subscriptions
          </button>
        </>
      )}

      {/* "You" Section */}
      {(s || sidebarOpen) && (
        <div className={`sidecontainer ${sidebarOpen ? "expanded" : ""}`}>
          <button style={sidebarOpen ? { fontSize: "18px" } : {}}>
            {sidebarOpen ? "You >" : (
              <>
                <img src={Human} alt="You" /><br />You
              </>
            )}
          </button>

          {/* Display when sidebar is open */}
          {sidebarOpen && (
            <>
              <button><img src={History} alt="History" /> History</button>
              <button><img src={PlayList} alt="Playlist" /> Playlist</button>
              <button><img src={VideoLogo} alt="Your Videos" /> Videos</button>
              <button><img src={Course} alt="Courses" /> Courses</button>
              <button><img src={Podcast} alt="Podcast" /> Podcasts</button>
              <button><img src={Watch} alt="Watch Later" /> Watch Later</button>
              <button><img src={Liked} alt="Liked" /> Liked</button>
            </>
          )}
        </div>
      )}

      {/* Subscriptions Section */}
      {sidebarOpen && (
        <div className="subscriptioncontainer expanded">
          <button style={{ fontSize: "18px" }}>Subscriptions &gt;</button>
          <button><img src={Internshala} alt="Internshala" /> @internshala</button>
          <button><img src={Etv} alt="ETV" /> @etvteluguindia</button>
          <button><img src={Mango} alt="Mango" /> @mangomusic</button>
          <button><img src={Adithya} alt="Adithya" /> @adithysmusic</button>
          <button><img src={Zee} alt="Zee" /> @zeemusic</button>
          <button><img src={Sony} alt="Sony" /> @sonymusic</button>
        </div>
      )}

      {/* Explore Section */}
      {sidebarOpen && (
        <div className="subscriptioncontainer expanded">
          <button style={{ fontSize: "18px" }}>Explore &gt;</button>
          <button><img src={Music} alt="Music" /> @music</button>
          <button><img src={Trending} alt="Trending" /> @trending</button>
          <button><img src={Shopping} alt="Shopping" /> @shopping</button>
          <button><img src={Movies} alt="Movies" /> @movies</button>
        </div>
      )}

      {/* Settings and Help Section */}
      {sidebarOpen && (
        <div className="subscriptioncontainer expanded">
          <button><img src={Setting} alt="Setting" /> Setting</button>
          <button><img src={Report} alt="Report" /> Report History</button>
          <button><img src={Help} alt="Help" /> Help</button>
          <button><img src={Feedback} alt="Feedback" /> Feedback</button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
