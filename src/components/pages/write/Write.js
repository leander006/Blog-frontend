import { Spinner, useToast } from '@chakra-ui/react';
import axios from 'axios';

import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import { Context } from '../../../Contexts/ContextProvider';
import Footer from '../../footer/Footer'
import Navbar from '../../Navbar/Navbar'
import './write.css'



function Write() {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [select, setSelect] = useState("");
    const [img, setImg] = useState(null);
    const [url, setUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const toast = useToast()
    const navigate = useNavigate();
    const handleImageValidation = async (e) =>{
        const file = e.target.files[0]
        if(file.size>1048576)
        {
          setImg(null)
        }
        else{
          setImg(file)
        }
    
    
    }

    const uploadImg = async (e) =>{
      e.preventDefault()
      if(!img)
      {
        setUrl("")
        return
      }
      const data = new FormData();
      data.append("file",img)
      data.append("upload_preset",'blogwebsite')
      setUploading(true)
      fetch("https://api.cloudinary.com/v1_1/dj-sanghvi-college/image/upload",{
        method:'post',
        body:data
      }).then((res) => res.json())
        .then((data) =>{
          setUploading(false)
          setUrl(data.url)
          toast({
            description: "Image Uploaded",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        }).catch((err) =>{
          setUploading(false)
          toast({
            description: "Image not uploaded",
            status: 'warning',
            duration: 5000,
            isClosable: true,
          })
          console.log(err);
        })
      }
const handleSubmit = async(e) => {
  e.preventDefault();
try {
    const config ={
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token}`
        }
      }
    const {data} = await axios.post("http://localhost:4001/api/posts",{title, desc, categories:select,postImage:url},config);
    toast({

      description: "Post uploaded successfully",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    // setPosts([data,...posts])
    navigate('/allPost');
  
}catch (err) {
  console.log(err);
    toast({
      description: err.message,
      status: 'warning',
      duration: 5000,
      isClosable: true,
    })
  }
  
};

      
  return (
    <>
    <Navbar/>
         <div className="write">
            <div className="write-col-1">
              <h1>Create your post</h1>
              <p>Share your knowledge to other people</p>
                <form id='form-write' className='flex flex-col'onSubmit={handleSubmit} >
                {!uploading?<img className='image' src={url?url:"nn.png"} alt='image'></img>: <SpinnerCircular size="90" className='spinner-register' thickness='100'  speed="400" color='red' secondaryColor="grey"/>}
                <label htmlFor='forFile'><i className="fa-solid fa-2xl fa-plus"></i></label>
                <input type="file" type="file" id='forFile' accept='image/png , image/jpg, image/jpeg' style={{display:"none"}} onChange={handleImageValidation}  name="file" required />
                <div className="button input-box">
                <input type="submit" value="Upload Image" onClick={uploadImg} />
              </div>

                <div className="input-box">
                  <input type="text" placeholder="Enter title of your post" onChange={e=>setTitle(e.target.value)}  required/>
                </div>

                <div className="input-desc">
                <textarea placeholder="Enter your post" onChange={e=>setDesc(e.target.value)}  required/>
                </div>

              <select name="opt" onChange={e=>setSelect(e.target.value)} >
              <option value="null">Select any one Category</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Sports">Sports</option>
                <option value="Politics">Politics</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Trading">Trading</option>
            </select>
                    <button className='btn'>Post</button>
                    
                </form>

            </div>
        </div>
    <Footer/>
    </>
  )
}

export default Write