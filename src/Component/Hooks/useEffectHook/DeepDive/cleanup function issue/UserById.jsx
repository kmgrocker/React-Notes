import React,{useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'

export const UserById = () => {
 const [user,setUser] = useState({})


 // we have seen that in case of unmounting issue we can prevent by providing a flag and then setting a data 

 // but API is getting called regardless 

  // to cancel the API it self we have to use abort controller 

  // now in console u can see that request is getting cancelled 

 const {id} = useParams()

 useEffect(()=>{
    const controller = new AbortController()
    const signal = controller.signal
    let subscribe = true;
    const fetchPost  = async()=>{ 
            const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{signal:signal}).then(res=>res.json()).then(data=>data).catch(err=>{
                if(err.name === 'AbortError'){
                    console.log('request has been cancelled')
                }else{
                    console.log('other error')
                }
            })
            console.log(data);
            if(subscribe){
                setUser(data)
            }
    }
    fetchPost()

    return ()=>{
        subscribe = false
        controller.abort();
    }
 },[id])
  return (
    <div>
        <p>Name: {user.name}</p>
        <p>Username : {user.username}</p>
        <p>Email: {user.email}</p>
        <Link to='/users/1'>Fetch User 1</Link>
        <Link to='/users/2'>Fetch User 2</Link>
        <Link to='/users/3'>Fetch User 3</Link>
    </div>
  )
}
