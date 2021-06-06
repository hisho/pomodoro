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
    isDone
  } = useTimer(time);

  // //currentTimeが変わるたびにtitleを書き換える
  useEffect(() => {
    document.title = `⏳${minutes}:${seconds}`
  }, [remaining]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className="text-center font-bold text-8xl tabular-nums slashed-zero sm:text-9xl">
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button type="button" onClick={start}>start</button>
      <button type="button" onClick={stop}>stop</button>
    </>
  )
}
