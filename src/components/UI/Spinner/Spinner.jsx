import React from 'react';
import styles from './Spinner.module.css';

const Spinner = () => {
    return (
        <div className={styles.lds__facebook}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default Spinner;