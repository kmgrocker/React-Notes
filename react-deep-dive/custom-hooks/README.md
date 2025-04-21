# Custom Hooks

## Introduction

Custom Hooks are a powerful feature in React that allow you to extract component logic into reusable functions. If you find yourself writing similar stateful logic or side effects across multiple components, you can consolidate that logic into a custom Hook.

Custom Hooks are essentially JavaScript functions whose names start with `use` and that can call other Hooks (like `useState`, `useEffect`, or even other custom Hooks).

## Why Use Custom Hooks?

- **Reusability:** Share stateful logic without repeating code or resorting to more complex patterns like HOCs or render props.
- **Abstraction:** Hide complex logic behind a simple, descriptive interface.
- **Readability:** Keep component code focused on the UI rendering by moving logic elsewhere.
- **Testability:** Custom Hooks can often be tested in isolation more easily than component logic.

## Creating a Custom Hook

1.  **Identify Reusable Logic:** Find stateful logic or side effects (often involving `useState` and `useEffect`) that appear in multiple components.
2.  **Extract to a Function:** Create a new JavaScript function whose name starts with `use` (e.g., `useFetch`, `useWindowSize`).
3.  **Move Hook Calls:** Move the relevant Hook calls (`useState`, `useEffect`, etc.) from your component into the new custom Hook function.
4.  **Input/Output:** Determine what arguments the custom Hook needs and what values it should return (state variables, functions to update state, etc.).
5.  **Use the Hook:** Call your custom Hook from the components where the logic was originally located, just like you would call a built-in Hook.

## Rules of Hooks Apply

Remember that all the standard Rules of Hooks apply to custom Hooks as well:
- Only call Hooks at the top level of your React function components or other custom Hooks.
- Don't call Hooks inside loops, conditions, or nested functions.
- Custom Hook names **must** start with `use`.

## Diagram: Custom Hook Abstraction

```mermaid
graph LR
    subgraph ComponentA
        A1[UI Logic]
        A2[Call useMyCustomHook(args)] --> R[State/Functions]
        A1 --> A3[Render JSX]
        R --> A1
    end

    subgraph ComponentB
        B1[UI Logic]
        B2[Call useMyCustomHook(args)] --> S[State/Functions]
        B1 --> B3[Render JSX]
        S --> B1
    end

    subgraph CustomHook [useMyCustomHook]
        H1{Input Arguments}
        H2[Internal useState/useEffect/etc.]
        H3[Logic]
        H1 --> H2 --> H3
        H3 --> H4{Return Value (State/Functions)}
    end

    A2 --> H1
    B2 --> H1
    H4 --> R
    H4 --> S

    style CustomHook fill:#ccf,stroke:#333
```

## Code Example: `useFetch`

A common use case is fetching data. Let's create a `useFetch` hook.

```jsx
import React, { useState, useEffect, useDebugValue } from 'react';

// 1. Create the custom hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug value for React DevTools
  useDebugValue(loading ? `Loading: ${url}` : error ? `Error: ${url}` : `Data: ${url}`);

  useEffect(() => {
    // Prevent race conditions if URL changes quickly
    const abortController = new AbortController();
    const signal = abortController.signal;

    setLoading(true);
    setData(null); // Reset data on new fetch
    setError(null); // Reset error on new fetch

    console.log(`useFetch: Fetching ${url}`);

    fetch(url, { signal })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(fetchedData => {
        if (!signal.aborted) { // Check if component is still mounted / request not aborted
          console.log(`useFetch: Received data from ${url}`, fetchedData);
          setData(fetchedData);
          setError(null);
        }
      })
      .catch(fetchError => {
        if (!signal.aborted) {
          console.error(`useFetch: Error fetching ${url}`, fetchError);
          setError(fetchError.message);
          setData(null);
        }
      })
      .finally(() => {
        if (!signal.aborted) {
          setLoading(false);
        }
      });

    // Cleanup function: Abort fetch if component unmounts or URL changes
    return () => {
      console.log(`useFetch: Aborting fetch for ${url}`);
      abortController.abort();
    };
  }, [url]); // Dependency: Re-run effect if URL changes

  // 4. Return the state variables
  return { data, loading, error };
}

// 5. Use the custom hook in a component
function UserProfile({ userId }) {
  const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
  // Use the hook to fetch user data
  const { data: user, loading, error } = useFetch(apiUrl);

  if (loading) return <p>Loading user profile...</p>;
  if (error) return <p style={{ color: 'red' }}>Error loading profile: {error}</p>;
  if (!user) return null;

  return (
    <div>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Website: {user.website}</p>
    </div>
  );
}

function PostsList() {
  const apiUrl = `https://jsonplaceholder.typicode.com/posts?_limit=5`;
  // Reuse the same hook for a different endpoint
  const { data: posts, loading, error } = useFetch(apiUrl);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: 'red' }}>Error loading posts: {error}</p>;
  if (!posts) return null;

  return (
    <div>
      <h3>Recent Posts</h3>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

function CustomHookDemo() {
    const [currentUserId, setCurrentUserId] = useState(1);

    return (
        <div>
            <h1>Custom Hook Demo (useFetch)</h1>
            <label>User ID: </label>
            <select value={currentUserId} onChange={e => setCurrentUserId(Number(e.target.value))}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </select>
            <UserProfile userId={currentUserId} />
            <hr />
            <PostsList />
        </div>
    )
}

export default CustomHookDemo;
```

Custom Hooks are a fundamental pattern for building maintainable and scalable React applications by promoting logic reuse and separation of concerns. 