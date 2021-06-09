import profileReducer, { addPost, deletePost } from './profileReducer';

// 1. входные данные
let state = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likeCount: 15 },
        { id: 2, message: "it's all good", likeCount: 12 },
        { id: 3, message: "bla-bla", likeCount: 5 },
        { id: 4, message: "da-da", likeCount: 7 }
    ]
};

// оборачиваем тест в test, чтобы реакт понимал, что это тест
it('length jf posts should bs incremented', () => {
    let action = addPost('good');

    // 2. action
    let newState = profileReducer(state, action);

    // 3. проверяем ожидаемый результат
    expect(newState.posts.length).toBe(5);
});

it('message of new post shold bs correct', () => {
    let action = addPost('good');

    // 2. action
    let newState = profileReducer(state, action);

    // 3. проверяем ожидаемый результат
    expect(newState.posts[4].message).toBe('good');
});

it('after deleting length jf message should be decrement', () => {
    let action = deletePost(1);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. проверяем ожидаемый результат
    // expect(newState.posts.length).toBe(3);
});
