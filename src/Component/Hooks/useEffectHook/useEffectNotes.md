 
# UseEffect Main Points 

> useEffect will serve 3 functionality of class based component (componentDidMount, componentDidUpdate, componentWillUnmount)

> if useEffect will not be provided with dependency Array then it will run on every render 

> to only run at first Instance (like componentdidMount) we can provide the empty Array as a dependency in useEffect it will run only once when component is getting mounted

> u can use useEffect or any other hook mulptiple time 

# our File Notes 

. classCounter and HookCounter are describing the componentDidMount and componentdidUpdate effect and similar in useEffect how to provide correct dependecy

. HookMouse and ClassMouse are explaining the run once Effect and the Cleanup function  

. MouseContainer is also explaining if one Component is deleted from Dom still the event do remain related to that 

# according to CodeEvoultion useEffect videos some of the Issue is already handled by React 18 in automatic state batching like useEffect rerender and in intervalHookCounter we did not provided count as dependecy still counter was updated 

# in case of intervalClassCounter and IntervalHookCounter both visible same time u will see that hookCounter is lagging behind after someTime (what could be the reason may be that callbackQueue issue that in stack one getting pushed and after another)