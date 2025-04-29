import { useState, useEffect } from "react";

function ChallengeOne() {
    const [count, setCount] = useState(0);
    console.log("1");
    useEffect(() => {
      console.log("5")
      return () => {
        console.log("cleanup-2");
      };
    }, [count]);
  
    useEffect(() => {
      setCount((count) => count + 1);
    }, []);
  
    return <Child count={count} />;
  }
  
  export function Child({ count }) {
    console.log("2");
    useEffect(() => {
      console.log("3");
      return () => {
        console.log("cleanup-4");
      };
    }, [count]);
    return null;
  }
  
  export default ChallengeOne;


// * clean up function concept 

/* 
* Execution flow 

* Mounting phase 
*  1 = > 2 => 3 => 5 => 

* Updating flow (re render flow)
* 1 => 2 => cleanup-4 => cleanup-2 => 3 => 5 

*/