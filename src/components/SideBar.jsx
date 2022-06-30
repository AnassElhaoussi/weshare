
import React from 'react'
import { Avatar } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCompass, faMessage, faMoon, faGear } from "@fortawesome/free-solid-svg-icons";


const SideBar = () => {
  return (

        <div className=' fixed flex flex-col gap-10 mt-14 text-md cursor-pointer bg-gray-50 px-6 pt-10 md:pb-16 rounded-lg font-bold'>
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
            <div className=''>
              <button className='absolute md:flex hidden left-5 bg-blue-500 text-white px-4 py-2 rounded-3xl hover:bg-white hover:border-blue-500 hover:border-2 hover:text-blue-500 transition-all'>Create Post</button>
            </div>
        </div>
        
  
  )
}

export default SideBar