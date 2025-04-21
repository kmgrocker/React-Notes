# Basic Hooks: useState, useEffect, useContext, useRef

## Introduction

Hooks were introduced in React 16.8, revolutionizing how function components are written. They allow you to "hook into" React features like state and lifecycle methods from within function components. This section covers the four most fundamental hooks.

## 1. `useState`

- **Purpose:** Adds state management capabilities to function components.
- **Syntax:** `const [state, setState] = useState(initialState);`
    - Takes the `initialState` as an argument.
    - Returns an array containing two elements:
        1.  The current `state` value.
        2.  A `setState` function to update the state.
- **Behavior:**
    - When `setState` is called, React schedules a re-render of the component with the new state value.
    - State updates may be batched.
    - If the new state depends on the previous state, use the functional update form: `setState(prevState => newState);`.
    - The `initialState` argument is only used during the first render.

```jsx
import React, { useState } from 'react';

function Counter() {
  // Initialize state variable 'count' to 0
  const [count, setCount] = useState(0);

  const increment = () => {
    // Update state using the setter function
    setCount(count + 1);
  };

  const incrementSafely = () => {
    // Use functional update form if update depends on previous state
    // Especially important if updates might be batched
    setCount(prevCount => prevCount + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={incrementSafely}>Increment Safely</button>
    </div>
  );
}

export default Counter;
```

## 2. `useEffect`

- **Purpose:** Lets you perform side effects in function components. Side effects include data fetching, subscriptions, timers, logging, and manually changing the DOM.
- **Syntax:** `useEffect(() => { /* effect code */ return () => { /* cleanup code */ }; }, [dependencyArray]);`
    - Takes a function (`effect`) containing the side effect code.
    - Optionally, the `effect` function can return a `cleanup` function.
    - Optionally, takes a `dependencyArray`.
- **Behavior:**
    - The `effect` function runs *after* the component renders (and after paint).
    - The `cleanup` function runs before the component unmounts, and also before the effect runs again (if dependencies change).
    - **Dependency Array (`[]`):** Controls when the effect re-runs.
        - `undefined` (omitted): Effect runs after *every* render.
        - `[]` (empty array): Effect runs only *once* after the initial render (similar to `componentDidMount`). Cleanup runs on unmount.
        - `[dep1, dep2]` (array with values): Effect runs after the initial render and whenever any value in the `dependencyArray` changes.

```jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    console.log('Effect runs (or re-runs)');
    let intervalId = null;

    if (isActive) {
      // Side effect: Set up an interval timer
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
      console.log('Timer started', intervalId);
    } else {
      console.log('Timer paused or not started');
    }

    // Cleanup function: Clear the interval
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log('Timer cleared', intervalId);
      } else {
        console.log('Cleanup called, no timer to clear');
      }
    };
  }, [isActive]); // Dependency: Effect re-runs only when `isActive` changes

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}

export default Timer;
```

## 3. `useContext`

- **Purpose:** Allows function components to subscribe to React context without introducing nesting (like `<Context.Consumer>`).
- **Syntax:** `const value = useContext(MyContext);`
    - Takes a context object (the value returned from `React.createContext`) as an argument.
    - Returns the current context value for that context.
- **Behavior:**
    - The component will re-render whenever the context value provided by the nearest matching `<MyContext.Provider>` above it in the tree changes.
    - Makes consuming context values much cleaner than the render prop pattern used previously.

```jsx
import React, { useState, useContext, createContext } from 'react';

// 1. Create a Context object
const ThemeContext = createContext('light'); // Default value 'light'

function Toolbar() {
  // 3. Consume the context value using useContext
  const theme = useContext(ThemeContext);
  
  const style = {
    background: theme === 'dark' ? '#333' : '#EEE',
    color: theme === 'dark' ? 'white' : 'black',
    padding: '10px',
    border: '1px solid grey'
  };

  return (
    <div style={style}>
      Current theme: {theme}
    </div>
  );
}

function AppWithContext() {
  const [currentTheme, setCurrentTheme] = useState('light');

  const toggleTheme = () => {
    setCurrentTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }

  return (
    // 2. Provide the context value to components below
    <ThemeContext.Provider value={currentTheme}>
      <div>
        <h1>useContext Demo</h1>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <Toolbar /> 
        {/* Other components here would also get the theme */}
      </div>
    </ThemeContext.Provider>
  );
}

export default AppWithContext;
```

## 4. `useRef`

- **Purpose:** Primarily used for two main purposes:
    1.  **Accessing DOM Nodes:** Get direct access to a DOM element rendered by the component.
    2.  **Storing Mutable Values:** Keep a mutable value that persists across renders *without* causing a re-render when it changes (unlike state).
- **Syntax:** `const myRef = useRef(initialValue);`
    - Takes an `initialValue`.
    - Returns a mutable ref object whose `.current` property is initialized to the `initialValue`.
- **Behavior:**
    - **DOM Refs:** Assign the ref object to the `ref` attribute of a JSX element (`<div ref={myRef}>`). React sets `myRef.current` to the corresponding DOM node after mounting/updates.
    - **Mutable Values:** You can read and write to `myRef.current` directly. Changing `.current` does **not** trigger a re-render.

```jsx
import React, { useState, useRef, useEffect } from 'react';

function FocusInput() {
  // 1. Create a ref to hold the input DOM element
  const inputRef = useRef(null);

  useEffect(() => {
    // 3. Access the DOM node via ref.current and focus it on mount
    if (inputRef.current) {
      inputRef.current.focus();
      console.log('Input focused using useRef');
    }
  }, []); // Run only once on mount

  return (
    <div>
      <label>Focus on load: </label>
      {/* 2. Attach the ref to the input element */}
      <input ref={inputRef} type="text" placeholder="I should be focused" />
    </div>
  );
}

function PreviousValue() {
  const [count, setCount] = useState(0);
  // 1. Create a ref to store the previous count
  const prevCountRef = useRef();

  useEffect(() => {
    // 3. Update the ref AFTER the render completes
    // This means on the *next* render, prevCountRef.current holds the value from the *previous* render.
    prevCountRef.current = count;
    console.log('Updating prevCountRef.current to', count);
  }, [count]); // Update the ref whenever count changes

  // 2. Access the previous value during render
  const prevCount = prevCountRef.current;

  return (
    <div>
      <p>Current Count: {count}</p>
      <p>Previous Count: {prevCount === undefined ? 'N/A' : prevCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

function AppWithRef() {
    return (
        <div>
            <h1>useRef Demo</h1>
            <FocusInput />
            <hr />
            <PreviousValue />
        </div>
    )
}

export default AppWithRef;

```

These four basic hooks form the foundation for building interactive and stateful function components in React. 