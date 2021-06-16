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
        <button className={s.postButton}>Add post</button>
    </form>
    )
}

const PostReduxForm = reduxForm({
    form: 'profileAddPostForm'
})(AddPostsForm);


const MyPosts = React.memo((props) => {
    console.log('RENDER');
    let postsElements = props.posts.map((p) => {
        return <Post message={p.message} likeCount={p.likeCount} />
    });

    let addNewPost = (values) => {
        props.addPost(values.newPostBody);
    }

    return <div className={s.user_posts}>
        <p className={s.user_posts_header}>My posts</p>
        <PostReduxForm onSubmit={addNewPost} />
        {postsElements}
    </div>
});

export default MyPosts;
