import React from 'react';
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'

const Navbar = () => {
    const history = useHistory()
    const name = JSON.parse(localStorage.getItem("user")).name
    console.log(name)
    return (
        <nav className="navbar sticky-top" >
            
            <Link to="/home" >blog<b style={{color:"black"}}>Post</b></Link>
            
            <div style={{position:"relative",fontSize:"20px",color:"white"}}>
                Welcome {name}
            </div>
            
            <Link to='/create'>Add Post</Link>
            

            
            <button className="btn btn-outline-light" onClick={()=> {
                    localStorage.clear()
                    history.push("/")}}>
                Log Out
            </button>
            
        </nav>
    )
}

export default Navbar