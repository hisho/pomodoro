import {VFC} from "react";
import {Timer} from "@src/components";

const IndexPage: VFC = () => {
  const arr = [5, 3, 1, 2];

  return (
    <main className="px-5 w-full max-w-screen-lg mx-auto lg:px-10">
      <Timer timer={arr}/>
    </main>
  )
}

export default IndexPage;
