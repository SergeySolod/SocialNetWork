import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {getAuth} from "../redux/selectors/Auth-selector";

let mapStateToPropsForRedirect = (state) => ({
    Auth: getAuth(state)
});

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.Auth) return <Redirect to='/login'/>
            return <Component {...this.props}/>
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent
}