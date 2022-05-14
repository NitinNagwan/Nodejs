import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Admin/Dashboard";

import Authenticate from "./Components/Authenticate";
import Forgotpassword from "./Components/Forgotpassword";

import Logiin from "./Components/Logiin";
import Protected from "./Components/Protected";
import Quiz from "./Components/Quiz";
import Register from "./Components/Register";
import ResetPassword from "./Components/ResetPassword";

function App() {
  const [auth, setAuth] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    const token = sessionStorage.getItem("X-access-Token");
   axios
      .post("http://localhost:8000/users/verify", { token: token })
      .then((res) => {
        setAuth(res.data);
       setUser(res.data.user);
      })
      .catch((err) => {
        console.log("session Expired");
      });
     
  }, []);


  // return (
  //   <>
  //     {auth && !auth.admin ? (
  //       <Route path="/adminpage" element={<Adminpage />} />
  //     ) : (
  //       <Route
  //         path="/quiz"
  //         element={
  //           <Protected>
  //             <Quiz />
  //             <Adminpage />
  //           </Protected>
  //         }
  //       />
  //     )}
  //   </>
  // );
  
  return (
    <div className="App">
      <Routes>
        {auth ? (
          auth.admin ? (
            <Route path="/" element={<Dashboard />} />
          ) : (
            <Route path="/" element={<Quiz user={user}/>} />
          )
        ) : (
          <Route path="/" element={<Logiin setAuth={setAuth} setUser={setUser}/>} />
        )}

        <Route path="/register" element={<Register />} />

        <Route path='/authenticate/:token' element={<Authenticate />}/>
        <Route path='/reset-password/:token' element={<ResetPassword />}/>
        <Route path='/forgot-password' element={<Forgotpassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
