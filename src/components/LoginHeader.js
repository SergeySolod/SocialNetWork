import React from 'react';
import {NavLink} from "react-router-dom";

const LoginHeader = (props) => {
    return (
        <div>
            <button onClick={props.logout} className="btn btn-primary">&#10007;</button> &#160;
            {props.Auth ? <div className="navbar-brand">{props.Login}</div> :
                <NavLink className="navbar-brand" to="/login" exact>Вход</NavLink>}
        </div>
    )
}

export default LoginHeader;