import React from 'react'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import PostStats from './PostStats'
import PostActions from './PostActions'

const PostItem = ({post}) => {
  return (
    
    <div className="bg-white p-4 rounded-lg shadow-md" >
      <PostHeader post={post}/>
      <PostContent post={post}/>
      <PostStats post={post}/>
      <PostActions post={post}  />
    </div>
  )
}

export default PostItem
