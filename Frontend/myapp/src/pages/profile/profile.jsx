import "./profile.css"
import Topbar from "../../components/topbar/topbar"
import Leftbar from "../../components/leftbar/leftbar"
import Rightbar from "../../components/rightbar/rightbar"
import Feed from "../../components/feed/feed"
import axios from "axios"
import { useEffect, useState } from "react"
import {useParams} from "react-router"

export default function Profile() {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser]=useState({})
    const username = useParams().username

    useEffect(()=>{
        const fetchUser = async () => {
            try{
                const res = await axios.get(`/users?username=${username}`) //ovde mi se poziva get /profile/users
                setUser(res.data)
            }catch(err){
                console.log(err + 'greska')
            }
            
        }
        
        fetchUser()
    }, [username])



    return (
        <>
            <Topbar />
            <div className="profilePage">
                {/* profile page */}
                <Leftbar />
                <div className="profilePageRight">
                    <div className="profilePageRightTop">
                        <div className="profileDesign">
                            <img src={user.coverPicture ? PublicFolder+user.coverPicture : PublicFolder+"posts/12.jpg"} alt="" className="profilePageCoverPhoto" />
                            <img src={user.profilePicture ? PublicFolder+user.profilePicture : PublicFolder+"noAvatar.png"} alt="" className="profilePageProfilePhoto" />
                        </div>
                        <div className="profileInformation">
                            <h4 className="profileInformationName">{user.username}</h4>
                            <span className="profileInfoDescription">{user.description}</span>
                        </div>
                    </div>
                    <div className="profilePageRightBottom">
                        <Feed username = {username}/>
                        {/* izmena za profile page u rightbar-u slanjem parametra profile*/}
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}