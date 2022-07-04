import React, {useState, useEffect} from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Avatar,
    useDisclosure,
    transition,

  } from '@chakra-ui/react'

import { motion } from 'framer-motion'
import { useAnimation } from 'framer-motion'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck } from '@fortawesome/free-solid-svg-icons'

import { useAuthContext } from '../context/AuthContext'
import { auth } from '../firebase'


const AccountModal = ({isOpen, onClose}) => {

  const user = useAuthContext()
  const [edit, setEdit] = useState(false)
  const [editInput, setEditInput] = useState(user.displayName)
  const [isActive, setIsActive] = useState(false)
  const animation = useAnimation()


  useEffect(() => {
    if(isActive){
        animation.start({
            x: 10,
            y: -10
        })
    } else {
        animation.start({
            x: -10,
            y: 10
        })
    }
  }, [isActive])

  console.log(user);

  const editUserName = () => {
    setEdit(true)
  }
  

  const handleUsernameEdit = () => {
    if(editInput !== ""){
        setEdit(false)
        auth.currentUser.updateProfile({
            displayName: editInput
        })
    }
  }

  const toggleEditImgLabel = () => {
    setIsActive(!isActive)
  }

  return (


        <Popover isOpen={isOpen} onClose={onClose} >
            <PopoverContent>
                <PopoverArrow />
                <PopoverHeader border='0'>
                    <h1>Account</h1>
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody border='0'>
                    <div className='flex flex-col items-center gap-4 py-6'>

                        <div className='flex gap-2 text-center'>
                            {!user.photoURL ? <Avatar /> : <Avatar src={user.photoURL} />}
                            <button>
                                <FontAwesomeIcon icon={faEdit} className='text-blue-500' onClick={toggleEditImgLabel} />
                            </button>

                        </div>
                        <div className='flex gap-2 items-center justify-center'>
                            <p className='text-blue-500 select-none'>Username : </p>
                            <h2>{editInput !== "" && editInput}</h2>
                            <button>
                                <FontAwesomeIcon icon={faEdit} className={edit ? 'hidden' : 'flex cursor-pointer text-blue-500'} onClick={editUserName} />
                            </button>
                        </div>
                        <div className={edit ? 'flex gap-3 items-center' : 'hidden'}>
                            <input type="text" className='outline-none bg-gray-100 px-4 py-1 rounded' placeholder='Edit Username' value={editInput} onChange={(e) => setEditInput(e.target.value)} />
                            <FontAwesomeIcon icon={faCheck} className='cursor-pointer' onClick={handleUsernameEdit} />
                        </div>
                        <div className='flex gap-2 items-center justify-center '>
                            <p className='text-blue-500'>Email : </p>
                            <h2>{user.email}</h2>
                        </div>
                        <motion.div animate={animation} className={isActive ? ' shadow-md bg-gray-50 absolute left-60 top-10 flex gap-4 rounded items-center py-2 px-3' : 'hidden'}>
                            {!user.photoURL ? <Avatar /> : <Avatar src={user.photoURL} />}
                            <input type="file" className='w-36 file:text-white file:rounded file:bg-blue-500 file:border-none file:py-1 file:cursor-pointer' />
                        </motion.div>
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