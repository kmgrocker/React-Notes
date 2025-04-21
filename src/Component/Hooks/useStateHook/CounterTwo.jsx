//! a better implementation of useSate is that always capture the previous state when using updater function similar in class based component 

import React,{useState} from 'react'

export const CounterTwo = () => {
    const initialCount = 0;
    const [count,setCount] = useState(initialCount);
    
    const incFive = () => {
         for(let i=0;i<5;i++){
             setCount(prev=>prev+1)
         }
    }
  return (
        <>
            <div>CounterTwo</div> 
             <div>Initial count - {initialCount}</div>
             <div>Current count - {count}</div>
             <button onClick={()=>setCount(count+1)}>Next Count </button>
             <button onClick={()=>setCount(count-1)}>previous Count</button>
             <button onClick={incFive}>increment 5 with loop</button>
        </>
  )
}
