import React from 'react'
import './comment.css'
function Comments({comment}) {
return (
  <>
      <div className='comment'>
        <img src={comment.name.profilePic}></img>
        <h1>{comment.comment}</h1>

      </div>
  
  </>

 )
}

export default Comments