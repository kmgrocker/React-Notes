# Best Practice: Component Reusability & SRP

## Introduction

Two key principles that lead to well-structured, maintainable, and scalable React applications are Component Reusability and the Single Responsibility Principle (SRP).

- **Component Reusability:** Designing components in a way that they can be easily used in different parts of the application or even in different projects without modification.
- **Single Responsibility Principle (SRP):** A component should ideally have only one reason to change. This means it should focus on a single piece of functionality or concern.

These principles often go hand-in-hand. Components that adhere to SRP are naturally more reusable.

## Single Responsibility Principle (SRP) in React

Applied to React components, SRP suggests that a component should be responsible for one primary aspect of the application. This could be:

- **Presenting a specific piece of UI:** e.g., a reusable `Button`, `Input`, `Card`, `Avatar` component focused solely on appearance and basic interaction, configured via props.
- **Managing a specific piece of state:** e.g., a container component (`UserListContainer`) responsible for fetching and managing user data, but delegating the rendering to other components.
- **Handling a specific interaction:** e.g., a `Modal` component responsible only for modal behavior (showing/hiding, trapping focus), receiving its content via props/children.
- **Implementing a specific business logic rule:** e.g., an `EligibilityChecker` component that takes user data and renders children conditionally based on rules.

**Benefits of SRP:**
- **Easier Understanding:** Smaller components focused on one task are simpler to grasp.
- **Improved Testability:** Components with a single responsibility are easier to test in isolation.
- **Reduced Coupling:** Changes to one responsibility (e.g., UI styling) are less likely to affect unrelated responsibilities (e.g., data fetching logic).
- **Enhanced Reusability:** Components focused on one thing are more likely to be useful elsewhere.

## Achieving Reusability

SRP is a major driver of reusability, but other techniques contribute as well:

1.  **Props for Customization:** Design components to accept props for data, configuration, and behavior (callbacks). Avoid hardcoding values or logic that might need to change in different contexts.
2.  **Composition (`props.children`):** Create generic container components (like `Card`, `Modal`, `Layout`) that accept specific content via `props.children`, making the container highly reusable.
3.  **Presentational vs. Container Components:** Separate logic (container) from UI (presentational). Presentational components become highly reusable as they only depend on props.
4.  **Custom Hooks:** Extract reusable stateful logic or side effects into custom Hooks, which can then be used by multiple components.
5.  **Clear API:** Define clear and predictable `propTypes` (or TypeScript interfaces) for your components.
6.  **Minimal External Dependencies:** Reusable components ideally shouldn't rely heavily on specific application context or global state, unless that's their explicit purpose (e.g., a context consumer).

## Diagram: SRP leading to Reusability

### Original Flow
```mermaid
graph TD
    A[Monolithic Component] --> B{Split by Responsibility}
    B --> C[UI Logic Component]
    B --> D[Data Logic Component]
    B --> E[Business Logic Component]
    
    C --> F[Presentation]
    C --> G[Event Handlers]
    
    D --> H[Data Fetching]
    D --> I[Data Transformation]
    
    E --> J[Complex Calculations]
    E --> K[State Management]
    
    style A fill:#f99,stroke:#333,color:#862727,font-size:16px
    style B fill:#ccf,stroke:#333,color:#2B4C77,font-size:16px
    style C,D,E fill:#cfc,stroke:#333,color:#2F855A,font-size:16px
    style F,G,H,I,J,K fill:#fff,stroke:#333,color:#2D3748,font-size:16px
```

