import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return <div>
        <img className={s.top_img} src='http://cdn.cnn.com/cnnnext/dam/assets/181010131059-australia-best-beaches-cossies-beach-cocos3.jpg' alt='img' />
        <div className={s.user}>
            <img className={s.user_photo} src='https://tractive.com/static/images/menu/tractive-dog-lte-dog-with-lte-tracker.jpg' alt='img' />
            <div className={s.user_info}>
                <p>Dmitry K.</p>
                <div className={s.user_info_text}>
                    <p>Date of birth:</p>
                    <p>City:</p>
                    <p>Education:</p>
                    <p>Web-site:</p>
                </div>
            </div>
        </div>
    </div>
}

export default ProfileInfo;