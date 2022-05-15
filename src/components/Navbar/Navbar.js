
import React, { useContext, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { Context } from '../../Contexts/ContextProvider'

import './navbar.css'

function Navbar() {
    const [display, setDisplay] = useState(true)
    const {user,setUser} = useContext(Context);
    const [close, setClose] = useState(true)
    const navigate = useNavigate()
    const closed = () =>{
        setClose(!close);
    }
    const navOpen = () =>{
        setDisplay(!display)
    } 
    const write = (e) =>{
        e.preventDefault()
        navigate("/write")
    } 
    const logout = async(e)=>{
        e.preventDefault();
        localStorage.removeItem("userInfo");
        setUser(null); 
        navigate("/") 
    }
    console.log(user?.others?.isAdmin);

  return (
      <>

    {display ?<div className='navbar-active' >
       <div onClick={closed}>{close?<i className="fa-solid open fa-2xl fa-bars" onClick={navOpen}></i>:<i className="fa-solid close fa-2xl fa-xmark" onClick={navOpen} ></i>}</div> 
        <div className='left'>
            <ul>
                <Link className='li' to='/' >Home</Link>
                <Link className='li' to='/allPost' >All post</Link>
                <Link className='li'  to='/about'  >About</Link>
            </ul>
        </div>
 <div className='right'>
        {user?.others?.isAdmin === "true" && <button className='right-btn' onClick={write}><i className="fa-light fa-xl fa-plus">Post</i></button>}
       { user && <button className='right-btn1' onClick={logout} ><i className="fa-solid  fa-arrow-right-from-bracket">Logout</i></button>}
       <img src={user?user.others?.profilePic:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjA0Lpsg840JNGLaPgVWM9QofkvAYdFPLb-g&usqp=CAU'} alt='image'></img>

        </div>
    </div>:
    
    <div className='navbar'>
               <div onClick={closed}>{close?<i className="fa-solid open fa-2xl fa-bars" onClick={navOpen}></i>:<i className="fa-solid close fa-2xl fa-xmark" onClick={navOpen} ></i>}</div> 
              
        <div className='left1'>
            <ul>
                <Link className='li' to='/' >Home</Link>
                <Link className='li' to='/allPost' >All post</Link>
                <Link className='li'  to='/about'  >About</Link>
            </ul>
        </div>
        <div className='right'>
        { user && <span className='right-btn2' onClick={logout} ><i className="fa-solid fa-arrow-right-from-bracket">Logout</i></span>}
        </div>
    </div>

}
    </>
  )
}

export default Navbar