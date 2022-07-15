
import React, {useState} from 'react'
import { Avatar } from '@chakra-ui/react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { auth } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPerson } from '@fortawesome/free-solid-svg-icons';



const MembersCarousel = ({users}) => {

    const [isActive, setIsActive] = useState(false)

    
  
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

  const filteredArr = users.filter((user) => {
    const isPresentInSet = uniqueValuesSet.has(user.username);
    
    uniqueValuesSet.add(user.username);
    
    return !isPresentInSet;
  });

  console.log(filteredArr);
  

  return (
    <div className='flex flex-col gap-8 sm:w-3/4 text-center bg-blue-500 text-white rounded-md py-4'>
           <h1 className='text-xl font-bold'>Members</h1>
           
            <Carousel responsive={responsive} >
              {filteredArr.filter(({uid}) => auth.currentUser.uid !== uid).map(({username, profilePicture}) => (
                <div>
                  <div className='hover:scale-110 transition-all' onClick={() => setIsActive(!isActive)}>
                      <div className='flex flex-col items-center gap-2 py-2 px-2 cursor-pointer'>
                          <Avatar src={profilePicture} />
                          <h2 className='bg-yellow-300 py-1 px-2 text-black rounded-md font-bold md:text-sm text-xs'>@{username}</h2>
                      </div>
                  </div>
                </div>
                
              ))}
              
            </Carousel>


    </div>
  )
}

export default MembersCarousel