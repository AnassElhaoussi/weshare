

import React, {useState, useEffect, useContext, createContext} from 'react'
import {db} from '../firebase'

const CommentsContext = createContext()

export const useCommentsContext = () => useContext(CommentsContext)


export const CommentsContextProvider = ({children}) => {

    const [idForComment, setIdForComment] = useState()
    const [comments, setComments] = useState([])

    useEffect(() => {
        if(idForComment){
          db.collection('posts').doc(idForComment).collection('comments').orderBy('createdAt').onSnapshot(snapsahot => {
            setComments(
              snapsahot.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
              }))
            )
          })
    
        }
    }, [idForComment])


    return (
        <CommentsContext.Provider value={{idForComment, setIdForComment, comments}}>
            {children}
        </CommentsContext.Provider>
    )
}