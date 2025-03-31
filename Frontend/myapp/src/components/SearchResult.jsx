import "./SearchResult.css";
import {Link} from "react-router-dom"

export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
    >
    <Link to={"/profile/"+`${result}`} style={{ textDecoration: "none" }}>
    {result}

    </Link>
      
    </div>
  );
};