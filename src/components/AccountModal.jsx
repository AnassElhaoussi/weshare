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



const AccountModal = ({isOpen, onClose}) => {

  const user = useAuthContext()
  const [edit, setEdit] = useState(false)
  const [editInput, setEditInput] = useState(user.displayName)
  const [image, setImage] = useState()
  const [isActive, setIsActive] = useState(false)
  const animation = useAnimation()
  const [imgUrl, setImgUrl] = useState(user.photoURL)
  const [isLoading, setIsLoading] = useState(false)
  const [invalidUserName, setInvalidUserName] = useState(false)

  useEffect(() => {
    auth.currentUser.updateProfile({
        photoURL: imgUrl
    })
  }, [imgUrl])


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



  const editUserName = () => {
    setEdit(true)
  }
  

  const handleUsernameEdit = () => {
    if(editInput.length <= 14 && editInput !== ""){
        setEdit(false)
        auth.currentUser.updateProfile({
            displayName: editInput
        })

        setInvalidUserName(false)
    } else {
        setInvalidUserName(true)
    }
  }

  const toggleEditImgLabel = () => {
    setIsActive(!isActive)
  }

  const editProfilePic = (e) => {
      
      if(e.target.files[0]){
          setImage(e.target.files[0])
        }
}
        
        
    const handleImageSubmit = () => {
        const imageRef = ref(storage, "image")
            
        uploadBytes(imageRef, image).then(() => {
            
            getDownloadURL(imageRef).then(url => {
    
                setImgUrl(url)
            }).catch(error => {
                console.log(error.message);
            })
            setIsLoading(false)
        }).catch(error => {
            console.log(error.message);
        })
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
                            <Avatar src={imgUrl} />
                            <button>
                                <FontAwesomeIcon icon={faEdit} className='text-blue-500' onClick={toggleEditImgLabel} />
                            </button>

                        </div>
                        <div className='flex gap-2 items-center justify-center'>
                            <p className='text-blue-500 select-none'>Username : </p>
                            <h2>{editInput}</h2>
                            <button>
                                <FontAwesomeIcon icon={faEdit} className={edit ? 'hidden' : 'flex cursor-pointer text-blue-500'} onClick={editUserName} />
                            </button>
                        </div>
                        <div className={edit ? 'flex flex-col gap-2 items-staart' : 'hidden'}>
                            <div className='flex gap-3'>
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
                        <motion.div animate={animation} className={isActive ? ' shadow-md bg-gray-50 absolute left-60 top-10 rounded py-2 px-3' : 'hidden'}>
                            <div className='flex flex-col gap-6 relative'>

                                <div className='flex items-center'>           
                                    <h1>Edit Profile Picture</h1>
                                    <FontAwesomeIcon icon={faClose} onClick={() => setIsActive(false)} className='absolute right-0 hover:bg-gray-300 py-1 px-2 rounded-md' />
                                </div>
                                <div className='flex gap-4 items-center'>
                                    <Avatar src={imgUrl}  />
                                    <input type="file" onChange={(e) => editProfilePic(e)} className='w-36 file:text-white file:rounded file:bg-blue-500 file:border-none file:py-1 file:cursor-pointer' />
                                    <button className='text-white bg-blue-500 font-bold px-3 py-1 rounded' onClick={handleImageSubmit}>{isLoading ? "Loading..." : "Save"} </button>
                                </div>
                            </div>
                            
                    
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