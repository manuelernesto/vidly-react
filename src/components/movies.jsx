import React, {Component} from "react";
import {deleteMovie, getMovies} from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate";

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 3,
        currentPage: 1
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

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    render() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage, movies: allMovies} = this.state

        if (count === 0)
            return <p className="alert alert-info">There are no movie in the database</p>

        const movies = paginate(allMovies, currentPage, pageSize);

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
                    {movies.map(movie => (
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

                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}/>

            </React.Fragment>
        );
    }
}

export default Movies;
