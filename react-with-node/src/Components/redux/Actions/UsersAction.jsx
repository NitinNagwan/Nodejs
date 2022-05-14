import axios from "axios";
import { FETCH_USERS, RESPONSE_HANDLE } from "../types";

const fetch_User = () => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "http://localhost:8000/users",
      });

      const { data } = response;
      if (data) {
        await dispatch({
          type: FETCH_USERS,
          payload: data,
        });
      }
    } catch (err) {
      dispatch({
        type: RESPONSE_HANDLE,
        payload: err.message,
      });
    }
  };
};

const signUp = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "http://localhost:8000/users/signup",
        data: user,
      });
      if (response) {
        dispatch({
          type: RESPONSE_HANDLE,
          payload: response.data.message,
        });
      }
    } catch (err) {
      dispatch({
        type: RESPONSE_HANDLE,
        payload: err.response.data.error,
      });
    }
  };
};

const Verify = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios({
        method: "POST",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        url: "http://localhost:8000/users/activateUser",
        data: token,
      });

      if (response) {
        dispatch({
          type: RESPONSE_HANDLE,
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch({
        type: RESPONSE_HANDLE,
        payload: err.response.data,
      });
    }
  };
};

export { fetch_User, signUp, Verify };
