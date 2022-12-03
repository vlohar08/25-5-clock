import { useEffect } from "react";
import { useRef, useState } from "react";
import calculateTime from "../utils/calculateTime";
import BreakLength from "./BreakLength";
import SessionLength from "./SessionLength";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerStatus, setTimerStatus] = useState("stopped");
  const [timer, setTimer] = useState(null);
  const [timerType, setTimerType] = useState("Session");
  const timerInterval = useRef();
  const beepSound = useRef();
  const handleTimer = () => {
    setTimerStatus("running");

    //Pause the timer
    if (timerStatus === "running") {
      clearInterval(timerInterval.current);
      setTimerStatus("paused");
      return;
    }

    handleTimerInterval(timerStatus === "paused" ? false : true);
  };

  const handleReset = () => {
    clearInterval(timerInterval.current);
    setTimerStatus("stopped");
    setTimer(null);
    setSessionLength(25);
    setBreakLength(5);
    setTimerType("Session");
    beepSound.current.currentTime = 0;
    beepSound.current.pause();
  };

  const handleTimerInterval = (startAgain = true) => {
    if (startAgain) {
      timerType === "Session"
        ? setTimer(sessionLength * 60)
        : setTimer(breakLength * 60);
    }
    timerInterval.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(timerInterval.current);
          beepSound.current.play();
          setTimerType((prevTimerType) =>
            prevTimerType === "Session" && breakLength !== 0
              ? "Break"
              : "Session"
          );
          handleTimerInterval();
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  return (
    <div className="app">
      <h1>25 + 5 Clock</h1>
      <div className="length-controls">
        <BreakLength
          breakLength={breakLength}
          setBreakLength={setBreakLength}
          timerStatus={timerStatus}
        />
        <SessionLength
          sessionLength={sessionLength}
          setSessionLength={setSessionLength}
          timerStatus={timerStatus}
        />
      </div>
      <div className="timer">
        <h2 id="timer-label">{timerType}</h2>
        <p id="time-left">
          {timerStatus !== "stopped"
            ? calculateTime(timer)
            : calculateTime(sessionLength * 60)}
        </p>
      </div>
      <div className="options">
        <div id="start_stop" onClick={handleTimer}>
          <img src="/assets/player-play.svg" />
          <img src="/assets/player-pause.svg" />
        </div>
        <img src="/assets/refresh.svg" id="reset" onClick={handleReset} />
        <audio ref={beepSound} id="beep" src="/assets/beep.wav" />
      </div>
    </div>
  );
}

export default App;
