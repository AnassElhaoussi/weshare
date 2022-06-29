
import React from 'react'
import { Avatar } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCompass, faMessage, faMoon, faGear } from "@fortawesome/free-solid-svg-icons";


const SideBar = () => {
  return (
    <div className='flex flex-col gap-12 text-xl mt-14 cursor-pointer bg-gray-50 px-6 py-10 rounded-lg font-bold'>
      <div className='flex gap-5 items-center'>
        <FontAwesomeIcon icon={faHouse} />
        <h3 className='md:flex hidden'>Home</h3>
      </div>
      <div className='flex gap-5 items-center'>
        <FontAwesomeIcon icon={faCompass} />
        <h3 className='md:flex hidden'>Explore</h3>
      </div>
      <div className='flex gap-5 items-center'>
        <FontAwesomeIcon icon={faMessage} />
        <h3 className='md:flex hidden'>Messages</h3>
      </div>
      <div className='flex gap-5 items-center'>
        <FontAwesomeIcon icon={faMoon} />
        <h3 className='md:flex hidden'>Theme</h3>
      </div>
       <div className='flex gap-5 items-center'>
        <FontAwesomeIcon icon={faGear} />
        <h3 className='md:flex hidden'>Setting</h3>
       </div>

    </div>
  )
}

export default SideBar