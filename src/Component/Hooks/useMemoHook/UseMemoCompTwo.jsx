
import { useEffect, useMemo, useState } from "react";
import Expensive from "./Expensive";

export const UseMemoCompTwo = () => {
    const [name, setName] = useState("");
    console.log("useMemoCompTwo rendered!")

    // return (
    //   <div>
    //     <input onChange={(e) => setName(e.target.value)} placeholder="name" />
    //     <Expensive />
    //   </div>
    // );
  

  return (
    <div>
      <Form /> 
      <Expensive />
    </div>
  );
}

const Form = () => {
    console.log("form rendered!")
  const [name, setName] = useState("");
  return <input onChange={(e) => setName(e.target.value)} placeholder="name" />;
};

export default UseMemoCompTwo;
