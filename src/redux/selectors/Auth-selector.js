export const getLogin = (state) => {
    return state.Auth.login
}

export const getAuth = (state) => {
    return state.Auth.isAuth
}

export const getuserId = (state) => {
    return state.Auth.id
}

export const reqCaptchaUrl = (state) => {
    return state.Auth.captchaUrl
}