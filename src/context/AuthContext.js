
import React, {useState, useEffect, useContext, createContext} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Loader from "../components/Loader";


const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {

    const navigate  = useNavigate()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()

    
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                navigate('/weshare')
                setUser(user)
                setLoading(false)
            } else {
                navigate('/')
                setLoading(false)
            }
        })
    }, [])
    
    if(loading){
        return <Loader />
    }

    
    return(

        <AuthContext.Provider value={user}>
            {!loading && children}
        </AuthContext.Provider>
    )
}