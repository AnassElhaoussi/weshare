

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
  const [photoURLExists, setPhotoURLExists] = useState(false)
  const namesArr = []
  const photoUrlArr = []
  let newPhotoUrlArr
  
  console.log(user);

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

  
  posts.filter(post => post.uid !== auth.currentUser.uid).map(({displayName}) => {
    namesArr.push(displayName)
  })

  const newNamesArr = [...new Set(namesArr)]

  posts.filter(post => post.uid !== auth.currentUser.uid).map(({photoURL}) => {
    photoUrlArr.push(photoURL)

    if(photoURL){
      setPhotoURLExists(true)
    }
  })

  if(photoURLExists){
    newPhotoUrlArr = [...new Set(photoUrlArr)]
  }

  
  

  

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
        <div className='flex flex-col gap-8 w-3/4 text-center bg-blue-500 text-white rounded-md py-4 px-2'>
           <h1 className='text-xl font-bold'>Members</h1>
           <div className='flex flex-col gap-3 items-center justify-center'>
            <div className='flex gap-4'>
              {newPhotoUrlArr.map(photo => (
                <Avatar src={photo} />
              ))}
            </div>
            <div className='flex gap-4'>
                {newNamesArr.map(name => (
                  <h1>{name}</h1>
                ))}
            </div>
           </div>
        </div>
 
      </div>
    </div>
  )
}

export default Home