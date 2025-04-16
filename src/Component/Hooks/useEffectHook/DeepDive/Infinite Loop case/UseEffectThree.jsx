import React,{useState,useEffect} from 'react'

export const UseEffectThree = () => {
    const [count,setCount] = useState(0)
    // thumb rule is never update your state inside useEffect if you have provided that in the dependency array 

    // ! worrst case below wrong state update always use callback in setter this situation 

    // ! and depending upon the state which we are changing 

  /*   useEffect(()=>{
        console.log('useEffect will be stuck in infinite loop')
        setInterval(()=>{
            setCount(count+1)
        },1000)
    },[count])
 */


    useEffect(()=>{
        console.log('useEffect will be stuck in infinite loop')
        const interval = setInterval(()=>{
            setCount(prev=>prev+1)
        },1000)

        // code is running fine but since it is a timer to prevent memory leak we should cleanup this timer when component unmount 

        return ()=>{
             clearInterval(interval)
        }
    },[])

  return (
    <div>Count-{count}</div>
  )
}
