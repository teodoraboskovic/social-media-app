import "./register.css"
import { Link } from "react-router-dom"
import { useContext, useRef } from "react"
import axios from "axios"
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useHistory } from "react-router"
export default function Register() {

    const username = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const history = useHistory()

    const handleClick = async (e) =>{
        e.preventDefault()
        if(confirmPassword.current.value !== password.current.value){
            confirmPassword.current.setCustomValidity("Lozinke se ne poklapaju")
        }else{
            const user = {
                username:username.current.value,
                email:email.current.value,
                password:password.current.value
            }

            try {
                await axios.post("auth/register", user)
                history.push("/login")
            } catch (error) {
                console.log(error)
            }
            
        }
    }

    return (
        <div className="register">
            <div className="registerWrapp">
                <div className="registerLeft">
                    <h3 className="socialAppName">Free speech</h3>
                    <span className="registerDescription">Povezite se sa ljudima i prijateljima svuda u svetu!</span>
                </div>
                <div className="registerRight">
                    <form className="registerForm" onSubmit={handleClick}>
                        <input placeholder="Korisnicko ime" required ref={username} className="registerInput" />
                        <input placeholder="Email" required ref={email} className="registerInput" type="email" />
                        <input placeholder="Lozinka" required ref={password} className="registerInput" type="password" minLength="6"/>
                        <input placeholder="Ponovite lozinku" required ref={confirmPassword} className="registerInput" type="password" minLength="6"/>
                        {/* <Link to="/login" style={{ textDecoration: 0 }}> */}
                            <button className="registerButton" type="submit">Registrujte se</button>
                        {/* </Link> */}
                        <span className="loginDescription">Vec imate nalog?</span>
                        <Link to="/login" style={{ textDecoration: 0 }}>
                            <button className="loginButton">Ulogujte se</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}