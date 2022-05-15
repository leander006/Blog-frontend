import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../footer/Footer'
import Navbar from '../../Navbar/Navbar'
import './home.css'
import LatestPost from '../../latestPost/LatestPost'
import Slidbar from '../../slidbar/Slidbar'
import Posts from '../../posts/Posts'
import { Context } from '../../../Contexts/ContextProvider'
import axios from 'axios'
import { SpinnerCircular } from 'spinners-react'

function Home() {
  const {user,cat} = useContext(Context)
  const [posts, setPosts] = useState([])
  const [uploading, setUploading] = useState(true)
  const [popularPost, setPopularPost] = useState("")


  useEffect(() => {
    const getPost = async() =>{
      const config ={
          headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token}`
          }
        }
        const posts = await axios.get(`http://localhost:4001/api/posts?Cat=${cat}`,config)
        setPosts(posts.data)
    }
    getPost()
  
  },[user,cat])
  useEffect(() => {
      const getPopularPost = async() =>{
        const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${JSON.parse(localStorage.getItem("userInfo"))?.token}`
            }
          }
          const posts = await axios.get("http://localhost:4001/api/posts/popular/post",config)
        //   console.log(posts)
        setUploading(false);
        setPopularPost(posts.data)
        // setUploading(true);
      }
      getPopularPost()
    
    },[user])

  return (
    <>
    <Navbar/>
   {!uploading ? <div className='home'>
        <div className='upper-part'>
        <div className='right-part'>
              <Slidbar userInfo={popularPost}/>
            </div>
            <div className='left-part'>
                <div className='left-part-1'>
                  <h5>This is popular post of the day</h5>
                  <LatestPost popularPost={popularPost}/>
                </div>
                <div className='left-part-2'>
                  <h5>
                    {cat?`This post are related to ${cat}`:"This are posts related to different categories"}
                  </h5>
                  <Posts posts={posts}/>
                </div>
            </div>
        </div>
    </div>:<SpinnerCircular size="90" id='loading'  thickness='100'  speed="400" color='red' secondaryColor="grey"/>}

    <Footer/>
    </>
  )
}

export default Home