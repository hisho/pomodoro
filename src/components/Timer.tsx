import {useEffect, VFC, Dispatch, SetStateAction} from "react";
import {useTimer} from "@src/hooks";
import {pomodoroType} from "@src/components/type";

type TimerPropsType = {
  pomodoroIndex: number
  setPomodoroIndex: Dispatch<SetStateAction<number>>
  pomodoros: pomodoroType[]
}

export const Timer: VFC<TimerPropsType> = (
  {
    pomodoroIndex,
    setPomodoroIndex,
    pomodoros
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
  } = useTimer(pomodoros[pomodoroIndex].time);

  // //currentTimeが変わるたびにtitleを書き換える
  useEffect(() => {
    document.title = `⏳${minutes}:${seconds}`
  }, [remaining]);

  //indexを更新する関数
  useEffect(() => {
    //タイマーが終了していない時は早期リターン
    if (!isDone) return;
    //indexがlastかどうか
    const isLast = pomodoros.length - 1 === pomodoroIndex;
    if (isLast) {
      //indexがlastの場合0をセットする
      setPomodoroIndex(0);
    } else {
      //indexがlastではない場合は前のindex+1する
      setPomodoroIndex(prevState => prevState + 1);
    }
  }, [isDone]);

  //タイマーを再セットする関数
  useEffect(() => {
    //タイマーが終了していない時は早期リターン
    if (!isDone) return;
    //タイマーに新しいタイムを登録する
    reset(pomodoros[pomodoroIndex].time);
    //スタートする
    start();
  }, [pomodoroIndex]);

  const onReset = () => {
    setPomodoroIndex(0);
    reset(pomodoros[0].time);
  }

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
      <button type="button" onClick={onReset}>reset</button>
    </>
  )
}
