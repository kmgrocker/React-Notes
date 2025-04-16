import React,{useState,useEffect} from 'react'

export const CounterTwoForCustom = () => {
    const [count, setCount] = useState(0)

    const increment =()=>{
        setCount(prevCount=>prevCount+1);
    }
    const decrement =()=>{
        setCount(prevCount=>prevCount-1);
    }
    const reset =()=>{
        setCount(0);
    }
    
  return (
    <div>
        <p>CounterTwo: {count}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
    </div>
  )
}
