

import React, {useState, useEffect, createContext, useContext} from 'react'
import { db } from '../firebase'


const PostsContext = createContext()

export const usePostsContext = () => useContext(PostsContext)

export const PostsContextProvider = ({children}) => {

    const [posts, setPosts] = useState([])


    useEffect(() => {
        db.collection('posts').orderBy('createdAt').onSnapshot(snapshot => {
          setPosts(
             snapshot.docs.map(doc => ({
  
               data: doc.data(),
               id: doc.id
               
              }))
              )
            })
                      
            
    }, [])


    return (
        <PostsContext.Provider value={posts}>
            {children}
        </PostsContext.Provider>
    )
}