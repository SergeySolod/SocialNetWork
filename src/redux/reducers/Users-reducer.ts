import {UsersAPI} from '../../api/Api';
import {UserType} from "../../types/types";

const SET_USERS = 'my-app/users-reducer/SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING_USERS = 'my-app/users-reducer/TOGGLE_IS_FETCHING_USERS';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'my-app/users-reducer/TOGGLE_IS_FOLLOWING_PROGRESS';
const SET_TOTAL_USERS_COUNT = 'my-app/users-reducer/SET_TOTAL_USERS_COUNT';
const FOLLOW = 'my-app/users-reducer/FOLLOW'
const UNFOLLOW = 'my-app/users-reducer/UNFOLLOW'

let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 10,
    isFetching: true,
    currentPage: 1,
    followingInProgress: [] as Array<number>, //array of users ids
}

type InitialState = typeof initialState

const UsersReducer = (state = initialState, action: any): InitialState => {
    switch (action.type) {
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case TOGGLE_IS_FETCHING_USERS: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        default:
            return state;
    }
}

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING_USERS
    isFetching: boolean
}
const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING_USERS,
    isFetching
});
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
});
type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId});
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId});
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

export const requestUsers = (page: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        let data = await UsersAPI.getUsers(page);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount))
    }
}

export const follow = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId));
        let response = await UsersAPI.follow(userId)
        if (response.data.resultCode === 0) {
            dispatch(followSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    }
}
export const unfollow = (userId: number) => {
    return async (dispatch: any) => {
        dispatch(toggleFollowingProgress(true, userId));
        let response = await UsersAPI.unfollow(userId)
        if (response.data.resultCode === 0) {
            dispatch(unfollowSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    }
}

export default UsersReducer