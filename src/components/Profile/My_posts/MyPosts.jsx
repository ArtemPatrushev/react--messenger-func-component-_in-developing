import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../Common/FormsControls/FormsControls';
import Post from './Post/Post';

import s from './MyPosts.module.css';

const maxLength10 = maxLengthCreator(10);

const AddPostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.post_form}>
                <Field className={s.textarea} component={Textarea} name={'newPostBody'} placeholder={'Your news'} validate={[required, maxLength10]} />
            <button className={s.postButton}>Add post</button>
        </form>
    );
};

const PostReduxForm = reduxForm({
    form: 'profileAddPostForm'
})(AddPostsForm);


const MyPosts = React.memo((props) => {
    let postsElements = props.posts.map((p) => {
        return <Post key={p.id} message={p.message} likeCount={p.likeCount} />
    });

    let addNewPost = (values) => {
        props.addPost(values.newPostBody);
    };

    return <div className={s.user_posts}>
        <p className={s.user_posts_header}>My posts</p>
        <PostReduxForm onSubmit={addNewPost} />
        {postsElements}
    </div>
});

export default MyPosts;
