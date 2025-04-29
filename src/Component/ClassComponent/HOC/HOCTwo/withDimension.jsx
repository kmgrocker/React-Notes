import React, { useEffect, useRef, useState } from "react";


export function withDimensions(WrappedComponent){
    function WithDimensions(props){
        const [width,setWidth] = useState(0)
        const [height,setHeight] = useState(0);
        const ref = useRef();
        useEffect(()=>{
            // console.log(ref.current.offsetHeight)
           if(ref.current){
            setWidth(ref.current.offsetWidth)
            setHeight(ref.current.offsetHeight)
           }
        },[])

        return <WrappedComponent ref={ref} width={width} height={height} {...props} />
    }
    return WithDimensions
}

export default withDimensions