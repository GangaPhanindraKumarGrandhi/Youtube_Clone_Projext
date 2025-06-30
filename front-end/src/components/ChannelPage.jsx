import axios from "axios"
import { useState, useEffect } from "react"
import { useOutletContext,useNavigate } from "react-router-dom"
import Content from "./Content"
import Bell from "../Images/subscribe_bell.png"
import Post from "../Images/upload.png"

function ChannelPage() {
    const navigate = useNavigate()
    const [channelData, setChannelData] = useState(null)
    const { sidebarOpen } = useOutletContext()
    const [channelName, setChannelname] = useState("")
    // Flag to indicate channel-specific view in Content component
    let channelbtn = true
    useEffect(() => {
        const email = localStorage.getItem("userEmail")
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
            } catch (err) {
                console.log("Error checking user channel:", err)
            }
        }

        displayChannel()
    }, [])

    console.log("Fetched channelData:", channelData)

    return (
        <div className={!sidebarOpen ? "channelContent" : "channelContentExpanded"}>
            <div className={!sidebarOpen?"channelInformation":"channelInformationExpanded"}>
                <div className="channelLogo">
                    {channelName ? channelName[0].toUpperCase() : ""} 
                </div>
                <div className="userChannelInformation">
                    <h1>{channelData?(channelData.channelName):""}</h1>
                    <h3>{channelData?(channelData.Owner):""}</h3>
                    <p className="truncated-multiline">{channelData?(channelData.description):""}</p>
                    <div style={{display:"flex"}}>
                        <button><img src={Bell} />Subscribe</button>
                    <button onClick={()=> navigate("/create-video")}><img src={Post} />Add Video</button>
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
