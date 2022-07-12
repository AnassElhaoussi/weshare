

import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import { useAuthContext } from '../context/AuthContext'
import TextPost from './TextPost'
import { auth, db } from '../firebase'
import { Avatar } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarth } from '@fortawesome/free-solid-svg-icons'


const Home = () => {

  const user = useAuthContext()
  const [isClicked, setIsClicked] = useState(false)
  const [posts, setPosts] = useState([])


  
  useEffect(() => {
      db.collection('posts').orderBy('createdAt').onSnapshot(snapshot => {
        setPosts(
          snapshot.docs.map(doc => 
            doc.data()
          )
        )

      })

      console.log(posts);
  }, [])

  

  



  return (
    <div className='flex flex-col gap-10 flex-shrink w-2/3 relative'>
        <button className='bg-gray-100 py-2 px-4 sm:w-1/2 text-gray-400 shadow-md rounded cursor-pointer flex-shrink-0'
        onClick={() => setIsClicked(!isClicked)}
        >
          {`What's on your mind, ${user.displayName}?`}
        </button>

    {isClicked && (
        <TextPost isClicked={isClicked} setIsClicked={setIsClicked} />
    )}
    <div className='flex flex-col gap-4'>
      
    </div>
    </div>
  )
}

export default Home