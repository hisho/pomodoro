import {useEffect, useState, VFC} from "react";
import {pomodoroType} from "@src/components/type";

type CounterPropsType = {
  pomodoroIndex: number
  pomodoros: pomodoroType[]
}

export const Counter: VFC<CounterPropsType> = (
  {
    pomodoroIndex,
    pomodoros
  }) => {

  //ポモドーロのカウント
  const [pomodoroCount, setPomodoroCount] = useState(0);

  useEffect(() => {
    //休憩に到達した時
    const isBreak = pomodoros[pomodoroIndex].type === 'break';
    if (isBreak) {
      //ポモドーロのカウントを増やす
      setPomodoroCount(prevState => prevState + 1);
    }
  }, [pomodoroIndex])

  return (
    <div>
      {pomodoroCount}
    </div>
  )
}
