
import React from 'react'
import { BallTriangle, Puff, Grid } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
        <Grid color="#00BFFF" height={80} width={80} />
    </div>
  )
}

export default Loader