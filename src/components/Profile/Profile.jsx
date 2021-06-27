import MyPostsContainer from './My_posts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {

    return (
        <div>
            <ProfileInfo 
                isOwner={props.isOwner}
                profile={props.profile} 
                status={props.status} 
                updateStatusThC={props.updateStatusThC}
                savePhotoThC={props.savePhotoThC}
                saveProfileThC={props.saveProfileThC} />
            <MyPostsContainer />
        </div>
    );
};

export default Profile;
