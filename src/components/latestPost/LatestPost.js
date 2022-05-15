import React, { useContext, useState } from 'react'
import { Context } from '../../Contexts/ContextProvider'
import './latestPost.css'
import { SpinnerCircular } from 'spinners-react';
import { Link } from 'react-router-dom';
function LatestPost({popularPost}) {

  // const {popularPost,setPopularPost} = useContext(Context)

  return (
    <>
{<div className='latest-post'>
      <div className='img-left'>
      <img src={popularPost?.postImage} alt='image'></img>
      </div>
      <div className='latest-right'>
        <div className='desc-right'>
          <h3>{popularPost?.title?.length>100?popularPost?.title.substring(0,100):popularPost?.title}</h3>
          <p>{popularPost?.desc?.length>400?popularPost?.desc.substring(0,400):popularPost?.desc}</p>
        </div>
        <div className='btn-right'>
              <button type='submit'><Link className="card-title" style={{textTransform: 'capitalize' }} to={`/singlePost/${popularPost?._id}`}>
            Read More
        </Link></button>
        </div>
      </div>
     

    </div>}
  </>
  )
}

export default LatestPost