import React,{useMemo, useState} from 'react'

export const UsememoCompWithUseMemo = () => {
    const [text,setText] = useState('')

    const expensiveFunction = ()=>{
        let total = 0
        for(let i=0;i<1000000000;i++){
            total += i
        }
        return total
    }
    const expensiveFunctionMemoized = useMemo(()=>expensiveFunction(),[])
    return (
        <div>
            <input type="text" value={text} onChange={(e)=>setText(e.target.value)}/>
            {/* <h1>Total:{expensiveFunction()}</h1> */}
            <h1>Total:{expensiveFunctionMemoized}</h1>
        </div>
    )
}

export function UseMemoCompWithUseMemoTwo() {
    const [text, setText] = useState("");
    const [number, setNumber] = useState(0);
  
    const expensiveFunction = (n) => {
      console.log("function running!");
      let total = 0;
      for (let i = 1; i <= n; i++) {
        total += i;
      }
      return total;
    };
  
    // const sum = useMemo(() => expensiveFunction(number), [number]);
  
    console.log("component rendered!");
  
    return (
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="enter a text"
        />
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        {/* <span>Total: {sum}</span> */}
        <span>Total: {expensiveFunction(number)}</span>
      </div>
    );
  }