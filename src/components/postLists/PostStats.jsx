import React from 'react'

const PostStats = ({post}) => {
  return (

      <div className="flex justify-between text-xs text-gray-500 mt-3 pb-2 border-b">
            <div>{post?.likes?.length || 0} likes</div>
            <div>{post?.comments?.length || 0} comments</div>
            </div>
     
  )
}

export default PostStats
