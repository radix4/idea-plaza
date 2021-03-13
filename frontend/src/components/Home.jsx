import React from 'react'
import Post from './Post'

const Home = () => {
  return (
    <div className='flex-column justify-content-center'>
      <div>
        <Post />
      </div>
      <div>
        <Post />
      </div>
    </div>
  )
}

export default Home
