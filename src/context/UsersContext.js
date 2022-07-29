

import React, {useState, useEffect, createContext, useContext} from 'react'
import {db} from '../firebase'

const UsersContext = createContext()

export const useUsersContext = () => useContext(UsersContext)

export const UsersContextProvider = ({children}) => {
    
    const [users, setUsers] = useState([])

    useEffect(() => {
        db.collection('users').onSnapshot(snapshot => {
          setUsers(
            snapshot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            }))
            )
          })
          
    }, [])
    
    return (
        <UsersContext.Provider value={users}>
            {children}
        </UsersContext.Provider>
    )
}