const { TAB_CHANGE } = require("../types");

const initialtab = {
  tab: "Dashboard",
};

const tabReducer = (state = initialtab, action) => {
  switch (action.type) {
    case TAB_CHANGE: {
      return {
        tab: action.payload,
      };
    }
    default: return state
}

}

export  default tabReducer

