import { FETCH_USERS, RESPONSE_HANDLE } from "../types";

const iniitials = {
  isLoading: false,
  users: [],
  user: "",
  response: "",
};

const userReducer = (state = iniitials, action) => {
    console.log(action.payload,"hhjhghjghghjghj")
  switch (action.type) {
    case FETCH_USERS: {
        
      return {
        ...state,
        users: action.payload,
      };
    }
    case RESPONSE_HANDLE: {
        return {
            ...state,
            response: action.payload
        }
    }
    default: {
      return {...state};
    }
  }
};

export default userReducer;
