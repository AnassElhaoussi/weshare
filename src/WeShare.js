
import React from 'react'
import { Home, Explore, NavBar, SideBar } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


const WeShare = () => {
  return (
            <div className='flex flex-col gap-20'>
                    <div>
                        <NavBar />
                    </div>
                    <div className='flex px-10 justify-between'>
                        <div>
                            <SideBar />
                        </div>
                        <div className='py-10'>
                            <Home />
                        </div>
                    </div>
            </div>
        )
}

export default WeShare