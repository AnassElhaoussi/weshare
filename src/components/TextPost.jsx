
import React, {useState, useEffect} from 'react'
import { Avatar } from '@chakra-ui/react'
import { faEarth } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {motion} from 'framer-motion'
import {db} from '../firebase'
import { useAuthContext } from '../context/AuthContext'
import { useAnimation } from 'framer-motion'
import firebase from 'firebase/compat/app'


const TextPost = ({isClicked, setIsClicked}) => {
    
    const [postText, setPostText] = useState()
    const user = useAuthContext()
    const animation = useAnimation()
    
    const sharePost = async () => {
        const {photoURL, displayName} = user

      
        await db.collection('posts').add({
            text: postText,
            displayName,
            photoURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })


        setPostText()
        setIsClicked(false)
    }
    
    useEffect(() => {
        animation.start({
          y: 0,
        })
    
      },[isClicked])

  return (
        <motion.div animate={animation} initial={{y: 20}} className='absolute z-50 top-20 flex flex-col gap-6 md:w-1/2 w-full bg-gray-100 p-4 rounded-md shadow-lg'>
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

  )
}

export default TextPost