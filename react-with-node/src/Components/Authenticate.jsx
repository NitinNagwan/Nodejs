import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Verify } from "./redux/Actions/UsersAction";
import Dashboard from "./Admin/Dashboard";

export default function Authenticate() {
  const { error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const params = useParams();
  const hanndleVerify = (e) => {
    e.preventDefault();
    dispatch(Verify(params));
  };
  console.log(error);

  return (
    <>
      <button type="submit" onClick={hanndleVerify}>
        Verify
      </button>

      <Dashboard />
    </>
  );
}
