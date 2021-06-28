import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'bfde39ec-0342-476f-8e4a-fc0500a9ecc7'
    }
});

export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },

    followUser(userId) {
        return instance.post(`follow/${userId}`, {})
            .then(response => {
                return response.data.resultCode;
            });
    },

    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data.resultCode;
            });
    },

    getUserProfile(userId) {
        console.warn('Obsolete method. Please use profileAPI object');
        return profileAPI.getUserProfile(userId);
    }
};


export const profileAPI = {

    getUserProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            });
    },

    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },

    updateStatus(status) {
        return instance.put(`profile/status`, {status: status});
    },

    savePhoto(file) {
        // константа formData нужна для отправки файла на сервер
        const formData = new FormData();
        // добавляем файл со свойством image
        formData.append('image', file);
        return instance.put('profile/photo', formData, {
            // в headers указываем Content-Type
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    saveProfile(profileData) {
        return instance.put(`profile`, profileData);
    }
};


export const authAPI = {
    getMe() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            });
    },

    login(email, password, rememberMe=false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then(response => {
                return response.data;
            });
    },

    logout() {
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data;
            });
    },
};
