import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(){
    function handleSubmit(event){
        event.preventDefault()
    }

    const [username, setUserName] = useState('');
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Enter a New Username</h1>
                <input 
                    type="text"
                    placeholder="New Username"
                    value={username}
                    onChange={(event)=>{setUserName(event.target.value)}}
                />
                <h1>Enter a New Password</h1>
                <input 
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(event)=>{setNewPassword(event.target.value)}}
                />
                <h1>Confirm New Password</h1>
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(event)=>{setConfirmNewPassword(event.target.value)}}
                />

                <p>If the button is disabled, that means both passwords are differents</p>
                <Link to="/login"><button type="submit" disabled={newPassword !== confirmNewPassword || !newPassword || !confirmNewPassword}>
                    REGISTER
                </button></Link>
            </form>
        </div>
    )
}