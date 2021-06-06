import {useEffect, VFC, useState} from "react";
import {useTimer} from "@src/hooks";

type TimerPropsType = {
  timer: number[]
}

export const Timer: VFC<TimerPropsType> = (
  {
    timer
  }) => {
  const [index, setIndex] = useState(0);

  const {
    remaining,
    minutes,
    seconds,
    start,
    stop,
    reset,
    isDone,
    isRunning
  } = useTimer(timer[0]);

  // //currentTimeが変わるたびにtitleを書き換える
  useEffect(() => {
    document.title = `⏳${minutes}:${seconds}`
  }, [remaining]);

  useEffect(() => {
    if (!isDone) return;
    const isLast = timer.length - 1 === index;
    if (isLast) {
      setIndex(0);
    } else {
      setIndex(prevState => prevState + 1);
    }
  }, [isDone]);

  useEffect(() => {
    if (!isDone) return;
    reset(timer[index]);
    start();
  }, [index]);

  return (
    <>
      <div className="text-center font-bold text-8xl tabular-nums slashed-zero sm:text-9xl">
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      {isRunning ? (
        <button type="button" onClick={stop}>stop</button>
      ) : (
        <button type="button" onClick={start}>start</button>
      )}
    </>
  )
}
