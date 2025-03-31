import "./SearchResultList.css";
import { SearchResult } from "./SearchResult";
import react from "react"
import { useState } from "react";



export const SearchResultList = ({ results }) => {

const handleClick = () =>{

}
    return (
        <div className="results-list">
            {/* <button onClick={handleClick}>test</button> */}
          {results.map((result, id) => {
            return <SearchResult result={result.username} key={id} />;
          })}
        </div>
      );
};