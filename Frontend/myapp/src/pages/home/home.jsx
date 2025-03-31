import Topbar from "../../components/topbar/topbar";
import Leftbar from "../../components/leftbar/leftbar";
import Rightbar from "../../components/rightbar/rightbar";
import Feed from "../../components/feed/feed";
import "./home.css"
export default function Home() {
    return (
        <>
            <Topbar />
            <div className="homePage">
                <Leftbar />
                <Feed />
                <Rightbar />
            </div>
        </>
    );
}