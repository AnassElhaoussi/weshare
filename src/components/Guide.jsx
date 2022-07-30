import React from 'react'
import { weshareTags } from '../constants/Guide'

const Guide = () => {
  return (
    <div className=' xl:w-64 lg:w-52 w-48 absolute right-12 top-40  gap-8 px-6 xl:flex hidden text-center flex-col rounded-md '>
      <div className='bg-gray-100 dark:bg-gray-800 py-6 px-4 rounded-md'>
        <h1 className='text-start font-bold dark:text-gray-300 mb-4 text-xl'>Note.</h1>
        <p className='dark:text-gray-300'>
        By using weshare tags, you can easily make your posts searchable 📈.
        </p>
      </div>
      <div className='flex flex-wrap gap-3 justify-center font-bold dark:bg-gray-800 bg-gray-100 py-6 px-4 rounded-md'>
          {weshareTags.map(tag => (
            <button className='bg-yellow-300 dark:bg-yellow-400 text-xs py-1 w-fit px-3 rounded-lg hover:scale-105 transition-all'>
              {tag}
            </button>
          ))}
            
      </div>
      
    </div>
  )
}

export default Guide