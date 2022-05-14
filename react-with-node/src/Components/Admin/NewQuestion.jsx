import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../css/admin.css";
import NavBar from "../NavBar";

export default function NewQuestion() {
  const { register, handleSubmit } = useForm();
  const [inputField, setInputField] = useState([{ input: "" }, { input: "" }]);

  const handleServiceChange = (e, index) => {
    e.preventDefault()
    const { value } = e.target;
    const list = [...inputField];
    list[index]["input"] = value;
    setInputField(list);
  };

  const handleServiceRemove = (e,index) => {
    e.preventDefault()
    const list = [...inputField];
    list.splice(index, 1);
    setInputField(list);
  };

  const handleServiceAdd = (e) => {
    e.preventDefault()
    setInputField([...inputField, { input: "" }]);
  };
  const onSubmit = async  (data,e) => {
    e.preventDefault()
    const options = inputField.map((obj) => obj.input);
    const newQuestion = {
      question: data.Question,
      options: options,
      answer: data.answer,
    };
   await axios
      .post("http://localhost:8000/api/quiz/questions", newQuestion)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload()
  };
  return (
    <>
      <NavBar />
      <form onSubmit={handleSubmit(onSubmit)} className="question-upload-frame">
        <label className="question-upload-label">
          Question:{" "}
          <input
            className="question-upload-input"
            {...register("Question")}
            required
          ></input>
        </label>
        <div className="options-area">
          {inputField.map((singleService, index) => (
            <div key={index} className="input">
              <div className="first-division">
                <label className=" question-upload-label">
                  {`option${index + 1}`}
                  <input
                  type="text"
                    {...register(`option${index + 1}`)}
                    value={singleService.service}
                    onChange={(e) => handleServiceChange(e, index)}
                    className="question-upload-option"
                    required
                  />
                </label>
                <div className="second-division">
                  {inputField.length !== 1 && (
                    <button
                      onClick={() => handleServiceRemove(index)}
                      className="remove-btn"
                    >
                      <span>Remove</span>
                    </button>
                  )}
                  {inputField.length - 1 === index && inputField.length < 4 && (
                    <button onClick={handleServiceAdd} className="add-btn">
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <label className=" question-upload-label">
          Answer:{' '}
          <input
            {...register("answer")}
            className="question-upload-input"
            required
          ></input>
        </label>

        <button type="submit">ADD</button>
      </form>

      
    </>
  );
}
