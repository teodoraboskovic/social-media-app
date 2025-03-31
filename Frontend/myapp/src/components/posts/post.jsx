import "./post.css"
import{MoreVert} from "@mui/icons-material"
//import { useState } from "react"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import PopupGfg from "../popUp"

export default function Post({post}){

    // pocetne vrednosti su broj reakcija iz data components i false(korisnik nije odreagovao)
    const [like,setLike]=useState(post.likes.length)
    const [isLiked,setIsLiked]=useState(false)
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser]=useState({})
    const {user:currentUser} = useContext(AuthContext)

    const deleteHandler = async () => {
        try {
            const res = await axios.delete(`/posts/${post._id}`, { 
                data: { userId: currentUser._id, isAdmin: currentUser.isAdmin } 
            });
            window.location.reload();
            // Obrada odgovora
        } catch (error) {
            // Obrada greške
            console.log("greskaaaaaa")
            alert(`Ne mozes da obrises tudji post!`)
            // PopupGfg()
        }
    }


    useEffect(() =>{
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect(()=>{
        const fetchUser = async () => {
            console.log(post.userId)
            console.log("HEEEEJ")
            console.log(`users/${post.userId}`)

            try{
                const res = await axios.get(`/users?userId=${post.userId}`) //ovde mi se poziva get /profile/users
                setUser(res.data)
            }catch(err){
                console.log(err + 'greska')
            }
            
        }
        
        fetchUser()
    }, [post.userId])

    
    const likeFunc=()=>{
        try {
            axios.put("/posts/"+ post._id+"/like", {userId:currentUser._id})
        } catch (error) {
            
        }

        // ako nismo odreagovali klikom povecavamo broj like-ova
        //u suprotnom smanjujemo
        setLike(isLiked ? like-1 : like+1);
        //promena statusa isLiked svakim klikom na suprotan status 
        setIsLiked(!isLiked)
    }
    return (
        <div className="post">
            <div className="postWrapp">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                        {/* filter metoda da bismo mogli da pristupimo useru preko spoljnog kljuca u posts */}
                        <img src={user.profilePicture ? PublicFolder+user.profilePicture : PublicFolder+"/noAvatar.png"} alt="" className="postProfilePicture"/>
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postTime">{format(post.createdAt)}</span>
                    </div>
                    
                    <div className="postTopRight">
            <Popup trigger=
                {<MoreVert/>}
                position="right center">
                <div>Opcije</div>
                <button onClick={deleteHandler}>Obrisi post</button>
            </Popup>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText"> {post?.description} </span>
                    <img src={PublicFolder+post.image} alt="" className="postImage"/>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={`${PublicFolder}hearth.png`} alt="" className="reactionIcon" onClick={likeFunc} />
                        <img src={`${PublicFolder}like.png`} alt="" className="reactionIcon" onClick={likeFunc} />
                        <span className="likePostCounter">{like} reakcije</span>
                    </div>
                    <div className="postBottomRight">
                    <span className="commentPostCounter">{post.comments} komentara</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
