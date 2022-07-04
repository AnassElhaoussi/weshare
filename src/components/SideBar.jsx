
import React from 'react'
import { useDisclosure } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,

} from '@chakra-ui/react'
import AccountModal from './AccountModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCompass, faMessage, faMoon, faGear, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { auth } from '../firebase';



const SideBar = () => {

  const {isOpen, onToggle, onClose} = useDisclosure()

  const handleSignOut = () => {
    auth.signOut()
  }

  return (

        <div className=' fixed flex flex-col gap-10 text-md mt-16 cursor-pointer bg-gray-50 px-6 pt-10 md:pb-16 rounded-lg font-bold w-fit'>
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
              <FontAwesomeIcon icon={faMoon} />
              <h3 className='md:flex hidden'>Dark mode</h3>
            </div>
            <div className='flex gap-5 items-center'>
                <Menu>
                  <MenuButton className='' >
                    <FontAwesomeIcon icon={faGear} className='' />
                  </MenuButton>
                  <h3 className='md:flex hidden'>Settings</h3>
                  <MenuList>
                    <MenuItem className='flex gap-3' onClick={onToggle}>
                      <FontAwesomeIcon icon={faUser} />
                      <h3>Account</h3>
                    </MenuItem>
                    <MenuItem className='flex gap-3' onClick={handleSignOut}> 
                      <FontAwesomeIcon icon={faSignOut} />
                      <h3>Sign Out</h3>
                     </MenuItem>
                  </MenuList>
                </Menu>
                <AccountModal isOpen={isOpen} onClose={onClose}  /> 
            </div>
            <div className=''>
              <button className='absolute md:flex hidden left-5 bg-blue-500 text-white px-4 py-2 rounded-3xl hover:bg-white hover:border-blue-500 hover:border-2 hover:text-blue-500 transition-all'>Create Post</button>
            </div>
        </div>
        
  
  )
}

export default SideBar