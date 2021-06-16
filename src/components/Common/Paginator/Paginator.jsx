import React, { useState } from 'react';
// import { getCurrentPage } from '../../../redux/usersSelectors';
import s from './Paginator.module.css';
import cn from 'classnames';

const Paginator = (props) => {
    
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);   // таким образом получаем постраничное деление, Math.ceil - округление до большего числа в любом случае
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    };

    let portionCount = Math.ceil(pagesCount / props.portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;

    return (
        <div className={s.pagination}>
            { portionNumber > 1 && 
            <button className={s.paginatorButton} onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button> } 
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <span className={ cn({
                        [s.selectedPage] : props.currentPage === p
                    }, s.pageNumber) }
                            key={p}
                            onClick={(e) => {
                                props.onPageChanged(p);
                            }}>{p}</span>
                })
            }
            {portionCount > portionNumber && 
                <button className={s.paginatorButton} onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>NEXT</button>  
            }
        </div>
    );

    // return (
    //     <div className={s.pagination}>
    //         {pages.map(p => {
    //             return <span 
    //                 className={props.currentPage === p && s.selectedPage}
    //                 onClick={ (e) => {props.onPageChanged(p)} }>{p}</span>    // если выбраная страничка, то добавит стиль
    //         })};
    //     </div>
    // );
};

export default Paginator;
