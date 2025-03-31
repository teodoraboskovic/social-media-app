import "./feed.css"
import Share from "../share/share"
import Post from "../posts/post"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import React, { useMemo } from 'react';
import Cache from "../cache"

export default function Feed({username}) {

    const [posts, setPosts] = useState([])
    const {user} = useContext(AuthContext)


    const processData = (userData) => {
        // Skupa logika za obradu podataka korisnika
        // Na primer, transformacija podataka, filtriranje, itd.
        return userData;
      };

    // const MyComponent = ({ data }) => {
    //     const cachedData = useMemo(() => {
    //       // Skupa logika za obradu podataka
    //       return processData(data);
    //     }, [data]); // Zavisi samo od promene 'data'
      
    //     return <div>{cachedData}</div>;
    //   };

    const MyComponent = () => {
        const cachedString = useMemo(() => {
          return "podatak";
        }, []); // Ovde ne navodimo nikakve zavisnosti jer se vrednost neće menjati
      
        return <div>{cachedString}</div>;
      };

    //   const ChildComponent = ({ cachedData }) => {
    //     return (
    //       <div>
    //         <p>Keširan podatak: {cachedData}</p>
    //       </div>
    //     );
    //   };

    useEffect(()=>{
        const fetchPosts = async () => {
            const res = username ? await axios.get("/timeline/profile/" + username) : await axios.get("/timeline/" + user._id)
            setPosts(res.data.sort((post1, post2)=>{
                return new Date(post2.createdAt) - new Date(post1.createdAt)
            }))
        }
        
        fetchPosts()
    }, [username, user._id]) //renderuje samo jednom feed zbog []
    return (
        <div className="feed">
            {/* <Cache /> */}
            <div className="feedWrapp">
                {(!username || username===user.username) && user.posetilac===false && <Share />}
                {posts.map((p) => (
                    <Post key={p._id} post={p}/>
                ))}
            </div>
        </div>
    )
}