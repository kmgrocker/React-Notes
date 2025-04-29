import React,{useEffect, useRef} from  'react';
import withDimensions from './withDimension';
function HOCTwoCompOne(props,ref){
    // const ref = useRef();
    // useEffect(()=>{
    //     console.log(ref.current.offsetHeight)
    // },[])
   return (
    <>
    <h1 ref={ref} className="text-red-300 h-[200px]">hi I am comp one - width- {props.width} - height-{props.height} - extra props - {props.name}, {props.variant}  </h1>
    </>
   )
}

export default withDimensions(React.forwardRef(HOCTwoCompOne))