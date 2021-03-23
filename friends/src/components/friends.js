//TECH IMPORTS
import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
//COMPONENT IMPORTS
import axiosWithAuth from "./axiosWithAuth";
import { fetchFriends } from "./actions";


const Friends = (props) => {

    useEffect(()=>{
        props.fetchFriends();
    },[])

    return (
        props.isLoading ? <h1>Loading Club Members...</h1> : 
        <div className="friendsCatchAllDiv">
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