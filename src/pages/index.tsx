import {useState, VFC} from "react";
import {TimeLine, Timer} from "@src/components";
import {convertMinutes} from "@src/helpers";
import {timerType} from "@src/components/type";

const IndexPage: VFC = () => {
  const timers: timerType[] = [
    {
      time: convertMinutes(25),
      type: 'work'
    },
    {
      time: convertMinutes(5),
      type: 'break'
    },
    {
      time: convertMinutes(25),
      type: 'work'
    },
    {
      time: convertMinutes(5),
      type: 'break'
    },
    {
      time: convertMinutes(25),
      type: 'work'
    },
    {
      time: convertMinutes(20),
      type: 'break'
    },
  ];

  //タイマーの配列のindexを管理するステート
  const [index,setIndex] = useState(0);

  return (
    <main className="px-5 w-full max-w-screen-lg mx-auto lg:px-10">
      <div>
        <TimeLine timers={timers} timerIndex={index} />
      </div>
      <Timer index={index} setIndex={setIndex} timers={timers}/>
    </main>
  )
}

export default IndexPage;
