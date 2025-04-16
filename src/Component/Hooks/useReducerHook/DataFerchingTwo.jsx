import React,{useReducer,useEffect} from 'react'

const initialState = {
    loading:false,
    error:'',
    data:{}
}

function reducer(state,action){
  switch(action.type){
     case 'FETCH_PENDING':
        return {...state,loading:true,error:'',data:{}}
     case 'FETCH_SUCCESS':
        return {...state,loading:false,data:action.payload}
     case 'FETCH_FAIL':
        return {...state,loading:true,error:'Something went wrong',data:{}}
     default:
        return state
  }
}

export const DataFerchingTwo = () => {
  const [state,dispatch] = useReducer(reducer,initialState);

  useEffect(()=>{
    dispatch({type:'FETCH_PENDING'})
    fetch('https://jsonplaceholder.typicode.com/posts/1').then(resp=>resp.json()).then(data=>{
        console.log(data);        
       dispatch({type:'FETCH_SUCCESS',payload:data})
    }).catch(err=>{
        console.log(err);
        dispatch({type:'FETCH_FAIL'})

    })
},[])

  return (
    <div>
      {state.loading ? <p>Loading .....</p> :  (<div> 
            <p>below is the first post body from the post coming from the API</p>
            <b>{ state.data.body}</b> 
        </div>)}
         
        {state.error ? state.error: null}
    </div>
  )
}
