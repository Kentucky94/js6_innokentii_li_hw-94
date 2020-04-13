import axiosOrders from "../../axiosOrders";
import {push} from 'connected-react-router';

export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";

export const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const registerUser = userData => {
  return async dispatch => {
    try {
      await axiosOrders.post('/users', userData);
      dispatch(registerUserSuccess());
      dispatch(push('/login'));
    } catch (error) {
      console.log(error);
    }
  }
};

export const loginUser = userData => {
  return async dispatch => {
    try{
      const response = await axiosOrders.post('/users/sessions', userData);
      dispatch(loginUserSuccess(response.data));
      dispatch(push('/'))
    }catch(error){
      console.log(error);
    }
  }
};

export const editUserProfile = profileData => {
  return async dispatch => {
    try{
      const response = await axiosOrders.patch('/users/edit', profileData);
      dispatch(loginUserSuccess(response.data));
      dispatch(push('/'));
    }catch(error){
      console.log(error);
    }
  }
};

export const logoutUser = () => {
  return async dispatch => {
    try{
      await axiosOrders.delete('users/sessions');
      dispatch(logoutUserSuccess());
      dispatch(push('/'));
    }catch(error){
      console.log(error);
    }
  }
};