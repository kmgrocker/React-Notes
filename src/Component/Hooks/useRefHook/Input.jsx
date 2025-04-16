   import React,{useEffect, useRef} from 'react'
   
   export const Input = () => {
    const inputRef = useRef(null)
    const divRef = useRef(null)

    useEffect(()=>{
    //!  as u can see that use Ref is node capturing maechanism of DOM u can do it any type of element or event which is not Dom Element    

    // ! see the change the h2 element 
        const inputNode = inputRef.current
        inputNode.focus()
        inputNode.value='this is place holder coming through useRef' 
        inputNode.style.width = '70%'
        inputNode.style.padding = '2%'
        console.log('from functional Component ',inputNode)
    },[])
     return (
       <div>
        <input type={'text'}  ref={inputRef} ></input>
        <h2 ref={divRef}>this is random</h2>
        <button onClick={()=>{divRef.current.textContent = 'what the heck'}}>change the above h2</button>
       </div>
     )
   }
   