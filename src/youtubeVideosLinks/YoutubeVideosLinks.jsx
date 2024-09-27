import React, { useState } from 'react'
import './youtube.css'
import Spinner from '../components/SpinLoader'
const YoutubeVideosLinks = ({data, loadingYoutubeVideos}) => {
  console.log('data', data)
  return (
    <div className='youtubeVideosLinksContainer'>

{data?.map((result, index) => (
          <div className='videoLinkCard' key={index}>
            <div className="iframe">
            <iframe  src={`https://www.youtube.com/embed/${result.id}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <p className="article"><b>Video Title:</b> {result.title}</p>
            {result.type === 'article' && <p className="article"><b>Article Link:</b> <a target='_blank' href={`${result.link}`}>{result.link}</a></p>}
          </div>
        ))}
        {loadingYoutubeVideos && <Spinner/>}
      
    </div>
  )
}

export default YoutubeVideosLinks
