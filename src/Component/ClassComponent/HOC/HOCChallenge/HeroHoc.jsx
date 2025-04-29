import { withErrorBoundary } from "./HOCChallengeOne"

function HeroHoc(props){
   
    if(props.name === 'joker'){
        throw new Error("not a Hero")
    }
    return <h1>Hero : {props.name}</h1>
}

export default withErrorBoundary(HeroHoc)

