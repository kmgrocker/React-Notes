import React from 'react'

export function withFancyText(WrappedComponent){
    const fancyStyle = {color:'red',fontWeight:'bold',fontSize:'20px',textDecoration:'underline'}
    function WithFancyText(props){
        return (
            <div style={fancyStyle}>
             <WrappedComponent  {...props} />
            </div>
        )
    }
    return WithFancyText
}