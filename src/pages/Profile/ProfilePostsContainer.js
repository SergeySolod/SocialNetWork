import React from 'react';
import {ProfilePosts} from "./ProfilePosts";
import {connect} from "react-redux";

import {
    addPostActionCreator
} from "../../redux/reducers/Profile-reducer";

import {
    getProfile,
    getProfilePosts
} from "../../redux/selectors/Profile-reducer";


const mapStateToProps = (state) => {
    return {
        ProfilePosts: getProfilePosts(state),
        Profile: getProfile(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}

const ProfilePostsContainer = connect(mapStateToProps, mapDispatchToProps)(ProfilePosts);

export default ProfilePostsContainer;