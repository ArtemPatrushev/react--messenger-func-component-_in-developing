const ADD_MESSAGE = 'ADD-MESSAGE';
// const INSERT_NEW_MESSAGE_TEXT = 'INSERT-NEW-MESSAGE-TEXT';

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

    // данная запись newSuperStateCopy равна двум записям: let stateCopy = {...state}; stateCopy.messages = [...state.messages];
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = action.newMessageBody;
            // здесь делаеи как бы копию стейта и при помощи spread добавляем инфонрмацию
            return {  
                ...state,
                messages: [...state.messages, { id: 6, message: newMessage }],  // {id: 6, message: newMessage} добавили здесь через запятую вместо того чтобы прописывать снизу отдельно stateCopy.messages.push({id: 6, message: newMessage});
                // если надо добавить элементы в начало то просто это же выражение ставим перед ...state.messages
            };
            // stateCopy.messages.push({id: 6, message: newMessage});
        }
        // case INSERT_NEW_MESSAGE_TEXT:
        //     return {
        //         ...state,
        //         newMessageText: action.newText    // чтобы не делать запись отдельно ниже, можно задать прям здесь значение для newMessageText
        //     };
        //     // stateCopy.newMessageText = action.newText;
        default:
            return state;
    }
}

export const addMessage = (newMessageBody) => {
    return {
        type: ADD_MESSAGE,
        newMessageBody
    }
}

// export const insertNewMessageText = (newText) => {
//     return {
//         type: INSERT_NEW_MESSAGE_TEXT,
//         newText: newText
//     }
// }

export default dialogsReducer;