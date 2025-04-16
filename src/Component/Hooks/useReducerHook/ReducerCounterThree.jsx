import React,{useReducer} from 'react'

const init = (initialCount)=>{
   return {count:initialCount}
}

const reducer =(state,action)=>{
   switch(action.type){
     case 'inc':
        return {count:state.count+1};
     case 'dec':
        return {count:state.count-1};
     case 'reset':
        return init(action.payload);;
     default:
        return state;
   }
}

export const ReducerCounterThree = ({initialCount}) => {
    const [count, dispatch] = useReducer(reducer,initialCount,init)
	const [countTwo, dispatchTwo] = useReducer(reducer,initialCount,init)


	return (
		<div>
			<div>Count = {count.count}</div>
			<button onClick={() => dispatch({type:'inc'})}>Increment</button>
			<button onClick={() => dispatch({type:'dec'})}>Decrement</button>
			<button onClick={() => dispatch({type:'reset',payload:initialCount})}>Reset</button>

			<div>Count = {countTwo.count}</div>
			<button onClick={() => dispatchTwo({type:'inc'})}>Increment</button>
			<button onClick={() => dispatchTwo({type:'dec'})}>Decrement</button>
			<button onClick={() => dispatchTwo({type:'reset',payload:initialCount})}>Reset</button>
		</div>
	)
}
