import { useState } from "react";
import ChallengeOne from "./ChallengeOne";
import { ChallengeTwo } from "./ChallengeTwo";

export default function ChallengeContainer() {
    const [count,setCount] = useState(0)
    return (
        <div>
            {/* <ChallengeOne /> */}
            {/* <ChallengeTwo/> */}
            {/* to check how the life cycle behave when parent unmount  */}
            {/* {count<3 && <ChallengeTwo/>}    */}
          {/* <button onClick={()=>setCount(c=>c+1)}>add - {count}</button> */}

        </div>
    );
}