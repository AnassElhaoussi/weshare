
import React, {useState, useEffect, useContext, createContext} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";


const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {

    const navigate  = useNavigate()
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                navigate('/weshare')
            } else {
                navigate('/')
            }
        })
    }, [])

    return(

        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}