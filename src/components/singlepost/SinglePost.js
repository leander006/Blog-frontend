import React, { useContext, useEffect, useState } from 'react'

import Footer from '../footer/Footer'
import Navbar from '../Navbar/Navbar'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './singlePost.css'
import axios from 'axios';
import { Context } from '../../Contexts/ContextProvider';
import Comments from '../comments/Comments';
import { useToast } from '@chakra-ui/react';
import { SpinnerCircular } from 'spinners-react';


function SinglePost() {

  const {user,setDeleted} = useContext(Context)

    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const {PostId} = useParams()
    const [posts, setPosts] = useState([])
    const [Edits, setEdits] = useState(false)

    const [postId, setPostId] = useState("")
    const [title, setTitle] = useState("")
    const [desc, setdesc] = useState("")
    const [comment, setComment] = useState("")
    const [img, setImg] = useState("")
    const [category, setCategory] = useState("")
    const [comments, setComments] = useState([])
    const [date, setDate] = useState("")
    const [createdBy, setCreatedBy] = useState("")
    const toast = useToast()
    const navigate = useNavigate();

    const [imgs, setImgs] = useState(null);
    const [urls, setUrls] = useState("");
    const [uploading, setUploading] = useState(false);

  
    const [WriteTitle, setWriteTitle] = useState("")
    const [WriteDesc, setWriteDesc] = useState("")
    const [WriteSelect, setWriteSelect] = useState("")

    const config ={
      headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token}`
      }
    }
    useEffect(() => {
        const getPost = async() =>{
            const posts = await axios.get("http://localhost:4001/api/posts/"+path,config)
            setTitle(posts.data?.title)
            setdesc(posts.data?.desc)
            setImg(posts.data?.postImage)
            setCategory(posts.data?.categories)
            setComments(posts.data?.comments)
            setDate(posts.data?.createdAt)
            setCreatedBy(posts.data.createdBy?.username)
            setPostId(posts.data?.createdBy._id)
            setPosts(posts.data)
        }
        getPost()
      
      },[comments,user])

      const deleted = async(e) =>{ 
          try {
          
            await axios.delete('http://localhost:4001/api/posts/'+path,config)
            toast({

              description: "Post successfully deleted ",
              status: 'success',
              duration: 5000,
              isClosable: true,
            })

            setDeleted(true)
            navigate('/allPost')
          } catch (error) {
            console.log("catch");
            toast({

              description: error.message,
              status: 'warning',
              duration: 5000,
              isClosable: true,
            })
          }
      }



      //--------------//
      const handleImageValidation = async (e) =>{
        const file = e.target.files[0]
        if(file.size>1048576)
        {
          setImgs(null)
        }
        else{
          setImgs(file)
        }
    
    
    }

    const uploadImg = async (e) =>{
      e.preventDefault()
      if(!imgs)
      {
        setUrls("")
        return
      }
      const data = new FormData();
      data.append("file",imgs)
      data.append("upload_preset",'blogwebsite')
      setUploading(true)
      fetch("https://api.cloudinary.com/v1_1/dj-sanghvi-college/image/upload",{
        method:'post',
        body:data
      }).then((res) => res.json())
        .then((data) =>{
          setUploading(false)
          setUrls(data.url)
          console.log(data.url);
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
const handleEdit = async(e) => {
  e.preventDefault();
try {
    const {data} = await axios.put("http://localhost:4001/api/posts/"+path,{title:WriteTitle, desc:WriteDesc, categories:WriteSelect,postImage:urls},config);
    toast({

      description: "Post  updated successfully",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    setPosts([data,...posts])
    navigate('/allPost');
  
}catch (err) {
    toast({
      description: err.message,
      status: 'warning',
      duration: 5000,
      isClosable: true,
    })
  }
};

//--------------//

      const edit = async(e) =>{ 
        e.preventDefault()
        setEdits(!Edits)
      } 


const handleClick = async(e) =>{
    e.preventDefault();
    try {
          await axios.post("http://localhost:4001/api/comments/"+path,{comment},config)
          // setComment([...comments,comment])
          setComment("")
          toast({

            description: "Comment added successfully",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })

    } catch (error) {
        console.log(error);
        toast({

            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
    }
}

  return (
      <>
      <Navbar/>
          {!Edits ? <div className='single-post'>
           {user?.others._id === postId && <div className='update-user'>
           <i className="fa-solid fa-2xl fa-pen-to-square" id='edit' onClick={edit}></i>
            <i className="fa-solid fa-2xl fa-trash-can" id='delete' onClick={deleted} ></i>
            </div>}
   
              <div className='single-post-upper'>
              <h1 className='category'>{category}</h1>
              <img className='img' src={img}></img>
              <h1 className='title'>{title}</h1>
              <p className='description'>{desc}</p>
              <div className='createdBy-date'>
                    <h1 className='createdBy'>Created By : {createdBy}</h1>
                    <h2 className='date'>Created on : {new Date(date).toDateString()}</h2>
               </div>
   
           
              </div>
          <div className='single-post-lower'>
              <textarea placeholder='Write your comments...' onChange={e=>setComment(e.target.value)} value={comment} ></textarea>
              <button id='btn' onClick={handleClick} >Comment</button>
              {comments?.length>0?comments.map((c) =>(
                        <Comments key={c._id} comment={c}/>
                )):<div className='noComments'>No comments </div>}
        
          </div>
                
         </div>:<div className="write">
            <div className="write-col-1">
               <p>Update Your post </p>
                <form id='form-write' className='flex flex-col'onSubmit={handleEdit} >
                {!uploading?<img className='image' src={urls?urls:"nn.png"} alt='image'></img>: <SpinnerCircular size="90" className='spinner-register' thickness='100'  speed="400" color='red' secondaryColor="grey"/>}
                <label htmlFor='forFile'><i className="fa-solid fa-2xl fa-plus"></i></label>
                <input type="file" type="file" id='forFile' accept='image/png , image/jpg, image/jpeg' style={{display:"none"}} onChange={handleImageValidation}  name="file" required />
                <div className="button input-box">
                <input type="submit" value="Upload Image" onClick={uploadImg} />
              </div>

                <div className="input-box">
                  <input type="text" placeholder="Enter title of your post" onChange={e=>setWriteTitle(e.target.value)}  required/>
                </div>

                <div className="input-desc">
                <textarea placeholder="Enter your post" onChange={e=>setWriteDesc(e.target.value)}  required/>
                </div>

              <select name="opt" onChange={e=>setWriteSelect(e.target.value)} >
              <option value="null">Select any one Category</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Sports">Sports</option>
                <option value="Politics">Politics</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Trading">Trading</option>
            </select>
                    <button className='btn'>Updated</button>
                    
                </form>

            </div>
        </div>}

     <Footer/>
      </>

  )
}

export default SinglePost