# custom hooks 

 1. A custom hook is basically a javascript function whose name starts with . 'use' (linters are relying on naming convention so hooks related warning can be triggered on your custom hooks)

 2. A custom hook can also call other hooks if required 


# why custom hooks 

1. share logic between component 

2. wrap repeated logic inside their own hook 

3. Alternative to HOC and Render Props 

https://stackoverflow.com/questions/59818627/react-withrouter-how-to-avoid-re-render-component