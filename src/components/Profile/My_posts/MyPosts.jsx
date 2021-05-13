import React from 'react';
import { Field, reduxForm } from 'redux-form';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const AddPostsForm = (props) => {
    return (
    <form onSubmit={props.handleSubmit}>
        <Field component={'textarea'} name={'newPostBody'} placeholder={'Your news'} />
        <button>Add post</button>
    </form>
    )
}

const PostReduxForm = reduxForm({
    // каждая форма должна иметь уникальное строковое имя
    form: 'profileAddPostForm'
    // передаем форму, которую необходимо обернуть
})(AddPostsForm);



const MyPosts = (props) => {

    let postsElements = props.posts.map((p) => {
        return <Post message={p.message} likeCount={p.likeCount} />
    });

    let addNewPost = (values) => {
        // console.log(values.newPostBody);
        props.addPost(values.newPostBody);
    }

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
}

export default MyPosts;