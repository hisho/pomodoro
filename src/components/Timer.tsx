import {useEffect, useState, useRef, VFC} from "react";
import Head from "next/head";
import {zeroPadding} from "@src/helpers";

type TimerPropsType = {
  time: number
}

export const Timer: VFC<TimerPropsType> = (
  {
    time,
  }) => {
  //現在のタイマーの数値
  const [currentTime, updateTime] = useState(time);
  //タイマーが終わったかどうか
  const [done, setDone] = useState(false);
  //setIntervalを保存するref
  const intervalRef = useRef(null);

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

  //currentTimeが変わるたびにtitleを書き換える
  useEffect(() => {
    document.title = `⏳${currentMinutes}:${currentSeconds}`
  }, [currentTime]);

  //タイマーの数値が0になったらカウントダウンを止めてdoneをtrueにする
  useEffect(() => {
    const isTimeUp = currentTime <= 0;
    if (isTimeUp) {
      clearInterval(intervalRef.current);
      setDone(true);
    }
  }, [currentTime]);

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

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className="text-center font-bold text-8xl tabular-nums slashed-zero sm:text-9xl">
        <span>{currentMinutes}</span>:<span>{currentSeconds}</span>
      </div>
      <button type="button" onClick={start}>start</button>
      <button type="button" onClick={stop}>stop</button>
    </>
  )
}
