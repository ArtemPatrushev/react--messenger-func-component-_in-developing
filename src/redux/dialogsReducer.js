const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, name: 'Dmitry' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Victor' },
        { id: 6, name: 'Valera' }
    ],
    messages: [
        { id: 1, message: 'Hi, how are you?' },
        { id: 2, message: 'How is your dog' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' }
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = action.newMessageBody;
            return {  
                ...state,
                messages: [...state.messages, { id: 6, message: newMessage }],
            };
        };
        default:
            return state;
    };
};

export const addMessage = (newMessageBody) => {
    return {
        type: ADD_MESSAGE,
        newMessageBody
    };
};

export default dialogsReducer;
