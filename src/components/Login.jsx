import React, { useState } from 'react'
import { bgImg, googleIcon, facebookIcon, twitterIcon } from '../assets'
import {Link} from 'react-router-dom'
import {auth} from '../firebase'
import firebase from 'firebase/compat/app'


const Login = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  console.log(process.env)

  return (
    <div className='flex'>
        <div className='bg-no-repeat bg-cover w-1/2 h-screen md:flex hidden flex-col gap-3 items-center justify-center' style={{backgroundImage: "url('https://images.unsplash.com/photo-1593435221502-c5d7bfc26cab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80')"}}>
            <h1 className='xl:text-5xl lg:text-5xl md:text-3xl font-bold text-gray-100'>Welcome to we<span className=''>share</span> </h1>
            <p className='xl:text-sm text-xs md:w-80 xl:w-96 text-center text-gray-100'>A social media platform where everyone can think, create and share.</p>
        </div>
        <div className='md:w-1/2 w-screen'>
          <div className='flex flex-col gap-10 items-center justify-center h-screen'>
              <h1 className='text-4xl font-bold'>Login to we<span className='text-blue-500'>share</span></h1>
              <div className='flex gap-3 cursor-pointer'>
                  <div className='w-10' onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                    <img src={googleIcon} alt="google-icon" />
                  </div>
                  <div className='w-10' onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}>
                    <img src={facebookIcon} alt="facebook-icon"/>
                  </div>
              </div>
              <div className='flex flex-col gap-3'>
                <h3 className='text-center text-sm'>Already have an account ?</h3>
                <div className='flex flex-col gap-4'>
                  <form action="" className='flex flex-col gap-2'>
                    <label htmlFor="">Email : </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' className='bg-gray-100 px-3 py-1 outline-none' />
                  </form>
                  <form action="" className='flex flex-col gap-2'>
                    <label htmlFor="" >Password : </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' className='bg-gray-100 px-3 py-1 outline-none' />
                  </form>
                </div>
                <h3 className='text-sm'>Don't have an account ? <span className='text-blue-500 cursor-pointer'>
                    <Link to='/signup'>
                      Sign Up
                    </Link>
                  </span> </h3>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Login