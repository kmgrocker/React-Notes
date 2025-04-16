import React,{useState,useEffect} from 'react'
import { useCounter } from './useCounter'

export const CounterOneForCustom = () => {
    // const [count, setCount] = useState(0)
const [counter,increment,decrement,reset] = useCounter(5,2,1)

// ! we can see the benefit of hook we can customize the hook for same activity in both counter component by passing extra Argument 
    // const increment =()=>{
    //     setCount(prevCount=>prevCount+1);
    // }
    // const decrement =()=>{
    //     setCount(prevCount=>prevCount-1);
    // }
    // const reset =()=>{
    //     setCount(0);
    // }


    
  return (
    <div>
        {/* <p>CounterOne: {count}</p> */}
        <p>CounterOne: {counter}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
    </div>
  )
}
