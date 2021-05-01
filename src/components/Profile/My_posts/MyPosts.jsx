import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {

    let postsElements = props.posts.map((p) => {
        return <Post message={p.message} likeCount={p.likeCount} />
    });

    let newPostElement = React.createRef();

    let onAddPostClick = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let newText = newPostElement.current.value;
        props.updateNewPostText(newText);
    };

    return <div className={s.user_posts}>
        <p className={s.user_posts_header}>My posts</p>
        <textarea 
            placeholder='Your news' 
            ref={newPostElement}
            value={props.newPostText}
            onChange={onPostChange} />
        <div className={s.user_posts_btn} onClick={onAddPostClick}>
            Add post
            </div>
        {postsElements}
    </div>
}

export default MyPosts;