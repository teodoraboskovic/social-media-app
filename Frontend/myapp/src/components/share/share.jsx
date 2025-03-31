import { useContext, useState, useRef } from "react"
import "./share.css"
import {PermMedia, Label, Room, EmojiEmotions, Cancel} from "@mui/icons-material"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
export default function Share() {

    const {user} = useContext(AuthContext)
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const description = useRef()

    const [file, setFile] = useState(null); //hook za upload fajlova

    const submitHandler = async (e) => {
        
    e.preventDefault();
    const newPost = {
      userId: user._id,
      description: description.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.image = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
    }

    return (
        <div className="share">
            <div className="shareWrapp">
                <div className="shareTop">
                    <img src={user.profilePicture ? PublicFolder+user.profilePicture : PublicFolder+"/noAvatar.png"} alt="" className="shareProfilePicture" />
                    <input placeholder="Napisite o cemu razmisljate.." className="sharePostInputText" ref={description}/>
                </div>
                <hr className="shareLine"/>
                {file &&(
                    <div className="shareImageContainer">
                        <img className="shareImage" src={URL.createObjectURL(file)}/>
                        <Cancel className="shareCancelImg" onClick={()=>setFile(null)}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="Red" className="shareOptionIcon"/>
                            <span className="shareOptionText">Slika/Video</span>
                            <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) =>setFile(e.target.files[0])}/>
                        </label>
                        <div htmlFor="file" className="shareOption">
                            <Label htmlColor="DodgerBlue" className="shareOptionIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="MediumSeaGreen" className="shareOptionIcon"/>
                            <span className="shareOptionText">Lokacija</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="Goldenrod" className="shareOptionIcon"/>
                            <span className="shareOptionText">Emoji</span>
                        </div>
                    </div>
                    <button  className="shareButton" type="submit"> Podeli </button>
                </form>
            </div>
        </div >
    )

}