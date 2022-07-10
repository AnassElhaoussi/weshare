

import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import { useAuthContext } from '../context/AuthContext'
import {motion} from 'framer-motion'
import { useAnimation } from 'framer-motion'
import { Avatar } from '@chakra-ui/react'
import { faEarth } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { db } from '../firebase'


const Home = () => {

  const user = useAuthContext()
  const [isClicked, setIsClicked] = useState(false)
  const [postText, setPostText] = useState('')
  const [posts, setPosts] = useState([])
  const animation = useAnimation()

  useEffect(() => {
    animation.start({
      y: 0,
    })

  },[isClicked])
  
  const sharePost = async () => {
    await db.collection('posts').add({
      postText: postText
    })
  }
  
  useEffect(() => {
      db.collection('posts').onSnapshot(snapshot => {
        setPosts(
          snapshot.docs.map(doc => 
            doc.data()
          )
        )

      })

      console.log(posts);
  }, [])



  

  

  return (
    <div className='flex flex-col flex-shrink w-2/3 relative'>
        <button className='bg-gray-100 py-2 px-4 sm:w-1/2 text-gray-400 shadow-md rounded cursor-pointer flex-shrink-0'
        onClick={() => setIsClicked(!isClicked)}
        >
          {`What's on your mind, ${user.displayName}?`}
        </button>

    {isClicked && (

        <motion.div animate={animation} initial={{y: 20}} className='absolute top-20 flex flex-col gap-6 md:w-1/2 w-full bg-gray-100 p-4 rounded-md shadow-lg'>
                <div className='flex gap-4 items-center'>
                  <Avatar src={user.photoURL} />
                  <div className='flex flex-col gap-1'> 
                    <h1 className='font-bold'>{`@${user.displayName}`}</h1>
                    <p className='text-xs text-blue-500'>
                      <FontAwesomeIcon icon={faEarth} className='mr-2' />
                      Everyone can see your post
                    </p>
                  </div>
                </div>
                <div className=''>
                  <textarea name="" id="" cols="30" rows="10" className='outline-none bg-gray-100 rounded-lg py-2 px-4 h-32 w-full text-xl'
                   placeholder='Say something nice'
                   value={postText}
                   onChange={(e) => setPostText(e.target.value)}
                   ></textarea>
                </div>
                <div className='flex justify-between text-white font-bold'>
                  <button className='text-white bg-blue-500 py-1 px-3 rounded hover:scale-105 transition-all' 
                  onClick={sharePost}
                  >Share</button>
                  <button className='text-white bg-blue-500 py-1 px-3 rounded hover:scale-105 transition-all' onClick={() => setIsClicked(false)}>Cancel</button>
                </div>
        </motion.div>
        
    )}
    <div>
      {posts.map(post => {
        <h1>{post.postText}</h1>
      })}
    </div>
    </div>
  )
}

export default Home