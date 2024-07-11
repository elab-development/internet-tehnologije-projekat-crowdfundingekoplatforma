import '../styles/Pagination.css';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={page === currentPage ? 'active' : ''}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;