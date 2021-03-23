//TECH IMPORTS
import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Route, Link } from "react-router-dom";
//COMPONENT IMPORTS
import { fetchFriends } from "./components/actions";
import axiosWithAuth from "./components/axiosWithAuth";
import PrivateRoute from "./components/PrivateRoute";

function App() {

const { formValues, setFormValues }=useState({
  username: "",
  password: "",
})

//HANDLES LOGIN FORM INPUTS 
  const handleLoginFormChange = (event)=>{

    const { name, value, checked, type }=event.target;

    const valueToUse = type === "checkbox" ? checked : value

    setFormValues({
      ...formValues,
      [name]: valueToUse
    })
  }

//HANDLES LOGIN FORM SUBMISSION 
  const handleLoginFormSubmit = (event)=>{
    event.preventDefault();
    axiosWithAuth()
    axios.post("/api/login", formValues)
    .then((res)=>{
      console.log("SUCCESSFULLY POSTED LOGIN CREDS", res);
      // localStorage.setItem("token", res.data);
    })
    .catch((err)=>{
      console.log("FAILED TO POST LOGIN CREDS", err);
    })
  }

  //BEGIN FUNCTIONAL COMPONENT RETURN 
  return (
   <div className="frontPageCatchAll">
     <h1>Lambdalorians Club</h1>
   </div>
  );
}


//MAP STATE / REDUX LOGIC START 
const mapStateToProps = (state) => {
  return ({
    friends: state.friends,
    error: state.error,
    isLoading: state.isLoading,
  })
}


export default connect(mapStateToProps, { fetchFriends })(App);
