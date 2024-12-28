'use client';

import { useUserStore } from '@/store/userStore';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
} from '@tanstack/react-table';
import Link from 'next/link';
import UserActions from './UserActions';
import Spinner from './Loading';
import PaginationControls from './PaginationControls';
import { User } from '@/schema/userSchema';

const columnHelper = createColumnHelper<User>();

const UserList = () => {
  const fetchUsersFromStore = useUserStore((state) => state.fetchUsers);
  const deleteUser = useUserStore((state) => state.deleteUser);
  const [globalFilter, setGlobalFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsersFromStore,
  });
  const handleDelete = useCallback(
    async (id: number) => {
      await deleteUser(id);
      alert('User deleted successfully!');
      refetch();
    },
    [deleteUser, refetch]
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns = React.useMemo<ColumnDef<User, any>[]>(
    () => [
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: () => <span>Id</span>,
      }),
      columnHelper.accessor('name', {
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
      }),
      columnHelper.accessor('email', {
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
      }),
      columnHelper.accessor('role', {
        cell: (info) => info.getValue(),
        header: () => <span>Role</span>,
      }),
      columnHelper.accessor('id', {
        cell: (info) => (
          <div>
            <UserActions id={info.getValue()} onDelete={handleDelete} />
          </div>
        ),
        header: () => <span>Actions</span>,
      }),
    ],
    [handleDelete]
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      if (typeof value === 'string') {
        return value.toLowerCase().includes(filterValue.toLowerCase());
      }
      return false;
    },
  });

  if (isLoading) return <Spinner />;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="m-4 shadow-xl p-6 rounded-xl border">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-4">
        <div className="w-full lg:w-auto">
          <h1 className="text-xl lg:text-2xl flex items-center justify-center font-bold text-center lg:text-left">
            Users Management Table
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full lg:w-auto">
          <input
            type="text"
            className="w-full md:w-80 lg:w-96 border p-2 rounded-md"
            placeholder="Search..."
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <select
            className="w-full md:w-40 border p-2 rounded-md"
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              table.getColumn('role')?.setFilterValue(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
          <Link href="/create-user">
            <button className="flex items-center justify-between gap-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded text-sm w-full md:w-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
              Add User
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-4 border-b border-blue-gray-100 bg-blue-gray-50"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-b py-2 border-blue-gray-50"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationControls table={table} users={users} />
    </div>
  );
};

export default UserList;
