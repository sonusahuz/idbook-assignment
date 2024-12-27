import React from 'react';
import Link from 'next/link';

type UserActionsProps = {
  id: number;
  onDelete: (id: number) => void;
};

const UserActions: React.FC<UserActionsProps> = ({ id, onDelete }) => (
  <div className="flex space-x-2">
    <Link href={`/user-detail/${id}`}>
      <button className="text-blue-500 hover:text-blue-600 bg-blue-100 p-2 rounded-md w-20">
        View
      </button>
    </Link>
    <Link href={`/update-user/${id}`}>
      <button className="text-orange-500 hover:text-orange-600 bg-orange-100 p-2 rounded-md w-20">
        Edit
      </button>
    </Link>
    <button
      onClick={() => onDelete(id)}
      className="text-red-500 hover:text-red-600 bg-red-100 p-2 rounded-md w-20"
    >
      Delete
    </button>
  </div>
);

export default UserActions;
