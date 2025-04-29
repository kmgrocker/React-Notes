Here are three practical tasks to help you practice implementing Higher-Order Components (HOCs) in React:

## Task 1: Create a withLoading HOC

**Objective:** Create a HOC that adds loading state to any component.

**Description:**
Implement a `withLoading` HOC that:
- Accepts any component as an argument
- Adds loading state
- Shows a loading spinner when data is being fetched
- Passes the data to the wrapped component when loading is complete

**Example Implementation:**
```jsx
const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
};

// Usage
const UserListWithLoading = withLoading(UserList);

// In parent component
<UserListWithLoading isLoading={isLoading} users={users} />
```

## Task 2: Create a withAuth HOC for Protected Routes

**Objective:** Create a HOC that handles authentication for protected routes.

**Description:**
Implement a `withAuth` HOC that:
- Checks if a user is authenticated before rendering a component
- Redirects to login page if not authenticated
- Passes user data to the protected component if authenticated
- Optionally checks for specific permissions

**Example Implementation:**
```jsx
const withAuth = (WrappedComponent, requiredPermission = null) => {
  return function WithAuthComponent(props) {
    // You can use context, Redux, or props to get auth state
    const isAuthenticated = checkIfUserIsAuthenticated();
    const userPermissions = getUserPermissions();
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    if (requiredPermission && !userPermissions.includes(requiredPermission)) {
      return <div>You don't have permission to view this page.</div>;
    }
    
    return <WrappedComponent {...props} />;
  };
};

// Usage
const ProtectedDashboard = withAuth(Dashboard, 'admin');
```

## Task 3: Create a withErrorBoundary HOC

**Objective:** Create a HOC that adds error handling to components.

**Description:**
Implement a `withErrorBoundary` HOC that:
- Catches errors in the wrapped component
- Displays a fallback UI when errors occur
- Logs error information
- Provides a way to retry or reset the component

**Example Implementation:**
```jsx
const withErrorBoundary = (WrappedComponent) => {
  return class WithErrorBoundary extends React.Component {
    state = {
      hasError: false,
      error: null
    };
    
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
    
    componentDidCatch(error, info) {
      // Log error to an error reporting service
      console.error("Component error:", error, info);
    }
    
    resetError = () => {
      this.setState({ hasError: false, error: null });
    };
    
    render() {
      if (this.state.hasError) {
        return (
          <div className="error-boundary">
            <h2>Something went wrong.</h2>
            <p>{this.state.error?.message}</p>
            <button onClick={this.resetError}>Try Again</button>
          </div>
        );
      }
      
      return <WrappedComponent {...this.props} />;
    }
  };
};

// Usage
const SafeComponent = withErrorBoundary(MyComponent);
```

Each of these tasks represents a common real-world use case for HOCs. They demonstrate how HOCs can be used to separate cross-cutting concerns from your component logic, making your components more focused and reusable.

Would you like to see a more detailed implementation of any of these tasks, or would you prefer a different type of HOC example?