import React, { useState } from 'react'
import AllProjects from './AllProjects'
import profileImage from '../images/background.png'

const Profile = () => {
  const [name, setName] = useState('Allen Baek')
  const [bios, setBios] = useState('My bios')
  const [achieve, setAchieve] = useState('My achievements')

  return (
    <div className='scrolling'>
      {/* Background Box*/}
      <div className='box'></div>

      {/* Button */}
      <div className='goEdit_placement'></div>
      {/* ProfileImage */}
      <div className='container2'>
        <img src={profileImage} alt='Image_file' id='clip' />
      </div>

      {/* Input fields */}
      <div className='display'>
        <div className='NameSize'>{name}</div>

        <br />
        <div className='bold'>Bios</div>

        <div>{bios}</div>
        <br />
        <div className='bold'>Achievements</div>
        <div>{achieve}</div>
      </div>
      {/* displays list of projects */}
      <div className='cardPlacement'>
        <AllProjects />
      </div>
    </div>
  )
}

export default Profile
