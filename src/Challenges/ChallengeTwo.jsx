import { useState, useEffect } from "react";

export function ChallengeTwo() {
    const [count, setCount] = useState(0);
    console.log("parent render-1"); // Parent component rendering
    
    useEffect(() => {
      // Parent Effect #1 (with count dependency)
      console.log("Parent Effect #1 runs"); // Not in original code but added for clarity
      return () => {
        console.log("cleanup-2"); // Cleanup for Parent Effect #1
      };
    }, [count]);
  
    useEffect(() => {
      // Parent Effect #2 (runs once)
      console.log("Parent Effect #2 runs"); // Not in original code but added for clarity
      setCount((count) => count + 1);
    }, []);
  
    return <Child count={count} />;
  }
  
  export function Child({ count }) {
    console.log("child-render-2"); // Child component rendering (added for clarity)
    
    useEffect(() => {
      console.log("child-effect-3"); // Child Effect runs
      return () => {
        console.log("cleanup-4"); // Cleanup for Child Effect
      };
    }, [count]);
    
    return null;
  }


  // explanation 
  // mounting lifecycle  
  // parent render-1  => child-render-2 => child-effect-3 => Parent Effect #1 runs => Parent Effect #2 runs 

  // updating lifecycle 
  // parent render-1 => child-render-2 =>  cleanup-4 => child-effect-3 => cleanup-2 => Parent Effect #1 runs 


  // Correct answer as per browser logs only mistake i did in updating pahse between cleanup and child effects as per browser when clean up starts all cleanup will run then the useEffect lifecycle i guess 

  // * parent render-1  => child-render-2 => child-effect-3 => Parent Effect #1 runs => Parent Effect #2 runs => parent render-1 => child-render-2 =>  cleanup-4  => cleanup-2 => child-effect-3 => Parent Effect #1 runs 
