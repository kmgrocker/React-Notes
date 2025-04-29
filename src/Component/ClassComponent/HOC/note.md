Higher-Order Components (HOCs) are still a useful pattern in React, even in 2024. While React Hooks have reduced the need for HOCs in some cases, they are not a replacement for HOCs entirely.

HOCs are useful when you need to:

Reuse logic: HOCs can wrap multiple components with the same logic, making it easy to reuse code.
Decouple logic: HOCs can separate concerns by extracting complex logic into a separate component.
Improve readability: HOCs can simplify complex components by breaking them down into smaller, more manageable pieces.
Here's a real-world use case:

Use case: Authentication and Authorization

Suppose you have multiple components that require authentication and authorization checks. You can create a HOC that wraps these components and handles the authentication logic.

```javascript
// withAuth.js
import React from "react";
import { useAuth } from "./auth-context";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <div>Loading...</div>;
    if (!user) return <div>Please login</div>;

    return <WrappedComponent />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
```

Now, you can wrap any component with the withAuth HOC to ensure it's only accessible when the user is authenticated.

```js
// MyComponent.js
import React from "react";
import withAuth from "./withAuth";

const MyComponent = () => {
  // This component will only be rendered when the user is authenticated
  return <div>Hello, authenticated user!</div>;
};

export default withAuth(MyComponent);
```

# Practice problem

Create a HOC called withLoadingIndicator that wraps a component and displays a loading indicator when the component is fetching data.

The HOC should accept a loading prop and a data prop. When loading is true, it should display a loading indicator. When loading is false and data is available, it should render the wrapped component with the data prop.

---

###### 1. What's the output?

```javascript
function sayHi() {
  console.log(name);
  console.log(age);
  var name = "Lydia";
  let age = 21;
}

sayHi();
```

- A: `Lydia` and `undefined`
- B: `Lydia` and `ReferenceError`
- C: `ReferenceError` and `21`
- D: `undefined` and `ReferenceError`

<details><summary><b>Answer</b></summary>
<p>

#### Answer: D

Within the function, we first declare the `name` variable with the `var` keyword. This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of `undefined`, until we actually get to the line where we define the variable. We haven't defined the variable yet on the line where we try to log the `name` variable, so it still holds the value of `undefined`.

Variables with the `let` keyword (and `const`) are hoisted, but unlike `var`, don't get <i>initialized</i>. They are not accessible before the line we declare (initialize) them. This is called the "temporal dead zone". When we try to access the variables before they are declared, JavaScript throws a `ReferenceError`.

</p>
</details>

---
