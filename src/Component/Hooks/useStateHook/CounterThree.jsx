import React from 'react'

export const CounterThree = () => {
    const [count, setCount] = React.useState(0);

  const syncInc = () => {
    setCount(count + 1);
  };
  const asyncInc = () => {
    setTimeout(() => {
    //   setCount(count + 1); //! synchronous way 

      /* 
       * testing sceanrio here if u update the state directly then u can see it will never be updated with latest state it will hold the last state as a clousre and that value will be increased 

       * so increase some value through sync and click on async and again click imediately on sync multiple time now count have increase many times but after 2 second timer the value will be back to what async button had in setTimeout clousre so in such asynchrous behaviour alwyas prefer to provide state as a function 

       * or where the future value depend on past value the prev state must be passed through a function so in clousre it can have current state as the prev state 
      */

      setCount((prev) => prev + 1); // ! asynchronous way 

    }, 2000);
  };

  return (
    <div>
      <h1>Count- {count}</h1>
      <button onClick={syncInc}>sync inc</button>
      <p></p>
      <button onClick={asyncInc}>Async inc</button>
    </div>
  );
}
