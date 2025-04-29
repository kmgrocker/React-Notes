import { useState } from "react";

export function useTime(){
    const [time,setTime] = useState(Date.now())
    const [color,setColor] = useState("red")

}