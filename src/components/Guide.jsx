import React from 'react'
import { weshareTags } from '../constants/Guide'

const Guide = () => {
  return (
    <div className='h-screen w-72 absolute right-5 top-40 py-10 gap-8 px-6 xl:flex hidden text-center flex-col rounded-md bg-gray-100 '>
        <h1 className='text-2xl font-bold '>User Guide 👁‍🗨</h1>
        <p className=''>With weshare, you can easily share your thoughts and bring them to reality ✔🔥 <br />
        By using weshare tags, you can make your posts even searchable 📈.
        </p>
        <div className='flex flex-wrap gap-3 justify-center font-bold'>
          {weshareTags.map(tag => (
            <button className='bg-blue-500 text-white py-1 w-fit px-3 rounded-lg hover:scale-105 transition-all'>
              {tag}
            </button>
          ))}
            
        </div>
      
    </div>
  )
}

export default Guide