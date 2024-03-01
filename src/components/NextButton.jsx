import React from "react";

const NextButton = ({ answer, index, numQuestions, dispatch }) => {
  return (
    <div>
      {answer !== null && index < numQuestions - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default NextButton;
