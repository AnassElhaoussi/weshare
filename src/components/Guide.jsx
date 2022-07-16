import React from 'react'
import { weshareTags } from '../constants/Guide'

const Guide = () => {
  return (
    <div className=' xl:w-64 lg:w-52 w-48 absolute right-5 top-40 py-10 gap-8 px-6 lg:flex hidden text-center flex-col rounded-md bg-gray-100 '>
        <h1 className='text-2xl font-bold '>User Guide 👁‍🗨</h1>
        <p className=''>
        By using weshare tags, you can easily make your posts searchable 📈.
        </p>
        <div className='flex flex-wrap gap-3 justify-center font-bold'>
          {weshareTags.map(tag => (
            <button className='bg-blue-500 text-white text-xs py-1 w-fit px-3 rounded-lg hover:scale-105 transition-all'>
              {tag}
            </button>
          ))}
            
        </div>
      
    </div>
  )
}

export default Guide