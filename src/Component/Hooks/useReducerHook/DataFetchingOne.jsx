import React,{useState,useEffect} from 'react'

export const DataFetchingOne = () => {
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState('')
    const [data,setData] = useState({})

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts/1').then(resp=>resp.json()).then(data=>{
            console.log(data);        
            setData(data)
            setError('')
            setLoading(false)
        }).catch(err=>{
            console.log(err);
            setError('something went wrong')
            setLoading(false)

        })
    },[])
  return (
    <div>
        {loading ? <p>Loading .....</p> :  (<div> 
            <p>below is the first title  from the post coming from the API</p>
            <b>{ data.title}</b> 
        </div>)}
         
        {error ? error: null}
         
    </div>
  )
}
