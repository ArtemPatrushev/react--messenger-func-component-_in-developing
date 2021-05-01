import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import { addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/profileReducer';     // импортировали actionCreater функции из state

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        updateNewPostText: (newText) => {
            let action = updateNewPostTextActionCreator(newText);
            dispatch(action);
        }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;