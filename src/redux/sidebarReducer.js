let initialState = {
    sidebarMenu: [
        { name: 'Profile', path: '/profile' },
        { name: 'Messages', path: '/dialogs' },
        { name: 'Users', path: '/users' },
        { name: 'News', path: '/news' },
        { name: 'Music', path: '/music' },
        { name: 'Settings', path: '/settings' }
    ],
    sidebarFriends: [
        { name: 'Andrew', photo: 'https://lh3.googleusercontent.com/proxy/Rx6hB1sk3kNHYLVRc3kt6iSvL9rLvV-gcRNvzznsOx3e51uN4hNKoO1V8k45mo12z8TTAqr7T6fXr4_f3pvhx-pDJS0SCAs5u4nOzI3WdYYqPF88Ms_8iHKyu4za-iTFoa8OETUDGsAJZujcGahPUt7ofgiYHu22_rE4zfoRLlGokELjwAk9dKT2V_Q' },
        { name: 'Sveta', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8VsGzl_ZOajsj5KaZpbvzW2bYtf-UZ3mo0A&usqp=CAU' },
        { name: 'Sasha', photo: 'https://image.freepik.com/free-photo/surikat-stands-in-alert-pose_174343-479.jpg' }
    ]
}

const sidebarReducer = (state = initialState, action) => {

    return state;
}

export default sidebarReducer;