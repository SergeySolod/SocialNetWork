import React from 'react'
import {NavLink} from 'react-router-dom'
import ContainerLoginHeader from './ContainerLoginHeader'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
            <ContainerLoginHeader/>
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/" exact>Главная</NavLink>
                </li>
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/profile" exact>Профиль</NavLink>
                </li>
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/users" exact>Пользователи</NavLink>
                </li>
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/dialogs" exact>Диалоги</NavLink>
                </li>
            </ul>
        </nav>
    )
}