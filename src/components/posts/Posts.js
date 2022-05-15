import React, { useContext } from 'react'
import { SpinnerCircular } from 'spinners-react'
import { Context } from '../../Contexts/ContextProvider'
import Post from '../post/Post'
import './posts.css'
function Posts({posts}) {
  
  return (
    <div className='container'>
      <div className='row'>
      {posts?.map((p) =>(
        <Post key={p._id} newPost={p}/>
      ))}
      </div>
    </div>
  )
}

export default Posts