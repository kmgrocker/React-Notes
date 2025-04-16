import React,{useState,useRef} from 'react'
import debounce from 'lodash.debounce'
/* 
* problem statement in this case we are trying to solve by mimicking a real case scenario that when user type in search box we want to call API based on that input word and give user result or pre suggestion like google search or amazon product search 

* the performance challenge however is that when u call the API on every key stroke then it will be performance costly for that we are using debounce from lodash and to prevent the debounce creating on each render we are using useRef which will be consistent over the life cycle of component we can use useCallback also to memoized the whole callback function
*/

const useDebounceWithRef = (cb,delay)=>{
    return useRef(debounce(cb,delay)).current
}

const UseRefWithDebounce = () => {
    const [value,setValue] = useState('')
    const [dbValue,setDbValue] = useState('')


    const debounceCallBack = useRef(debounce((nextValue)=>{setDbValue(nextValue)},1000)).current

    const debouncedCallBackWithHook = useDebounceWithRef((next)=>{setDbValue(next)},1000)

    // we can make custom hook for above function 

    const handleChange = (e)=>{
        
        setValue(e.target.value)
        // setDbValue(e.target.value)
        // debounceCallBack(e.target.value)
        debouncedCallBackWithHook(e.target.value)
    }
  return (
    <div>
        <h1>useRefWithDebounce</h1>
        <main>
                <h1>Blog</h1>
                <textarea value={value} onChange={handleChange} rows={5} cols={50} />
                <section className="panels">
                    <div>
                        <h2>Editor (Client)</h2>
                        {value}
                    </div>
                    <div>
                        <h2>Saved (DB)</h2>
                        {dbValue}
                    </div>
                </section>
            </main>
    </div>
  )
}

export default UseRefWithDebounce