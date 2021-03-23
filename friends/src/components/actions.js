import axios from "axios";
import React from "react";
import axiosWithAuth from "./axiosWithAuth";

export const FETCH_FRIENDS_START="FETCH_FRIENDS_START";
export const FETCH_FRIENDS_SUCCESS="FETCH_FRIENDS_SUCCESS";
export const FETCH_FRIENDS_FAILURE="FETCH_FRIENDS_FAILURE";

export const fetchFriends = () => dispatch => {
    dispatch ({ type: FETCH_FRIENDS_START });
    axiosWithAuth()
    axios.get("/api/friends")
    .then((res)=>{
        console.log("SUCCESSFULLY FETCHED FRIENDS", res);
        dispatch({ type: FETCH_FRIENDS_SUCCESS, payload: res.data })
    })
    .catch((err)=>{
        console.log("FAILED TO FETCH FRIENDS", err);
        dispatch({ type: FETCH_FRIENDS_FAILURE, payload: err.message })
    })
}

