import axios from "axios";
import React, { useEffect, useState } from "react";
import Dashboard from "./Admin/Dashboard";

import Logiin from "./Logiin";
import Quiz from "./Quiz";

export default function Protected({ children }) {
  console.log(children);
  const [auth, setAuth] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    const token = sessionStorage.getItem("X-access-Token");
    console.log(token);
    axios
      .post("http://localhost:8000/users/verify", { token: token })
      .then((res) => {
        console.log(res.data);
        setAuth(res.data.admin);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log("session Expired");
      });
  }, []);

  return <>{auth && !auth.admin ? <Dashboard /> : <Logiin />}</>;

  //   if (auth.admin) {
  //     return <Adminpage />;
  //   } else {
  //     return children;
  //   }}
}
