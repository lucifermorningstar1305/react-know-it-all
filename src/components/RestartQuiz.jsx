import React from "react";

const RestartQuiz = ({ dispatch }) => {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "restart" })}
    >
      Restart Quiz
    </button>
  );
};

export default RestartQuiz;
