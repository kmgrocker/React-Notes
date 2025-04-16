import React from 'react'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'

export const Home = () => {
    useEffect(()=>{       
    },[])
  return (
    <div>
        <h1>useEffect cleanup example</h1>
        <Link to='/posts'>Go to the Posts </Link>
        <br></br>
        <Link to='/users/1'>Go to the user </Link>
    </div>
  )
}
