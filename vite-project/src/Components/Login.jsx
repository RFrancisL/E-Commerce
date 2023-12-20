import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../styles/Login.css'

export default function Login(){
    function handleSubmit(event){
        event.preventDefault()
    }
    
    const [userName, setUserName] = useState('')
    const [statePassword, setStatePassword] = useState('')

    function handleLogin(userName, statePassword){
        setUserName({userName});
        setStatePassword({statePassword})
    }

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    return (
        <div className="Card">
            <div className="Tittle">
                    <h1>E-Commerce</h1>
                    <p>Log in to Your Count! 😎</p>
            </div>
            <form onSubmit={handleSubmit} className="Form-Login">
                <h1>USERNAME</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(event)=>{setUserName(event.target.value)}}
                />
                <h1>PASSWORD</h1>
                <input 
                    type="password"
                    placeholder="Password"
                    value={statePassword}
                    onChange={(event)=>setStatePassword(event.target.value)}/>
            </form>
            <button type="submit" className="Enter-Btn" onClick={()=>{
                handleLogin(userName, statePassword)
                navigate(from, {replace: true})
            }}>
                <h3><Link to="/" style={{textDecoration:'none', color: '#30302F'}}>ENTER</Link></h3>
            </button>
            <p>Do you have not any acount? Not problem</p>
            <h3> 
                <Link to="/register" style={{textDecoration:'none', color:'#30302F'}}>Register</Link>
            </h3>
        </div>
    )
}