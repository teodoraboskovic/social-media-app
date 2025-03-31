import "./onlineFriends.css"
export default function OnlineFriends({user}) {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="rightbarFriend">
            <div className="profileIconOnlineFriend">
                <img src={PublicFolder+user.profilePicture} alt="" className="profilePictureOnlineFriend" />
                <span className="onlineFriendBadge"></span>
            </div>
            <span className="rightbarOnlineFriendUsername">{user.username}</span>
        </li>
    )
}



