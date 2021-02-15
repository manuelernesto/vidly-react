import React, {Component} from "react";
import {deleteMovie, getMovies} from "../services/fakeMovieService";

class Movies extends Component {
    state = {
        movies: getMovies()
    };

    handleDelete = movie => {
        this.setState(
            deleteMovie(movie)
        );
    };

    render() {
        return (
            <React.Fragment>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.movies.map(movie => (
                        <tr>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
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
