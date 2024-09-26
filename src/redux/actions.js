// src/redux/actions.js
import { SET_USERS, ADD_USER, REMOVE_USER, SET_STATS } from './actionTypes';

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const removeUser = (userId) => ({
  type: REMOVE_USER,
  payload: userId,
});

export const setStats = (stats) => ({
  type: SET_STATS,
  payload: stats,
});
