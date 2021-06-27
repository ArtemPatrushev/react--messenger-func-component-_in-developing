import { stopSubmit } from 'redux-form';
import { usersAPI } from '../api/api';
import { profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likeCount: 15 },
        { id: 2, message: "it's all good", likeCount: 12 },
        { id: 3, message: "bla-bla", likeCount: 5 },
        { id: 4, message: "da-da", likeCount: 7 }
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = action.newPostBody;
            return {
                ...state,
                posts: [...state.posts, { id: 5, message: newPost, likeCount: 0 }],
                newPostText: ''
            };
        };
        case SET_USER_PROFILE: {
            return {
                ...state, 
                profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                // копируем profile, который был из state, но в photos вставляем новые фото из action
                profile: {...state.profile, photos: action.photos}
            };
        }
        default:
            return state;
    };
};

export const addPost = (newPostBody) => {
    return {
        type: ADD_POST,
        newPostBody
    };
};

export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    };
};

export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    };
};

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    };
};

export const savePhotoSuccess = (photos) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    };
};

export const getUserProfileThunkCreator = (userId) => {
    return (dispatch) => {
        usersAPI.getUserProfile(userId)
            .then(data => {
                dispatch(setUserProfile(data));
            });
    };
};

export const getStatusThC = (status) => {
    return (dispatch) => {
        profileAPI.getStatus(status)
            .then(response => {
                dispatch(setStatus(response.data));
            });
    };
};

export const updateStatusThC = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status));
                };
            });
    };
};

export const savePhotoThC = (file) => {
    // получили фото
    return (dispatch) => {
        // отправляем его на api
        profileAPI.savePhoto(file)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(savePhotoSuccess(response.data.data.photos));
                };
            });
    };
};

// export const saveProfileThC = (profileData) => {
//     // получили фото
//     return (dispatch, getState) => {
//         const userId = getState().auth.id;
//         // отправляем его на api
//         profileAPI.saveProfile(profileData)
//             .then(response => {
//                 if (response.data.resultCode === 0) {
//                     // после добавления информации через инпуты, вызываем обббновленный профиль, чтобы его отобразить
//                     dispatch(getUserProfileThunkCreator(userId));
//                 } else {
//                     dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] } /*{'contacts': {'facebook': response.data.messages[0]}}*/));
//                     // для ошибки
//                     debugger
//                     return Promise.reject(response.data.messages[0]);
//                 }
//             });
//     };
// };

export const saveProfileThC = (profileData) => async (dispatch, getState) => {
        const userId = getState().auth.id;
        const response = await profileAPI.saveProfile(profileData);

        if (response.data.resultCode === 0) {
            dispatch(getUserProfileThunkCreator(userId));
        } else {
            dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] } /*{'contacts': {'facebook': response.data.messages[0]}}*/));
            return Promise.reject(response.data.messages[0]);
        }
};

export default profileReducer;
