import { useUser } from "../hooks/useUser";

const ListUsers = async () => {
  const user = useUser();

  if (user.loading) {
    return <div>Loading...</div>;
  }

  return <div>ListUsers TABle {user.userData}</div>;
};

export default ListUsers;
