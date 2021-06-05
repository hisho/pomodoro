import {VFC} from "react";
import {Timer} from "@src/components";

const IndexPage: VFC = () => {
  return (
    <main className="px-5 w-full max-w-screen-lg mx-auto lg:px-10">
      <Timer time={60 * 25}/>
    </main>
  )
}

export default IndexPage;
