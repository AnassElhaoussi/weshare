import React, {useState} from 'react'
import './styles/index.css'
import { motion } from 'framer-motion'
import {ChakraProvider} from '@chakra-ui/react'
import {Login, SignUp} from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WeShare from './WeShare'
import { AuthProvider } from './context/AuthContext'
import { EditProfileProvider } from './context/EditProfileContext'


function App() {

  

  return (
    <Router>

        <AuthProvider>
              <ChakraProvider>

                    <div className='font-body'>
                        <Routes>
                          <Route path='/' element={<Login />} />
                          <Route path='/weshare' element={<WeShare />} />
                          <Route path='/signup' element={<SignUp  />} />
                        </Routes>
                    </div>

              </ChakraProvider>

        </AuthProvider>

    </Router>
  );
}

export default App;
