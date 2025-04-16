import React,{useState,useEffect,useRef} from 'react'

export const HookRefCounter = () => {
    const [count,setCount] = useState(0)
    const timer = useRef()
   useEffect(()=>{
     timer.current = setInterval(()=>setCount(prevCount=>prevCount+1),1000)

        // so clearing interval from outside of UseEffect we have to hold the instance of interval through useRef and then can clear through any event Handler 
        
     return ()=>{
        clearInterval(timer.current);
     }
   },[])

  return (
    <div>
        <h2>HookRefCounter</h2>
         <p>Hook Counter <b>{count}</b></p>
         <button onClick={()=>{clearInterval(timer.current)}}>stop counter</button>
    </div>
  )
}

