import "./friendsList.css"
export default function FriendsList({user}) {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="leftBarFriend">
            <img src={PublicFolder+user.profilePicture} alt="" className="leftBarFriendImage" />
            <span className="leftBarFriendName">{user.username}</span>
        </li>
    )
}
