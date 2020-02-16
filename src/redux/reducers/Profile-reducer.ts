import {ProfileAPI} from '../../api/Api';
import {stopSubmit} from 'redux-form'
import {PhotosType, PostType, ProfileType} from "../../types/types";

const SET_PROFILE = 'my-app/Profile-reducer/SET_PROFILE';
const SET_STATUS = 'my-app/Profile-reducer/SET_STATUS';
const ADD_POST = 'my-app/Profile-reducer/ADD_POST';
const SAVE_PHOTO_SUCCESS = 'my-app/Profile-reducer/SAVE_PHOTO_SUCCESS';

let initialState = {
    Profile: null as ProfileType | null,
    ProfilePosts: [
        {
            id: 1,
            header: 'Утренний пост',
            message: 'Сегодня утром у меня был вкусный завтрак, потом лежание в кровати и игра с собакой... Сегодня же выходной!'
        },
        {
            id: 2,
            header: 'Дневной пост',
            message: 'Но потом мне стало понятно, что всё это бесполезная трата времени и пришлось сесть за работу.'
        },
        {
            id: 3,
            header: 'Вечерний пост',
            message: 'Работа кипит, я - как Илон Маск, работаю, работаю, работаю, скоро достигну рубежа в 100 часов в неделю!'
        },
        {
            id: 4,
            header: 'Ночной пост',
            message: 'Сон для слабаков, работа - для классных ребят, так даже говорил Конфуций, а ему можно доверять.'
        }
    ] as Array<PostType>,
    status: '',
    newPostText: ''
}

export type InitialStateType = typeof initialState


const ProfileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                header: "Ещё один пост",
                message: action.newPostText,
            };
            return {
                ...state, ProfilePosts: [...state.ProfilePosts, newPost],
                newPostText: ''
            };
        }
        case SET_PROFILE: {
            return {...state, Profile: action.Profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SAVE_PHOTO_SUCCESS:
            return {...state, Profile: {...state.Profile, photos: action.photos} as ProfileType}
        default:
            return state;
    }
}

type setProfileCreatorActionType = {
    type: typeof SET_PROFILE,
    Profile: ProfileType
    }
const setProfile = (Profile: ProfileType): setProfileCreatorActionType => ({type: SET_PROFILE, Profile});
type addPostActionCreatorActionType = {
    type: typeof ADD_POST,
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): addPostActionCreatorActionType => ({type: ADD_POST, newPostText})
type setStatusActionCreatorActionType = {
    type: typeof SET_STATUS,
    status: string
}
const setStatus = (status: string): setStatusActionCreatorActionType => ({type: SET_STATUS, status});
type savePhotoSuccessActionCreatorActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType):savePhotoSuccessActionCreatorActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

export const requestProfile = (userId: number) => {
    return async (dispatch: any) => {
        let data = await ProfileAPI.getProfile(userId);
        dispatch(setProfile(data));
    }
}

export const requestStatus = (userId: number) => {
    return async (dispatch: any) => {
        let data = await ProfileAPI.getStatus(userId);
        dispatch(setStatus(data));
    }
}

export const updateStatus = (status: string) => {
    return async (dispatch: any) => {
        let data = await ProfileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await ProfileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().Auth.id
    const response = await ProfileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(requestProfile(userId));
    }
    else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0])
    }

}

export default ProfileReducer