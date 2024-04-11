import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Loader from "../components/Loader";
import { UserDetailsInterface } from "../interfaces";
import Navbar from "../components/Navbar";

const UserData = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<UserDetailsInterface>();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/user-details/${id}`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        setLoading(false);
        setUserDetails(response.data?.data || {});
      })
      .catch((e) => {
        console.log(e);
        navigate("/signin");
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  const name = userDetails?.user_name;
  const email = userDetails?.user_email;
  const phoneNumber = userDetails?.user_number;
  const created_at = userDetails?.user_created_at;

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center h-screen">
        <div className="bg-white overflow-hidden shadow rounded-lg border w-[600px]">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 ">
              {name}'s Profile
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <div className="sm:divide-y sm:divide-gray-200 ">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">
                  Full name
                </div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {name}
                </div>
              </div>

              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">
                  Email address
                </div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {email}
                </div>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">
                  Phone number
                </div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {phoneNumber}
                </div>
              </div>

              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">
                  Created At
                </div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {created_at?.substring(0, 10)}
                </div>
              </div>
            </div>
          </div>
          <Link to="/list-user">
            <button
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ml-4 "
            >
              Back
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserData;
