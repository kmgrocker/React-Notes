import React from 'react';
export function withErrorBoundary(WrappedComponent){
  class WithErrorBoundary extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            hasError:false,
            error:null
        }
    }

    static getDerivedStateFromError(error){
       return {hasError:true,error}
    }

    componentDidCatch(error,info){
        if(this.state.hasError){
            console.log("Error logging",info,error)
        }
    }

    resetError = ()=>{
        this.setState(()=>{
            return {
                hasError:false,
                error:null
            }
        })
    }

    render(){
        if(this.state.hasError){
            return (
                 <div>
                 <h1>something went wrong</h1>
                 <p>Error: {this.state.error?.message}</p>
                 <button onClick={this.resetError}>Try Again</button>
                </div>
            )
        }
        return <WrappedComponent {...this.props} />
    }
  }
  return WithErrorBoundary
}

