import React from 'react';
import SingleUserDetail from '../user-detail';

const UserDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <SingleUserDetail id={id} />;
};

export default UserDetail;
