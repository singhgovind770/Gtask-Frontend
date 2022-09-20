import './Navbar.css'
import { useContext } from 'react'
import {userContext} from '../../Context/userContext'



export default function Navbar(){
    const { token, settoken } = useContext(userContext)
    function handleLogout(){
        settoken(false)
        localStorage.clear()
    }


    return(
       <div className="navbar">
        <div className="logo">GTask</div>
        <div className="myAccount">
        {(token)&&
        <button onClick={handleLogout} className="logoutbtn">Logout</button>
        }
        </div>
        
       </div>
    )
}