import React,{useState} from 'react'

export const useCounter = (initialValue=0,inc,dec) => {
    const [counter,setCounter] = useState(initialValue)

    const increment =()=>{
        setCounter(prevCount=>prevCount+inc);
    }
    const decrement =()=>{
        setCounter(prevCount=>prevCount-dec);
    }
    const reset =()=>{
        setCounter(initialValue);
    }

  return [counter,increment,decrement,reset]
}
