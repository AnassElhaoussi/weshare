

import React, { useEffect, useState, useRef } from 'react'
import Messages from './Messages'
import { useAuthContext } from '../context/AuthContext'
import TextPost from './TextPost'
import { auth, db } from '../firebase'
import { Avatar } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarth } from '@fortawesome/free-solid-svg-icons'
import MembersCarousel from './MembersCarousel'



const Home = () => {

  const user = useAuthContext()
  const [isClicked, setIsClicked] = useState(false)
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])


  useEffect(() => {
      db.collection('posts').orderBy('createdAt').onSnapshot(snapshot => {
        setPosts(
          snapshot.docs.map(doc => 
            doc.data()
          )
        )

      })
  }, [])

  useEffect(() => {
    db.collection('users').onSnapshot(snapshot => {
      setUsers(
        snapshot.docs.map(doc => doc.data())
        )
      })
      
    }, [])
    
    useEffect(() => {
      db.collection('users').add({
        username: user.displayName,
        profilePicture: user.photoURL
      })
      
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
      <div className='flex flex-col-reverse gap-5'> 

        <div className='flex flex-col gap-5'>
          {posts.map(({text, displayName, photoURL, date}) => (
            <div className='flex flex-col gap-5 rounded-md bg-gray-100 p-5 md:w-3/4'>
              <div className='flex gap-3 items-center'>
                <Avatar src={photoURL} />
                <div>
                  <h2>{displayName}</h2>
                  <h3 className='text-xs text-blue-500'>Your post is seen by everyone <FontAwesomeIcon icon={faEarth} /> </h3>
                </div>
              </div>
              <p className='text-xl'>{text} </p>
              <span className='text-xs text-end text-gray-400'>{date}</span>
            </div>
          )).reverse()}
        </div>
        <MembersCarousel users={users} />
 
      </div>
    </div>
  )
}

export default Home