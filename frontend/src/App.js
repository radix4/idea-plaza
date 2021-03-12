import React from 'react'
import Home from './components/Home'
import MyNavbar from './components/MyNavbar'

const App = () => {
  return (
    <div>
      <MyNavbar />
      <div className='d-flex justify-content-between pt-5 mt-5 pl-5 ml-5 pr-4'>
        <div class='pr-4'>
          <Home className='home' />
        </div>
      </div>
    </div>
  )
}

export default App
