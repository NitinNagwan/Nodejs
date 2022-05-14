import { MailFilled } from "@ant-design/icons";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Forgotpassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8000/users/forgot-password", data)
      .then((res) => {
        console.log(res.data.message);
        navigate('/')
      })
      .catch((err) => console.log(err.response.data));
  };
  return (
    <div className="question-upload-frame" style={{ background: "black" }}>
      <h5>Enter valid Email</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label">
          <MailFilled className="icon" />
          <input
            {...register("Email", {
              required: "This Field is Required",
              validate: {
                value: (email) =>
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    email
                  ) || "Enter valid email",
              },
            })}
          />
          <button type="submit" style={{ width: "30%", padding: "5px " }}>
            send
          </button>
        </label>
        <ErrorMessage errors={errors} name="Email" as="p" />
      </form>
    </div>
  );
}
