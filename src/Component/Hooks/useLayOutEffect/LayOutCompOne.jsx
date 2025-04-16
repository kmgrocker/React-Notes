import React,{useState,useRef,useEffect,useLayoutEffect} from 'react'

export const LayOutCompOne = () => {
    const [show,setShow] = useState(false)
    const modalRef = useRef(null)
    const btnRef = useRef(null)

    // the Effect is fast and react also does batching of effect so the scenarion won,t be visible thats why degugger is there in both useEffect and useLayouteffect to see the effect clearly 

 /*    useEffect(()=>{
        console.log('useEffect running')
        debugger
        if(modalRef.current == null || btnRef.current == null) return 
        const {bottom} = btnRef.current.getBoundingClientRect()
        modalRef.current.style.top = `${bottom+85}px`
    },[show]) */

    useLayoutEffect(()=>{
        console.log('useLayout Effect running')
        debugger
        if(modalRef.current == null || btnRef.current == null) return 
        const {bottom} = btnRef.current.getBoundingClientRect()
        modalRef.current.style.top = `${bottom+85}px`
    },[show])

  return (
    <div>
        <h1>useLayout Effect Example</h1>
         <button ref={btnRef} onClick={()=>setShow(prev=>!prev)}>show modal</button>
         {show && (
            <div style={{position:'absolute',left:'45%'}} ref={modalRef} >
                I am Modal
            </div>
         )}
    </div>
  )
}
