'use client';

import { CreateUserSchema, FormData } from '@/types/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

export default function UserForm() {
  const router = useRouter();
  const { addUser, fetchUsers } = useUserStore();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      role: '',
    },
    resolver: zodResolver(CreateUserSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await addUser({
        name: data.name,
        email: data.email,
        role: data.role,
      });
      await fetchUsers();
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError('root', {
          type: 'manual',
          message: error.message, // Access message safely
        });
      } else {
        // Handle non-Error cases, e.g., string or unexpected types
        setError('root', {
          type: 'manual',
          message: 'An unexpected error occurred.',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white shadow-lg rounded-lg p-6">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create User
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm flex-col flex gap-5">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                {...register('name')}
                type="text"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
              {errors.name && (
                <p style={{ color: 'orangered' }}>{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                autoComplete="email"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && (
                <p style={{ color: 'orangered' }}>{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="role" className="sr-only">
                Role
              </label>
              <select
                {...register('role')}
                id="role"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
              </select>
              {errors.role && (
                <p style={{ color: 'orangered' }}>{errors.role.message}</p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Please wait...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
