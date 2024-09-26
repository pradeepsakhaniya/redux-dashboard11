// src/redux/reducer.js
import { SET_USERS, ADD_USER, REMOVE_USER, SET_STATS } from './actionTypes';

const initialState = {
  users: [],
  stats: {
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        stats: {
          ...state.stats,
          totalUsers: action.payload.length,
        },
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        stats: {
          ...state.stats,
          totalUsers: state.users.length + 1,
        },
      };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        stats: {
          ...state.stats,
          totalUsers: state.users.length - 1,
        },
      };
    case SET_STATS:
      return {
        ...state,
        stats: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
