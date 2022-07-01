
import React from 'react'
import { Avatar } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCompass, faMessage, faMoon, faGear } from "@fortawesome/free-solid-svg-icons";


const SideBar = () => {
  return (

        <div className=' fixed flex flex-col gap-10 text-md mt-16 cursor-pointer bg-gray-50 px-6 pt-10 md:pb-16 rounded-lg font-bold'>
            <div className='flex gap-5 items-center hover:text-blue-500 transition-colors'>
              <FontAwesomeIcon icon={faHouse} />
              <h3 className='md:flex hidden'>Home</h3>
            </div>
            <div className='flex gap-5 items-center hover:text-blue-500 transition-colors'>
              <FontAwesomeIcon icon={faCompass} />
              <h3 className='md:flex hidden'>Explore</h3>
            </div>
            <div className='flex gap-5 items-center hover:text-blue-500 transition-colors'>
              <FontAwesomeIcon icon={faMessage} />
              <h3 className='md:flex hidden'>Messages</h3>
            </div>
            <div className='flex gap-5 items-center hover:text-blue-500 transition-colors'>
                <Menu>
                  <MenuButton className='' >
                    <FontAwesomeIcon icon={faMoon} className='' />
                  </MenuButton>
                  <h3 className='md:flex hidden'>Themes</h3>
                  <MenuList>
                    <MenuItem>Dark Mode</MenuItem>
                    <MenuItem>Light Mode</MenuItem>
                  </MenuList>
                </Menu>
            </div>
            <div className='flex gap-5 items-center hover:text-blue-500 transition-colors'>
                <Menu>
                  <MenuButton className='' >
                    <FontAwesomeIcon icon={faGear} className='' />
                  </MenuButton>
                  <h3 className='md:flex hidden'>Settings</h3>
                  <MenuList>
                    <MenuItem>Login</MenuItem>
                    <MenuItem>Sign up</MenuItem>
                  </MenuList>
                </Menu>
            </div>
            <div className=''>
              <button className='absolute md:flex hidden left-5 bg-blue-500 text-white px-4 py-2 rounded-3xl hover:bg-white hover:border-blue-500 hover:border-2 hover:text-blue-500 transition-all'>Create Post</button>
            </div>
        </div>
        
  
  )
}

export default SideBar