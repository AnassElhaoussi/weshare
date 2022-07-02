
import React, { useState } from 'react'
import { googleIcon, facebookIcon, twitterIcon } from '../assets'
import { Link, useSearchParams } from 'react-router-dom'
import { auth } from '../firebase'

const SignUp = () => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [signUpEmail, setSignUpEmail] = useState("")
  const [createPassword, setCreatePassword] = useState("")
  const [errorMessage, setErrorMessage] = useState()
  const [notComplete, setNotComplete] = useState(false)


  const handleSignUpSubmit = (e) => {
    e.preventDefault()
    if(firstName !== "" && lastName !== "" && signUpEmail !== "" && createPassword !== ""){
        auth.createUserWithEmailAndPassword(signUpEmail, createPassword)
        .then((userCredential) => {
          userCredential.user.firstName = firstName
          userCredential.user.lastName = lastName

          console.log(userCredential);
        }).catch(error => {
          setErrorMessage(error.message)
        })

        setNotComplete(false)
    } else if(firstName == '' || lastName == '' || signUpEmail == '' || createPassword == '' ){
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
                <div className='flex flex-col gap-4' onSubmit={(e) => handleSignUpSubmit(e)}>
                  <form action="" className='flex flex-col gap-2'>
                    <label htmlFor="">First name : </label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={notComplete ? "Please enter your first name" : "Enter your first name"} className={notComplete ? 'bg-gray-100 px-3 py-1 outline-none placeholder:text-red-600' : 'bg-gray-100 px-3 py-1 outline-none'} />
                  </form>
                  <form action="" className='flex flex-col gap-2'>
                    <label htmlFor="">Last name : </label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={notComplete ? 'Please enter your last name' : 'Enter your last name'} className={notComplete ? 'bg-gray-100 px-3 py-1 outline-none placeholder:text-red-600' : 'bg-gray-100 px-3 py-1 outline-none'} />
                  </form>
                  <form action="" className='flex flex-col gap-2'>
                    <label htmlFor="">Email : </label>
                    <input type="email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)}  placeholder={notComplete ? 'Please enter an email' : 'example12@gmail.com'} className={notComplete ? 'bg-gray-100 px-3 py-1 outline-none placeholder:text-red-600' : 'bg-gray-100 px-3 py-1 outline-none'} />
                  </form>
                  <form action="" className='flex flex-col gap-2'>
                    <label htmlFor="" >Password : </label>
                    <input type="password" value={createPassword} onChange={(e) => setCreatePassword(e.target.value)}  placeholder={notComplete ? 'Please enter a password' : 'Create a password'} className={notComplete ? 'bg-gray-100 px-3 py-1 outline-none placeholder:text-red-600' : 'bg-gray-100 px-3 py-1 outline-none'} />
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