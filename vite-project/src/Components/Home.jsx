import { Link } from 'react-router-dom'
import '../styles/Home.css'

import { useContext } from 'react'
import { AuthContext } from '../App'
export default function Home(){
    const {userName, password, handleLogout} = useContext(AuthContext)

    return (
        <div className='Master-Logued'>
                {userName && password ?
                    <div>
                        <div className='Logued-user'>
                            <div className='Global-Logued'>
                                <h1>HOME</h1>
                            </div>
                            <button onClick={handleLogout} className='Home-btn'>Logout</button>
                        </div>
                        <h1 className='title-two'>The best clothes for you!</h1>
                        <p>Let`s check ours amazing products. You will Love it! 😉</p>
                        <Link to="/products"><button>View All Products</button></Link>
                    </div>
                    :
                    <div className='Not-Logued-User'>
                        <h1>You do not have logued 😥</h1>
                        <h1>401 Unauthotized</h1>
                        <Link to="/login"><button className='Home-btn'>LOGIN</button></Link>
                        <Link to="/register"><button className='Home-btn'>REGISTER</button></Link>
                    </div>
                }
        </div>
    )
}