
import React from 'react'
import {SearchIcon} from '@chakra-ui/icons'
import { auth } from '../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { useSearchPostsContext } from '../context/SearchPostsContext'


const NavBar = () => {

  const [searchValue, setSearchValue] = useSearchPostsContext()

  return (
    <div className=''>
      <div className="flex flex-wrap gap-4 justify-between py-2 px-6 items-center bg-white dark:bg-gray-900">
          <h1 className='text-2xl font-bold dark:text-gray-300'>we<span className='text-blue-500 dark:text-blue-700'>share.</span></h1>
          <div className='relative'>
              <input 
              type="text" 
              placeholder='Filter by tag' 
              className='bg-gray-100 dark:bg-gray-800 dark:text-gray-300 py-1 px-10 rounded outline-none' 
              value={searchValue} 
              onChange={(e) => setSearchValue(e.target.value)} />
          </div>
          
      </div>
    </div>
    
  )
}

export default NavBar