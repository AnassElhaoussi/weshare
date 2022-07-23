import React, {useState, useEffect} from 'react'
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Avatar,


  } from '@chakra-ui/react'

import { motion } from 'framer-motion'
import { useAnimation } from 'framer-motion'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../context/AuthContext'
import { auth, db } from '../firebase'





const AccountModal = ({isOpen, onClose}) => {

  const user = useAuthContext()
  const [editPhotoURL, setEditPhotoURL] = useState(false)
  const [editUsername, setEditUsername] = useState(false)
  const [editUsernameInputValue, setEditUsernameInputValue] = useState(user.displayName)
  const [postsForEdits, setPostsForEdits] = useState([])
  const [editUsernameError, setEditUsernameError] = useState(false)



  useEffect(() => {
    db.collection('posts').orderBy('createdAt').onSnapshot(snapshot => {
        setPostsForEdits(
            snapshot.docs.map(doc => ({
               data: doc.data(),
               id: doc.id
            }))
        )
    })
  }, [])

  const handleUsernameEdit = async (e) => {
    e.preventDefault()

    if(editUsernameInputValue.length <= 12 && editUsernameInputValue){
        postsForEdits.filter(({data}) => data.uid === auth.currentUser.uid).map(({data, id}) => {
            db.collection('posts').doc(id).update({
                displayName: editUsernameInputValue
            })
        })
    
        auth.currentUser.updateProfile({
            displayName: editUsernameInputValue
        })
    
        setEditUsername(false)
        setEditUsernameError(false)
        
    } else {
        setEditUsernameError(true)
    }

    
  }

  return (

        <Popover isOpen={isOpen} onClose={onClose}  >
            <PopoverContent className='dark:bg-gray-800' border="0">
                <PopoverArrow />
                <PopoverHeader border='0'>
                    <h1>Account</h1>
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody border='0'>
                    <div className='flex flex-col items-center gap-4 py-6'>
                        
                        <div className='flex items-center gap-2 text-center'>
                            <Avatar src={user.photoURL} />
                            <FontAwesomeIcon icon={faEdit} onClick={() => setEditPhotoURL(!editPhotoURL)} />
                        </div>
                        {editPhotoURL && (
                                            
                            <div className='flex flex-col gap-4 bg-gray-700 py-4 px-4 rounded-md'>
                                <h1 className='text-white'>Edit your profile picture</h1>
                                <div className='flex gap-10'>
                                    <input type='file' className='w-2/3  file:bg-blue-700 file:py-1 file:px-2 file:rounded file:text-white file:border-0' />
                                    <button className='bg-blue-700 text-white rounded py-1 px-2 '>Upload</button>
                                </div>
                            </div>
                       
                        )}
                    
                        <div className='flex gap-2 items-center justify-center'>
                            <p className='text-blue-500 dark:text-blue-700 select-none'>Username : </p>
                            <h2>{user.displayName}</h2>
                            <FontAwesomeIcon icon={faEdit} onClick={() => setEditUsername(!editUsername)} /> 
                        </div>
                        {editUsername && (
                            <form action="" onSubmit={handleUsernameEdit} className='relative'>
                                <input type='text' placeholder='Edit your username..' className='dark:bg-gray-700 py-1 px-3 outline-none rounded' value={editUsernameInputValue} onChange={(e) => setEditUsernameInputValue(e.target.value)} />
                                <button type='submit'>
                                    <FontAwesomeIcon icon={faCheck} className='absolute top-2 right-2' />
                                </button>
                            </form>
                        )}

                        {editUsernameError && (
                            <p className='text-red-600'>Invalid Username, try again!</p>
                        )}

                        <div className='flex gap-2 items-center justify-center '>
                            <p className='text-blue-500 dark:text-blue-700'>Email : </p>
                            <h2>{user.email}</h2>
                        </div>
                        
                    </div>
                </PopoverBody>
                <PopoverFooter border='0'>
                    <button onClick={onClose} className='px-4 py-1 rounded text-white dark:text-gray-300 bg-blue-500 dark:bg-blue-700 font-bold'>Close</button>
                </PopoverFooter>
            </PopoverContent>
        </Popover>



  )
}

export default AccountModal