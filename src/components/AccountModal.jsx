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
import { auth } from '../firebase'
import { storage } from '../firebase'
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { useEditProfileContext } from '../context/EditProfileContext'




const AccountModal = ({isOpen, onClose}) => {

  const user = useAuthContext()
  const [edit, setEdit] = useState(false)
  const [editInput, setEditInput] = useState(user.displayName)
  const [invalidUserName, setInvalidUserName] = useState(false)
 


  useEffect(() => {
    auth.currentUser.updateProfile({
        displayName: editInput,
    })
  }, [editInput])


  const editUserName = () => {
    setEdit(true)
  }
  

  const handleUsernameEdit = () => {
    if(editInput.length <= 14 && editInput !== ""){
        setEdit(false)

        setInvalidUserName(false)
    } else {
        setInvalidUserName(true)
    }
  }

  



  return (


        <Popover isOpen={isOpen} onClose={onClose}  >
            <PopoverContent className='' border="0">
                <PopoverArrow />
                <PopoverHeader border='0'>
                    <h1>Account</h1>
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody border='0'>
                    <div className='flex flex-col items-center gap-4 py-6'>

                        <div className='flex gap-2 text-center'>
                            <Avatar src={user.photoURL} />
                            <button>
                                <FontAwesomeIcon icon={faEdit} className='text-blue-500' />
                            </button>

                        </div>
                        <div className='flex gap-2 items-center justify-center'>
                            <p className='text-blue-500 select-none'>Username : </p>
                            <h2>{editInput}</h2>
                            <button>
                                <FontAwesomeIcon icon={faEdit} className={edit ? 'hidden' : 'flex cursor-pointer text-blue-500 '} onClick={editUserName} />
                            </button>
                        </div>
                        <div className={edit ? 'flex flex-col gap-2 items-staart' : 'hidden'}>
                            <div className='flex gap-3 items-center'>
                                <input type="text" className='outline-none bg-gray-100 px-4 py-1 rounded' placeholder='Edit Username' value={editInput} onChange={(e) => setEditInput(e.target.value)} />
                                <FontAwesomeIcon icon={faCheck} className='cursor-pointer' onClick={handleUsernameEdit} />
                            </div>
                            {invalidUserName && (
                                <p className='text-red-600 text-sm'>Invalid Username!</p>
                            )}
                        </div>
                        <div className='flex gap-2 items-center justify-center '>
                            <p className='text-blue-500'>Email : </p>
                            <h2>{user.email}</h2>
                        </div>
                        
                    </div>
                </PopoverBody>
                <PopoverFooter border='0'>
                    <button onClick={onClose} className='px-4 py-1 rounded text-white bg-blue-500 font-bold'>Close</button>
                </PopoverFooter>
            </PopoverContent>


        </Popover>



  )
}

export default AccountModal