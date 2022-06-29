import React, {useState} from 'react'
import './styles/index.css'
import { motion } from 'framer-motion'
import {ChakraProvider} from '@chakra-ui/react'
import {NavBar, Messages, Posts, SideBar} from './components'


function App() {

  const [darkTheme, setDarkTheme ] = useState(false)

  return (
    <ChakraProvider>
      <div className='font-body flex flex-col gap-10  px-5'>
          <NavBar />
          <div className='flex justify-between'>
            <SideBar />
            <Posts />
            <Messages />
          </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
