# Best Practice: Type Safety (TypeScript)

## Introduction

While React can be used with plain JavaScript, integrating TypeScript provides significant advantages by adding static typing to your application. Type safety means catching potential errors related to data types during development (at compile time) rather than encountering them at runtime.

TypeScript enhances developer productivity, code maintainability, and collaboration, especially in larger codebases.

## Why Use TypeScript with React?

- **Early Error Detection:** Catches type mismatches (e.g., passing a number where a string is expected, accessing non-existent properties) before you even run the code.
- **Improved Autocompletion & IntelliSense:** Code editors provide better suggestions and understanding of component props, state, and function signatures.
- **Enhanced Readability & Documentation:** Type definitions serve as clear documentation for component APIs (props) and state structures.
- **Easier Refactoring:** Types make it safer and easier to refactor code, as the compiler can immediately point out inconsistencies introduced by changes.
- **Better Collaboration:** Ensures team members use components correctly and understand the expected data shapes.
- **Scalability:** Particularly beneficial for large applications where tracking data types and component interactions becomes complex.

## Key Concepts for React + TypeScript

1.  **Typing Component Props:**
    - Define an `interface` or `type` alias for the component's props.
    - Use `React.FC<Props>` (Function Component) or extend `React.Component<Props, State>` for class components.

    ```typescript
    import React from 'react';

    // Define prop types
    interface GreetingProps {
      name: string;
      messageCount?: number; // Optional prop
      onClick: () => void; // Function prop
    }

    // Use the interface with React.FC
    const Greeting: React.FC<GreetingProps> = ({ name, messageCount = 0, onClick }) => {
      return (
        <div>
          <h1>Hello, {name}!</h1>
          <p>You have {messageCount} messages.</p>
          <button onClick={onClick}>Say Hi Back</button>
        </div>
      );
    };

    export default Greeting;
    ```

2.  **Typing State (`useState`)**
    - TypeScript often infers the type from the initial value.
    - You can explicitly provide a type using generics if needed (e.g., for complex types or initial null/undefined values).

    ```typescript
    import React, { useState } from 'react';

    interface User {
      id: number;
      name: string;
    }

    function UserProfile() {
      // Type inferred as number from initial value 0
      const [count, setCount] = useState(0);
      
      // Explicit type needed if initial value is null or could be User
      const [user, setUser] = useState<User | null>(null);

      const fetchUser = () => {
          // Simulate fetch
          setUser({ id: 1, name: 'Alice' });
      }

      return (
          <div>
              <p>Count: {count}</p>
              <button onClick={() => setCount(c => c + 1)}>Inc</button>
              <hr />
              {user ? <p>User: {user.name}</p> : <p>No user loaded.</p>}
              <button onClick={fetchUser} disabled={!!user}>Load User</button>
          </div>
      );
    }
    ```

3.  **Typing Reducers (`useReducer`)**
    - Define types for the `State`, `Action`, and optionally the `Reducer` function itself.

    ```typescript
    import React, { useReducer } from 'react';

    // Define types
    interface CounterState {
      count: number;
    }

    type CounterAction = 
      | { type: 'increment'; payload?: number } // payload is optional
      | { type: 'decrement'; payload?: number } 
      | { type: 'reset' };

    const initialState: CounterState = { count: 0 };

    // Type the reducer function
    const reducer = (state: CounterState, action: CounterAction): CounterState => {
      switch (action.type) {
        case 'increment':
          return { count: state.count + (action.payload || 1) };
        case 'decrement':
          return { count: state.count - (action.payload || 1) };
        case 'reset':
          return initialState;
        default:
          return state;
      }
    };

    function TypedReducerCounter() {
      const [state, dispatch] = useReducer(reducer, initialState);

      return (
        <div>
          Count: {state.count}
          <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>+5</button>
          <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
          <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </div>
      );
    }
    ```

4.  **Typing Refs (`useRef`)**
    - Provide the type of the element the ref will hold as a generic argument.
    - Initialize with `null`.

    ```typescript
    import React, { useRef, useEffect } from 'react';

    function TypedInputRef() {
      // Type the ref to hold an HTMLInputElement or null
      const inputRef = useRef<HTMLInputElement>(null);

      useEffect(() => {
        // Access .current (type-safe)
        inputRef.current?.focus(); // Use optional chaining
      }, []);

      return <input ref={inputRef} type="text" />;
    }
    ```

5.  **Typing Events:**
    - React provides specific event types (e.g., `React.ChangeEvent<HTMLInputElement>`, `React.MouseEvent<HTMLButtonElement>`).

    ```typescript
    import React, { useState } from 'react';

    function TypedEventHandler() {
      const [value, setValue] = useState('');

      // Type the event parameter
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      };

      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
          console.log('Button clicked!', event.clientX);
      }

      return (
        <div>
          <input type="text" value={value} onChange={handleChange} />
          <button onClick={handleClick}>Click Me</button>
          <p>Value: {value}</p>
        </div>
      );
    }
    ```

## Setting up TypeScript with React

- **Create React App:** Use the TypeScript template: `npx create-react-app my-app --template typescript`
- **Vite:** Choose the `react-ts` template during project creation.
- **Manual Setup:** Install `typescript`, `@types/react`, `@types/react-dom`, and configure `tsconfig.json`.

## Conclusion

Using TypeScript with React adds a layer of static type checking that significantly enhances code quality, maintainability, and developer experience. While it involves a learning curve, the benefits of catching errors early, improved tooling, and clearer code generally outweigh the costs, especially for medium-to-large scale applications. 