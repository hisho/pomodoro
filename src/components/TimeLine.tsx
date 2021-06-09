import {VFC} from "react";
import {pomodoroType} from "@src/components/type";

const pomodoroState = (currentIndex, pomodoroIndex) => {
  if (currentIndex === pomodoroIndex) {
    //current
    return 'bg-red-500'
  } else if (currentIndex > pomodoroIndex) {
    //will
    return 'bg-green-500'
  } else {
    //done
    return 'bg-gray-300'
  }
}

type TimeLinePropsType = {
  pomodoros: pomodoroType[]
  pomodoroIndex: number
}

export const TimeLine:VFC<TimeLinePropsType> = (
  {
    pomodoros,
    pomodoroIndex
  }) => {
  return (
    <ol className="flex gap-x-2 w-full">
      {pomodoros.map((item, index) => (
        <li
          className={`relative ${pomodoroState(index, pomodoroIndex)}`}
          style={{width: `${1 / pomodoros.length * 100}%`}}
          key={`${item.time}_${index}`}
        >
          <div style={{paddingTop: '100%'}}/>
          <div className="absolute text-center inset-0 grid place-content-center">
            <div>{index + 1}</div>
            <div>{item.type}</div>
          </div>
        </li>
      ))}
    </ol>
  )
}
