import React, { useContext } from 'react'
import {  } from 'react-router-dom'
import { Context } from '../../Contexts/ContextProvider'
import './slidbar.css'
function Slidbar({userInfo}) {
  const {setCat} = useContext(Context)

  const handleClick =(e) =>{
    e.preventDefault()
    setCat("")
  }
  const handleClick1 =(e) =>{
    e.preventDefault()
    setCat("Blockchain")
  }
  const handleClick2 =(e) =>{
    e.preventDefault()
    setCat("Technology")
  }
  const handleClick3 =(e) =>{
    e.preventDefault()
    setCat("Politics")
  }
  const handleClick4 =(e) =>{
    e.preventDefault()
    setCat("Sports")
  }
  const handleClick5 =(e) =>{
    e.preventDefault()
    setCat("Business")
  }
  const handleClick6 =(e) =>{
    e.preventDefault()
    setCat("Trading")
  }

  return (
    <div className='slidbar' >
    <div className='upper-part-slidbar'>
      <p> This popular post is created by</p>
     <div className='img'>
       <img id='img' src={userInfo.createdBy?.profilePic}></img>
     </div>
     <div className='name'>
         <h4>{userInfo.createdBy?.username}</h4>
    </div>
    <div className='email'>
        <h5>{userInfo.createdBy?.email}</h5>
    </div>
    </div>
    <div className='lower-part-slidbar'>
      <div className='heading'>
        <h1  onClick={handleClick} >Categories</h1>
      </div>
    <div className='categories' >
       <div className='list-left'>
      <button onClick={handleClick1} ><h3>BlockChain</h3></button>
      <button onClick={handleClick2}><h3>Technology</h3></button>
      <button onClick={handleClick3}><h3>Politics</h3></button>
      </div>
      <div className='list-right'>
      <button onClick={handleClick4}><h3>Sports</h3></button>
      <button onClick={handleClick5}><h3>Business</h3></button>
      <button onClick={handleClick6}><h3>Trading</h3></button>
      </div>
      </div>
    </div>
  </div>
  )
}

export default Slidbar