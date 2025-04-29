import { useState } from "react"

export function Clock({time,color}){
    color = "pink"; // even though props are immutable but as you can see here since after destructuring it is just a variable it lost its object identity which was immutable 
    return (
        <div>
            <h1 style={{color:`${color}`}}>{time}</h1>
        </div>
    )
}

// immutability of props will be intact if you do not destructure it 

export function ClockImmutable(props){
    console.dir(props)
    console.log(Object.isFrozen(props))
    console.log(Object.isSealed(props))
    // props.color = "pink" // this will not work by design since props is immutable see above logs 
  return (
    <div>
       <h1 style={{color:`${props.color}`}}>{props.time}</h1>
    </div>
  )
}

export function ClockParent(){
    const [color,setColor] = useState("red")
    const currentTime = new Date().toLocaleTimeString()
     const colors = ["red","green","blue"];
     function onChangeHandler(e){
        setColor(e.target.value)
     }
     const Options = colors.map(clr=><option key={clr} value={clr}>{clr}</option>)
    return (
        <>
        <select onChange={onChangeHandler}>
            {Options}
        </select>
        {/* <Clock time={currentTime} color={color} /> */}
        <ClockImmutable time={currentTime} color={color}/>
        </>
    )
}