import React, { useEffect } from "react";

const Timer = ({ secondsRemanining, dispatch }) => {
  const mins = Math.floor(secondsRemanining / 60);
  const seconds = secondsRemanining % 60;
  useEffect(
    function () {
      const id = setInterval(() => dispatch({ type: "tick" }), 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
