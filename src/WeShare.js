
import React, {useEffect, useState} from 'react'
import { Home, Explore, NavBar, SideBar } from './components'
import Messages from './components/Messages'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


const WeShare = () => {

  const [darkTheme, setDarkTheme] = useState(localStorage.getItem('darktheme') === 'true')
  const [commentSectIsActive, setCommentSectIsActive] = useState(false)



  return (
   <div className={darkTheme ? "dark" : ""}>
      <div className='dark:bg-gray-900 transition-colors'>
         <div className='h-screen' style={{overflow: commentSectIsActive ? 'hidden' : 'auto'}}>
            <div className='flex flex-col gap-10 px-10 dark:bg-gray-900'>
               <NavBar />
               <div className='flex xl:gap-60 lg:gap-56 md:gap-44 sm:gap-36 gap-28 pb-20'>
                  <SideBar darkTheme={darkTheme} setDarkTheme={setDarkTheme}  />
                  <Home commentSectIsActive={commentSectIsActive} setCommentSectIsActive={setCommentSectIsActive} />
               </div>
            </div>
         </div>
      </div>
   </div>

        )
}

export default WeShare