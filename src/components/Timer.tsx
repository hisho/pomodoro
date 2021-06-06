import {useEffect, VFC, Dispatch, SetStateAction} from "react";
import {useTimer} from "@src/hooks";
import {timerType} from "@src/components/type";

type TimerPropsType = {
  index: number
  setIndex: Dispatch<SetStateAction<number>>
  timers: timerType[]
}

export const Timer: VFC<TimerPropsType> = (
  {
    index,
    setIndex,
    timers
  }) => {

  const {
    remaining,
    minutes,
    seconds,
    start,
    stop,
    reset,
    isDone,
    isRunning
  } = useTimer(timers[index].time);

  // //currentTimeが変わるたびにtitleを書き換える
  useEffect(() => {
    document.title = `⏳${minutes}:${seconds}`
  }, [remaining]);

  useEffect(() => {
    if (!isDone) return;
    const isLast = timers.length - 1 === index;
    if (isLast) {
      setIndex(0);
    } else {
      setIndex(prevState => prevState + 1);
    }
  }, [isDone]);

  useEffect(() => {
    if (!isDone) return;
    reset(timers[index].time);
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
