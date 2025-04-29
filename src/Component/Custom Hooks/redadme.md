# custom hooks 

 1. A custom hook is basically a javascript function whose name starts with . 'use' (linters are relying on naming convention so hooks related warning can be triggered on your custom hooks)

 2. A custom hook can also call other hooks if required 


# why custom hooks 

1. share logic between component 

2. wrap repeated logic inside their own hook 

3. Alternative to HOC and Render Props 

https://stackoverflow.com/questions/59818627/react-withrouter-how-to-avoid-re-render-component

# resources 

https://usehooks-ts.com/

https://github.com/uidotdev/usehooks 

https://usehooks.com/ 

https://usehooks-omega.vercel.app/



# useSessionStorage 

``` js

function useSessionStorage(key, initialValue) {

  // 1. INTERNAL STATE: Initialize state, trying sessionStorage first, then initialValue.
  //    - Use useState with a function for lazy initialization.
  //    - Inside the function:
  //      - Check if window/sessionStorage exist.
  //      - Try reading `key` from sessionStorage.
  //      - Try JSON.parsing the item.
  //      - If success, return parsed item.
  //      - If error or no item, return initialValue.
  const [storedValue, setStoredValue] = useState(/* lazy init function */);

  // 2. SETTER FUNCTION: Create a function to update both state and sessionStorage.
  const setValue = (newValueOrFn) => {
    // - Calculate the actual value (handle if newValueOrFn is a function).
    // - Try updating internal state (setStoredValue).
    // - Try JSON.stringifying and saving to sessionStorage (if window exists).
    // - Wrap storage access in try...catch.
  };

  // 3. SYNC EFFECT: Listen for storage events from other tabs.
  useEffect(() => {
    // - Define the event handler function:
    //   - Check event.storageArea and event.key.
    //   - If it matches our key and sessionStorage:
    //     - Try JSON.parsing event.newValue.
    //     - Update internal state (setStoredValue) with parsed value or initialValue if null/error.
    // - Add the event listener to window ('storage').
    // - Return a cleanup function:
    //   - Remove the event listener from window.
    // - Define the dependency array for the effect (what should trigger re-subscribing?). Hint: `key`.

  }, [/* dependencies */]);


  // 4. RETURN: Return the state variable and the setter function.
  return [storedValue, setValue];
}

```
