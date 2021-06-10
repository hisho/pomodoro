import {useState, VFC} from "react";
import {Counter, TimeLine, Timer} from "@src/components";
import {convertMinutes} from "@src/helpers";
import {pomodoroType} from "@src/components/type";

type createPomodorosType = (
  props: {
    work: ReturnType<typeof convertMinutes>
    break: ReturnType<typeof convertMinutes>
    longBreak: ReturnType<typeof convertMinutes>
  }) => pomodoroType[]
const createPomodoros: createPomodorosType = (props) => {
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
  //ポモドーロの配列
  const pomodoros = createPomodoros({
    work: 25,
    break: 5,
    longBreak: 20
  });

  //ポモドーロの配列のindexを管理するステート
  const [pomodoroIndex, setPomodoroIndex] = useState(0);

  return (
    <main className="px-5 w-full max-w-screen-lg mx-auto lg:px-10">
      <div>
        <TimeLine pomodoros={pomodoros} pomodoroIndex={pomodoroIndex}/>
      </div>
      <Timer pomodoroIndex={pomodoroIndex} setPomodoroIndex={setPomodoroIndex} pomodoros={pomodoros}/>
      <div>
        <Counter pomodoroIndex={pomodoroIndex} pomodoros={pomodoros} />
      </div>
    </main>
  )
}

export default IndexPage;
