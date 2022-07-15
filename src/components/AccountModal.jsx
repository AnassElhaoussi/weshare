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
                        </div>
                        <div className='flex gap-2 items-center justify-center'>
                            <p className='text-blue-500 select-none'>Username : </p>
                            <h2>{user.displayName}</h2>
            
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