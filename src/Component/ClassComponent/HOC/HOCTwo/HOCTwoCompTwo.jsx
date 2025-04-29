import React from "react"
import withDimensions from "./withDimension"
function HOCTwoCompTwo(props, ref){
    return (
        <>
         <h1 ref={ref} className="text-green-300 h-[300px]">hi I am comp two - width -{props.width} - height-{props.height} - extra props - {props.name} , {props.variant} </h1>
        </>
    )
}

export default withDimensions(React.forwardRef(HOCTwoCompTwo))