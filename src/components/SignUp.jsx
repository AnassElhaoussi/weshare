
import React, { useState } from 'react'
import { googleIcon, facebookIcon, twitterIcon } from '../assets'
import { Link, useSearchParams } from 'react-router-dom'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

  const [userName, setUserName] = useState("")
  const [signUpEmail, setSignUpEmail] = useState("")
  const [createPassword, setCreatePassword] = useState("")
  const [errorCode, setErrorCode] = useState()
  const [notComplete, setNotComplete] = useState(false)
  const navigate = useNavigate()


  const handleSignUpSubmit = (e) => {

    e.preventDefault()

    if(userName !== "" && signUpEmail !== "" && createPassword !== ""){
        auth.createUserWithEmailAndPassword(signUpEmail, createPassword)
        .then((userCredential) => {
          userCredential.user.updateProfile({
            displayName: userName
          })

          navigate('/')

        }).catch(error => {
          setErrorCode(error.code)

        })

        setNotComplete(false)
    } else if(userName == '' || signUpEmail == '' || createPassword == '' ){
        setNotComplete(true)
    }
    
  }

  
  return (
    <div className='flex'>
        <div className='bg-no-repeat bg-cover w-1/2 h-screen md:flex hidden flex-col gap-3 items-center justify-center' style={{backgroundImage: "url('https://images.unsplash.com/photo-1593435221502-c5d7bfc26cab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80')"}}>
            <h1 className='xl:text-5xl lg:text-5xl md:text-3xl font-bold text-gray-100'>Welcome to we<span className=''>share</span> </h1>
            <p className='xl:text-sm text-xs md:w-80 xl:w-96 text-center text-gray-100'>A social media platform where everyone can think, create and share.</p>
        </div>
        <div className='md:w-1/2 w-screen'>
          <div className='flex flex-col gap-10 items-center justify-center h-screen'>
              <h1 className='text-4xl font-bold'>Sign Up to we<span className='text-blue-500'>share</span></h1>
        
              <div className='flex flex-col gap-3' >
                <div className='flex flex-col items-center gap-4'>
                  <form action="" className='flex flex-col gap-2' onSubmit={handleSignUpSubmit}>
                      <label htmlFor="">Username : </label>
                      <input 
                      type="text" 
                      value={userName} 
                      onChange={(e) => setUserName(e.target.value)} 
                      placeholder={notComplete ? "Please enter a username" : "Enter your username"} 
                      className={notComplete ? 'bg-gray-100 px-3 py-1 outline-none placeholder:text-red-600' : 'bg-gray-100 px-3 py-1 outline-none'} />
                  </form>
                  <form action="" className='flex flex-col gap-2' onSubmit={handleSignUpSubmit}>
                    <label htmlFor="">Email : </label>
                    <input 
                    type="email" 
                    value={signUpEmail} 
                    onChange={(e) => setSignUpEmail(e.target.value)}  
                    placeholder={notComplete ? 'Please enter an email' : 'example12@gmail.com'} 
                    className={notComplete ? 'bg-gray-100 px-3 py-1 outline-none placeholder:text-red-600' : 'bg-gray-100 px-3 py-1 outline-none'} />
                    <p className='text-xs text-red-600'>{errorCode === 'auth/invalid-email' ? 'Invalid Email!' : ''} </p>
                  </form>
                  <form action="" className='flex flex-col gap-2' onSubmit={handleSignUpSubmit}>
                    <label htmlFor="" >Password : </label>
                    <input 
                    type="password" 
                    value={createPassword} 
                    onChange={(e) => setCreatePassword(e.target.value)}  
                    placeholder={notComplete ? 'Please enter a password' : 'Create a password'} 
                    className={notComplete ? 'bg-gray-100 px-3 py-1 outline-none placeholder:text-red-600' : 'bg-gray-100 px-3 py-1 outline-none'} />
                    <p className='text-xs text-red-600'>{errorCode === 'auth/weak-password' ? 'Password should be atleast 6 characters' : ''}</p>
                    <button type='submit' className='bg-blue-500 font-bold text-white rounded-3xl py-1 px-4'>Submit</button>
                  </form>

                </div>
                <h3 className='text-sm'>Already have an account ? <span className='text-blue-500 cursor-pointer'>
                    <Link to='/'>
                      Login
                    </Link>
                </span> </h3>
              </div>
          </div>
        </div>
    </div>
  )
}

export default SignUp