import { Button } from 'react-bootstrap'
import React from 'react'
import Idea from './Idea'
import MyNavbar from './MyNavbar'

const HomePage = () => {
  return (
    <div>
      <MyNavbar />
      <div className='d-flex justify-content-between mt-5 pt-4 pl-5 ml-5 pr-4'>
        {/* ============= IDEAS ============= */}
        <div className='p-2 pr-4'>
          <Button variant='primary' className='btn-block'>
            Create New Idea
          </Button>
          <Idea />
          <Idea />
        </div>
        {/* ============= OTHER LINKS ============= */}
        <div className='container bg-light rounded p-3 h-25'>
          <div className='row'>
            <div className='col'>
              <a href='#'>Help</a>
            </div>
            <div className='col'>
              <a href='#'>About</a>
            </div>
            <div className='w-100'></div>
            <div className='col'>
              <a href='#'>Contact</a>
            </div>
            <div className='col'>
              <a href='#'>Careers</a>
            </div>
            <div className='w-100'></div>
            <div className='col'>
              <a href='#'>Blog</a>
            </div>
            <div className='col'>
              <a href='#'>Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
