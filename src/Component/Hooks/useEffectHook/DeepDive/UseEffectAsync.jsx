import React,{useEffect, useState} from 'react'

export const UseEffectAsync = () => {
    const [count,setCount] = useState(0)

    useEffect(()=>{
       console.log('useEffect runs')
       document.title=`you clicked ${count} times`
    },[count])

    console.log('component render')

    //! if u closely see the both console then u will find it that useEffect is asynchrounous  it will run after the component render and in side useEffect if something is getting changed on which component tree depend it will force to re render the component 
  return (
    <div>
        <h1>useEffectAsync</h1>
         <h2>you clicked {count} times</h2>
         <button onClick={()=>setCount((prev)=>prev+1)}>inc count</button>
    </div>
  )
}
