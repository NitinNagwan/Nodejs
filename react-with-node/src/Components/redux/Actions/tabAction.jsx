const { TAB_CHANGE } = require("../types");

const changeTab = (tab) => {
  return {
    type: TAB_CHANGE,
    payload: tab,
  };
};

export { changeTab };
