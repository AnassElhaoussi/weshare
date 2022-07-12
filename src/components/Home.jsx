

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
      {posts.map(({text, displayName, photoURL}) => (
        <div className='flex flex-col gap-8 bg-gray-50 sm:w-96 p-5 rounded-md'>
          <div className='flex gap-3 items-center '>
            <Avatar src={user.uid === auth.currentUser.uid ? user.photoURL : photoURL} />
            <div className='flex flex-col gap-1'>
              <h2>@{user.uid === auth.currentUser.uid ? user.displayName : displayName}</h2>
              <h3 className='text-xs text-blue-500'>Your post is now seen by everyone <FontAwesomeIcon icon={faEarth} className='ml-1' /> </h3>
            </div>
          </div>
          <div className='flex relative'>
            <p className='text-xl mb-10'>{text}</p>
            <h3 className='text-xs absolute right-0 bottom-0'>{new Date().toString().substring(0, 25)} </h3>
          </div>
        </div>
        
      )).reverse()}
    </div>
    </div>
  )
}

export default Home