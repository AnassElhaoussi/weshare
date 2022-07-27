
import React, {useState, useEffect} from 'react'
import { Avatar } from '@chakra-ui/react'
import { faEarth, faLike } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {motion} from 'framer-motion'
import {auth, db} from '../firebase'
import { useAuthContext } from '../context/AuthContext'
import { useAnimation } from 'framer-motion'
import firebase from 'firebase/compat/app'
import { weshareTags } from '../constants/Guide'
import { addDoc, collection } from 'firebase/firestore'


const TextPost = ({isClicked, setIsClicked}) => {
    
    
    const [weshareTag, setWeshareTag] = useState("")
    const [error, setError] = useState(false)
    const [postText, setPostText] = useState("")
    const user = useAuthContext()
    const animation = useAnimation()
    
    const sharePost = async () => {

        const {displayName, photoURL, uid} = user

      if(weshareTag !== "" && postText !== ""){

        await addDoc(collection(db, 'posts'), {
            text: postText,
            tag: weshareTag,
            displayName,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            date: new Date().toString().substring(0, 33),
            isEdited: false
            
            
        })

        
  
  
        setPostText()
        setIsClicked(false)
        setError(false)


      } else {
        setError(true)
      }
      
    }
    
    useEffect(() => {
        animation.start({
          y: 0,
        })
    
      },[isClicked])

  return (
        <motion.div animate={animation} initial={{y: 20}} className='absolute z-50 top-20 flex flex-col gap-6 md:w-1/3 w-2/3 bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-lg'>
                <div className='flex flex-col gap-4 items-start relative'>
                  <div className='flex gap-4 items-center'> 
                    <Avatar src={user.photoURL} />
                    <div className='flex flex-col gap-1'>
                      <h1 className='font-bold dark:text-gray-300'>{`@${user.displayName}`}</h1>
                      <p className='text-xs text-blue-500 dark:text-blue-700'>
                        <FontAwesomeIcon icon={faEarth} className='mr-2' />
                        Everyone can see your post
                      </p>
                    </div>
                    
                  </div>
                  <div className='flex flex-wrap gap-1 justify-start font-bold'>
                        {weshareTags.map(tag => (
                          <button className='bg-yellow-300 dark:bg-yellow-400 py-1 text-xs w-fit px-3 rounded-2xl hover:scale-105 transition-all' onClick={() => setWeshareTag(tag)}>
                            {tag}
                          </button>
                        ))}
                      
                  </div>
                  {error && (
                    <div>
                      <h3 className='text-red-600'>Oups, you missed something!</h3>
                    </div>
                  )}
                  
                </div>
                <div className=''>
                  <textarea name="" id="" cols="30" rows="10" className='outline-none bg-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-lg py-2 px-4 h-32 w-full text-xl'
                   placeholder='Say something nice'
                   value={postText}
                   onChange={(e) => setPostText(e.target.value)}
                   ></textarea>
                   <button className={weshareTag !== "" ? "bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-300 right-0 py-1 px-3 text-xs font-bold rounded-2xl" : "hidden"}>{weshareTag} </button>
                </div>
                <div className='flex justify-between text-white dark:text-gray-300 font-bold'>
                  <button className='text-white bg-blue-500 dark:bg-blue-700 py-1 px-3 rounded hover:scale-105 transition-all' 
                  onClick={sharePost}
                  >Share</button>
                  <button className='text-white bg-blue-500 dark:bg-blue-700 py-1 px-3 rounded hover:scale-105 transition-all' onClick={() => setIsClicked(false)}>Cancel</button>
                </div>
        </motion.div>

  )
}

export default TextPost