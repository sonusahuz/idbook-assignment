import React from 'react';

type Props = {
  table: {
    getCanPreviousPage: () => boolean;
    getCanNextPage: () => boolean;
    previousPage: () => void;
    nextPage: () => void;
    getPageCount: () => number;
    getState: () => {
      pagination: {
        pageIndex: number;
        pageSize: number;
      };
    };
  };

  users: {
    length: number;
  };
};

const PaginationControls = ({ table, users }: Props) => {
  return (
    <div>
      <div className="mt-4 flex items-center justify-between flex-wrap">
        <div className="text-center mx-auto md:mx-0 mb-4 md:mb-0">
          Showing {table.getState().pagination.pageSize} of {users.length} users
        </div>
        <div className="flex items-center space-x-2 mx-auto md:mx-0">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 border-2 rounded disabled:opacity-50 flex items-center justify-between gap-4 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                clipRule="evenodd"
              />
            </svg>
            Previous
          </button>
          <span>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 border-2 rounded disabled:opacity-50 flex items-center justify-between gap-4 font-normal"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
