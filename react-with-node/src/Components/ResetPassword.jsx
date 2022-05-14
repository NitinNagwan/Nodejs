import { EyeFilled, EyeInvisibleFilled, LockFilled } from "@ant-design/icons";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./css/Tooltip.css";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [visible, setvisible] = useState(false);
  const [type, setType] = useState("password");
  const [Error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const showPassword = () => {
    setvisible(!visible);
    if (!visible) {
      setType("text");
    } else {
      setType("password");
    }
  };

  const closeModal = () => setOpen(false);

  const onSubmit = (data) => {
    console.log(data);

    const { newPassword, confirmPassword } = data;

    axios
      .put("http://localhost:8000/users/reset-password", {
        token: params.token,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      })
      .then((res) => {
        setError(res.data);
        setOpen(true);
        if (open) {
          window.location.reload();
        }
      })
      .catch((err) => {
        setError(err.response.data);
        setOpen(true);
      });
  };

  setTimeout(() => {
    setOpen(false);
  }, 2500);

  return (
    <>
      <Popup
        open={open}
        closeOnDocumentClick
        position="bottom left"
        onClose={closeModal}
      >
        <div className="modal">
          <span>{Error}</span>
        </div>
      </Popup>
      <div className="question-upload-frame" style={{ background: "black" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label">
            <LockFilled className="icon" />
            <input
              type="password"
              placeholder="Old Password"
              {...register("oldPassword", {
                required: {
                  value: true,
                  message: "This Field is Required",
                },
              })}
            />
          </label>
          <ErrorMessage errors={errors} name="oldPassword" as="p" />

          <label className="label">
            <LockFilled className="icon" />
            <input
              type={type}
              placeholder="New Password"
              {...register("newPassword", {
                required: "This Field is Required",

                pattern: {
                  value:
                    /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i,
                  message: `must start with capital letter and have special character `,
                },
              })}
            />
            {/* <div onClick={showPassword}>
              {visible ? <EyeFilled /> : <EyeInvisibleFilled />}
            </div> */}
          </label>
          <ErrorMessage errors={errors} name="newPassword" as="p" />

          <label className="label">
            <LockFilled className="icon" />
            <input
              type={type}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
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
          <ErrorMessage errors={errors} name="confirmPassword" as="p" />
          {/* {Error ? <p>{Error}</p> : <></>} */}
          {/* <ErrorMessage errors={Error} name="confirmPassword" as="p" /> */}

          <button type="submit">Reset</button>
        </form>

        <Link to='/' style={{textAlign: "center"}}>Login</Link>
      </div>
    </>
  );
}
