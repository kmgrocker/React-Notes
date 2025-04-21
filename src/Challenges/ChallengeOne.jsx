import { useState, useEffect } from "react";

function ChallengeOne() {
    const [count, setCount] = useState(0);
    console.log("1");
    useEffect(() => {
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