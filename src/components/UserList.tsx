import React from "react";
import { Link } from "react-router-dom";
import { UserListProps } from "../interfaces";


const UserList: React.FC<UserListProps> = ({ user, handleDelete }) => {
  const {user_id, user_name, user_email, user_number, user_created_at } = user;

  return (
    <tr className="odd:bg-white odd:bg-opacity-50 even:bg-gray-100 border-b border-gray-200 dark:border-gray-700 text-black">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
      >
        {user_name}
      </th>
      <td className="px-6 py-4">{user_email}</td>
      {/* <td className="px-6 py-4">{user_name}</td> */}
      <td className="px-6 py-4">{user_number}</td>
      <td className="px-6 py-4">{user_created_at.substring(0,10)}</td>
      <td className="px-6 py-4">
        <Link to={`/user-details/${user_id}`}>
          <div className="font-medium text-blue-600 hover:underline dark:text-blue-500">
            Click Here
          </div>
        </Link>
      </td>
      <td>
        <div className="flex justify-center items-center">
          <button
            onClick={() => handleDelete(user_id)}
            className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-2"
          >
            Delete
          </button>
          <Link to={`/edit/${user_id}`}>
            <button className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-2">
              Edit
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default UserList;
