import React from 'react';
import styles from './Movie.module.css';

const movie = (props) => {
    /* const pic = require(`../../../Images/${props.posterImg}`).default; */
    return (
        <div className={styles["Movie"]} onClick={props.clicked}>
            <p className={styles["Title"]}>{props.title}</p>
            {/*             <h2 className={styles["Desc"]}>{props.description}</h2> */}
            <p className={styles["Rating"]}>Rating : {props.rating}</p>
            <img
                className={styles["Image"]}
                src={'https://image.tmdb.org/t/p/w500/' + props.posterImage}
                /* src={pic} */
                alt='props.title' />
        </div>
    );
}

export default movie;