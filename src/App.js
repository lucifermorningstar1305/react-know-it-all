import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import RestartQuiz from "./components/RestartQuiz";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  error: "",
  index: 0,
  answer: null,
  userScore: 0,
  highScore: 0,
  secondsRemanining: null,
};

const SECS_PER_QUESTION = 30;

const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error", error: action.payload };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemanining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        userScore:
          question.correctOption === action.payload
            ? state.userScore + question.points
            : state.userScore,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finished":
      return {
        ...state,
        status: "finish",
        highScore:
          state.userScore > state.highScore ? state.userScore : state.highScore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        index: 0,
        userScore: 0,
        highScore: state.highScore,
      };

    case "tick":
      return {
        ...state,
        secondsRemanining: state.secondsRemanining - 1,
        status: state.secondsRemanining === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("Unknown action type");
  }
};

const App = () => {
  const [
    {
      questions,
      status,
      index,
      answer,
      userScore,
      highScore,
      secondsRemanining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(function () {
    async function getQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok)
          throw new Error("Something went wrong with fetching the data.");
        const data = await res.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed", payload: err.message });
      }
    }
    getQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              userScore={userScore}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer
                secondsRemanining={secondsRemanining}
                dispatch={dispatch}
              />
              <NextButton
                answer={answer}
                index={index}
                numQuestions={numQuestions}
                dispatch={dispatch}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <>
            <FinishScreen
              score={userScore}
              maxPoints={totalPoints}
              highScore={highScore}
            />
            <RestartQuiz dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
};

export default App;
