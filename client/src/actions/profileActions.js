import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES
} from "./types";

import { logoutUser } from "./authActions";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  return axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
      throw err;
    });
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => {
      // Clear errors array if submitted sucessfully
      clearErrors();
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Clear errors array
export const clearErrors = () => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });
};

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/profile")
      .then(res => {
        dispatch(logoutUser());
      })
      .catch(err => console.log(err));
  }
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => {
      // Clear errors array if submitted sucessfully
      clearErrors();

      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Experience
export const deleteExperience = (id, history) => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Experience
export const deleteEducation = (id, history) => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => {
      // Clear errors array if submitted sucessfully
      clearErrors();

      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
