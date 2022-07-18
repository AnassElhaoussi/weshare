
import React, {useState} from 'react'
import { Home, Explore, NavBar, SideBar } from './components'
import Messages from './components/Messages'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


const WeShare = () => {

  const [darkTheme, setDarkTheme] = useState(false)

  return (
   <div className={darkTheme ? "dark" : ""}>
      <div className='dark:bg-gray-900'>
         <div className='h-screen'>
            <div className='flex flex-col gap-10 px-10 dark:bg-gray-900'>
               <NavBar />
               <div className='flex xl:gap-60 lg:gap-56 md:gap-44 sm:gap-36 gap-28 pb-20'>
                  <SideBar darkTheme={darkTheme} setDarkTheme={setDarkTheme}  />
                  <Home />
               </div>
            </div>
         </div>
      </div>
   </div>

        )
}

export default WeShare