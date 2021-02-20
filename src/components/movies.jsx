import React, {Component} from "react";
import {deleteMovie, getMovies} from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import {paginate} from "../utils/paginate";
import ListGroup from "./common/listGroup";
import {getGenres} from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 3,
        currentPage: 1,
        sortColumn: {path: 'title', order: 'asc'}
    };

    componentDidMount() {
        const genres = [{_id: "", name: "All genres"}, ...getGenres()];
        this.setState(
            {movies: getMovies(), genres}
        );
    };

    handleGenreSelect = genre => {
        this.setState({selectedGenre: genre, currentPage: 1})
    };

    handleDelete = movie => {
        this.setState(
            deleteMovie(movie._id)
        );
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);

        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;

        this.setState({movies})
    };

    handleSort = (path) => {
        const sortColumn = {...this.state.sortColumn};
        if (sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.setState({
            sortColumn
        });
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };

    render() {
        const {length: count} = this.state.movies;
        const {pageSize, currentPage, selectedGenre, sortColumn, movies: allMovies, genres} = this.state

        if (count === 0)
            return <p className="alert alert-info">There are no movie in the database</p>

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) :
            allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return (
            <div className="row">

                <div className="col-2">
                    <ListGroup
                        items={genres}
                        selectedItem={selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>

                <div className="col">
                    <p>Showing {filtered.length} in the database</p>

                    <MoviesTable
                        onSort={this.handleSort}
                        movies={movies}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}/>

                    <Pagination
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}/>
                </div>
            </div>
        );
    }
}

export default Movies;
