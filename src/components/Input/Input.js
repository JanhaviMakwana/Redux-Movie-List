import React from 'react';
import styles from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    const inputClasses = [styles["InputElement"]];

    if (!props.valid && props.touched) {
        inputClasses.push(styles["Invalid"]);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
            break;
        default:
            break;
    }

    return (
        <div className={styles["Input"]}>
            <label className={styles["Label"]}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;