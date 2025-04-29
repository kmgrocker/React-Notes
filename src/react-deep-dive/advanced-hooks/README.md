# Advanced Hooks

## Introduction

Beyond the basic hooks (`useState`, `useEffect`, `useContext`, `useRef`), React provides several advanced hooks for more specific scenarios like complex state logic, performance optimizations, interacting with the DOM layout, customizing ref handles, and improving responsiveness with concurrent features.

## 1. `useReducer`

- **Purpose:** An alternative to `useState` for managing complex state logic involving multiple sub-values or when the next state depends intricately on the previous one. Often preferred when state logic is non-trivial or requires updates from deep within child components (passed down via context).
- **Syntax:** `const [state, dispatch] = useReducer(reducer, initialArg, init?);`
    - `reducer`: A function `(state, action) => newState` that specifies how the state updates in response to actions.
    - `initialArg`: The initial state value (or an argument passed to `init`).
    - `init` (optional): An initializer function to compute the initial state lazily.
    - Returns the current `state` and a `dispatch` function.
- **Behavior:**
    - Instead of calling `setState` directly, you call `dispatch({ type: 'ACTION_TYPE', payload: ... })`.
    - React calls your `reducer` function with the current `state` and the dispatched `action`.
    - The value returned by the `reducer` becomes the new state.
    - Promotes separating update logic from the component.

```jsx
import React, { useReducer } from 'react';

// 1. Define the initial state
const initialState = { count: 0, step: 1 };

// 2. Define the reducer function
function reducer(state, action) {
  console.log('Reducer called with state:', state, 'action:', action);
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'reset':
      return { ...state, count: 0 };
    case 'setStep':
      return { ...state, step: action.payload };
    default:
      throw new Error('Unhandled action type: ' + action.type);
  }
}

function CounterWithReducer() {
  // 3. Initialize the reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Step: {state.step}</p>
      {/* 4. Dispatch actions on events */}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <input 
        type="number" 
        value={state.step}
        onChange={(e) => dispatch({ type: 'setStep', payload: Number(e.target.value) || 1 })}
      />
    </div>
  );
}

export default CounterWithReducer;
```

## 2. `useMemo`

- **Purpose:** Memoizes the result of an expensive calculation. It re-runs the calculation only when one of its dependencies changes, otherwise returning the cached result from the previous render.
- **Syntax:** `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`
    - Takes a function that computes the value.
    - Takes a dependency array.
- **Behavior:**
    - Prevents re-computing expensive values on every render if the inputs haven't changed.
    - Useful for optimizing calculations, data transformations, or creating complex objects that shouldn't be recreated unnecessarily.

```jsx
import React, { useState, useMemo } from 'react';

// Assume this is a slow function
function slowSquare(num) {
  console.log(`Calculating square for ${num}...`);
  let i = 0; while (i < 100000000) i++; // Simulate slowness
  return num * num;
}

function MemoDemo() {
  const [number, setNumber] = useState(10);
  const [counter, setCounter] = useState(0); // Another state to trigger re-renders

  // Without useMemo, slowSquare would run every time Parent re-renders (e.g., when counter changes)
  // const squaredNumber = slowSquare(number); 

  // With useMemo, slowSquare only runs when 'number' changes
  const squaredNumber = useMemo(() => {
    return slowSquare(number);
  }, [number]); // Dependency: number

  return (
    <div>
      <p>Number: {number}</p>
      <p>Squared Number (Memoized): {squaredNumber}</p>
      <button onClick={() => setNumber(number + 1)}>Increment Number</button>
      <hr />
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>
        Increment Counter (Triggers re-render)
      </button>
      <p>Notice how squaring only recalculates when 'Number' changes, not 'Counter'.</p>
    </div>
  );
}

export default MemoDemo;
```

## 3. `useCallback`

- **Purpose:** Memoizes a callback function itself, rather than its result. It returns the same function instance between renders as long as its dependencies haven't changed.
- **Syntax:** `const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);`
    - Takes the callback function.
    - Takes a dependency array.
