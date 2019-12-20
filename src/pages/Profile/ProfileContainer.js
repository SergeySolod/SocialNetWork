import React from 'react'
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux'

import {
    requestProfile,
    requestStatus,
    updateStatus,
    savePhoto,
    saveProfile
} from "../../redux/reducers/Profile-reducer";
import {
    getProfile,
    getStatus
} from "../../redux/selectors/Profile-reducer";
import {
    getuserId
} from "../../redux/selectors/Auth-reducer";
import Profile from "./Profile";
import ProfilePostsContainer from "./ProfilePostsContainer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.id;
        if (!userId) {
            userId = this.props.userId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.requestProfile(userId);
        this.props.requestStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.id != prevProps.match.params.id) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div>
                <Profile Profile={this.props.Profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         isOwner={!this.props.match.params.id}
                         savePhoto={this.props.savePhoto}
                         saveProfile={this.props.saveProfile}
                />
                <ProfilePostsContainer/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return (
        {
            Profile: getProfile(state),
            status: getStatus(state),
            userId: getuserId(state)

        }
    )
}

export default compose(
    connect(mapStateToProps, {requestProfile, requestStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);