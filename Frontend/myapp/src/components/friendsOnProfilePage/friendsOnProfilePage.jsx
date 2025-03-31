import "./friendsOnProfilePage.css"
export default function Friends({ user }) {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
    <li className="rightbarFriend">
        <img src={PublicFolder+user.profilePicture} alt="" className="rightbarFriendImage" />
        <span className="rightbarFriendName">{user.username}</span>
    </li>
    )
}