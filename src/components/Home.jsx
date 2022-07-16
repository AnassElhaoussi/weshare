

import React, { useEffect, useState, useRef } from 'react'
import Messages from './Messages'
import { useAuthContext } from '../context/AuthContext'
import TextPost from './TextPost'
import { auth, db } from '../firebase'
import { Avatar } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarth, faHeart, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import MembersCarousel from './MembersCarousel'
import Guide from './Guide'
import { useSearchPostsContext } from '../context/SearchPostsContext'
import { useLocation } from 'react-router-dom'
import { doc, updateDoc } from "firebase/firestore";




const Home = () => {

  const user = useAuthContext()
  const [isClicked, setIsClicked] = useState(false)
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [searchValue, setSearchValue] = useSearchPostsContext()
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const location = useLocation()
  


  useEffect(() => {
      db.collection('posts').orderBy('createdAt').onSnapshot(snapshot => {
        setPosts(
           snapshot.docs.map(doc => ({

            data: doc.data(),
            id: doc.id

           }))
        )

      })

      console.log(posts);

      
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
        profilePicture: user.photoURL,
        uid: user.uid
      })
      
    }, [])

    useEffect(() => {
      if(isLiked){
        setLikesCount(likesCount + 1)
      } else {
        setLikesCount(likesCount - 1)
      }
    }, [isLiked])

    const handleDelete = async () => {
      
    }


  return (
          <div className='flex flex-col gap-10 flex-shrink w-3/4'>
              <button className='bg-gray-100 py-2 px-4 sm:w-1/2 text-gray-400 shadow-md rounded cursor-pointer flex-shrink-0'
              onClick={() => setIsClicked(!isClicked)}
              >
                {`What's on your mind, ${user.displayName}?`}
              </button>

            {isClicked && (
                <TextPost 

                 isClicked={isClicked}
                 setIsClicked={setIsClicked} 
                 isLiked={isLiked}
                 setIsLiked={setIsLiked}
                 likesCount={likesCount} 
                 setLikesCount={setLikesCount} />
            )}
            <div className='flex flex-col-reverse gap-5'> 
              {location.pathname === "/weshare" && (
                <div className='flex flex-col gap-5'>
                  {posts.filter((post) => post.data.tag?.toLowerCase().includes(searchValue?.toLowerCase())).map((post) => (
                    <div className='flex flex-col gap-8 rounded-md bg-gray-100 p-5 md:w-3/4 relative'>
                      <div className='flex gap-3 items-center'>
                        <Avatar src={post.data.photoURL} />
                        <div className='flex flex-col gap-1'>
                            <h2>@{post.data.displayName}</h2>
                            <h3 className='text-xs text-blue-500'>Your post is seen by everyone <FontAwesomeIcon icon={faEarth} /> </h3>
                            <button className="bg-yellow-300 py-1 px-3 text-xs font-bold rounded-2xl w-fit">{post.data.tag}</button>
                        </div>
                  
                        <div className='flex gap-5 absolute right-10 top-5 text-blue-500'>
                          <FontAwesomeIcon icon={faEdit} className='cursor-pointer' />
                          <FontAwesomeIcon icon={faTrash} className='cursor-pointer' onClick={handleDelete} />    
                        </div>
                        
                      </div>
                      <p className='text-xl'>{post.data.text} </p>
                      <span className='text-xs text-gray-400'>{post.data.date}</span>
                    </div>
                  )).reverse()}
                </div>
              )}
              <MembersCarousel users={users} />
      
            </div>
            <Guide />
          </div>


     
  
  )
}

export default Home