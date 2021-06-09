import {useState, VFC} from "react";
import {TimeLine, Timer} from "@src/components";
import {convertMinutes} from "@src/helpers";
import {timerType} from "@src/components/type";

type createTimersType = (
  props: {
    work: ReturnType<typeof convertMinutes>
    break: ReturnType<typeof convertMinutes>
    longBreak: ReturnType<typeof convertMinutes>
  }) => timerType[]
const createTimers: createTimersType = (props) => {
  return [...Array(8)].map((_, i, array) => {
    const isWork = i % 2 === 0;
    const isLast = array.length - 1 === i;
    return {
      time: isLast ? props.longBreak : isWork ? props.break : props.break,
      type: isWork ? 'work' : 'break'
    }
  })
}

const IndexPage: VFC = () => {
  const timers = createTimers({
    work: 25,
    break: 5,
    longBreak: 20
  });

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