- **Behavior:**
    - Useful when passing callbacks to optimized child components (like those wrapped in `React.memo` or `PureComponent`). Without `useCallback`, a new function instance is created on every parent render, potentially causing the child to re-render unnecessarily even if its props appear the same.
    - Ensures referential equality for callbacks.

```jsx
import React, { useState, useCallback } from 'react';

// Child component optimized with React.memo
const MemoizedButton = React.memo(({ onClick, label }) => {
  console.log(`Rendering MemoizedButton: ${label}`);
  return <button onClick={onClick}>{label}</button>;
});

function CallbackDemo() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // Without useCallback, a new increment1 function is created on every render,
  // causing MemoizedButton 1 to re-render even when only count2 changes.
  // const increment1 = () => setCount1(count1 + 1);

  // With useCallback, increment1 function instance is stable as long as count1 doesn't change
  // (or rather, the dependency array is empty here, so it's stable forever)
  const increment1 = useCallback(() => {
     // Note: If the callback depends on state, include it in deps or use functional update
    setCount1(c => c + 1);
  }, []); // Empty deps: function never changes reference

  // This callback *does* depend on count1, so include it in deps
  const increment2 = useCallback(() => {
    setCount2(c => c + count1); // Example dependency
  }, [count1]); // Dependency: count1

  return (
    <div>
      <p>Count 1: {count1}</p>
      <p>Count 2: {count2}</p>
      <MemoizedButton onClick={increment1} label="Increment Count 1 (Callback)" />
      <MemoizedButton onClick={increment2} label="Increment Count 2 (Callback w/ dep)" />
      <p>Check console: Button 1 only re-renders if its props change (which they don't here thanks to useCallback).</p>
    </div>
  );
}

export default CallbackDemo;
```

## 4. `useLayoutEffect`

- **Purpose:** Similar to `useEffect`, but it fires **synchronously** after all DOM mutations are complete, but **before** the browser has painted the changes.
- **Syntax:** Same as `useEffect`: `useLayoutEffect(() => { /* effect */ return () => { /* cleanup */ }; }, [deps]);`
- **Behavior:**
    - Useful for reading layout from the DOM (like element dimensions or scroll position) and synchronously re-rendering based on that information before the user sees any intermediate state.
    - Can block visual updates if the code inside is slow. Prefer `useEffect` for most side effects.

```jsx
import React, { useState, useLayoutEffect, useRef } from 'react';

function LayoutEffectDemo() {
  const [height, setHeight] = useState(0);
  const textareaRef = useRef(null);

  // Use useLayoutEffect to measure the textarea height *after* it renders
  // but *before* the browser paints, avoiding a flicker.
  useLayoutEffect(() => {
    if (textareaRef.current) {
      const newHeight = textareaRef.current.scrollHeight;
      console.log('useLayoutEffect: Measured height', newHeight);
      // If we used useEffect here, there might be a brief flicker
      // as the component renders once, then measures, then renders again.
      if (newHeight !== height) {
         setHeight(newHeight);
      }
    }
  }, [height]); // Re-run if height changes (e.g., if we manually resize)

  // Example of something that might change the required height
  const [text, setText] = useState('Initial text.\nTry adding more lines.');

  return (
    <div>
      <p>Textarea Height (measured): {height}px</p>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ height: `${height}px`, overflow: 'hidden' }} // Dynamically set height
      />
    </div>
  );
}

export default LayoutEffectDemo;
```

## 5. `useImperativeHandle`

- **Purpose:** Customizes the instance value that is exposed to parent components when using `ref`. Typically used with `React.forwardRef`.
- **Syntax:** `useImperativeHandle(ref, createHandle, [deps]);`
    - `ref`: The ref passed down from the parent (via `forwardRef`).
    - `createHandle`: A function that returns the object/value to be exposed on the ref.
    - `deps`: Dependencies array; the handle is recreated if dependencies change.
