
import React from 'react'
import Messages from './Messages'
import Posts from './Posts'

const Home = () => {
  return (
    <div className='flex'>
        <Posts />
        <Messages />
    </div>
  )
}

export default Home