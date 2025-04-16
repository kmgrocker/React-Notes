import React, { useTransition } from 'react'
import { useState } from 'react'

export const ExampleOne = ()=>{
   const [count,setCount] = useState(0)
   const [items,setItems] = useState([])
   const [isPending,startTransition] = useTransition()

   const handleClick = ()=>{
    setCount(c=>c+1)
    const myArr =  Array(20000).fill(1).map((el,i)=>(count+20000)-i)
    // without transition hook both state update will be batched and thats why count also increase when list is populated  so we can define that list part as transition  
    startTransition(()=>{
        setItems(myArr)
    })
   }

   const content = (
    <div >
        <button style={{width:50,height:50}} onClick={handleClick}>{count}</button>
        {isPending ? (<div>loading.......</div>): (<ul>
            {items.map((val,idx)=><li key={val}>{val}</li>)}
        </ul>)}
    </div>
   )
   return content;
}

