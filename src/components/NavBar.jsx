
import React from 'react'
import {SearchIcon} from '@chakra-ui/icons'
import { auth } from '../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'


const NavBar = () => {


  return (
    <div className="fixed top-0 left-10 right-10 flex justify-between py-2 items-center">
        <h1 className='text-2xl font-bold'>we<span className='text-blue-500'>share.</span></h1>
        <div className='relative'>
            <input type="text" placeholder='Search for posts..' className='bg-gray-100 py-1 px-10 rounded outline-none' />
            <SearchIcon className="absolute right-5 top-2 cursor-pointer" />
        </div>
        
        
        
    </div>
  )
}

export default NavBar