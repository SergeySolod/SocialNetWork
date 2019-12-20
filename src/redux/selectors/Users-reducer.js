export const getUsers = (state) => {
    return state.Users.users
}

export const getIsFetching = (state) => {
    return state.Users.isFetching
}

export const totalUsersCount = (state) => {
    return state.Users.totalUsersCount
}

export const getFollowingInProgress = (state) => {
    return state.Users.followingInProgress;
}

export const getCurrentPage = (state) => {
    return state.Users.currentPage;
}
