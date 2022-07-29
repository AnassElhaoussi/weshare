
import React, {useState, useEffect} from 'react'
import { Avatar } from '@chakra-ui/react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { auth, db } from '../firebase';
import { useAuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPerson } from '@fortawesome/free-solid-svg-icons';
import { useUsersContext } from '../context/UsersContext';



const MembersCarousel = () => {

    const user = useAuthContext()
    const [isActive, setIsActive] = useState(false)
    const users = useUsersContext()
    

      
      useEffect(() => {
        db.collection('users').add({
          username: user.displayName,
          profilePicture: user.photoURL,
          uid: user.uid
        })
        
      }, [])
  
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };


  const uniqueValuesSet = new Set()

  const filteredArr = users.filter(({data, id}) => {
    const isPresentInSet = uniqueValuesSet.has(data.username);
    
    uniqueValuesSet.add(data.username);
    
    return !isPresentInSet;
  });

  console.log(filteredArr);

  
  

  return (
    <div className='flex flex-col gap-8 sm:w-3/4 text-center bg-blue-500 dark:bg-blue-700 text-white rounded-md py-4'>
           <h1 className='text-xl font-bold'>Members</h1>
           
            <Carousel responsive={responsive} >
              {filteredArr.filter(({data, id}) => auth.currentUser.uid !== data.uid).map(({data, id}) => (
                <div>
                  <div className='hover:scale-110 transition-all' onClick={() => setIsActive(!isActive)}>
                      <div className='flex flex-col items-center gap-2 py-2 px-2 cursor-pointer'>
                          <Avatar src={data.profilePicture} />
                          <h2 className='bg-yellow-300 dark:bg-yellow-400 py-1 px-2 text-black rounded-md font-bold md:text-sm text-xs'>@{data.username}</h2>
                      </div>
                  </div>
                </div>
                
              ))}
              
            </Carousel>


    </div>
  )
}

export default MembersCarousel