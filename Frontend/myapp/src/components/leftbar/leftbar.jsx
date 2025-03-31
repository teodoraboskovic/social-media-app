import "./leftbar.css"
import { RssFeed, Chat, PlayCircleFilledOutlined, Group, Bookmark, HelpOutline, WorkOutline, Event, School } from "@mui/icons-material"
import { Users } from "../../data"
import FriendsList from "../friendsList/friendsList"
export default function Leftbar() {
    return (
        <div className="leftBar">
            <div className="leftBarWrapp">
                <ul className="leftBarList">
                    <li className="leftBarItem">
                        <RssFeed className="feedIcon" />
                        <span className="leftBarIconText">Objave</span>
                    </li>
                    <li className="leftBarItem">
                        <Chat className="feedIcon"/>
                        <span className="leftBarIconText">Poruke</span>
                    </li>
                    <li className="leftBarItem">
                        <PlayCircleFilledOutlined className="feedIcon" />
                        <span className="leftBarIconText">Video</span>
                    </li>
                    <li className="leftBarItem">
                        <Group className="feedIcon" />
                        <span className="leftBarIconText">Grupe</span>
                    </li>
                    <li className="leftBarItem">
                        <Bookmark className="feedIcon" />
                        <span className="leftBarIconText">Sacuvano</span>
                    </li>
                    <li className="leftBarItem">
                        <HelpOutline className="feedIcon" />
                        <span className="leftBarIconText">Pitanja</span>
                    </li>
                    <li className="leftBarItem">
                        <WorkOutline className="feedIcon" />
                        <span className="leftBarIconText">Poslovi</span>
                    </li>
                    <li className="leftBarItem">
                        <Event className="feedIcon" />
                        <span className="leftBarIconText">Dogadjaji</span>
                    </li>
                    <li className="leftBarItem">
                        <School className="feedIcon" />
                        <span className="leftBarIconText">Kursevi</span>
                    </li>
                </ul>
                <button className="leftBarButton">Prikazi vise</button>
                <hr className="leftBarLine"/>
                <ui className="leftBarFriendsList">
                    {/* prolazimo kroz sve usere i vracamo svakog kao parametar za pozvanu metodu */}
                    {Users.map(u=>(
                        <FriendsList key={u.id} user={u}/>
                    ))}
                </ui>
            </div>
        </div>
    )
}