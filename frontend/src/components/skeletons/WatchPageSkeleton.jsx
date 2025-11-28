import React from 'react'

const WatchPageSkeleton = () => {
  return (
    <div className='animate-pulse '>
      <div className='bg-gray-700 rounded-md w-40 h-4 mb-4 shimmer'/>
      <div className='bg-gray-700 rounded-md w-full h-52 mb-20 shimmer'/>
      <div className='bg-gray-700 rounded-md w-3/4 h-4 mb-4 shimmer'/>
      <div className='bg-gray-700 rounded-md w-1/2 h-4 mb-4 shimmer' />
      <div className='bg-gray-700 rounded-md w-full h-20 mb-4 shimmer'/>
    </div>
  )
}

export default WatchPageSkeleton