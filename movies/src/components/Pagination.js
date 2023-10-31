import React from 'react';
import {usePagination, DOTS} from './hooks/usePagination';
import {Link} from "react-router-dom";

const Pagination = props => {
  const {onPageChange, totalCount, siblingCount = 1, currentPage, pageSize} = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  const linkClassName = 'relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
  const prevNextClassName = 'relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'

  return (

      <div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <Link onClick={onPrevious}
                to={`?page=${currentPage - 1}`}
                className={currentPage === 1 ? `${prevNextClassName} pointer-events-none` : prevNextClassName}>
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"/>
            </svg>
          </Link>

          {paginationRange.map(pageNumber => {

            // If the pageItem is a DOT, render the DOTS unicode character
            if (pageNumber === DOTS) {
              return <span
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
            }


            return (
                <Link
                    key={pageNumber}
                    to={`?page=${pageNumber}`}
                    className={currentPage === pageNumber ? `${linkClassName} pointer-events-none bg-indigo-400` : linkClassName}
                    onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </Link>
            );
          })}

          <Link
              onClick={onNext}
              to={`?page=${currentPage + 1}`}
              className={currentPage === lastPage ? `${prevNextClassName} pointer-events-none` : prevNextClassName}>
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"/>
            </svg>
          </Link>
        </nav>
      </div>

  );
};

export default Pagination;
