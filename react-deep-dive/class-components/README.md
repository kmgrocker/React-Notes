# Class Components

## Introduction

Before the introduction of Hooks, class components were the primary way to create stateful and lifecycle-aware components in React. They are JavaScript classes that extend `React.Component` or `React.PureComponent` and must implement a `render()` method.

While function components with Hooks are now generally preferred, understanding class components is still important for maintaining older codebases or using features like Error Boundaries, which currently *must* be class components.

## Basic Structure

```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  // Constructor (optional): Initialize state, bind methods
  constructor(props) {
    super(props); // Always call super(props) first!
    // Initialize state directly (older syntax needed setState in constructor)
    this.state = { 
      message: 'Welcome to Class Components!' 
    };
    // Binding event handlers (necessary if using `this` inside them)
    // this.handleClick = this.handleClick.bind(this);
  }

  // Lifecycle methods (examples)
  componentDidMount() {
    console.log('Welcome component mounted');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Welcome component updated');
    if (this.props.name !== prevProps.name) {
        console.log('Name prop changed!');
    }
  }

  componentWillUnmount() {
    console.log('Welcome component will unmount');
  }

  // Event handler (using class property arrow function to avoid binding `this`)
  handleClick = () => {
    this.setState({ message: 'Button clicked!' });
  }

  // Render method (required): Returns React elements
  render() {
    // Access props via this.props
    // Access state via this.state
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <p>{this.state.message}</p>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

export default Welcome;

// Usage:
// <Welcome name="Alice" />
```

## Key Characteristics

- **Extend `React.Component`:** Must inherit from `React.Component` (or `React.PureComponent`).
- **`render()` Method:** Must define a `render()` method that returns JSX or other renderable output.
- **`this.props` & `this.state`:** Props and state are accessed via `this.props` and `this.state` respectively.
- **Constructor:** Used for initializing state (optional, can use class property syntax) and binding event handlers (less needed with arrow function properties).
- **Lifecycle Methods:** Provide specific points to hook into the component's lifecycle (mounting, updating, unmounting) for side effects, state updates based on props, etc. (See Lifecycle Methods topic).
- **`this` Keyword:** Behavior of `this` requires careful management, often needing `.bind(this)` in the constructor or using arrow functions for methods.
- **State Updates:** State is updated using `this.setState(updater, [callback])`, which shallowly merges the update into the existing state and triggers a re-render.

## State Management

- State is initialized in the `constructor` or using class property syntax.
- `this.setState()` is asynchronous and may be batched by React. Accessing `this.state` immediately after calling `setState` might not reflect the updated value.
- Use the updater function form `this.setState((prevState, props) => newState)` when the new state depends on the previous state or props.

## Lifecycle Methods

Class components have a rich set of lifecycle methods that allow executing code at specific points. See the dedicated "Lifecycle Methods (Class)" topic for a detailed breakdown.

## Diagram: Class Component Instance

```mermaid
graph TD
    A[Class Definition (extends React.Component)];
    A --> B{Instance Created};
    B -- Has --> C[props (this.props)];
    B -- Has --> D[state (this.state)];
    B -- Has --> E[Lifecycle Methods];
    B -- Has --> F[render() Method];
    B -- Has --> G[Custom Methods];
    
    subgraph Instance Properties/Methods
      C
      D
      E
      F
      G
    end

    style B fill:#ccf,stroke:#333
```

## When to Use

- **Legacy Code:** Maintaining existing applications built with class components.
- **Error Boundaries:** Currently, error boundaries *must* be class components.
- **Specific Lifecycle Needs:** While `useEffect` covers most use cases, there might be rare edge cases where a specific class lifecycle method behaves differently in a way that's required.
- **Personal/Team Preference:** Although less common now, some developers might still prefer the explicit structure of class components.

For most new development, function components with Hooks are the recommended approach. 