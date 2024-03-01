import React from "react";

const NextButton = ({ answer, index, numQuestions, dispatch }) => {
  if (answer === null) return;
  return (
    <div>
      {index < numQuestions - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
      {index === numQuestions - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finished" })}
        >
          Finish
        </button>
      )}
    </div>
  );
};

export default NextButton;
