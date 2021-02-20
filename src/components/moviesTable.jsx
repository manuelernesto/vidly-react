import React, {Component} from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import Like from "./common/like";

class MoviesTable extends Component {

    columns = [
        {path: 'title', label: 'Title'},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {
            key: 'like',
            content: movie =>
                <Like liked={movie.liked} onClick={() => this.props.onLike(movie)}/>
        },
        {
            key: 'delete',
            content: movie =>
                <button className="btn btn-danger btn-sm"
                        onClick={() => this.props.onDelete(movie)}> Delete
                </button>
        }
    ];

    render() {
        const {movies, onSort, sortColumn} = this.props;

        return (
            <table className="table">
                <TableHeader
                    sortColumn={sortColumn}
                    onSort={onSort}
                    columns={this.columns}
                />
                <TableBody
                    columns={this.columns}
                    data={movies}
                />
            </table>
        );
    }

}


export default MoviesTable;
