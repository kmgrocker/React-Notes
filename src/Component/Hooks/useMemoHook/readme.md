# react docs 

https://reactjs.org/docs/hooks-reference.html#usememo 

``` js 
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

```

1. Returns a memoized value

2. Pass a “create” function and an array of dependencies. useMemo will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.

3. If no array is provided, a new value will be computed on every render

4. `You may rely on useMemo as a performance optimization, not as a semantic guarantee. In the future, React may choose to “forget” some previously memoized values and recalculate them on next render, e.g. to free memory for offscreen components. Write your code so that it still works without useMemo — and then add it to optimize performance.`

# Resources 

https://www.youtube.com/watch?v=DEPwA3mv_R8 (Jack herington)


# point to remember 

1.  React Memo does not behave traditionally a memoize mechanism function should look into lodash util function which keeps track of all the value given and memoized accordingly 

2. in React Memo only means render if previous props have changed and in case of primitive value it checks for referencial equality  

3. `only use useMemo or React.memo if there is heavy computaion and u really want to cache the result rather than running the function again and again` 

4. useCallback and usememo both primarily around referencial integrity specially (Object,Array,Function)