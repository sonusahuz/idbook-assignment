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
      <div className="mt-4 flex items-center justify-between">
        <div>
          Showing {table.getState().pagination.pageSize} of {users.length} users
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 border-2 rounded disabled:opacity-50 w-24"
          >
            Previous
          </button>
          <span>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 border-2 rounded disabled:opacity-50 w-24"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
