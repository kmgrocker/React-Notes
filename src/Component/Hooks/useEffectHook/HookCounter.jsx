import React,{useState,useEffect} from 'react'

export const HookCounter = () => {
    const [count,setCount] = useState(0);
    const [name,setName] = useState('');

    //! useEffect without dependency in this case useEffect will be triggered  even we try to input in the text even the input component has nothing to do with title which we want to be updated in useEffect 

   /*  
   
   useEffect(()=>{
        console.log('click useEffect running');
        document.title = `Clicked ${count} times`
    }) 
    
  */

// ! useEffect with correct dependency it is very importent to figure out that useEffect should rerun when dependent element or property are touched other wise it will be perfomance cost unnessearrily 
     

    useEffect(()=>{
        console.log('click useEffect running');
        document.title = `Clicked ${count} times`
    },[count]) 
    
    

    // above variation of useEffect will run even some other elememt in the component gets changed so for better performance we should provide the dependency array in useEffect  

    // currently above useEffect is handling both componentDidMount and componentDidUpdate 


  return (
    <>
      <div>HookCounter</div>
      <input type={'text'} value={name} onChange={(e)=>setName(e.target.value)}></input>
      <button onClick={()=>setCount(count+1)}>change title and count- {count}</button>
    </>
  )
}
