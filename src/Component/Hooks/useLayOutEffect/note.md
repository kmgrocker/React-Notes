# useLayoutEffect

`The signature is identical to useEffect, but it fires synchronously after all DOM mutations`. Use this to read layout from the DOM and synchronously re-render. `Updates scheduled inside useLayoutEffect will be flushed synchronously, before the browser has a chance to paint.`

Prefer the standard useEffect when possible to avoid blocking visual updates.

[https://reactjs.org/docs/hooks-reference.html#uselayouteffect]

# Tip

If you’re migrating code from a class component, note useLayoutEffect fires in the same phase as componentDidMount and componentDidUpdate. However, we recommend starting with useEffect first and only trying useLayoutEffect if that causes a problem.

If you use server rendering, keep in mind that neither useLayoutEffect nor useEffect can run until the JavaScript is downloaded. This is why React warns when a server-rendered component contains useLayoutEffect. To fix this, either move that logic to useEffect (if it isn’t necessary for the first render), or delay showing that component until after the client renders (if the HTML looks broken until useLayoutEffect runs).

To exclude a component that needs layout effects from the server-rendered HTML, render it conditionally with showChild && <Child /> and defer showing it with useEffect(() => { setShowChild(true); }, []). This way, the UI doesn’t appear broken before hydration.