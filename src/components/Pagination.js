
import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination" style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', gap: '5px' }}>
        {pageNumbers.map(number => (
          <li key={number} className={number === currentPage ? 'page-item active' : 'page-item'}>
            <span
              className="page-link"
              onClick={() => paginate(number)}
              style={{
                cursor: 'pointer',
                userSelect: 'none',
                backgroundColor: 'orange',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
              }}
            >
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
