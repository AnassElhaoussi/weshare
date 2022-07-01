
import React from 'react'
import {SearchIcon} from '@chakra-ui/icons'

const NavBar = () => {
  return (
    <div className="fixed top-0 left-10 right-10 flex justify-between py-2">
        <h1 className='text-2xl font-bold'>we<span className='text-blue-500'>share.</span></h1>
        <div className='relative'>
            <input type="text" placeholder='Search for posts..' className='bg-gray-100 py-1 px-10 rounded outline-none' />
            <SearchIcon className="absolute right-5 top-2 cursor-pointer" />
        </div>
        <div className='relative'>
            <button 
            className='absolute right-0 bg-blue-500 py-1 px-5 rounded-3xl font-bold
            text-white hover:bg-white hover:border-2 hover:border-blue-500 
            hover:text-blue-500 transition-all'
            >Login</button>
        
        </div>
        
    </div>
  )
}

export default NavBar