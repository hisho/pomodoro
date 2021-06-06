import {useEffect, useRef, useState} from "react";
import {zeroPadding} from "@src/helpers";

type useTimerType = (time: number) => {
  remaining: number
  minutes: string
  seconds: string
  start: () => void
  stop: () => void
  isDone: boolean
}

export const useTimer: useTimerType = (time) => {
  //現在のタイマーの数値
  const [currentTime, updateTime] = useState(time);
  //setIntervalを保存するref
  const intervalRef = useRef(null);

  const [done, setDone] = useState(false);

  //マウントするとタイマーをへらす
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      updateTime(prevState => prevState - 1);
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    }
  }, []);

  //分
  const currentMinutes = zeroPadding(Math.floor(currentTime / 60));
  //秒
  const currentSeconds = zeroPadding(currentTime % 60);

  //スタートする関数
  const start = () => {
    //現在すでにカウントダウン中なら処理を中断する
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      updateTime(prevState => prevState - 1);
    }, 1000);
  }

  //止める関数
  const stop = () => {
    //現在カウントストップ中なら処理を中断する
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  // //タイマーの数値が0になったらカウントダウンを止めてdoneをtrueにする
  useEffect(() => {
    const isTimeUp = currentTime <= 0;
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
    isDone: done,
  }
}
