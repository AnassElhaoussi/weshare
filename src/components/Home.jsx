
import React, { useState } from 'react'
import Messages from './Messages'
import { useAuthContext } from '../context/AuthContext'

const Home = () => {

  const user = useAuthContext()
  const [isClicked, setIsClicked] = useState(false)

  return (
    <div className='flex flex-col flex-shrink gap-6 w-2/3'>
        <button className='bg-gray-100 py-2 px-4 md:w-1/2 text-gray-400 rounded cursor-pointer flex-shrink-0'>{`What's on your mind ${user.displayName} ?`} </button>
        <p>HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH</p>
    </div>
  )
}

export default Home