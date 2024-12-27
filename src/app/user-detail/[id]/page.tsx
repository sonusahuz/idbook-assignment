'use client';
import { useUserStore } from '@/store/userStore';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const UserDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const { singleUser, deleteUser } = useUserStore((state) => state);

  const { data, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => singleUser(Number(id)),
  });

  const handleDelete = async (id: number) => {
    await deleteUser(Number(id));
    router.push('/');
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden max-w-sm w-full">
        <div className="p-6 space-y-2">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {isLoading ? 'Loading...' : data?.name}
              </h2>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                />
              </svg>

              <p className="text-sm text-gray-500">{`User ID: ${
                isLoading ? 'Loading...' : data?.id
              }`}</p>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>

              <p className="text-sm">{`Email: ${
                isLoading ? 'Loading...' : data?.email
              }`}</p>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>

              <p className="text-sm">{`Role: ${
                isLoading ? 'Loading...' : data?.role
              }`}</p>
            </div>
          </div>
          <div className="pt-4 flex justify-between items-center">
            <Link
              href={`/update-user/${id}`}
              className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-300"
            >
              Update Details
            </Link>
            <button
              onClick={() => handleDelete(Number(id))}
              className="bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-300"
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