### Enhanced Visualization
```mermaid
graph TD
    subgraph Before["Monolithic Component"]
        direction TB
        A1["🔄 Complex Component"] -->|"contains all"| B1["UI + Data + Logic"]
    end

    subgraph After["Single Responsibility"]
        direction TB
        C1["🎨 UI Component"] -->|"renders"| D1["Views"]
        E1["📊 Data Component"] -->|"manages"| F1["API/State"]
        G1["⚙️ Logic Component"] -->|"handles"| H1["Business Rules"]
    end

    A1 -->|"split into"| C1
    A1 -->|"split into"| E1
    A1 -->|"split into"| G1

    %% Styling
    classDef monolith fill:#FFF5F5,stroke:#F56565,stroke-width:2px,color:#C53030,font-size:18px
    classDef ui fill:#F0FFF4,stroke:#48BB78,stroke-width:2px,color:#2F855A,font-size:18px
    classDef data fill:#EBF8FF,stroke:#4299E1,stroke-width:2px,color:#2B6CB0,font-size:18px
    classDef logic fill:#FAF5FF,stroke:#805AD5,stroke-width:2px,color:#553C9A,font-size:18px

    %% Apply styles
    class A1,B1 monolith
    class C1,D1 ui
    class E1,F1 data
    class G1,H1 logic
```

## Code Example: Breaking Down a Component

**1. Monolithic Component (Less Reusable):**

```jsx
import React, { useState, useEffect } from 'react';

// All logic and presentation in one place
function UserBadgeMonolithic({ userId }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) return <p>Loading badge...</p>;
  if (!user) return null;

  // Rendering logic mixed with data fetching
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid grey', padding: '5px', borderRadius: '15px' }}>
      <img 
        src={`https://i.pravatar.cc/30?u=${user.email}`} // Placeholder avatar
        alt={user.name} 
        style={{ borderRadius: '50%', marginRight: '8px' }}
      />
      <span>{user.name}</span>
    </div>
  );
}
```

**2. Broken Down Components (SRP & Reusability):**

```jsx
import React, { useState, useEffect } from 'react';

// --- Reusable Presentational Components (SRP) ---

// Responsibility: Display an avatar image
function Avatar({ src, alt, size = 30 }) {
  return (
    <img 
      src={src}
      alt={alt}
      style={{ borderRadius: '50%', width: size, height: size }}
    />
  );
}

// Responsibility: Display a simple badge layout
function BadgeLayout({ children }) {
   return (
    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid grey', padding: '5px', borderRadius: '15px' }}>
        {children}
    </div>
   );
}

// Responsibility: Display user name text
function UserName({ name }) {
    return <span style={{ marginLeft: '8px' }}>{name}</span>;
}

// --- Custom Hook (SRP for data fetching logic) ---
function useUserData(userId) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setIsLoading(false);
            });
    }, [userId]);

    return { user, isLoading };
}

// --- Container/Composition Component --- 

// Responsibility: Orchestrate fetching and composition
function UserBadgeReusable({ userId }) {
  const { user, isLoading } = useUserData(userId);

  if (isLoading) return <BadgeLayout><p>Loading...</p></BadgeLayout>;
  if (!user) return null;

  // Compose reusable components
  return (
    <BadgeLayout>
      <Avatar src={`https://i.pravatar.cc/30?u=${user.email}`} alt={user.name} />
      <UserName name={user.name} />
    </BadgeLayout>
  );
}

// --- App using the components ---
function AppSRP() {
    return (
        <div>
            <h1>SRP & Reusability Demo</h1>
            <p>User Badge 1: <UserBadgeReusable userId={1} /></p>
            <p>User Badge 2: <UserBadgeReusable userId={2} /></p>
            <hr />
            <p>Avatar used elsewhere: <Avatar src="https://i.pravatar.cc/50?u=other" alt="Other user" size={50} /></p>
        </div>
    )
}

export default AppSRP;
```

In the second version, `Avatar`, `BadgeLayout`, and `UserName` are highly reusable presentation components. The data fetching logic is extracted into a reusable custom hook `useUserData`. The `UserBadgeReusable` component now primarily focuses on composing these pieces.

## Conclusion

Striving for reusable components and adhering to the Single Responsibility Principle are crucial for building robust and maintainable React applications. By breaking down components into smaller, focused units and using techniques like composition and custom hooks, you create a codebase that is easier to understand, test, refactor, and scale. 