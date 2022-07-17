

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
import { doc, deleteDoc } from "firebase/firestore";




const Home = () => {

  const user = useAuthContext()
  const [isClicked, setIsClicked] = useState(false)
  const [edit, setEdit] = useState(false)
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [postText, setPostText] = useState('')
  const scroll = useRef()
  const [searchValue, setSearchValue] = useSearchPostsContext()
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


    const handleDelete = async (id) => {
        await db.collection('posts').doc(id).delete()
    }

    const editPost = (postText) => {
      setEdit(true)
      setPostText(postText)
      scroll.current.scrollIntoView({behavior : 'smooth'})
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
                 
                 />
            )}
                
            
            <div className='flex flex-col-reverse gap-5'> 
              {location.pathname === "/weshare" && (
                <div className='flex flex-col gap-5 relative'>
                  {posts.filter(({data, id}) => data.tag?.toLowerCase().includes(searchValue?.toLowerCase())).map(({data, id}) => (
                    <div className='flex flex-col gap-8 rounded-md bg-gray-100 p-5 md:w-3/4 relative'>
                      <div className='flex gap-3 items-center'>
                        <Avatar src={data.photoURL} />
                        <div className='flex flex-col gap-1'>
                            <h2>@{data.displayName}</h2>
                            <h3 className='text-xs text-blue-500'>Your post is seen by everyone <FontAwesomeIcon icon={faEarth} /> </h3>
                            <button className="bg-yellow-300 py-1 px-3 text-xs font-bold rounded-2xl w-fit">{data.tag}</button>
                        </div>
                
                      </div>
                      <p className='text-xl'>{data.text}</p>
                      <div className='flex justify-between flex-wrap gap-5'>
                        <span className='text-xs text-gray-400'>{data.date}</span>
                        {data.uid === auth.currentUser.uid && (
                          <div className='flex gap-5 right-10 top-5 text-blue-500'>
                            <FontAwesomeIcon icon={faEdit} className='cursor-pointer' onClick={() => {editPost(data.text)}} />
                            <FontAwesomeIcon icon={faTrash} className='cursor-pointer' onClick={() => {handleDelete(id)}} />    
                          </div>
                        )}
                        
                      </div>
                      <div>
                      </div>
                    </div>
                  ))?.reverse()}
                  
                </div>
              )}
              {edit && (
              <div className='relative' ref={scroll}>
                <input type="text" className='absolute' value={postText} />
              </div>
              )}
              <MembersCarousel users={users} />

            </div>
            <Guide />
          </div>


     
  
  )
}

export default Home