- **Behavior:**
    - Allows a child component to selectively expose certain imperative methods (like `focus`, `scrollIntoView`, custom methods) to its parent via a ref, instead of exposing the entire DOM node or component instance.
    - Should be used sparingly, as imperative code breaks the declarative model.

```jsx
import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';

// Child component using forwardRef and useImperativeHandle
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  const [internalValue, setInternalValue] = useState('');

  // Expose specific methods to the parent via the ref
  useImperativeHandle(ref, () => ({
    focusInput: () => {
      console.log('Child: Focusing input imperatively');
      inputRef.current.focus();
    },
    clearInput: () => {
        console.log('Child: Clearing input imperatively');
        setInternalValue('');
        inputRef.current.value = ''; // Also clear native input
    },
    // Not exposing the inputRef.current directly
  }), []); // Empty deps: handle object is stable

  return (
    <input 
        ref={inputRef} 
        value={internalValue} 
        onChange={e => setInternalValue(e.target.value)} 
        placeholder="Fancy Input" 
    />
  );
});

// Parent component using the ref
function ImperativeHandleDemo() {
  const fancyInputRef = useRef();

  const handleFocusClick = () => {
    if (fancyInputRef.current) {
      fancyInputRef.current.focusInput(); // Call the exposed method
    }
  };

  const handleClearClick = () => {
    if (fancyInputRef.current) {
      fancyInputRef.current.clearInput(); // Call the exposed method
    }
  };

  return (
    <div>
      <FancyInput ref={fancyInputRef} />
      <button onClick={handleFocusClick}>Focus the Input</button>
      <button onClick={handleClearClick}>Clear the Input</button>
    </div>
  );
}

export default ImperativeHandleDemo;
```

## 6. `useDebugValue`

- **Purpose:** Used inside custom hooks to display a label for them in React DevTools.
- **Syntax:** `useDebugValue(value, format?);`
    - `value`: The value to display.
    - `format` (optional): A function to format the displayed value (only called when DevTools are open and inspecting).
- **Behavior:** Helps in debugging custom hooks by providing more meaningful information in the DevTools hook inspector.

```jsx
import React, { useState, useEffect, useDebugValue } from 'react';

// Custom Hook Example
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    // Simulate fetching status
    console.log(`Setting up listener for friend ${friendID}`);
    const timer = setTimeout(() => setIsOnline(Math.random() > 0.5), 1000);
    return () => {
      clearTimeout(timer);
      console.log(`Cleaning up listener for friend ${friendID}`);
    };
  }, [friendID]);

  // Use useDebugValue to show status in DevTools
  // Avoid formatting if it's expensive unless DevTools are open
  useDebugValue(isOnline === null ? 'Loading...' : isOnline ? 'Online' : 'Offline');

  return isOnline;
}

function DebugValueDemo() {
  const friend1Online = useFriendStatus(1);
  const friend2Online = useFriendStatus(2);

  return (
    <div>
      <p>Friend 1 Status: {friend1Online === null ? 'Loading...' : friend1Online ? 'Online' : 'Offline'}</p>
      <p>Friend 2 Status: {friend2Online === null ? 'Loading...' : friend2Online ? 'Online' : 'Offline'}</p>
      <p>(Check React DevTools Hooks panel for 'FriendStatus' debug value)</p>
    </div>
  );
}

export default DebugValueDemo;

```

## 7. `useTransition` (React 18+)

- **Purpose:** Allows marking specific state updates as non-urgent "transitions". React can interrupt these transitions if more urgent updates (like user input) come in, keeping the UI responsive.
- **Syntax:** `const [isPending, startTransition] = useTransition();`
    - Returns:
        - `isPending`: A boolean indicating if a transition is currently active.
        - `startTransition`: A function to wrap the state update(s) you want to mark as a transition.
- **Behavior:**
    - State updates wrapped in `startTransition` are treated as lower priority.
    - Useful for updates that might cause expensive re-renders (e.g., filtering large lists, complex visualizations) without blocking user input.

