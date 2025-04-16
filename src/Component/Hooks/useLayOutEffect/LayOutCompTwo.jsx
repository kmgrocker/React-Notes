import React,{useState,useEffect,useLayoutEffect,useRef} from 'react'


export const LayOutCompTwo = function(){
    const [userData,setUserData] = useState([])
    const divRef = useRef(null)

    // useEffect(()=>{
    //     console.log(divRef.current);
    //     debugger
    //     if(divRef.current==null) {
    //         return
    //     }else{
    //         divRef.current.scrollTop = divRef.current.scrollHeight
    //     }        
    // },[userData])

    useLayoutEffect(()=>{
       
        console.log(divRef.current);
        debugger
        // if(divRef.current==null) {
        //     return
        // }else{
        //     divRef.current.scrollTop = divRef.current.scrollHeight
        // }      
        if(!divRef.current) return 
        divRef.current.scrollTop = divRef.current.scrollHeight  
    },[userData])

     useEffect(()=>{
        console.log('dataa')
        let fetchData = async()=>{
             const resp = await fetch('/sampleJsonData.json')
             const data = await resp.json()
            //  console.log(data)
             setUserData(data)
        }
        fetchData()
     },[])
 
  return (
    <div>
        {(function(){console.log('return block ran')}())}
        <h1>useLayout effect example Two</h1>
        <div ref={divRef} style={{overflowY:'auto',height:600}}>
        {userData.length > 0 && userData.map(user=>{
            return (
                <p>{user.index}- {user.name}</p>
            )
         })}
        </div>
         
    </div>
  )
}
