//TECH IMPORTS
import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
//STYLING IMPORTS
import "../index.css";
//COMPONENT IMPORTS
import axiosWithAuth from "./axiosWithAuth";
import { fetchFriends } from "./actions";


const Friends = (props) => {

    const { setFormValues }=props;
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem("token");
        setFormValues({
            username: "",
            password: "",
        })
        history.push("/");
    }

    useEffect(()=>{
        props.fetchFriends();
    },[])

    return (
        props.isLoading ? <h1>Loading Club Members...</h1> : 
        <div className="friendsCatchAllDiv">
            <Link to="/">Home</Link>
            <Link onClick={logout}>Log Out</Link>
            <h2>Lambdalorians Members</h2>
            {props.friends.map((friend)=>{
                return (
                    <div className="friendsIndividualDiv">
                        <p>{friend.name}</p>
                        <p>{friend.email}</p>
                        <p>{friend.age}</p>
                        <p>{friend.id}</p>
                    </div>
                )
            })}
        </div>
    )
}

//BEGIN REDUX LOGIC

const mapStateToProps = (state) => {
    return ({
      friends: state.friends,
      error: state.error,
      isLoading: state.isLoading,
    })
  }

export default connect(mapStateToProps, { fetchFriends })(Friends)