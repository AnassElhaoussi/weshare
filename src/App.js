import React, {useState} from 'react'
import './styles/index.css'
import { motion } from 'framer-motion'
import {ChakraProvider} from '@chakra-ui/react'
import {NavBar, Messages, Posts, SideBar} from './components'


function App() {

  const [darkTheme, setDarkTheme ] = useState(false)

  return (
    <ChakraProvider>
      <div className={darkTheme ? 'dark' : 'font-body flex flex-col gap-20'}>
          <div>
            <NavBar />
          </div>
          <div className='flex justify-between px-10'>
            <div>
              <SideBar />
            </div>
            <Posts />
            <Messages />
          </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
