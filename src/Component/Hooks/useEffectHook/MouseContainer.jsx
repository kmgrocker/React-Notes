import React,{useState} from 'react'
import { ClassMouse } from './ClassMouse' 
import { HookMouse } from './HookMouse' 

export const MouseContainer = () => {
    const [display,setDisplay] = useState(true)
  return (
    <div>
        <h1>to visulaize the cleanup behaviour toggle the button</h1>
        <button onClick={()=>setDisplay(!display)}>Toggle</button>
        {/* {display && <ClassMouse></ClassMouse>} */}
        {display && <HookMouse></HookMouse>}
    </div>
  )
}

