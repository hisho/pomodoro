import { useEffect, VFC, Dispatch, SetStateAction } from 'react';
import { useTimer } from '@src/hooks';
import { pomodoroType } from '@src/components/type';

type TimerPropsType = {
  pomodoroIndex: number;
  setPomodoroIndex: Dispatch<SetStateAction<number>>;
  pomodoros: pomodoroType[];
};

export const Timer: VFC<TimerPropsType> = ({
  pomodoroIndex,
  setPomodoroIndex,
  pomodoros,
}) => {
  const { remaining, minutes, seconds, start, stop, reset, isDone, isRunning } =
    useTimer(pomodoros[pomodoroIndex].time);

  // //currentTimeが変わるたびにtitleを書き換える
  useEffect(() => {
    document.title = `${pomodoros[pomodoroIndex].type} - ${minutes}:${seconds}`;
    const favicon = document.getElementById('favicon');
    if (!favicon) return;
    if (!(favicon instanceof HTMLLinkElement)) return;
    const icon = pomodoros[pomodoroIndex].type === 'work' ? '👨‍💻' : '☕️';
    favicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>${icon}</text></svg>`;
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
      setPomodoroIndex((prevState) => prevState + 1);
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
  };

  return (
    <>
      <div className="text-center font-bold text-8xl tabular-nums slashed-zero sm:text-9xl">
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      {isRunning ? (
        <button type="button" onClick={stop}>
          stop
        </button>
      ) : (
        <button type="button" onClick={start}>
          start
        </button>
      )}
      <button type="button" onClick={onReset}>
        reset
      </button>
    </>
  );
};
