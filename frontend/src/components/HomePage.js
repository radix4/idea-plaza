import { Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import Idea from './Idea'
import MyNavbar from './MyNavbar'

const HomePage = () => {
  const [user, setUser] = useState()

  /* This function checks if the user is already logged in. */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('front/component/HomePage.js: logged in user found', user)
    }
  }, [])

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
