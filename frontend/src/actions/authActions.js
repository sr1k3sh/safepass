import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  GET_PASS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get passwords list
export const getPasswords = (data) => dispatch =>{
  axios
    .post('/api/users/get/password',data)
    .then(res => {
      dispatch({
        type: GET_PASS,
        payload: res
      });
    });
}

//delete password from list

export const deletePassword = (data , history) => dispatch =>{

  axios
    .delete('/api/users/delete/password',{data:data})
    .then(res => {
      console.log(res)
      // history.push('/')
      // dispatch({
      //   type: GET_PASS,
      //   payload: res
      // });
    });
  // var data = "url=https%3A%2F%2Fdribble.com%2Ftetst&userId=Rikesh%20Shrestha";

  // var xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;

  // xhr.addEventListener("readystatechange", function () {
  //   if (this.readyState === 4) {
  //     console.log(this.responseText);
  //   }
  // });

  // xhr.open("DELETE", "/api/users/delete/password");
  // xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  // xhr.setRequestHeader("cache-control", "no-cache");
  // xhr.setRequestHeader("postman-token", "3a890a0b-ea7c-c525-16f3-0533cd0443df");

  // xhr.send(data);
}

//save passwords
export const addPassword = (data,history) => dispatch =>{
  axios
    .post('/api/users/password',data)
    .then(res => {
      history.push('/dashboard')
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
}

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};