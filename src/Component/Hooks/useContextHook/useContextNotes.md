https://reactjs.org/docs/context.html#when-to-use-context 

**must read caveats section on react doc s link above about context**


`Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context.` see the app.js top section and dev tools


# the context provide a way to pass down data deep down to tree in react nested component setup without prop drilling

. after introduction of the useContext hooks the consumption part got easy but the creating the context is same as previous  

. we can provide default value when creating context so if the component does not have surrounding provider it will use that default value 

``` jsx

// u can provide default value also to the context that will be used if u are consuming that context in component but u have not provided the provider wrapper with value for that 

// below u can see in pseudo code that component can consume channel name even for that wrapper provider is missing since we have defined defaut context for that 

// App.js

const userContext =  React.createContext();
const channelContext =  React.createContext('Mr Beast');

<userContext.provider value={'john'}>
    <Component />
</userContext.provider>

// Component 

function (){
    return (
        <userContext.consumer>
        {user=>{
            return (
                <channelContext.consumer>
                 {channel=>{
                    return (
                        <div>my name is {user} and my channel is {channel}</div>
                    )
                 }}
                </channelContext.consumer>
            )
        }}
        </userContext.consumer>
    )
}

```

. we can see in several example that  useContext hook minimize the code and nested tree like code 

. we can also consume the context with contextType in class which is component level prop and only valid inside class and for single context we can not consume multiple context with this because u can provide multiple prop with same name in class. and we can access that value with this.context

. the way of consuming the context with out hooks are based on render props pattern that consumer will return  a function having the context value 

``` jsx

class ComponentD extends Component{
  static contexType = channelContext
    render(){
       return(
            <div>my channe name is {this.context}</div>
        )
    }
}

```