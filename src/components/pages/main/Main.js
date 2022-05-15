import React, { useContext } from 'react'
import { Context } from '../../../Contexts/ContextProvider'
import './main.css'
import Navbar from '../../Navbar/Navbar'
import Footer from '../../footer/Footer'
function Main() {
      const {user} = useContext(Context)
  return (
    <>
          <Navbar/>
          <div className='main'> 
          <h1>Welcome {user?.others?.username}</h1>
          <h2>Enrich your knowledge and pen down your ideas</h2>
          <p>ensure that your comments and posts are free from racism and are not unhealthy </p>
          </div> 
          <Footer/>
    </>
  )
}

export default Main