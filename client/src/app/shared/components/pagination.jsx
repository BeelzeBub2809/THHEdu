import React from 'react';

export const Pagination = ({ size, totalPages, currentPage, setPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
  
    return (
        <div className="pagination-container">
            <span>Showing {size} data in a page</span>
            <nav>
                  <ul className="pagination justify-content-end">
                      {pageNumbers.map(number => (
                          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                              <button onClick={() => setPage(number)} className="page-link">
                                  {number}
                              </button>
                          </li>
                      ))}
                  </ul>
            </nav>
        </div>
    );
}