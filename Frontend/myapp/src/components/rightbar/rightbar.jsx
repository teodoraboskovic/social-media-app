import OnlineFriends from "../onlineFriends/onlineFriends"
import Friends from "../friendsOnProfilePage/friendsOnProfilePage"
import "./rightbar.css"
import { Users } from "../../data"
import TimeWidget from "../../components/timeWidget"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { Add, Remove } from "@mui/icons-material"

export default function Rightbar({ user }) {

    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([])
    const {user:currentUser, dispatch} = useContext(AuthContext)
    // const [followed, setFollowed] = useState(
    //     currentUser.followings.includes(user?._id)
    //   );
    const [followed, setFollowed] = useState(false)

    //prognoza
    const api ={
        key: '12dc0bba18f28a1f59af39c759472804',
        base:'https://api.openweathermap.org/data/2.5/'
    }

    //user je onaj ciji profil gledamo, a currentUser je alijas na ulogovanog korisnika
    const [search, setSearch] = useState("Belgrade")//ovde stavimo pocetni search recimo beograd
    const [weather, setWeather] = useState({});

    const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
    .then((res) => res.json())
    .then((result) => {
      setWeather(result);
    console.log(result)
    });
    }

    useEffect(() => {
        // Pozivamo setSearch da postavimo vrednost search
        // setSearch(user.city);
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>" + user.city)
        searchPressed()//Pozivamo f.ju da postavi vrednost za prognozu
      }, []);

    useEffect(()=>{
        setFollowed(currentUser.followings.includes(user?._id))
    }, [user])

    useEffect(()=>{

        const getFriends = async ()=>{
            try {
                const friendList = await axios.get("/users/friends/"+user._id)
                setFriends(friendList.data)
            } catch (error) {
                console.log(error)
            }
        }
        getFriends()
    },[user])

    const followHandler = async()=>{
        try {
            if (followed) {
              await axios.put(`/users/${user._id}/unfollow`, {
                userId: currentUser._id,
              });
              dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
              await axios.put(`/users/${user._id}/follow`, {
                userId: currentUser._id,
              });
              dispatch({ type: "FOLLOW", payload: user._id });
            }
            setFollowed(!followed);
          } catch (err) {
          }
    }

    // verzija rightbara za homepage
    const HomeRightBar = () => {
        return (
            <>
                <div className="birthdayNotification">
                    <img src="/assets/gift3.png" alt="" className="birthdayImage" />
                    <span className="birthdayText">
                        <b>+2 ljudi</b> je rodjeno istog dana
                    </span>
                </div>
                <img src="/assets/ad.png" alt="" className="AdImage" />
                <h4 className="rightbarTitle">Online prijatelji</h4>
                <ui className="rightbarOnlineFriendList">
                    {/* prolazimo kroz sve usere i vracamo svakog kao parametar za pozvanu metodu */}
                    {Users.map(u => (
                        <OnlineFriends key={u.id} user={u} />
                    ))}
                </ui>
            </>
        )
    }
    // verzija rightbara za profilepage
    const ProfileRightBar = () => {
        return (
            <>
            {user.username !== currentUser.username && (
                <button className="rightBarFollowButton" onClick={followHandler}>
                    {followed ? "Ukloni" : "Dodaj prijatelja"}
                    {followed ? <Remove/> : <Add/>}
                    </button>
            )}
                <h4 className="rightbarProfileInfoTitle">Informacije o korisniku</h4>
                <div className="rightbarInformation">
                    <div className="rightbarInformationItem">
                        <span className="rightbarInformationItemTitle">Grad:</span>
                        <span className="rightbarInformationItemName">{user.city}</span>
                    </div>
                    <div className="rightbarInformationItem">
                        <span className="rightbarInformationItemTitle">Zemlja:</span>
                        <span className="rightbarInformationItemName">{user.country}</span>
                    </div>
                    <div className="rightbarInformationItem">
                        <span className="rightbarInformationItemTitle">Ljubavni status:</span>
                        <span className="rightbarInformationItemName">{user.relationship === 1 ? "Slobodna/an" : user.relationship === 2 ? "U vezi" : "-"}</span>
                    </div>
                </div>
                <h4 className="rightbarProfileFriendTitle">Prijatelji:</h4>
                <div className="rightBarFollowings">
                    {friends.map((friend)=>(
                        <Link to={"/profile/"+friend.username} style={{ textDecoration: "none" }}>

                        <div className="rightBarFollowing">
                        <img
                        src={friend.profilePicture ? PublicFolder+friend.profilePicture : PublicFolder+"noAvatar.png"}
                        alt=""
                        className="rightBarFollowingImage"
                        width="100" 
                        height="100"
                        /> <br/>
                         <span className="rightbarFollowingName">{friend.username}</span>
                    </div>
                    </Link>
                    ))}
                    
                </div>
                <img src="/assets/ad.png" alt="" className="AdImage" />
                <TimeWidget />

                <h4>Vremenska prognoza</h4>
                {/* <input type="text" placeholder="Pretrazi" onChange={(e)=>setSearch(e.target.value)}/>
                <button onClick={searchPressed}>Pretraga</button> */}

                
                {typeof weather.main !== "undefined" ? (
          <div>
            {/* Location  */}
            <p>{weather.name}</p>

            {/* Temperature Celsius  */}
            <p>{weather.main.temp}°C</p>

            {/* Condition (Sunny ) */}
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          "ucitava se prognoza"
        )}
                
            </>
        )
    }
    return (
        <div className="rightBar">
            <div className="rightbarWrapp">
                {/* Ukoliko je profile promenljiva prosledjena metodi 
                poziva se Profilerightbar, u suprotnom Homerightbar*/}
                {user ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div>
    )
}