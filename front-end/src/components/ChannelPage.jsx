import axios from "axios"
import { useState, useEffect,useContext } from "react"
import { useOutletContext,useNavigate } from "react-router-dom"
import UserContext from "../context/UserContext"
import Content from "./Content"
import Bell from "../Images/subscribe_bell.png"
import Post from "../Images/upload.png"
import Delete from "../Images/delete.png"
import { toast } from "react-toastify"
import ViewChannelContext from "../context/ViewChannelContext"

function ChannelPage() {
    const navigate = useNavigate()
    const [channelDotclicked,setChannelDotClicked] = useState(false)
    const [channelData, setChannelData] = useState(null)
    const { sidebarOpen } = useOutletContext()
    const [channelName, setChannelname] = useState("")
    const firstLetter = channelName?channelName[0].toUpperCase():""
    const [userChannelBanner,setUserChannelBanner] = useState("")
    const {user} = useContext(UserContext)
    const {setViewChannel} = useContext(ViewChannelContext)
    const email = user?.Email
    // Flag to indicate channel-specific view in Content component
    let channelbtn = true

    const handleDeleteChannel = async () => {
  const confirmed = window.confirm("Are you sure you want to delete your channel?");

  if (!confirmed || !email) return;

  try {
    await axios.delete(`http://localhost:5000/api/channel/user/${email}`);
    toast.success("Channel deleted successfully");
    setViewChannel(false)
    navigate("/"); 
  } catch (err) {
    console.error("Error deleting channel:", err);
    alert("Failed to delete channel");
  }
};
    useEffect(() => {
        if (!email) {
            console.log("No user email found in localStorage")
            return
        }
// Fetch user's channel details by email
        const displayChannel = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/channel/user/${email}`)
                const channel = response.data.channel
                setChannelData(channel)
                setChannelname(channel.channelName)
                setUserChannelBanner(channel.channelBanner)
            } catch (err) {
                console.log("Error checking user channel:", err)
            }
        }

        displayChannel()
    }, [email])

    console.log("Fetched channelData:", channelData)

    return (
        <div className={!sidebarOpen ? "channelContent" : "channelContentExpanded"}>
            <div className={!sidebarOpen?"channelInformation":"channelInformationExpanded"}>
                <div >
                    {userChannelBanner!="" ? (
                        <img src={userChannelBanner} alt={firstLetter}  className="chanLogo" />
                    ) : (
                        <div className="channelLogo">
                            {firstLetter}
                        </div>         
                    )}
                </div>
                <div className={!sidebarOpen?"userChannelInfo":"userChannelInfoExpanded"}>
                    <div className="userChannelInformation" >
                    <h1>{channelData?(channelData.channelName):""}</h1>
                    <h3>{channelData?(channelData.Owner):""}</h3>
                    <p className="truncated-multiline">{channelData?(channelData.description):""}</p>
                    <div style={{display:"flex"}}>
                        <button><img src={Bell} />Subscribe</button>
                    <button onClick={()=> navigate("/create-video")}><img src={Post} />Add Video</button>
                    </div>                   
                    </div>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",gap:"30px",transition:"0.3s"}}>     
                     {channelDotclicked && (
                        <div className="deletechannelbtn" onClick={handleDeleteChannel}><button><img src={Delete} alt="" />Delete Channel</button></div>
                     )}
                     <div><button className="channeldotbtn" onClick={()=> setChannelDotClicked(!channelDotclicked)} > ⋮</button></div>
                    </div>   
                </div>
            </div>
            <div className={!sidebarOpen?"bar":"barExpanded"}>
                <div className="channelbar">
                    <button>Home</button>
                    <button style={{borderBottom:"3px solid black"}}>Videos</button>
                    <button>Shorts</button>
                    <button>Live</button>
                    <button>Playlists</button>
                    <button>Posts</button>
                </div>              
            </div>
            <div style={{marginTop:"330px"}} className={!sidebarOpen?"":"contentExpanded"}>
                <div >
                    <Content channelbtn = {channelbtn} />
                </div>
            </div>
        </div>
    )
} 

export default ChannelPage
