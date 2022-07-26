

import React, { useEffect, useState, useRef } from 'react'
import Messages from './Messages'
import { useAuthContext } from '../context/AuthContext'
import TextPost from './TextPost'
import { auth, db } from '../firebase'
import { Avatar } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarth, faHeart, faEdit, faTrash, faComment } from '@fortawesome/free-solid-svg-icons'
import MembersCarousel from './MembersCarousel'
import Guide from './Guide'
import { useSearchPostsContext } from '../context/SearchPostsContext'
import { useLocation } from 'react-router-dom'
import EditPost from './EditPost'





const Home = () => {

  const user = useAuthContext()
  const [isClicked, setIsClicked] = useState(false)
  const [edit, setEdit] = useState(false)
  const [docId, setDocId] = useState('')
  const [editText, setEditText] = useState('')
  const [editTag, setEditTag] = useState('')
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
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

    const updatePost = (id,text, tag) => {
      setEdit(true)
      setDocId(id)
      setEditText(text)
      setEditTag(tag)
      scroll.current.scrollIntoView({behavior : 'smooth'})
    }

    

  return (
          <div className='flex flex-col gap-10 flex-shrink w-3/4'>
              <button className='bg-gray-100 dark:bg-gray-700 py-2 px-4 sm:w-1/2 text-gray-400 shadow-md rounded cursor-pointer flex-shrink-0'
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
                    <div className='flex flex-col gap-8 rounded-md bg-gray-100 dark:bg-gray-800 p-5 md:w-3/4 relative'>
                      <div className='flex justify-between flex-wrap gap-5'>
                        <div className='flex gap-3 items-center'>
                          <Avatar src={data.photoURL} />
                          <div className='flex flex-col gap-1'>
                              <h2 className='dark:text-gray-300'>@{data.displayName}</h2>
                              <h3 className='text-xs text-blue-500 dark:text-blue-700'>Your post is seen by everyone <FontAwesomeIcon icon={faEarth} /> </h3>
                              <button className="bg-yellow-300 dark:bg-yellow-400 py-1 px-3 text-xs font-bold rounded-2xl w-fit mt-4">{data.tag}</button>
                          </div>
                  
                        </div>
                        <h1 className='text-blue-500 dark:text-blue-700 sm:text-sm text-xs'>{data.isEdited && 'Edited Post'}</h1>
                      </div>
                      <p className='text-xl dark:text-gray-300'>{data.text}</p>
                      <div className='flex flex-col gap-6'>
                        <div className='flex items-center justify-start dark:text-blue-700 text-blue-500 gap-2'>
                          <FontAwesomeIcon icon={faHeart} className='cursor-pointer' />
                          0
                          <FontAwesomeIcon icon={faComment} className='cursor-pointer ml-4' />
                        </div>
                        <div className='flex justify-between flex-wrap gap-5'>
                          <span className='text-xs text-gray-400'>{data.date}</span>
                          {data.uid === auth.currentUser.uid && (
                            <div className='flex gap-5 right-10 top-5 text-blue-500 dark:text-blue-700'>
                              <FontAwesomeIcon icon={faEdit} className='cursor-pointer' onClick={() => {updatePost(id, data.text, data.tag)}} />
                              <FontAwesomeIcon icon={faTrash} className='cursor-pointer' onClick={() => {handleDelete(id)}} />    
                            </div>
                          )}
                        </div>
                        
                      </div>
                      
                    </div>
                  ))?.reverse()}
                  
                </div>
              )}
              {edit && (
                <EditPost setEdit={setEdit} docId={docId} editText={editText} editTag={editTag}  /> 
              )}
              <div ref={scroll}></div>
              <MembersCarousel users={users} />

            </div>
            <Guide />
          </div>


     
  
  )
}

export default Home