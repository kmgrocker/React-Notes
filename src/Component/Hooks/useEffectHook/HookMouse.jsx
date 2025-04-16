import React,{useState,useEffect} from 'react'


export const HookMouse = () => {
    const [X,setX] = useState(0)
    const [Y,setY] = useState(0)


    const logMousePosition = (e)=>{
        console.log(`mouse position X: ${X} Y: ${Y}`)
        setX(e.clientX)
        setY(e.clientY)
    }

    useEffect(()=>{
       console.log('useEffect is running')
       window.addEventListener('mousemove',logMousePosition)

// ! if u remove cleanup function and empty dependency array u will see different behaviour basically useEffect will run again and again and register new event listener and the effect can be seen in MouseContainer Component 
       // cleanup function 
       return (()=>{
        window.removeEventListener('mousemove',logMousePosition)
       })
    },[])

  

  return (
    <div>X: {X} Y: {Y}</div>
  )
}

