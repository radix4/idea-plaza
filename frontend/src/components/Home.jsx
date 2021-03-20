import { Button } from 'react-bootstrap'
import React from 'react'
import Post from './Post'
import MyNavbar from './MyNavbar'

const Home = () => {
  return (
    <div>
      <MyNavbar />
      <div className='d-flex justify-content-between mt-5 pt-4 pl-5 ml-5 pr-4'>
        <div className='flex-column p-2 pr-4'>
          <Button variant='primary' className='btn-block'>
            Create New Idea
          </Button>
          <Post />
          <Post />
        </div>
        <div class='container bg-light rounded p-3 h-25'>
          <div class='row'>
            <div class='col'>
              <a href='#'>Help</a>
            </div>
            <div class='col'>
              <a href='#'>About</a>
            </div>
            <div class='w-100'></div>
            <div class='col'>
              <a href='#'>Contact</a>
            </div>
            <div class='col'>
              <a href='#'>Careers</a>
            </div>
            <div class='w-100'></div>
            <div class='col'>
              <a href='#'>Blog</a>
            </div>
            <div class='col'>
              <a href='#'>Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
