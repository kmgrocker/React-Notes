// ! UseState little bit differ from setState in class it does not merge the old state with the new one it replace the new one with old one 

import React,{useState} from 'react'

export const CounterOne = () => {
  const [count,setCount] = useState(0)

  const setCounter=()=>{     
    setCount(count+1)
  }
  return (
 <>
    <div>useStateHook</div>
    <p>Count {count}</p>
    <button onClick={setCounter}>Next</button>
 </>

  )
}


