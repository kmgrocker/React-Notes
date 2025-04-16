import React,{useContext} from 'react'
import { ComponentC } from './ComponentC'
import { userContext,channelContext,ratingContext } from '../../../App'
export const ComponentB = () => {
    //! we are consuming  the context through useContext hook in this 
const username = useContext(userContext)
const channelname = useContext(channelContext)
const rating = useContext(ratingContext)
  return (
    <div>

        <div>useContext hook result coming from componemt B</div>
        <div>my username is <b>{username}</b> my channel is <b>{channelname}</b> and rating is <b>{rating}</b> </div>
        <div style={{'margin':'4% 0'}}></div>
        <ComponentC/>
    </div>
  )
}
