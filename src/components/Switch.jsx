import { useState, useEffect } from "react";
import "./switch.css"; // CSS ファイルをインポート

const Switch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setMessage("１分間頑張った！この調子で頑張ろう！");
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
    setTimeLeft(5);
    setMessage("");
  };

  //   const containerStyle = {
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     height: "100vh",
  //   };

  return (
    <>
      <div //className="center-wrapper"
      >
        <button className="motivationButton" onClick={handleStart}>
          やる気
        </button>
      </div>
      <div>
        {message && (
          <div>
            <p className="message">{message}</p>
          </div>
        )}
        {isRunning && (
          <div>
            <p>{timeLeft}秒</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Switch;
