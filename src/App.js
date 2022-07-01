import React, {useState} from 'react'
import './styles/index.css'
import { motion } from 'framer-motion'
import {ChakraProvider} from '@chakra-ui/react'
import {NavBar, SideBar, Explore, Home, Login} from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WeShare from './WeShare'



function App() {

  const [darkTheme, setDarkTheme ] = useState(false)

  return (

    <ChakraProvider>
      <Router>
        <div className={darkTheme ? 'dark' : ''}>
          <div className='font-body'>
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/weshare' element={<WeShare />} />
              </Routes>
          </div>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
