import {useEffect, useRef, useState} from "react";
import {zeroPadding} from "@src/helpers";

type useTimerType = (time: number) => {
  remaining: number
  minutes: string
  seconds: string
  start: () => void
  stop: () => void
  reset: (newTime?: number) => void
  isDone: boolean
  isRunning: boolean
}

export const useTimer: useTimerType = (time) => {
  //現在のタイマーの数値
  const [currentTime, updateTime] = useState(time);
  //setIntervalを保存するref
  const intervalRef = useRef(null);
  //タイマーが終わったかどうか
  const [done, setDone] = useState(false);
  //タイマーが動いているかどうか
  const [running, setRunning] = useState(false);

  //分
  const currentMinutes = zeroPadding(Math.floor(currentTime / 60));
  //秒
  const currentSeconds = zeroPadding(currentTime % 60);

  //スタートする関数
  const start = () => {
    //現在すでにカウントダウン中なら処理を中断する
    if(currentTime === 0) return;
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      updateTime(prevState => prevState - 1);
    }, 1000);
    setRunning(true);
  }

  //止める関数
  const stop = () => {
    //現在カウントストップ中なら処理を中断する
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
  }

  //新しく時間を設定する関数
  const reset = (newTime = time) => {
    //intervalRef.currentをクリアにして止める
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    //新しい時間をセットする
    updateTime(newTime);
    //doneをfalseにする
    setDone(false);
  }

  // //タイマーの数値が0になったらカウントダウンを止めてdoneをtrueにする
  useEffect(() => {
    const isTimeUp = currentTime <= -1;
    if (isTimeUp) {
      clearInterval(intervalRef.current);
      setDone(true);
    }
  }, [currentTime]);

  return {
    remaining: currentTime,
    minutes: currentMinutes,
    seconds: currentSeconds,
    start,
    stop,
    reset,
    isDone: done,
    isRunning: running
  }
}
