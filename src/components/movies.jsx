import React, {Component} from "react";
import {deleteMovie, getMovies} from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
    state = {
        movies: getMovies()
    };

    handleDelete = movie => {
        this.setState(
            deleteMovie(movie)
        );
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);

        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;

        this.setState({movies})
    };

    render() {
        const {length: count} = this.state.movies;

        if (count === 0)
            return <p className="alert alert-info">There are no movie in the database</p>

        return (
            <React.Fragment>
                <p>Showing {count} in the database</p>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th/>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.movies.map(movie => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <Like liked={movie.liked} onClick={() => this.handleLike(movie)}/>
                            </td>
                            <td>
                                <button className="btn btn-danger btn-sm"
                                        onClick={() => this.handleDelete(movie._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default Movies;
