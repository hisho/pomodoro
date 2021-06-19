import {useState, VFC} from "react";
import {Counter, TimeLine, Timer} from "@src/components";
import {convertMinutes} from "@src/helpers";
import {pomodoroType} from "@src/components/type";
import {Head} from "@src/layouts/head/Head";

type createPomodorosType = (
  props: {
    work: number
    break: number
    longBreak: number
  }) => pomodoroType[]
const createPomodoros: createPomodorosType = (props) => {
  return [...Array(8)].map((_, i, array) => {
    const isWork = i % 2 === 0;
    const isLast = array.length - 1 === i;
    return {
      time: isLast ? convertMinutes(props.longBreak) : isWork ? convertMinutes(props.work) : convertMinutes(props.break),
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
      <Head />
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
