
import React, {useState, useEffect} from 'react'
import { weshareTags } from '../constants/Guide'
import { db } from '../firebase'


const EditPost = ({setEdit, docId, editText, editTag}) => {

  const [newPostText, setNewPostText] = useState(editText)
  const [newWeshareTag, setNewWeshareTag] = useState(editTag)
  const [editErr, setEditErr] = useState(false)

  
  const handleEdit = async () => {

    if(newPostText){
        await db.collection('posts').doc(docId).update({
            text: newPostText,
            tag: newWeshareTag,
            date: new Date().toString().substring(0, 33),
            isEdited: true
        })
    
        setEdit(false)
    } else {
        setEditErr(true)
    }

  
  }
  
  return (

    <div className='flex flex-col gap-5 md:w-3/4 h-96 bg-gray-100 dark:bg-gray-800 p-6 rounded-md'>
        <h1 className='text-xl font-bold dark:text-white'>Edit your post</h1>
        <div className='flex flex-wrap gap-1 justify-start font-bold'>
            {weshareTags.map(tag => (
                <button className='bg-yellow-300 dark:bg-yellow-400 py-1 text-xs w-fit px-3 rounded-2xl hover:scale-105 transition-all' 
                onClick={() => setNewWeshareTag(tag)}>
                    {tag}
                </button> 
            ))}
        </div>
        <h1 className='text-red-600'>{editErr && 'Text Field is empty !'} </h1>
        <textarea name="" id="" cols="30" rows="10" className='p-4 text-xl bg-gray-100 dark:bg-gray-800 dark:text-gray-300 outline-none' placeholder='Edit your post..' value={newPostText} onChange={(e) => setNewPostText(e.target.value)}></textarea>
        <button className={newWeshareTag && 'bg-blue-500 dark:bg-blue-700 py-1 text-xs w-fit px-3 rounded-2xl font-bold text-white dark:text-gray-300'}>{newWeshareTag}</button>
        <div className='flex justify-between font-bold text-white dark:text-gray-300 '>
            <button 
            className='bg-blue-500 dark:bg-blue-700 py-1 px-3 rounded hover:scale-105 transition-all' 
            onClick={handleEdit}>Edit</button>

            <button 
            className='bg-blue-500 dark:bg-blue-700 py-1 px-3 rounded hover:scale-105 transition-all' 
            onClick={() => setEdit(false)}>Cancel</button>
        </div>
    </div>
  
  )
}

export default EditPost