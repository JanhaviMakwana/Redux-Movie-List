import React from 'react';
import { withRouter } from 'react-router-dom';
import Movie from '../Movie/Movie';
import styles from './Movies.module.css';

class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            movie: null
        }
    }

    movieSelectedHandler = (movie) => {
        this.setState({ clicked: true, movie: movie })
        this.props.history.push({
            pathname: '/movies/' + movie.id,
            state: { movie: movie }
        });
        console.log(this.state.movie);
    }

    render() {
        console.log(this.props.data.results);
        const data = this.props.data.results
        let movies = <p>Loading ...</p>
        if (data && !this.state.clicked) {
            movies = data.map(movie => {

                return <Movie
                    title={movie.title}
                    description={movie.overview}
                    rating={movie.vote_average}
                    id={movie.id}
                    posterImage={movie.poster_path}
                    clicked={() => this.movieSelectedHandler(movie)}
                />
            });
        }
        return (
            <div className={styles["Movies"]}>
                { movies}
                {/*  <Movie title='udfgirgdsirgdsi' description='erbfkjrbfkjdrkfdbfkrbfkjbkvdfkvkjdvfvkjdvsfkvkfds' rating='7' id='1' posterImg='147.jpg' />
                <Movie title='udfgirgdsirgdsi' description='erbfkjrbfkjdrkfdbfkrbfkjbkvdfkvkjdvfvkjdvsfkvkfds' rating='7' id='2' posterImg='188.jpg' />
                <Movie title='udfgirgdsirgdsi' description='erbfkjrbfkjdrkfdbfkrbfkjbkvdfkvkjdvfvkjdvsfkvkfds' rating='7' id='3' posterImg='280.jpg' />
                <Movie title='udfgirgdsirgdsi' description='erbfkjrbfkjdrkfdbfkrbfkjbkvdfkvkjdvfvkjdvsfkvkfds' rating='7' id='4' posterImg='542.jpg' />
                <Movie title='udfgirgdsirgdsi' description='erbfkjrbfkjdrkfdbfkrbfkjbkvdfkvkjdvfvkjdvsfkvkfds' rating='7' id='5' posterImg='690.jpg' />
                <Movie title='udfgirgdsirgdsi' description='erbfkjrbfkjdrkfdbfkrbfkjbkvdfkvkjdvfvkjdvsfkvkfds' rating='7' id='6' posterImg='809.jpg' />
                <Movie title='udfgirgdsirgdsi' description='erbfkjrbfkjdrkfdbfkrbfkjbkvdfkvkjdvfvkjdvsfkvkfds' rating='7' id='7' posterImg='832.jpg' />
                <Movie title='udfgirgdsirgdsi' description='erbfkjrbfkjdrkfdbfkrbfkjbkvdfkvkjdvfvkjdvsfkvkfds' rating='7' id='8' posterImg='912.jpg' />
                <Movie title='udfgirgdsirgdsi' description='erbfkjrbfkjdrkfdbfkrbfkjbkvdfkvkjdvfvkjdvsfkvkfds' rating='7' id='9' posterImg='1220.jpg' /> */}
            </div>
        );
    }


}
export default withRouter(Movies)