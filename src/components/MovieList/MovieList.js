import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import MovieGenres from '../MovieGenres/MovieGenres.json';
import * as actions from '../../store/action/Auth';
import Movies from '../MovieList/Movies/Movies';
import './MovieList.css';

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            genres: [],
            loading: true
        }
    }

    componentDidMount() {
        this.setState({ genres: MovieGenres, loading: false })
    }

    searchMoviesHandler = (id) => {
        const url = 'https://api.themoviedb.org/3/discover/movie?api_key=4331524a85d4ae56b88edc6029b6cb34&language=en-US&with_genres=' + id;
        axios.get(url)
            .then(response => {
                // const movies = response.data.genre.slice(0, 5)
                this.setState({ movies: response.data })
                this.props.onGenreSelect(response.data)
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }


    render() {
        let movieList = null;
        let movies = null;
        if (this.props.email && !this.props.loading) {
            const genres = this.state.genres;
            movieList = genres.map(genre => {
                return <li id="btn" onClick={() => this.searchMoviesHandler(genre.id)}>{genre.name}</li>
                {/* <button id="btn" onClick={() => this.searchMoviesHandler(genre.id)}>{genre.name}</button> */ }
            })

        } else {
            movieList = <p>Login Please !!</p>
        }

        if (this.props.movies) {
            movies = <Movies data={this.props.movies} />
        }
        return (
            <div className="MovieList">
                <ul>
                    {movieList}
                </ul>

                {movies}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        email: state.auth.email,
        movies: state.auth.movies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGenreSelect: (movies) => dispatch(actions.selectGenre(movies))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieList);