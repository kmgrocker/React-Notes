# Fragments, Portals, and Error Boundaries

## Introduction

React provides several specialized components and APIs to handle common challenges in structuring UIs and managing component lifecycles: Fragments avoid unnecessary wrapper DOM nodes, Portals render components outside their parent DOM hierarchy, and Error Boundaries catch JavaScript errors in the component tree.

## Fragments (`<>...</>` or `<React.Fragment>`)

- **Problem:** Components often need to return multiple elements. Traditionally, this required wrapping them in a single parent DOM node (like a `<div>`), which could add unnecessary clutter to the DOM structure and sometimes break CSS styling (e.g., with Flexbox or Grid).
- **Solution:** Fragments let you group a list of children without adding extra nodes to the DOM.
- **Syntax:**
    - Short Syntax: `<> ... </>` (Most common, doesn't support `key` prop)
    - Explicit Syntax: `<React.Fragment key={item.id}> ... </React.Fragment>` (Required if you need a `key` prop, like in lists)

```jsx
import React from 'react';

function TableRow({ item }) {
  return (
    // Without Fragment, we'd need an invalid wrapper div inside <tr>
    <React.Fragment key={item.id}> 
      <td>{item.name}</td>
      <td>{item.value}</td>
    </React.Fragment>
    // Short syntax alternative (if no key needed):
    // <>
    //   <td>{item.name}</td>
    //   <td>{item.value}</td>
    // <>
  );
}

function DataTable({ data }) {
  return (
    <table>
      <thead>
        <tr><th>Name</th><th>Value</th></tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}> {/* Key on the actual row */} 
             <TableRow item={item} /> {/* Fragment used inside */} 
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
```

## Portals (`ReactDOM.createPortal(child, container)`)

- **Problem:** Sometimes you need to render a component's children into a different location in the DOM tree, outside the parent component's DOM node. Common use cases include modals, tooltips, dropdown menus, and widgets that need to break out of their container's styling context (`overflow: hidden`, `z-index`).
- **Solution:** Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
- **Key Behavior:** Even though a portal renders elsewhere in the *DOM*, it still behaves like a normal React child in the *React tree*. Events will bubble up to ancestors in the React tree, not the DOM tree location, and context is still available.

```jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// Assume 'modal-root' element exists in your public/index.html
// <div id="modal-root"></div>
const modalRoot = document.getElementById('modal-root');

function Modal({ children, onClose }) {
  // Create a div element to host the modal content
  const el = document.createElement('div');

  useEffect(() => {
    // Append the element to the modal root when the Modal mounts
    modalRoot.appendChild(el);
    console.log('Modal appended to modal-root');
    
    // Clean up by removing the element when the Modal unmounts
    return () => {
      modalRoot.removeChild(el);
      console.log('Modal removed from modal-root');
    };
  }, [el]); // Effect depends on the specific element instance

  // Use ReactDOM.createPortal to render children into the element
  return ReactDOM.createPortal(
    // The actual modal content and styling
    <div style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', 
        alignItems: 'center', justifyContent: 'center' 
      }} 
      onClick={onClose} // Close on background click
    >
      <div style={{ background: 'white', padding: 20, borderRadius: 5 }} onClick={e => e.stopPropagation()}> {/* Prevent closing when clicking inside modal content */}
        {children}
        <button onClick={onClose} style={{ marginTop: 10 }}>Close</button>
      </div>
    </div>,
    el // The DOM node to portal into
  );
}

function AppWithPortal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>Portal Demo</h1>
      <p>This content is in the main app div.</p>
      <button onClick={() => setShowModal(true)}>Show Modal</button>
      
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Modal Content</h2>
          <p>This content is rendered into #modal-root in the DOM, but events bubble up through the React tree.</p>
        </Modal>
      )}
    </div>
  );
}

export default AppWithPortal;
```

## Error Boundaries

- **Problem:** A JavaScript error in one part of the UI shouldn't break the entire application. By default, an unhandled JS error in a component will cause React to unmount the whole component tree.
- **Solution:** Error Boundaries are special React components (must be **class components**) that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the crashed component tree.
- **Implementation:** Requires defining one or both of these static/instance lifecycle methods:
    - `static getDerivedStateFromError(error)`: Renders a fallback UI after an error has been thrown. Receives the error as an argument and should return a value to update state.
    - `componentDidCatch(error, errorInfo)`: Logs error information. Receives the error and an object with a `componentStack` key containing information about which component threw the error.
- **Limitations:** Error boundaries do **not** catch errors for:
    - Event handlers (use regular `try...catch`)
    - Asynchronous code (`setTimeout`, request callbacks)
    - Server-side rendering
    - Errors thrown in the error boundary component itself (it catches errors in children, not itself)

```jsx
import React, { Component } from 'react';

// The Error Boundary Component (must be a class)
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // Use this to update state so the next render shows the fallback UI.
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Use this to log error information.
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // You can also log this to an error reporting service
    // logErrorToMyService(error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button onClick={() => this.setState({ hasError: false })}>Try again</button>
        </div>
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}

// A component that might throw an error
function BuggyCounter() {
  const [counter, setCounter] = React.useState(0);

  if (counter === 3) {
    // Simulate a JS error
    throw new Error('I crashed!');
  }

  return (
    <button onClick={() => setCounter(counter + 1)}>
      Count: {counter} (Crashes at 3)
    </button>
  );
}

// App using the Error Boundary
function AppWithErrorBoundary() {
  return (
    <div>
      <h1>Error Boundary Demo</h1>
      <p>Click the counter. It will crash when the count reaches 3, but the Error Boundary will catch it.</p>
      <hr />
      <ErrorBoundary>
        <p>This counter is inside the boundary:</p>
        <BuggyCounter />
      </ErrorBoundary>
      <hr />
      <ErrorBoundary>
        <p>This is another boundary with a stable component:</p>
        <p>I am fine.</p>
      </ErrorBoundary>
      {/* <p>This counter is outside the boundary:</p> */}
      {/* <BuggyCounter /> */}
      {/* Uncommenting the counter above would crash the whole app */}
    </div>
  );
}

export default AppWithErrorBoundary;

``` 