# Compound Components Pattern

## Introduction

The Compound Components pattern is a technique in React for creating expressive and flexible components that manage a shared, implicit state between a parent and its children. It allows related components to communicate with each other and work together cohesively without the user having to manually wire them up via props.

Think of HTML elements like `<select>` and `<option>`. The `<select>` manages the overall state (which option is selected), and the `<option>` elements implicitly work within that context. Compound components allow you to build similar declarative APIs for your own React components.

## How it Works

1.  **Parent Component:** The main component (e.g., `<Tabs>`) acts as the orchestrator. It typically manages the shared state (e.g., which tab is active) using `useState` or `useReducer`.
2.  **Context Provider:** The parent component wraps its children in a Context Provider (`Context.Provider`). It passes down the shared state and any necessary callback functions (like a function to update the active state) via the context value.
3.  **Child Components:** Specialized child components (e.g., `<Tabs.TabList>`, `<Tabs.Tab>`, `<Tabs.TabPanel>`) are defined, often as static properties of the parent component (e.g., `Tabs.Tab = ...`).
4.  **Context Consumer:** Each child component uses `useContext` to access the shared state and callbacks provided by the parent.
5.  **Implicit Communication:** The children use the context to read the shared state (e.g., to know if they are the active tab/panel) and call the provided callbacks to update the parent's state (e.g., when a tab is clicked).

This structure allows the user to compose the components declaratively without manually passing state and handlers between them.

## Benefits

- **Expressive API:** Leads to clean and declarative usage, similar to native HTML elements.
- **Implicit State Management:** Hides the complexity of state sharing between related components.
- **Flexibility:** Users can arrange the child components in different orders or intersperse them with other elements while maintaining functionality.
- **Reduced Prop Drilling:** Avoids passing down state and callbacks through intermediate components that don't need them.

## Diagram: Compound Component Structure (Tabs Example)

```mermaid
%%{init: { 'theme': 'base', 'themeVariables': { 'fontSize': '14px', 'fontFamily': 'arial', 'textColor': '#333', 'clusterBkg': '#fff' } }}%%
graph TD
    subgraph Main["Application Flow"]
        A["App"] --> B["Tabs Component"]
    end

    subgraph TabsComponent["Tabs Component Structure"]
        direction TB
        B1["State Management"] 
        B2["Context Provider"]
        B3["Children Rendering"]
        
        B --> B1
        B --> B2
        B --> B3
    end

    subgraph Children["Child Components"]
        direction TB
        C["Tabs.TabList"]
        D["Tabs.Tab 1"]
        E["Tabs.Tab 2"]
        F["Tabs.Panel 1"]
        G["Tabs.Panel 2"]
    end

    subgraph TabLogic["Tab Component Logic"]
        direction TB
        D1["Access Context"]
        D2["Check Active State"]
        D3["Handle Click Events"]
        D4["Render UI"]
        
        D1 --> D2
        D2 --> D3
        D3 --> D4
    end

    B2 -->|"Provides Context"| CTX["TabContext"]
    CTX -->|"Consumed by"| D1
    B -->|"Renders"| C & D & E & F & G

    %% Node styles
    classDef default font-family:arial,font-size:14px,font-weight:normal
    classDef main fill:#e1e1e1,stroke:#333,stroke-width:1px,color:#333,font-weight:bold
    classDef tabs fill:#cce6ff,stroke:#333,stroke-width:1px,color:#333,font-weight:bold
    classDef context fill:#ffe6ff,stroke:#333,stroke-width:1px,color:#333,font-weight:bold
    classDef logic fill:#e6f3ff,stroke:#333,stroke-width:1px,color:#333,font-weight:bold

    %% Apply styles
    class A,B main
    class B1,B2,B3,C,D,E,F,G tabs
    class CTX context
    class D1,D2,D3,D4 logic
```

## Code Example: Simple Tabs Component

```jsx
import React, { useState, useContext, createContext } from 'react';

// 1. Create the context
const TabsContext = createContext();

// --- Child Components --- 

// TabList: Simple wrapper for styling or accessibility
function TabList({ children }) {
  return <div role="tablist">{children}</div>;
}

// Tab: Represents a single tab button
function Tab({ children, id }) {
  // 4. Consume context
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === id;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(id)} // 5. Call context handler
      style={{ 
          padding: '10px', 
          border: 'none', 
          borderBottom: isActive ? '3px solid blue' : '3px solid transparent',
          background: 'transparent', 
          cursor: 'pointer'
      }}
    >
      {children}
    </button>
  );
}

// TabPanel: Represents the content for a tab
function TabPanel({ children, id }) {
  // 4. Consume context
  const { activeTab } = useContext(TabsContext);
  const isActive = activeTab === id;

  // 5. Conditionally render based on context state
  return isActive ? <div role="tabpanel" style={{ padding: '15px', border: '1px solid #ccc', marginTop: '-1px' }}>{children}</div> : null;
}

// --- Parent Component --- 

function Tabs({ children, initialActiveTab }) {
  // 2. Manage shared state
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  // Provide state and setter via context
  const contextValue = { 
      activeTab, 
      setActiveTab 
  };

  return (
    // 3. Provide context
    <TabsContext.Provider value={contextValue}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

// Attach child components as static properties (common practice)
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

// --- Usage Example --- 

function App() {
  return (
    <div>
      <h1>Compound Components Demo (Tabs)</h1>
      <Tabs initialActiveTab="tab1">
        <Tabs.TabList>
          <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
          <div>Some other element</div> {/* Flexibility allowed */} 
          <Tabs.Tab id="tab3">Tab 3</Tabs.Tab>
        </Tabs.TabList>

        <Tabs.TabPanel id="tab1">
          <p>Content for Tab 1</p>
        </Tabs.TabPanel>
        <Tabs.TabPanel id="tab2">
          <p>Content for Tab 2</p>
          <input type="text" placeholder="Input inside tab 2" />
        </Tabs.TabPanel>
        <Tabs.TabPanel id="tab3">
          <p>Content for Tab 3</p>
        </Tabs.TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
```

This pattern creates a clear and reusable API for components that need internal coordination, making the usage very declarative and easy to understand.