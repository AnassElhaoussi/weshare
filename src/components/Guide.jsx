import React from 'react'
import { weshareTags } from '../constants/Guide'

const Guide = () => {
  return (
    <div className=' xl:w-64 lg:w-52 w-48 absolute right-5 top-40 py-10 gap-8 px-6 xl:flex hidden text-center flex-col rounded-md bg-gray-100 dark:bg-gray-800'>
        <h1 className='text-2xl font-bold dark:text-white'>User Guide 👁‍🗨</h1>
        <p className='dark:text-gray-300'>
        By using weshare tags, you can easily make your posts searchable 📈.
        </p>
        <div className='flex flex-wrap gap-3 justify-center font-bold'>
          {weshareTags.map(tag => (
            <button className='bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-300 text-xs py-1 w-fit px-3 rounded-lg hover:scale-105 transition-all'>
              {tag}
            </button>
          ))}
            
        </div>
      
    </div>
  )
}

export default Guide