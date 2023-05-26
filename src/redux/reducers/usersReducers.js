import {
  GET_ADMINS,
  GET_USERS,
  GET_USERS_MOBILE,
  GET_USERS_WEB,
} from "../actions/types";

const initialState = {
  allAdmins: null,
  allUsers: null,
  allUsersWeb: null,
  allUsersMobile: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADMINS:
      return {
        ...state,
        allAdmins: [...action.payload].reverse(),
      };
    case GET_USERS:
      return {
        ...state,
        allUsers: [...action.payload].reverse(),
      };
    case GET_USERS_WEB:
      return {
        ...state,
        allUsersWeb: action.payload,
      };
    case GET_USERS_MOBILE:
      return {
        ...state,
        allUsersMobile: action.payload,
      };
    default:
      return state;
  }
}
