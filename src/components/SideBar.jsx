
import React, {useEffect} from 'react'
import { useDisclosure } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,

} from '@chakra-ui/react'
import AccountModal from './AccountModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCompass, faMessage, faMoon, faGear, faSignOut, faUser, faSun } from "@fortawesome/free-solid-svg-icons";
import { auth } from '../firebase';
import {Link} from 'react-router-dom'



const SideBar = ({darkTheme, setDarkTheme}) => {

  const {isOpen, onToggle, onClose} = useDisclosure()

  const handleSignOut = () => {
    auth.signOut()
  }

  useEffect(() => {
    localStorage.setItem('darktheme', darkTheme)
   }, [darkTheme])

  return (
    
        <div className='relative z-50'>
          <div className='fixed flex flex-col gap-10 text-md-300 cursor-pointer bg-gray-50 dark:bg-gray-800 dark:text-gray-300 px-6 pt-10 lg:pb-16 rounded-lg font-bold w-fit'>

            <div className='flex gap-5 items-center hover:text-blue-500 hover:dark:text-blue-700 transition-colors'>
              <FontAwesomeIcon icon={faHouse} />
              <h3 className='lg:flex hidden'>Home</h3>
            </div>
              <Link to='/weshare/messages'>
                <div className='flex gap-5 items-center hover:text-blue-500 hover:dark:text-blue-700 transition-colors'>
                    <FontAwesomeIcon icon={faMessage} />
                    <h3 className='lg:flex hidden'>
                      Messages
                    </h3>
                </div>
              </Link>
            <div className='flex gap-5 items-center hover:text-blue-500 hover:dark:text-blue-700 transition-colors' onClick={() => setDarkTheme(!darkTheme) }>
              <FontAwesomeIcon icon={darkTheme ? faSun : faMoon} />
              <h3 className='lg:flex hidden select-none' >{darkTheme ? "Light Mode" : "Dark mode"} </h3>
            </div>
            <div className='flex gap-5 items-center'>
                <Menu>
                  <MenuButton className='' >
                    <FontAwesomeIcon icon={faGear} className='' />
                  </MenuButton>
                  <h3 className='lg:flex hidden'>Settings</h3>
                  <MenuList className='dark:bg-gray-800' border='0'>
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
              <button className='lg:flex absolute hidden left-5 bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-300 px-4 py-2 rounded-3xl hover:bg-white hover:dark:bg-gray-300 hover:border-blue-500 hover:border-2 hover:text-blue-500 hover:dark:text-blue-700 transition-all'>Create Post</button>
            </div>
          </div>
        </div>

        
  
  )
}

export default SideBar