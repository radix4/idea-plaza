import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
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
