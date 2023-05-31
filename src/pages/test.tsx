import { useEffect, useState } from "react";

export default function test() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log("useEffect ran"); 
  },[]);
  

  const handleClick = async () => {
    setCount(count + 1);
  };

  return (
    <div className="flex mt-[8rem] justify-center">
      <button className="mx-5 my-5" onClick={handleClick}>Click me</button>
      <div className="mx-5 my-5">{count}</div>
    </div>
  );
}
