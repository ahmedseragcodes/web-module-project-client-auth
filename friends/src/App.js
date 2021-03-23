//TECH IMPORTS
import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Route, Link, useHistory } from "react-router-dom";
//COMPONENT IMPORTS
import { fetchFriends } from "./components/actions";
import axiosWithAuth from "./components/axiosWithAuth";
import PrivateRoute from "./components/PrivateRoute";
import Friends from "./components/friends";

function App(props) {

const history=useHistory();

const [formValues, setFormValues]=useState({
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
    axios.post("http://localhost:5000/api/login", formValues)
    .then((res)=>{
      console.log("SUCCESSFULLY POSTED LOGIN CREDS", res);
      localStorage.setItem("token", res.data.payload);
      history.push("/friends")
    })
    .catch((err)=>{
      console.log("FAILED TO POST LOGIN CREDS", err);
    })
  }

  //BEGIN FUNCTIONAL COMPONENT RETURN 
  return (
   <div className="frontPageCatchAll">
    <Route exact path="/">
    <div className="frontPageNav">
     <Link to="/">Home</Link>
     <Link to="/">Login</Link>
     <Link to="/friends">Friends</Link>
     </div>
     <h1>Lambdalorians Club</h1>
     <h2>Login</h2>

     <form onSubmit={handleLoginFormSubmit}>
       <label htmlFor="username">
        <input type="text" name="username" id="username" placeholder="Enter Username" value={formValues.username} onChange={handleLoginFormChange} />
       </label>
       <label htmlFor="username">
        <input type="password" name="password" id="password" placeholder="Enter Password" value={formValues.password} onChange={handleLoginFormChange} />
       </label>
       <button>Submit Login</button>
     </form>
   </Route>
   <PrivateRoute path="/friends">
     <Friends />
   </PrivateRoute>
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
