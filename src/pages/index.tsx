import {useState, VFC} from "react";
import {Timer} from "@src/components";
import {convertMinutes} from "@src/helpers";
import {timerType} from "@src/components/type";

const timerState = (timerIndex, currentIndex) => {
  if (timerIndex === currentIndex) {
    return 'bg-red-500'
  } else if (timerIndex > currentIndex) {
    return 'bg-green-500'
  } else {
    return 'bg-gray-300'
  }
}

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
        <ol className="flex gap-x-2 w-full">
          {timers.map((item, timerIndex) => (
            <li
              className={`relative ${timerState(timerIndex, index)}`}
              style={{width: `${1 / timers.length * 100}%`}}
              key={`${item.time}_${timerIndex}`}
            >
              <div style={{paddingTop: '100%'}}/>
              <div className="absolute text-center inset-0 grid place-content-center">
                <div>{timerIndex + 1}</div>
                <div>{item.type}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <Timer index={index} setIndex={setIndex} timers={timers}/>
    </main>
  )
}

export default IndexPage;
