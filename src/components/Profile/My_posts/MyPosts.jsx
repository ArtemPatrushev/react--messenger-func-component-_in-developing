import React from 'react';
import { Field, reduxForm } from 'redux-form';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../Common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10)

const AddPostsForm = (props) => {
    return (
    <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={'newPostBody'} placeholder={'Your news'} validate={[required, maxLength10]} />
        <button>Add post</button>
    </form>
    )
}

const PostReduxForm = reduxForm({
    // каждая форма должна иметь уникальное строковое имя
    form: 'profileAddPostForm'
    // передаем форму, которую необходимо обернуть
})(AddPostsForm);


// Данная компонента часто перерисовывается, т.к. является частью Profile и там рендерится (потому что в Profile часто приходят новые пропсы и он сам перерендреривается)
// чтобы оптимизировать работу данной компоненты мы используем shouldComponentUpdate или PureComponent для class (предотвратить перерендер, если не пришли новые пропсы)
// для func - React.memo (HOC)
const MyPosts = React.memo((props) => {
    console.log('RENDER');
    let postsElements = props.posts.map((p) => {
        return <Post message={p.message} likeCount={p.likeCount} />
    });

    let addNewPost = (values) => {
        // console.log(values.newPostBody);
        props.addPost(values.newPostBody);
    }

// убрать перерисовку для class component
    // shouldComponentUpdate(nextProps, nextState) {
    //     // рендер сработает, если nextProps отличается от this.props
    //     return nextProps !== this.props || nextState !== this.state;
    // }

    // let newPostElement = React.createRef();

    // let onAddPostClick = (formData) => {
    //     props.addPost(formData);
    // }

    // let onPostChange = () => {
    //     let newText = newPostElement.current.value;
    //     props.updateNewPostText(newText);
    // };

    return <div className={s.user_posts}>
        <p className={s.user_posts_header}>My posts</p>
        <PostReduxForm onSubmit={addNewPost} />
        {/* <textarea 
            placeholder='Your news' 
            ref={newPostElement}
            value={props.newPostText}
            onChange={onPostChange} />
        <div className={s.user_posts_btn} onClick={addNewPost}>
            Add post
            </div> */}
        {postsElements}
    </div>
});

export default MyPosts;