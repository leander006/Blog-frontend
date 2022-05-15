import React, { useContext } from 'react'


import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react'
import Navbar from '../../Navbar/Navbar';
import Footer from '../../footer/Footer';
import { Context } from '../../../Contexts/ContextProvider';

function Login() {
  const navigate = useNavigate();
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [cpassword,setCPassword]=useState("");
  const {setUser} = useContext(Context)
  const toast = useToast()
  const handleSubmit = async(e) => {

    e.preventDefault();

    
    try {
      if(password !== cpassword){
        return toast({
        
          description: "Password not matching",
          status: 'warning',
          duration: 700,
          isClosable: true,
        })
      }
      const {data} = await axios.post("http://localhost:4001/api/auth/login", {
        username,
        password,
      });
   
      localStorage.setItem("userInfo",JSON.stringify(data));

      setUser(data)
      navigate('/');
      toast({
        
        description: "Login successfully",
        status: 'success',
        duration: 700,
        isClosable: true,
      })
    
    } catch (err) {
     
      if(!username)
      {
        toast({
        description: "Enter Username ",
        status: 'error',
        duration: 700,
        isClosable: true,
      })
      return
      }
      if(!password)
      {
        toast({
        description: "Enter Password ",
        status: 'error',
        duration: 700,
        isClosable: true,
      })
      return
      }
      else{
      toast({

        description: "Wrong Credentials",
        status: 'warning',
        duration: 700,
        isClosable: true,
      })
    }
  
    }
  };


  return (
    <>
    <Navbar/>
    {/* <div className='register'>
   
  <div className="leftPart">
    <div className="forms">
        <div className="form-content">
        <div className="signup-form">
          <div className="title">Sign in</div>
        <form onSubmit={handleSubmit}>
            <div className="input-boxes">
              <div className="input-box">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Enter your name" onChange={e=>setUsername(e.target.value)} required />
              </div>
              <div className="input-box">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Enter your password" onChange={e=>setPassword(e.target.value)} required  />
              </div>
              <div className="button input-box">
                <input type="submit" value="Sumbit"/>
              </div>
              <div className="text sign-up-text">Don't have a acocunt?<Link to='/register'><label htmlFor="flip"  >Register now</label></Link> </div>
            </div>
      </form>
    </div>
    </div>
    </div>
  </div>
<div className='rightPart'>
      <h1>LOGIN RIGHT PART</h1>
</div>

    </div> */}



<div className="register">
            <div className="col-1">


                <form id='form' className='flex flex-col'onSubmit={handleSubmit} >
                <h2>Login In</h2>
                <span>And enrich your knowledge</span>
                <div className="input-box">
                  <i className="fas fa-2xl fa-user"></i>
                  <input type="text" placeholder="Enter your name" onChange={e=>setUsername(e.target.value)}   required/>
                </div>
                <div className="input-box">
                <i className="fas fa-2xl fa-lock"></i>
                <input type="password" placeholder="Enter your password" onChange={e=>setPassword(e.target.value)} required/>
                </div>

                <div className="input-box">
                <i className="fas fa-2xl fa-lock"></i>
                <input type="password" placeholder="Confirm your password" onChange={e=>setCPassword(e.target.value)} required/>
                </div>
                    <button className='btn'>Login</button>
                    <p className="sign-up-text">Don't have a acocunt?<Link to='/register'><label >Register now</label></Link> </p>
                </form>
    
            </div>
            <div className="col-2">
            <h1 id='h1'>Blogging isn't about publishing</h1>
                 <h1 id='h1'> as much as you can.</h1>
                 <h1 id='h2'>It's about publishing </h1>
                  <h1 id='h2'>as smart as you can.</h1>
            </div>
        </div>
    <Footer/>
    </>
  )
}

export default Login