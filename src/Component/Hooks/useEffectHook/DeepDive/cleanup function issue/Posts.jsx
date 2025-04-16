import React,{useEffect, useState} from 'react'

export const Posts = () => {
 const [posts,setPosts] = useState([])
 // to cancel the API call we have to use claeanup function 
 //in cleanup function we can go with two approaches one with setting a flag true and false  that will only preventing from setting a state on unmounted component but not cancel the API 
 
 // to cancel the API it self we have to use abort cintroller

 // 

 useEffect(()=>{
    let subscribe = true;
    const fetchPost  = async()=>{
       
            const data = await fetch("https://jsonplaceholder.typicode.com/posts").then(res=>res.json()).then(data=>data)
            console.log(data);
            if(subscribe){
                alert('posts are ready updating the state'); // this is to test that even when this component unmount the API call is intact and it will return the data and we are trying to set a state on an unmounted component
                setPosts(data)
            }
        

        // const data = await fetch("https://jsonplaceholder.typicode.com/posts").then(res=>res.json()).then(data=>data)
        // console.log(data);
        // alert('posts are ready updating the state');
         

        //  setPosts(data)
       
    }
    fetchPost()

    return ()=>{
        subscribe = false
    }
 },[])
  return (
    <div>
        {posts.map(data=>{
            return (
                <p key={data.id}>{data.title}</p>
            )
        })}
    </div>
  )
}
