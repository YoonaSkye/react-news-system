const initState = {
  isLoading: false,
};
export const LoadingReducer = (prevState = initState, action) => {
  switch (action.type) {
    case "change_loading":
      return {
        isLoading: action.payload,
      };
    default:
      return prevState;
  }
};
