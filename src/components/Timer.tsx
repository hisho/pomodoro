import {useEffect, VFC} from "react";
import Head from "next/head";
import {useTimer} from "@src/hooks";

type TimerPropsType = {
  time: number
}

export const Timer: VFC<TimerPropsType> = (
  {
    time
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
  } = useTimer(time);

  // //currentTimeが変わるたびにtitleを書き換える
  useEffect(() => {
    document.title = `⏳${minutes}:${seconds}`
  }, [remaining]);

  useEffect(() => {
    if (isDone) {
      reset(3);
      start();
    }
  }, [isDone]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
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
