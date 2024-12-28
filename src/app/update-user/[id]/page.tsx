import UpdateUserDetail from '../update-user-detail';

export default async function UpdateUser({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <UpdateUserDetail id={id} />;
}
