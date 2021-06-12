import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import { addPost } from '../../../redux/profileReducer';

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
};

const MyPostsContainer = connect(mapStateToProps, {
    addPost
})(MyPosts);

export default MyPostsContainer;
