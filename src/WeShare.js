
import React, {useState} from 'react'
import { Home, Explore, NavBar, SideBar } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


const WeShare = () => {

  const [darkTheme, setDarkTheme] = useState(false)

  return (
        <div className='flex flex-col gap-10 px-10'>
             <NavBar />
             <div className='flex xl:gap-60 lg:gap-56 md:gap-44 sm:gap-36 gap-28'>
                <SideBar />
                <Home />
             </div>
        </div>

        )
}

export default WeShare