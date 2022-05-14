import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  EyeFilled,
  EyeInvisibleFilled,
  LockFilled,
  MailFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./css/Login.css";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch, useSelector } from "react-redux";
import { fetch_User } from "./redux/Actions/UsersAction";

export default function Logiin({ setAuth, setUser }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [visible, setvisible] = useState(false);
  const [type, setType] = useState("password");
  const [error, setError] = useState("");
  const { users } = useSelector((state) => state.users.response);

  console.log(users);

  useEffect(() => {
    dispatch(fetch_User());
  }, []);

  const onSubmit = (data) => {
    setError("");
    axios
      .post("http://localhost:8000/users/login", data)
      .then((res) => {
        const accessToken = res.data.accessToken;

        sessionStorage.setItem("X-access-Token", accessToken);
        console.log(res.data);
        setAuth(res.data);
        setUser(res.data.user);
      })
      .catch((err) => {
        setError(err.response && err.response.data);
      });
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
      {/* <NavBar /> */}
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
            <p>Sign in by entering the information below</p>
          </div>
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
            </label>
            <ErrorMessage errors={errors} name="Email" as="p" />

            <label className="label">
              <LockFilled className="icon" />
              <input
                type={type}
                {...register("Password", {
                  required: "This Field is Required",
                })}
              />
              <div onClick={showPassword}>
                {visible ? <EyeFilled /> : <EyeInvisibleFilled />}
              </div>
            </label>
            <ErrorMessage errors={errors} name="Password" as="p" />

            <div className="anchor-link">
              <a href="/forgot-password">Forgot Password</a>
            </div>

            <button type="submit">Login</button>
          </form>
          <div className="footer-container">
            <p>Don't have an Account?</p>
            <Link to="/register">SIGN UP</Link>
          </div>
        </div>
      </div>
    </>
  );
}
