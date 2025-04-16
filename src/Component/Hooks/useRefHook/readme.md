# react Docs  


https://reactjs.org/docs/hooks-reference.html#useref

``` js

const refContainer = useRef(initialValue); 

```

1. useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). `The returned object will persist for the full lifetime of the component`.

2.Essentially, useRef is like a “box” that can hold a mutable value in its .current property.


# my note 

1. as shown in input component we can use multiple useRef and on any kind of html  elememt 

# importent 

`with the help ref attribute passed to the DOM element we acn see we can manipulate or access that DOM node but useRef is much more capapable of that as we saw in Debounce Example second Example we can see implementation of Counter with Class instance field and similar with UseRef in Functionl Component `