import { useContext, useRef } from "react"
import "./login.css"
import { Link } from "react-router-dom"
import { loginCall } from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext"

export default function Login() {

    const email = useRef()
    const password = useRef()

    const {user, isFetching, error, dispatch} = useContext(AuthContext)

    const handleClick = (e) =>{
        e.preventDefault()
        loginCall({email:email.current.value, password:password.current.value}, dispatch)
    }

    console.log(user)
    return (
        <div className="login">
            <div className="loginWrapp">
                <div className="loginLeft">
                    <h3 className="socialAppName">Free speech</h3>
                    <span className="loginDescription">Povezite se sa ljudima i prijateljima svuda u svetu!</span>
                </div>
                <div className="loginRight">
                    <form className="loginForm" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" required className="loginInput"  ref={email}/>
                        <input placeholder="Lozinka" type="password" required minLength="5" className="loginInput"   ref={password}/>
                        {/* <Link to="/" style={{ textDecoration: 0 }}> */}
                            <button className="loginButton" disabled={isFetching}> {isFetching ? "Ucitavanje..." : "Ulogujte se"}</button>
                        {/* </Link> */}
                        <span className="forgotPassword">Zaboravili ste lozinku?</span>
                        <Link to="/register" style={{ textDecoration: 0 }}>
                            <button className="registerButton">Kreirajte novi nalog</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}