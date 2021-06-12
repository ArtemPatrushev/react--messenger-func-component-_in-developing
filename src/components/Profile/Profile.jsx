import MyPostsContainer from './My_posts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatusThC={props.updateStatusThC} />
            <MyPostsContainer />
        </div>
    );
};

export default Profile;
