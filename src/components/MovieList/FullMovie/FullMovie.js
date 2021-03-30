import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './FullMovie.module.css';
class FullMovie extends React.Component {
    onCancleHandler = () => {

        this.props.history.push({ pathname: '/movies' })
    }
    render() {
        console.log(this.props.match.params.id);
        const state = this.props.location.state.movie;
        return (
            <div className={styles["FullMovie"]}>
                <button className={styles["Button-Back"]} onClick={this.props.history.goBack}>BACK</button>
                <div className={styles["MovieData"]}>
                    <p className={styles["Title"]}>{state.title}</p>
                    <p className={styles["Desc"]}>{state.overview}</p>
                    <p className={styles["Rating"]}>{state.vote_average}</p>
                    <img
                        className={styles["Image"]}
                        src={'https://image.tmdb.org/t/p/w500/' + state.poster_path}
                        /* src={pic} */
                        alt='state.title' />
                </div>

            </div>
        );
    }

}

export default withRouter(FullMovie);