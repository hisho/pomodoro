import {VFC} from "react";
import {timerType} from "@src/components/type";

const timerState = (timerIndex, currentIndex) => {
  if (timerIndex === currentIndex) {
    //current
    return 'bg-red-500'
  } else if (timerIndex > currentIndex) {
    //will
    return 'bg-green-500'
  } else {
    //done
    return 'bg-gray-300'
  }
}

type TimeLinePropsType = {
  timers: timerType[]
  timerIndex: number
}

export const TimeLine:VFC<TimeLinePropsType> = (
  {
    timers,
    timerIndex
  }) => {
  return (
    <ol className="flex gap-x-2 w-full">
      {timers.map((item, index) => (
        <li
          className={`relative ${timerState(index, timerIndex)}`}
          style={{width: `${1 / timers.length * 100}%`}}
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
