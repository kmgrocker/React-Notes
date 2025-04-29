import { useEffect, useState } from "react"

const getSessionStorage = (key)=>{
    try {
        if(!window || !window.sessionStorage){
            return null
        }
        const value = window.sessionStorage.getItem(key);
        return JSON.parse(value);
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const useSessionStorage = (key,value)=>{
     const [currentValue, setCurrentValue] = useState(()=>{
        const initialSessionValue = getSessionStorage(key);
        return initialSessionValue !== null ? initialSessionValue : value;
     });

     useEffect(() => {
        // Define the handler function
        const handleStorageChange = (event) => {
            // Check if the event is for sessionStorage and the correct key
            if (event.storageArea === window.sessionStorage && event.key === key) {
                try {
                    // event.newValue is null if the item was removed
                    const newValueFromStorage = event.newValue ? JSON.parse(event.newValue) : value; // Fallback to initialValue if removed
                    setCurrentValue(newValueFromStorage);
                } catch (error) {
                    console.error("Error parsing sessionStorage item on storage event:", error);
                    setCurrentValue(value); // Fallback on error
                }
            }
        };

        // Add listener using the defined handler
        window.addEventListener('storage', handleStorageChange);

        // Return cleanup function that removes the *same* handler
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key, value]);

     const setValue = (newValue)=>{
        setCurrentValue(newValue);
       try {
        window.sessionStorage.setItem(key,JSON.stringify(newValue));
       } catch (error) {
        console.error(error);
       }
     }
    return [currentValue,setValue]
}

