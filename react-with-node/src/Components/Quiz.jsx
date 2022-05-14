import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/QuizApp.css";
import NavBar from "./NavBar";


function Quiz({user}) {
  const [counter, setCounter] = useState(0);
  const [questions, setQuestions] = useState("");
  const [status, setStatus] = useState(false);
  const [answer, setAnswer] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/quiz/questions").then((res) => {
     
      setQuestions(res.data);
    });
  }, []);

 
;

  const nextQuestion = (e) => {
    e.preventDefault();
    if (status) {
      if (counter < questions.length) {
        setCounter((counter) => counter + 1);
        setStatus(false);
      }
    } else {
      alert("submit first");
    }
    deselect();
    setAnswer("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (answer) {
      if (questions[counter].answer === answer) {
        setScore(score + 10);
      }
      userAnswer.push(answer);

      setStatus(true);
    } else {
      alert("Select your answer first");
    }
  };
  const handleChange = (e) => {
    setAnswer(e.value);
    setInput(e);
  };

  const deselect = () => {
    input.checked = false;
  };
  const postAnswer = (e) => {
    e.preventDefault();
    if (status) {
      setCounter((counter) => counter + 1);
    } else {
      alert("submit first");
    }
  };


  const refresh = () => {
    // const bool = window.confirm();
    // if (bool) {
    // }
    window.location.reload(true);
  };

  return (
    <>
  <NavBar />
      {questions && questions.length > 0 && counter < questions.length ? (
        <section className="quiz-frame">
          <div className="ct">
            <div className="head">
              <h1 className="heading animate-charcter">Quiz in Javascript</h1>
            </div>

            <hr />
            <div className="inner-content">
              {/* <img src="images/quiz.png" alt="" /> */}
              <form>
                <h4 className="username">Welcome {user} </h4>
                <br />
                <h6 className="counter">
                  Question {counter + 1} of {questions.length}
                </h6>

                <div className="question-field">
                  <h4 className="question">
                    Q: {counter + 1} {questions[counter].question}
                  </h4>

                  {questions[counter].options.map((option, index) => {
                    return (
                      <>
                        <label htmlFor={`answer${index + 1}`} key={index + 1}>
                          {index + 1}.
                          <input
                            type="radio"
                            id={index + 1}
                            className={`answer${index + 1} quiz-option`}
                            name="fav_language"
                            value={option}
                            disabled={status}
                            onClick={(e) => handleChange(e.target)}
                          />
                          <label htmlFor="html" id={`text_${index + 1}`}>
                            {option}
                          </label>
                        </label>
                      </>
                    );
                  })}

                  <br />
                  <div className="buttons">
                    <button
                      className="ms-lg-5"
                      onClick={handleSubmit}
                      id="submit"
                      disabled={status}
                    >
                      submit
                    </button>
                    {counter === questions.length - 1 ? (
                      <button className="start2" onClick={postAnswer}>
                        End Test
                      </button>
                    ) : (
                      <button
                        className="ms-lg-2"
                        id="next"
                        onClick={nextQuestion}
                      >
                        next
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <hr />
            {/* <div className="d-flex justify-content-end me-5" >
          <button onClick={handleLogout}>
              Log OUt
            </button>
          </div> */}
            <span className="correct"></span>
          </div>
        </section>
      ) : (
        <section className="frame2">
          <div className="form-box2">
            <div className="head2">
              <h1 className="">Result</h1>
            </div>
            <div className="inner-content2">
              <img src="/images/rainbow-6022476_960_720.png" alt="" />
              <div className="content">
                <p>Thank you for playing </p>
                <h3 style={{color: 'black'}}>{user}</h3>
                <h5 className="score">Score: {score}</h5>
              </div>
              <button className="start2" onClick={refresh}>
                Click to attempt again
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Quiz;
