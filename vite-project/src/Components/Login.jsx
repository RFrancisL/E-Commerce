import { useState } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import {useMutation} from 'react-query'
import '../styles/Login.css'


const LoginMutation = async ({ email, password }) => {
    try {
        const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) {
            throw new Error('ERROR RESPONSE');
        }
        return await res.json();
    } catch (error) {
        throw new Error(error);
    }
};


export default function Login(){
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    
    
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const mutation = useMutation({
        mutationFn: LoginMutation,
        onSuccess: (data) => {
            navigate(from, {replace:true}, {data})
        },
        onError: (error) => {
            console.log(error)
            return <h1>SOMETHING IS WRONG 😢, {error}</h1>
        }
    })

    function handleSubmit(event){
        event.preventDefault()
        mutation.mutate({
            email: userName,
            password: password
        })
    }

    return (
        <div className="Card-Login">
            <div className="Tittle">
                    <h1>E-Commerce</h1>
                    <p>Log in to Your Count! 😎</p>
            </div>
            <form onSubmit={handleSubmit} className="Form-Login">
                <h1>USERNAME</h1>
                <input
                    type="text"
                    placeholder="Username"
                    className="input-login"
                    value={userName}
                    onChange={(event)=>{setUserName(event.target.value)}}
                />
                <h1>PASSWORD</h1>
                <input 
                    type="password"
                    placeholder="Password"
                    className="input-login"
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}/>
            </form>
            <button type="submit" className="Enter-Btn" onClick={()=>{
                mutation.mutate({
                    email: userName,
                    password: password
                })
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
