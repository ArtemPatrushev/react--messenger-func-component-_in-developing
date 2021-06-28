import like from '../../../../assets/images/heart-solid.svg';

import s from './Post.module.css';

const Post = (props) => {
    return  (
        <div className={s.user_post_item}>
            <div className={s.user_post_content}>
                <div></div>
                {props.message}
            </div>
            <div className={s.user_likes}>
                <img className={s.like_img} src={like} alt="svg" />
                {props.likeCount}
            </div>
        </div>
    );
};

export default Post;
