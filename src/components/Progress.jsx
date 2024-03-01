import React from "react";

const Progress = ({ index, numQuestions, userScore, totalPoints, answer }) => {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question : <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        Points: <strong>{userScore}</strong> / {totalPoints}
      </p>
    </header>
  );
};

export default Progress;
