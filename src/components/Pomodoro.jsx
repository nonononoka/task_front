import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState, useCallback } from "react";
import "./PomodoroStyle.css";

export const Pomodoro = () => {
  const children = useCallback(({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes == 0 ? "00" : minutes}:${seconds == 0 ? "00" : seconds}`;
  }, []);
  let isWorking = true;
  const [isActive, setIsActive] = useState(false);
  const handleStartPause = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  return (
    <div className="App">
      <h1>{isWorking ? "Work" : "Break"}</h1>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying={isActive}
          duration={1500}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[1500, 1100, 500, 0]}
          onComplete={() => {
            isWorking = !isWorking;
            return {
              shouldRepeat: true,
              newInitialRemainingTime: isWorking ? 1500 : 300,
            };
          }}
        >
          {children}
        </CountdownCircleTimer>
      </div>
      <p className="info">
        Change component properties in the code filed on the right to try
        difference functionalities
      </p>
      <button onClick={handleStartPause}>{isActive ? "Pause" : "Start"}</button>
    </div>
  );
};
