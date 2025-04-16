import React,{useState,useEffect} from 'react'

export const IntervalHookCounter = () => {
    const [count,setCount] = useState(0)

    // const tick = ()=>{
    //     setCount(count+1)
    // }

// ! TIP always create function inside useEffect  which u are going to use inside useEffect 

// ! if us remove the cleanup function u will see the Hook Counter will flicker indicating that it is getting created every time so make sure to cleanup 

// ! another way to create a tick function given below accesssing the prev props 

/* 
  const tick = ()=>{
    setCount(prevCount=>prevCount+1)
  }
*/

    useEffect(()=>{
        const tick = ()=>{
            setCount(count+1)
        }
        const interval = setInterval(tick,1000)

        return ()=>{
            clearInterval(interval)
        }

    },[count])

  return (
    <div>Hook Counter: {count}</div>
  )
}

