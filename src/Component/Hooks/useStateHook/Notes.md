# Summary - useState

[https://beta.reactjs.org/reference/react/useState]

``` js

function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  const [todos, setTodos] = useState(() => createTodos());

  return (
    <div>comp</div>
  )

}


```

. The useState hook lets you add state to functional components
. In classes, the state is always an object. 
. With the useState hook, the state doesn't have to be an object.
. The useState hook returns an array with 2 elements.

. The first element is the current value of the state, and the second element is a state setter function.

. New state value depends on the previous state value? You can pass a function to the setter function. it will have one arg as previous state 

. When dealing with objects or arrays, always make sure to spread your state variable and then call the setter function since unlike class component state function component state (usestate) will return the whole new state through setter function 

# useState() 

useState returns an array with exactly two values:

1. The current state. During the first render, it will match the initialState you have passed.

2. The set function that lets you update the state to a different value and trigger a re-render.

# initial State 

initialState: The value you want the state to be initially. It can be a value of any type, but there is a special behavior for functions. This argument is ignored after the initial render.
`If you pass a function as initialState, it will be treated as an initializer function. It should be pure, should take no arguments, and should return a value of any type. React will call your initializer function when initializing the component, and store its return value as the initial state.` 

# setter function 

The set function returned by useState lets you update the state to a different value and trigger a re-render. You can pass the next state directly, or a function that calculates it from the previous state:

`set functions do not have a return value.`

# caveats 

1. The set function only updates the state variable for the next render. If you read the state variable after calling the set function, you will still get the old value that was on the screen before your call.

2. If the new value you provide is identical to the current state, as determined by an Object.is comparison, React will skip re-rendering the component and its children. This is an optimization. Although in some cases React may still need to call your component before skipping the children, it shouldn’t affect your code.

3. `React batches state updates. It updates the screen after all the event handlers have run and have called their set functions. This prevents multiple re-renders during a single event. In the rare case that you need to force React to update the screen earlier, for example to access the DOM, you can use flushSync.`

4. Calling the set function during rendering is only allowed from within the currently rendering component. React will discard its output and immediately attempt to render it again with the new state. This pattern is rarely needed, but you can use it to store information from the previous renders. See an example below.

5. In Strict Mode, React will call your updater function twice in order to help you find accidental impurities. This is development-only behavior and does not affect production. If your updater function is pure (as it should be), this should not affect the logic of your component. The result from one of the calls will be ignored.

useState is a Hook, so you can only call it at the top level of your component or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.
`In Strict Mode, React will call your initializer function twice in order to help you find accidental impurities. This is development-only behavior and does not affect production.` test below example in stack blitz If your initializer function is pure (as it should be), this should not affect the logic of your component. The result from one of the calls will be ignored

# important 

**`React will store the next state, render your component again with the new values, and update the UI.`**

``` js

Calling the set function does not change the current state in the already executing code:

function handleClick() {
  setName('Robin');
  console.log(name); // Still "Taylor"!
}

It only affects what useState will return starting from the next render.

```
React flow  => state update => react will save the next state value out side of component => react will trigger rerender => React will bring the new state value and update the state variable and the ui 

``` jsx 

export default function Counter() {
  const [count, setCount] = useState(0);
   console.log('component render',count)
  function handleClick() {
    setCount(count + 1);
    console.log('old count',count)
    // old count will be the current state only react ahs saved the next update and triggered the re render which will bring the new state and update the ui 
  }

  return (
    <button onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}

```

# passing function as a initial state case 

``` js

import React, { Component } from 'react';
import './style.css';

const returnInitialCount = () => {
  console.log('initial count func');
  return 0;
};

export default function App() {
  const [count, setCount] = React.useState(returnInitialCount);
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <h2>Count {count}</h2>
    </div>
  );
}


```

# Updating state based on the previous state 

Suppose the age is 42. This handler calls setAge(age + 1) three times: 

``` jsx
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}

```

However, after one click, age will only be 43 rather than 45! This is because calling the set function does not update the age state variable in the already running code. So each setAge(age + 1) call becomes setAge(43).

To solve this problem, you may pass an updater function to setAge instead of the next state:

``` jsx 

function handleClick() {
  setAge(a => a + 1); // setAge(42 => 43)
  setAge(a => a + 1); // setAge(43 => 44)
  setAge(a => a + 1); // setAge(44 => 45)
}


```

# when to use functional way of updater function where previous value needed to capture the next value correctly 

However, if you do multiple updates within the same event, updaters can be helpful. They’re also helpful if accessing the state variable itself is inconvenient (you might run into this when optimizing re-renders).

```  jsx 

import { useState } from 'react';

export default function Counter() {
  const [age, setAge] = useState(42);

  function increment() {
    // in this case updater function must be needed otherwise the +3 button will not work properly
    setAge(a => a + 1);
  }

  return (
    <>
      <h1>Your age: {age}</h1>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <button onClick={() => {
        increment();
      }}>+1</button>
    </>
  );
}


```
