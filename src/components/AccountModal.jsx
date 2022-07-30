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
import { faEdit, faCheck, faClose } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../context/AuthContext'
import { auth, db, storage } from '../firebase'
import { usePostsContext } from '../context/PostsContext'
import { useUsersContext } from '../context/UsersContext'


const AccountModal = ({isOpen, onClose}) => {

  const user = useAuthContext()
  const [editUsername, setEditUsername] = useState(false)
  const [editUsernameInputValue, setEditUsernameInputValue] = useState(user.displayName)
  const [editUsernameError, setEditUsernameError] = useState(false)
  const users = useUsersContext()
  const posts = usePostsContext()



  const handleUsernameEdit = async (e) => {
    e.preventDefault()

    if(editUsernameInputValue.length <= 12 && editUsernameInputValue){
        posts.filter(({data}) => data.uid === auth.currentUser.uid).map(({data, id}) => {
            db
            .collection('posts')
            .doc(id)
            .update({
                displayName: editUsernameInputValue
            })
        })

        users.filter(({data}) => data.uid === auth.currentUser.uid).map(({data, id}) => {
            db
            .collection('users')
            .doc(id)
            .update({
                username: editUsernameInputValue
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
                        
                        
                        <Avatar src={user.photoURL} />
                        
                        <div className='flex gap-2 items-center justify-center'>
                            <p className='text-blue-500 dark:text-blue-700 select-none'>Username : </p>
                            <h2>{user.displayName}</h2>
                            <FontAwesomeIcon icon={faEdit} onClick={() => setEditUsername(!editUsername)} /> 
                        </div>
                        {editUsername && (
                            <form action="" onSubmit={handleUsernameEdit} className='relative'>
                                <input type='text' placeholder='Edit your username..' className='dark:bg-gray-700 bg-gray-200 py-1 px-3 outline-none rounded' value={editUsernameInputValue} onChange={(e) => setEditUsernameInputValue(e.target.value)} />
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