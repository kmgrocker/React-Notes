import React,{useState,useEffect} from 'react'


//! as u can see in below function we have used multiple useState and useEffect which is not possible in class component we have to provide multiple functionality inside given unique lifecycle like ComponentDidMount and componentDidUpdate 

export const MultipleHooks = () => {
    const [name,setName] = useState('')
    const [count,setCount] = useState(0);
    const [counter,setCounter] = useState(0);

    useEffect(()=>{
        console.log('this  useEffect will only run when count will change');
         document.title = `count ${count}`
    },[count])

    useEffect(()=>{
        // console.log('this  useEffect will only run when counter will change'); 
        // !X bad code u are chaging something on which u depend on
        const ticker = ()=>{
           setCounter(counter+1)
        }

        const interval = setInterval(ticker,1000);

        return ()=>{
            clearInterval(interval)
        }
    },[counter])

  return (
    <div>
        <input type={'text'} value={name} onChange={(e)=>setName(e.target.value)} ></input>
        <p>Your name is <b>{name}</b></p>
        <button onClick={()=>setCount(count+1)} >Count: {count}</button>
        <h2>Automatic Counter: {counter}</h2>
    </div>
  )
}
