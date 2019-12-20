import React from 'react';
import {connect} from "react-redux";

import LoginHeader from "./LoginHeader";
import {getLogin, getAuth} from "../redux/selectors/Auth-reducer";
import {logout} from "../redux/reducers/Auth-reducer";

const ContainerLoginHeader = (props) => {
    return <LoginHeader {...props}/>
}

let mapStateToProps = (state) => {
    return (
        {
            Login: getLogin(state),
            Auth: getAuth(state)
        }
    )
}


export default connect(mapStateToProps, {logout})(ContainerLoginHeader);