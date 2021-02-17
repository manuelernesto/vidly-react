import React from "react";
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = (props) => {
    const {itemsCount, pageSize, currentPage, onPageChange} = props;
    const pageCount = Math.ceil(itemsCount / pageSize);

    if (pageCount === 1) return null;

    const pages = _.range(1, pageCount + 1);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {
                    pages.map(page =>
                        (
                            <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                                <a className="page-link"
                                   onClick={() => onPageChange(page)}>{page}</a>
                            </li>
                        )
                    )
                }
            </ul>
        </nav>
    );
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
