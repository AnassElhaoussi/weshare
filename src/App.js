import React, {useEffect, useState} from 'react'
import './styles/index.css'
import { motion } from 'framer-motion'
import {ChakraProvider} from '@chakra-ui/react'
import {Login, SignUp} from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WeShare from './WeShare'
import { AuthProvider } from './context/AuthContext'
import { SearchPostsProvider } from './context/SearchPostsContext'
import Messages from './components/Messages'
import {db} from './firebase'


function App() {

 

  

  return (
    <Router>

        <AuthProvider>
          <SearchPostsProvider>
              <ChakraProvider>

                    <div className='font-body'>
                        <Routes>
                          <Route path='/' element={<Login />} />
                          <Route path='/weshare' element={<WeShare />} />
                          <Route path='/weshare/messages' element={<Messages />} />
                          <Route path='/signup' element={<SignUp  />} />
                        </Routes>
                    </div>

              </ChakraProvider>
          </SearchPostsProvider>

        </AuthProvider>

    </Router>
  );
}

export default App;
