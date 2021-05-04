import Preloader from '../../Common/Preloader/Preloader';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader />
    }

    return <div>
        <img className={s.top_img} src='http://cdn.cnn.com/cnnnext/dam/assets/181010131059-australia-best-beaches-cossies-beach-cocos3.jpg' alt='img' />
        <div className={s.user}>
            <img className={s.user_photo} src={props.profile.photos.small} alt='img' />
            <div className={s.user_info}>
                <p>{props.profile.fullName}</p>
                <div className={s.user_info_text}>
                    <p>Date of birth:</p>
                    <p>City:</p>
                    <p>Education:</p>
                    <p>Web-site: {props.profile.contacts.vk}</p>
                </div>
            </div>
        </div>
    </div>
}

export default ProfileInfo;