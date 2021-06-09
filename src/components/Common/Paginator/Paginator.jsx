import React from 'react';
import s from './Paginator.module.css';

const Paginator = (props) => {
    
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);   // таким образом получаем постраничное деление, Math.ceil - округление до большего числа в любом случае
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    };

    return (
        <div className={s.pagination}>
            {pages.map(p => {
                return <span 
                    className={props.currentPage === p && s.selectedPage}
                    onClick={ (e) => {props.onPageChanged(p)} }>{p}</span>    // если выбраная страничка, то добавит стиль
            })};
        </div>
    );
};

export default Paginator;
