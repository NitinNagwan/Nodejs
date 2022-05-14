import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";

import {
  EyeFilled,
  EyeInvisibleFilled,
  LockFilled,
  MailFilled,
  UserOutlined,
} from "@ant-design/icons";

import "./css/Login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signUp } from "./redux/Actions/UsersAction";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const disapatch = useDispatch();
  const [visible, setvisible] = useState(false);
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/users")
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err));
  // }, [type]);

  const onSubmit = (data) => {
    setError("");
    disapatch(signUp(data));
    // axios
    //   .post("http://localhost:8000/users/register", data)
    //   .then((res) => {
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     setError(err.response.data);
    //   });
  };

  const showPassword = () => {
    setvisible(!visible);
    if (!visible) {
      setType("text");
    } else {
      setType("password");
    }
  };
  return (
    <>
      {error ? <div className="error">{error}</div> : <></>}
      <div className="login-register-frame">
        <div className="login-wrap">
          <div className="image-container">
            <img
              src="https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
              alt="image"
            />
          </div>
          <div className="header-container">
            <h3>Welcome</h3>
            <p>Sign up by entering the information below</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label">
              <UserOutlined className="icon" />
              <input
                {...register("FirstName", {
                  required: {
                    value: true,
                    message: "This Field is Required",
                  },
                  maxLength: {
                    value: 20,
                    message: "Cannot exceed 20 characters",
                  },
                })}
              />
            </label>
            <ErrorMessage errors={errors} name="FirstName" as="p" />

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
            </label>
            <ErrorMessage errors={errors} name="Email" as="p" />

            <label className="label">
              <LockFilled className="icon" />
              <input
                type={type}
                {...register("Password", {
                  required: "This Field is Required",
                  pattern: {
                    value:
                      /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i,
                    message: `must start with capital letter and have special character `,
                  },
                })}
              />
              <div onClick={showPassword}>
                {visible ? <EyeFilled /> : <EyeInvisibleFilled />}
              </div>
            </label>
            <ErrorMessage errors={errors} name="Password" as="p" />

            <div className="anchor-link">
              <a href="/">Forgot Password</a>
            </div>

            <button type="submit">Register</button>
          </form>
          <div className="footer-container">
            <p>Already have an Account?</p>
            <Link to="/">SIGN IN</Link>
          </div>
        </div>
      </div>
    </>
  );
}
