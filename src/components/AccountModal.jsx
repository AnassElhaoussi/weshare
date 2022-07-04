import React, {useState} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Avatar,
    Input
  } from '@chakra-ui/react'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck } from '@fortawesome/free-solid-svg-icons'

import { useAuthContext } from '../context/AuthContext'
import { auth } from '../firebase'

const AccountModal = ({isOpen, onClose}) => {

  const user = useAuthContext()
  const [edit, setEdit] = useState(false)
  const [editInput, setEditInput] = useState(user.displayName)

  console.log(user);

  const editUserName = () => {
    setEdit(true)
  }

  const handleUsernameEdit = () => {
    setEdit(false)
    auth.currentUser.updateProfile({
        displayName: editInput
    })
  }

  return (
    <div className='w-20'>
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <h1>Account</h1>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className='flex flex-col items-center gap-4 font-bold'>

                        <div className='text-center'>
                            {!user.photoURL ? <Avatar /> : <Avatar src={user.photoURL} />}
                        </div>
                        <div className='flex gap-2 items-center justify-center text-xl'>
                            <p className='text-blue-500'>Username : </p>
                            <h2>{editInput !== "" && editInput}</h2>
                            <FontAwesomeIcon icon={faEdit} className={edit ? 'hidden' : 'flex cursor-pointer'} onClick={editUserName} />
                        </div>
                        <div className='flex gap-2 items-center justify-center text-xl'>
                            <p className='text-blue-500'>Email : </p>
                            <h2>{user.email}</h2>
                        </div>
                        <div className={edit ? 'flex gap-3 items-center' : 'hidden'}>
                            <input type="text" className='outline-none bg-gray-100 px-3 py-1' placeholder='Edit Username' value={editInput} onChange={(e) => setEditInput(e.target.value)} />
                            <FontAwesomeIcon icon={faCheck} className='cursor-pointer' onClick={handleUsernameEdit} />
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <button onClick={onClose} className='px-6 py-2 text-white bg-blue-500 rounded-3xl font-bold'>Close</button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default AccountModal