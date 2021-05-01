import MyPostsContainer from './My_posts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = () => {

   // здесь больше не отрисовываем MyPosts, а отрисовываем MyPostsContainer, который уже в себе отрисовывает MyPosts.
   // также MyPostsContainer теперь отдаем весь store, тк это контейнер и он модет быть грязным, чтобы нам не заботиться о том, что ему тут передавать

    return <div>
        <ProfileInfo />
        <MyPostsContainer />
    </div>
}

export default Profile;