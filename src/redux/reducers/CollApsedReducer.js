const initState = {
  isCollapsed: false,
};
export const CollApsedReducer = (prevState = initState, action) => {
  switch (action.type) {
    case "change_collapsed":
      return {
        isCollapsed: !prevState.isCollapsed,
      };
    default:
      return prevState;
  }
};
