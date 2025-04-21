# React Reconciliation

## Introduction

Reconciliation is the process through which React updates the browser DOM. When a component's state or props change, React decides whether an actual DOM update is necessary by comparing the newly returned element tree with the previous one. This process includes the Virtual DOM (VDOM) diffing algorithm.

The goal of reconciliation is to update the UI as efficiently as possible by making the minimum necessary changes to the actual DOM.

## The Process

1.  **Trigger Update:** A state or prop change occurs, triggering a re-render of a component or subtree.
2.  **Render:** React calls the `render` method (for class components) or the function component itself to get the new tree of React elements (the new VDOM).
3.  **Diffing:** React compares the new element tree with the previous one (see Diffing Algorithm topic for details).
4.  **Determine Changes:** Based on the diffing results, React identifies the specific changes required (e.g., create a node, update attributes, remove a node).
5.  **Commit:** React applies these changes to the actual browser DOM. This happens during the "commit phase" (see Render Phase vs Commit Phase topic).

## Key Concepts

- **VDOM:** Reconciliation relies heavily on the Virtual DOM for efficient comparison.
- **Diffing Algorithm:** The specific heuristics React uses to compare trees quickly.
- **Keys:** Special string attributes you need to include when creating lists of elements. Keys help React identify which items have changed, are added, or are removed, dramatically improving the efficiency of list updates.

## Diagram: Reconciliation Flow

```mermaid
graph TD
    A[Update Triggered (State/Props Change)] --> B{Call Component Render/Function};
    B --> C(Get New React Element Tree / VDOM);
    C --> D{Compare New Tree with Previous Tree (Diffing)};
    subgraph Diffing Process
      D -- Identify Differences --> E[Calculate Minimal DOM Changes];
    end
    E --> F{Commit Phase: Apply Changes};
    F -- Manipulate --> G[Browser DOM Updated];
    G --> H((UI Reflects New State));

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style D fill:#ffc,stroke:#333,stroke-width:1px
    style F fill:#9cf,stroke:#333,stroke-width:2px
    style H fill:#9c9,stroke:#333,stroke-width:2px
```

## Code Example: Importance of Keys

This example highlights how using stable keys is crucial for efficient reconciliation when rendering lists.

```jsx
import React, { useState } from 'react';

let idCounter = 3;

function Item({ text }) {
  // Log when an Item component mounts (is created)
  React.useEffect(() => {
    console.log(`Item mounted: ${text}`);
    return () => console.log(`Item unmounted: ${text}`);
  }, [text]);
  return <li>{text}</li>;
}

function ListExample() {
  const [items, setItems] = useState([
    { id: 1, text: 'Apple' },
    { id: 2, text: 'Banana' },
  ]);

  const addItemAtStart = () => {
    const newItem = { id: idCounter++, text: 'Cherry' };
    setItems([newItem, ...items]);
  };

  return (
    <div>
      <button onClick={addItemAtStart}>Add Cherry to Start</button>
      
      <h3>List WITHOUT Keys (Inefficient):</h3>
      {/* 
        React compares based on order. Adding 'Cherry' at the start makes React think:
        - The first item changed from 'Apple' to 'Cherry' (updates props/DOM)
        - The second item changed from 'Banana' to 'Apple' (updates props/DOM)
        - A new third item 'Banana' was added (creates element/DOM)
        This is inefficient and can lose component state.
      */}
      <ul>
        {items.map(item => (
          <Item text={item.text} />
        ))}
      </ul>

      <h3>List WITH Keys (Efficient):</h3>
      {/* 
        React uses the keys to match elements:
        - Sees a new key (e.g., 3) for 'Cherry' -> Creates a new element/DOM node for it.
        - Sees existing keys 1 and 2 -> Knows 'Apple' and 'Banana' are the same items, 
          just potentially moved. Reuses existing components/DOM nodes.
        This is much more efficient.
      */}
      <ul>
        {items.map(item => (
          <Item key={item.id} text={item.text} />
        ))}
      </ul>
    </div>
  );
}

export default ListExample;

```

Open your browser console when running this example. Notice how adding an item at the beginning causes unnecessary re-renders/mounts in the list *without* keys, while the list *with* keys correctly identifies the existing items and only creates the new one. 