```jsx
import React, { useState, useTransition } from 'react';

// Assume ExpensiveList renders many items and is slow
function ExpensiveList({ searchTerm }) {
    const items = Array.from({ length: 5000 }).map((_, i) => 
        `Item ${i} matching ${searchTerm}`
    );
    // Simulate render calculation cost
    // let i=0; while(i<10000000) i++;
    console.log('Rendering ExpensiveList...');
    return (
        <ul>
            {items.map(item => <li key={item}>{item}</li>)}
        </ul>
    );
}

function TransitionDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [listTerm, setListTerm] = useState('');
  // isPending indicates if the low-priority update is still rendering
  const [isPending, startTransition] = useTransition();

  const handleChange = (event) => {
    const value = event.target.value;
    // Update the input field immediately (high priority)
    setSearchTerm(value);
    
    // Mark the list update as a transition (low priority)
    startTransition(() => {
      console.log('Starting transition...');
      setListTerm(value);
    });
  };

  return (
    <div>
      <input 
        type="text" 
        value={searchTerm}
        onChange={handleChange} 
        placeholder="Search (try typing fast)"
      />
      {isPending && <p style={{ color: 'blue' }}>Updating list...</p>}
      <div style={{ opacity: isPending ? 0.6 : 1 }}>
         <ExpensiveList searchTerm={listTerm} />
      </div>
      <p>Without transition, typing quickly might feel laggy.</p>
      <p>With transition, input remains responsive while list updates.</p>
    </div>
  );
}

export default TransitionDemo;
```

## 8. `useDeferredValue` (React 18+)

- **Purpose:** Defers updating a part of the UI. Similar to `useTransition`, but often simpler for cases where you don't control the state update itself. It essentially tells React it's okay to render an older version of a value while the new value is being prepared.
- **Syntax:** `const deferredValue = useDeferredValue(value, { timeoutMs? });`
    - Takes the `value` you want to potentially defer.
    - Returns a deferred version of the value.
- **Behavior:**
    - React first attempts to re-render with the new `value`.
    - If that re-render is interrupted (e.g., by user input), React will re-render again using the *old* `value` (the `deferredValue`).
    - Once the original update finishes, the `deferredValue` will update to the new `value`.
    - Useful for showing stale content while fresh content loads/renders, improving perceived performance.

```jsx
import React, { useState, useDeferredValue, useMemo } from 'react';

// Assume this component is slow to render based on its props
function SlowList({ text }) {
  console.log(`Rendering SlowList with text: ${text}`)
  // Artificially slow down rendering
  let items = [];
  if (text) { // Only slow down if text exists
    for (let i = 0; i < 2000; i++) { 
        items.push(<ListItem key={i} text={text} />);
    }
  } else {
      items.push(<li key="empty">Type something...</li>);
  }
  // Simulate calculation
  // let j=0; while(j<10000000) j++;
  return <ul>{items}</ul>;
}

// Simple memoized list item to avoid individual item re-renders
const ListItem = React.memo(({ text }) => {
    // console.log(`Rendering ListItem ${text}`)
    return <li>Item for: {text}</li>
});

function DeferredValueDemo() {
  const [text, setText] = useState('');
  
  // Get a deferred version of the text state
  // React will try to update using `text`, but if interrupted,
  // it will show the list based on `deferredText` (the previous value)
  const deferredText = useDeferredValue(text);

  // Optimization: Memoize the SlowList based on the deferred text
  // This prevents SlowList from re-rendering immediately with the new `text`,
  // only updating when `deferredText` catches up.
  const deferredList = useMemo(() => <SlowList text={deferredText} />, [deferredText]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        value={text}
        onChange={handleChange} 
        placeholder="Type quickly..."
      />
      <p>Input updates immediately. List rendering is deferred.</p>
      <hr />
      {/* Render the list based on the deferred value */} 
      {/* Check if text !== deferredText to show loading state */} 
      {text !== deferredText && <span style={{color: 'grey'}}>(Updating list...)</span>}
      {deferredList}
    </div>
  );
}

export default DeferredValueDemo;
```

These advanced hooks provide powerful tools for optimization, complex state management, and leveraging React's concurrent features. 