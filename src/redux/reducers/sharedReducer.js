const initialState = {
  stackBarOptions: { state: null, message: null, stackType: null },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SNACKBAR_SHOW":
      return {
        ...state,
        stackBarOptions: {
          state: true,
          message: action?.payload?.message,
          stackType: action?.payload?.stackType,
        },
      };
    case "SNACKBAR_HIDE":
      return {
        ...state,
        stackBarOptions: { state: null, message: null, stackType: null },
      };
    default:
      return state;
  }
}
