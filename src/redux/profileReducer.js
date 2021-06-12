import { usersAPI } from '../api/api';
import { profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';

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

export default profileReducer;
