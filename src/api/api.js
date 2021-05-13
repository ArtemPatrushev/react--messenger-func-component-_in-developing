import axios from 'axios';

// настраиваем axios.create, чтобы код при запросах на API не повторялся --- используем тепреь везде вместе всего этого просто instance
const instance = axios.create({
    withCredentials: true,                                      //   withCredentials: true --- необходимо отправлять запрос за пользователями от себя, как авторизованного пользователя, чтобы система понимала, на кого подписан, а на кого нет
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'bfde39ec-0342-476f-8e4a-fc0500a9ecc7'
    }
});

export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)    // в get запрос на API на получение пользователей добавляем параметры - страница по умолчанию, количество пользователей, отобрадаемых за раз
            .then(response => {
                return response.data
            });   // здесь берем из response только data, чтобы не передавать лишней информации
    },

    followUser(userId) {
        return instance.post(`follow/${userId}`, {})           // в запросе post объект с настройками передается 3 параметром ({withCredentials: true}) --- 2 параметром передаем пустой объект {}, тк 2 параметр нам не нужен
            .then(response => {
                return response.data.resultCode
            });
    },

    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data.resultCode
            });
    },

    // setAuthUserDataInfo() {
    //     return instance.get(`auth/me`)
    //         .then(response => {
    //             return response.data
    //         });
    // },

    // getProfilePhoto() {
    //     return instance.get(`profile/2`)
    //         .then(response => {
    //             return response.data.photos.small
    //         });
    // },

    getUserProfile(userId) {
        // так делается при постепенном рефакторинге кода - оставляем старый, добавляем предупреждение и перенаправляем в новую
        console.warn('Obsolete method. Please use profileAPI object');
        return profileAPI.getUserProfile(userId);
    }
}


export const profileAPI = {

    getUserProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data
            });
    },

    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },

    updateStatus(status) {
        // здесь userId не передается, тк обновлять чужой статус запрещено и так, а данные пользователя будут браться из cookie
        // передаем адрес status + воторым параметром объект с данными
        return instance.put(`profile/status`, {status: status});
    },


}


export const authAPI = {
    getMe() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data
            });
    },

    

    // getProfilePhoto(userId) {
    //     return instance.get(`profile/${userId}`)
    //         .then(response => {
    //             return response.data.photos.small
    //         });
    // },
}