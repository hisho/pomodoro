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

  //indexを更新する関数
  useEffect(() => {
    //タイマーが終了していない時は早期リターン
    if (!isDone) return;
    //indexがlastかどうか
    const isLast = timers.length - 1 === index;
    if (isLast) {
      //indexがlastの場合0をセットする
      setIndex(0);
    } else {
      //indexがlastではない場合は前のindex+1する
      setIndex(prevState => prevState + 1);
    }
  }, [isDone]);

  //タイマーを再セットする関数
  useEffect(() => {
    //タイマーが終了していない時は早期リターン
    if (!isDone) return;
    //タイマーに新しいタイムを登録する
    reset(timers[index].time);
    //スタートする
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
