import React from 'react';
import preloader from '../../../assets/images/preloader.svg';

let Preloader = () => {
    return (
        <div style={{ width: '150px', height: '150px', alignSelf: 'center' }}>
            <img src={preloader} alt='img' />
        </div>
    );
};

export default Preloader;
