const BreakLength = ({ breakLength, setBreakLength, timerStatus }) => {
  return (
    <div>
      <h2 id="break-label">Break Length</h2>
      <div>
        <img
          src="/assets/arrow-narrow-down.svg"
          id="break-decrement"
          onClick={() =>
            setBreakLength((prevLength) => {
              if (prevLength !== 0 && timerStatus === "stopped") {
                return breakLength - 1;
              }
              return prevLength;
            })
          }
        />
        <p id="break-length">{breakLength}</p>
        <img
          src="/assets/arrow-narrow-up.svg"
          id="break-increment"
          onClick={() =>
            setBreakLength((prevLength) => {
              if (prevLength !== 60 && timerStatus === "stopped") {
                return breakLength + 1;
              }
              return prevLength;
            })
          }
        />
      </div>
    </div>
  );
};

export default BreakLength;
