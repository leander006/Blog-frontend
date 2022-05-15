import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../Contexts/ContextProvider'
import './post.css'


function Post({newPost}) {
  return (

  <div className='col-sm-6 col-lg-4 '>
      <div className="card">
      <img src={newPost.postImage} className="card-img-top" alt="..."/>
        <div className="card-body">
        <h1>{newPost.title.length>20?newPost.title.substring(0,20):newPost.title}</h1>
          <h5 ></h5>
          <p className="card-text">{newPost.desc.length>150?newPost.desc.substring(0,150):newPost.desc}</p>
         <button className="post-button"><Link to={`/singlePost/${newPost._id}`}>
            Read More
        </Link></button>
        </div>
      </div>
  </div>

  )
}

export default Post