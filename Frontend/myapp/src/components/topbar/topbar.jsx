import "./topbar.css"//./ jer smo u istom folderu
import { Search, Person, Chat, Notifications } from "@mui/icons-material"// Search ikonica 
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"
import { SearchResultList } from "../SearchResultList";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function Topbar() {

    const {user} = useContext(AuthContext)
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleClick = (e) =>{
        e.preventDefault()
        // loginCall({email:email.current.value, password:password.current.value}, dispatch)
        console.log("kliknuto")
        sessionStorage.removeItem("sessionData");
        window.location.reload();
    }

    const [input, setInput] = useState("")
    const [results, setResults] = useState([])

    const fetchData = async (value) =>{
        console.log(value)
        try{
            const res = await axios.get(`/filter/users`,  {
                params: {
                    page: 1,
                    pageSize: 6,
                    username: value
                }
            }) //ovde mi se poziva get /profile/users
            setResults(res.data.sort((a, b)=>{
                return a.username.localeCompare(b.username);
            }))
            // setResults(res.data);
            // console.log(results)
            
        }catch(err){
            console.log(err + 'greska')
        }
    }

    const handleChange = (value) =>{
        setInput(value)
        fetchData(value)
        
    }


    useEffect(() => {
        const handleEscKeyPress = (event) => {
          if (event.key === 'Escape') {
            console.log('Pritisnuto je dugme Escape.');
            setResults([])
          }
        };
    
        // Dodajemo event listener kada se komponenta montira
        window.addEventListener('keydown', handleEscKeyPress);
    
        // Uklanjamo event listener kada se komponenta demontira
        return () => {
          window.removeEventListener('keydown', handleEscKeyPress);
        };
      }, []); // Prazan niz znači da se useEffect izvršava samo pri montiranju i demontiranju komponente
    

      const [page, setPage] = useState(1);
      const fetchData2 = async (value) =>{
        console.log(value)
        try{
            const res = await axios.get(`/filter/users`,  {
                params: {
                    page: page,
                    pageSize: 1,
                    username: value
                }
            }) 
            const filteredUsers = res.data.filter(user => user.isAdmin === true);
            console.log(">>>>>>>>>>", filteredUsers);
            setResults(res.data.sort((a, b)=>{
                return a.username.localeCompare(b.username);
            }))
            // setResults(res.data);
            // console.log(results)
            
        }catch(err){
            console.log(err + 'greska')
        }
    }

      const nextPageHandler = () =>{
       setPage(page => page + 1);
        console.log("PAGE " + page)
        fetchData2(input)
    }

    const fetchDataFiltered = async (value) =>{
        console.log(value)
        try{
            const res = await axios.get(`/filter/users`,  {
                params: {
                    page: page - 1, //hook u sl iteraciji dodaje tako da ovde smanjujem
                    pageSize: 5,
                    username: value
                }
            }) 
            const filteredUsers = res.data.filter(user => user.posetilac === true);
            console.log(">>>>>>>>>>", filteredUsers);
            setResults(filteredUsers);
            // console.log(results)
            
        }catch(err){
            
            console.log(err + 'greska')
        }
    }

    const filterHandler = () =>{
        fetchDataFiltered(input)
    }


    const previousPageHandler = () =>{
        
        if(page > 0){
            setPage(page => page - 1);
            console.log("PROSLI")
        }
        
        console.log("PAGE " + page)
        fetchData2(input)
        
    }

    return (
        <div className="topbar">
            <div className="topbarLeft">
                {/* klikom vraca na home stranicu */}
                <Link to="/" style={{ textDecoration: 0 }}>
                    <span className="logo">Free speech</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon" />
                    <input placeholder="Pretrazite prijatelje" className="searchInput" 
                    value={input} onChange={(e)=>handleChange(e.target.value)}/>
                    
                    <SearchResultList results={results}/>
                    <span className="topbarRight" onClick={previousPageHandler}><ArrowBackIcon/></span>
                    <span className="topbarRight" onClick={filterHandler}>Filter</span>
                    <span className="topbarRight"><ArrowForwardIcon onClick={nextPageHandler}/></span>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                        <span className="topbarLink" onClick={nextPageHandler}>Pocetna</span>
                        <span className="topbarLink" onClick={handleClick}>Logout</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconNumber">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconNumber">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconNumber">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`} style={{ textDecoration: 0 }}>
                    <img src={user.profilePicture ? PublicFolder+user.profilePicture : PublicFolder+"noAvatar.png"} alt="" className="profilePicture" />
                </Link>
            </div>
        </div >
    );
}