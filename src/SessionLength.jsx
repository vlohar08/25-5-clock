const SessionLength = ({ sessionLength, setSessionLength, timerStatus }) => {
  return (
    <div>
      <h2 id="session-label">Session Length</h2>
      <div>
        <img
          src="/assets/arrow-narrow-down.svg"
          id="session-decrement"
          onClick={() =>
            setSessionLength((prevLength) => {
              if (prevLength !== 1 && timerStatus === "stopped") {
                return sessionLength - 1;
              }
              return prevLength;
            })
          }
        />
        <p id="session-length">{sessionLength}</p>
        <img
          src="/assets/arrow-narrow-up.svg"
          id="session-increment"
          onClick={() =>
            setSessionLength((prevLength) => {
              if (prevLength !== 60 && timerStatus === "stopped") {
                return sessionLength + 1;
              }
              return prevLength;
            })
          }
        />
      </div>
    </div>
  );
};

export default SessionLength;
