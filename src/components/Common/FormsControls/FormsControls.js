import React from 'react';
import s from './FormsControls.module.css';

// логика в FormControl - остальное по образцу
const FormControl = ({ input, meta, child, ...props }) => {

    // данные из meta - если input был тронут и есть ошибка (true) --- надо показать ошибку
    const hasError = meta.touched && meta.error;

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div className={s.textField}>
                {props.children}
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    );
};

export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
};

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
};

// ТАК БЫЛО - разрабатывали логику отдельно для каждого элемента --- дублирование кода
// export const Textarea = ({input, meta, ...props}) => {

//     // данные из meta - если input был тронут и есть ошибка (true) --- надо показать ошибку
//     const hasError = meta.touched && meta.error;

//     return (
//         <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
//             <div className={s.textField}>
//                 <textarea {...input} {...props} />
//                 {hasError && <span>{meta.error}</span>}
//             </div>
//         </div>
//     )
// }
// //meta.error - здесь находится текст ошибки
// //{input, meta, ...props} - в пропсах приходят разные свойства (input, meta и остальное) - мы отдельно берем input и meta, а остальное передаем в пропс

// export const Input = ({ input, meta, ...props }) => {

//     // данные из meta - если input был тронут и есть ошибка (true) --- надо показать ошибку
//     const hasError = meta.touched && meta.error;

//     return (
//         <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
//             <div className={s.textField}>
//                 <input {...input} {...props} />
//                 {hasError && <span>{meta.error}</span>}
//             </div>
//         </div>
//     )
// }
