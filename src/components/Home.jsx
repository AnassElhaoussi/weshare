

import React, { useEffect, useState, useRef } from 'react'
import Messages from './Messages'
import { useAuthContext } from '../context/AuthContext'
import TextPost from './TextPost'
import { auth, db } from '../firebase'
import { Avatar } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarth, faHeart, faEdit, faTrash, faComment, faClose } from '@fortawesome/free-solid-svg-icons'
import MembersCarousel from './MembersCarousel'
import Guide from './Guide'
import { useSearchPostsContext } from '../context/SearchPostsContext'
import { Link, useLocation } from 'react-router-dom'
import EditPost from './EditPost'
import firebase from 'firebase/compat/app'
import { usePostsContext } from '../context/PostsContext'






const Home = ({commentSectIsActive, setCommentSectIsActive}) => {

  const user = useAuthContext()
  const [isClicked, setIsClicked] = useState(false)
  const [edit, setEdit] = useState(false)
  const [docId, setDocId] = useState(null)
  const [IdForComment, setIdForComment] = useState('')
  const [editText, setEditText] = useState('')
  const [editTag, setEditTag] = useState('')
  const [commentInputValue, setCommentInputValue] = useState('')
  const [comments, setComments] = useState([])
  const scroll = useRef()
  const [searchValue, setSearchValue] = useSearchPostsContext()
  const posts = usePostsContext()
  const location = useLocation()


  

  useEffect(() => {
    if(IdForComment){
      db.collection('posts').doc(IdForComment).collection('comments').orderBy('createdAt').onSnapshot(snapsahot => {
        setComments(
          snapsahot.docs.map(doc => ({
            data: doc.data(),
            id: doc.id
          }))
        )
      })

    }
  }, [IdForComment])
        
  



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


    const handleCommentSect = (id) => {
      setCommentSectIsActive(true)
      setIdForComment(id)

      
    }

    const sendComment = async (e) => {
      e.preventDefault()

      if(commentInputValue){
          await db
          .collection('posts')
          .doc(IdForComment)
          .collection('comments')
          .add({
            comment: commentInputValue,
            username: user.displayName,
            profilePicture: user.photoURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })


      }

      setCommentInputValue('')
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
            <div className='flex flex-col-reverse gap-1 '> 
              {location.pathname === "/weshare" && (
                <div className='flex flex-col gap-5 relative'>
                  {commentSectIsActive && (
                    
                      <div className='overflow-y-auto h-2/3 w-96 fixed right-1/2 translate-x-1/2 translate-y-1/2 bottom-1/2 z-50 flex items-end dark:bg-gray-800 bg-gray-100 shadow-2xl rounded-md'>
                        <div className='flex flex-col gap-5 h-full dark:text-gray-300'>
                          <div className='flex justify-between items-center sticky top-0 z-50 dark:bg-gray-800 bg-gray-100 p-5'>
                            <h1 className='text-2xl font-bold  text-start'>Comments</h1>
                            <FontAwesomeIcon 
                            icon={faClose} 
                            className='cursor-pointer hover:bg-gray-300 p-2 rounded hover:dark:bg-gray-900 transition-colors' 
                            onClick={() => setCommentSectIsActive(false)} />
                          </div>
                          <form className='flex items-center gap-3 px-5' onSubmit={sendComment}>
                            <Avatar src={user.photoURL} />
                            <input type="text"
                            className='outline-none dark:bg-gray-700  py-1 px-3 rounded'
                            placeholder='Leave a comment..'
                            value={commentInputValue}
                            onChange={(e) => setCommentInputValue(e.target.value)}
                            
                            />
                          </form>

                          {comments.map(({data, id}) => (
                            <div className='flex items-center gap-3 px-5'>
                              <Avatar src={data.profilePicture} />
                              <div>
                                <h2 className='dark:text-blue-700 text-blue-500'>@{data.username} </h2>
                                <p className='text-sm break-all'>{data.comment}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    
                     
                  )}
                  <div className='py-4'></div>
                  
                  {posts.filter(({data, id}) => data.tag?.toLowerCase().includes(searchValue?.toLowerCase())).map(({data, id}) => (
                    
                    <div className='flex flex-col gap-8 rounded-md bg-gray-100 dark:bg-gray-800 p-5 md:w-3/4 relative'>
            
                      <div className='flex justify-between flex-wrap gap-5'>
                        <div className='flex gap-3 items-center'>
                          <Avatar src={data.photoURL} />
                          <div className='flex flex-col gap-1'>
                              <h2 className='dark:text-gray-300'>@{data.displayName}</h2>
                              <h3 className='text-xs text-blue-500 dark:text-blue-700'>
                              Your post is seen by everyone 
                              <FontAwesomeIcon icon={faEarth} /> </h3>
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
                          <FontAwesomeIcon icon={faComment} className='cursor-pointer ml-4' 
                          onClick={() => handleCommentSect(id)} />
                          
                        </div>
                        <div className='flex justify-between flex-wrap gap-5'>
                          <span className='text-xs text-gray-400'>{data.date}</span>
                          {data.uid === auth.currentUser.uid && (
                            <div className='flex gap-5 right-10 top-5 text-blue-500 dark:text-blue-700'>
                              <FontAwesomeIcon icon={faEdit} className='cursor-pointer' 
                              onClick={() => {updatePost(id, data.text, data.tag)}} />
                              <FontAwesomeIcon icon={faTrash} className='cursor-pointer' 
                              onClick={() => {handleDelete(id)}} />    
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
              <MembersCarousel />

            </div>
            <Guide />
          </div>


     
  
  )
}

export default Home