import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter, NavLink} from "react-router-dom";
import userPhoto from "./../../img/user.png";

import {
    requestUsers,
    follow,
    unfollow,
    setCurrentPage
} from "../../redux/reducers/Users-reducer";
import {
    getUsers,
    getIsFetching,
    totalUsersCount,
    getFollowingInProgress,
    getCurrentPage,
} from "../../redux/selectors/Users-reducer";
import Preloader from './../../components/Preloader'
import Paginator from './../../components/Pagination'
import {compose} from "redux";

const Users = (props) => {
    useEffect(() => {
        props.requestUsers();
        props.setCurrentPage(1)
    }, []);

    const onPageChanged = (currentPage) => {
        props.requestUsers(currentPage);
    }

    return (
        <div>
            {props.isFetching ? <Preloader/> : null}
            <Paginator totalItemsCount={props.totalUsersCount} onPageChanged={onPageChanged} pageSize={12}
                       currentPage={props.currentPage} portionSize={10}/>
            <div className="row">
                {
                    props.Users.map(user => <div className='col-sm-3 col-lg-3 col-md-3 book-list'
                                                 key={user.id}>
                        <div className="thumbnail">
                            <div className="card">
                                <img src={user.photos.small != null ? user.photos.small : userPhoto}
                                     className="img-thumbnail card-img-top" alt="Фотография"/>
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <p className='itemButton'>
                                        <div>
                                            {user.followed
                                                ? <button className="btn btn-primary"
                                                          disabled={props.followingInProgress
                                                              .some(id => id === user.id)}
                                                          onClick={() => {
                                                              props.unfollow(user.id)
                                                          }}>
                                                    Удалить</button>
                                                : <button className="btn btn-primary"
                                                          disabled={props.followingInProgress.some(id => id === user.id)}
                                                          onClick={() => {
                                                              props.follow(user.id)
                                                          }}>
                                                    Добавить</button>}
                                            <NavLink to={`/profile/${user.id}`}
                                                     className="btn btn-success">Открыть</NavLink>
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}


let mapStateToProps = (state) => {
    return (
        {
            Users: getUsers(state),
            isFetching: getIsFetching(state),
            totalUsersCount: totalUsersCount(state),
            followingInProgress: getFollowingInProgress(state),
            currentPage: getCurrentPage(state)
        }
    )
}

export default compose(
    connect(mapStateToProps, {requestUsers, follow, unfollow, setCurrentPage}),
    withRouter
)(Users);