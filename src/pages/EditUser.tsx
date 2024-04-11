import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "../schema";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { EditFormData, UserStateData } from "../interfaces";
import { toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { useUserData } from "../hooks/useUserData";
import { useRecoilValue } from "recoil";
import { userState } from "../state/UserDataState";


export const EditUser = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditFormData>({
    resolver: zodResolver(editUserSchema),
  });

  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  function userEditedMessage() {
    toast.success("User Edited Successfully!");
  }

  async function getUserData() {
    try {
      const response = await axios.get(
        `http://localhost:3001/user/user-details/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );
      const userData = response.data.data;

      setUserData(userData);
      setValue("name", userData.user_name);
      setValue("email", userData.user_email);
      setValue("number", userData.user_number);
      setValue("roleId", userData.user_role_id);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error (e.g., show error message)
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  const onSubmit = async (data: EditFormData) => {
    try {
      console.log(data, "daaaaaaaaaaaaaaa");
      const res = await axios.put(`http://localhost:3001/user/update/${id}`, data, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });
      console.log("User edited successfully", res);
      userEditedMessage();
      navigate("/list-user");
    } catch (error) {
      console.error("Error editing user:", error);
      // Handle error (e.g., show error message)
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Navbar />

      <div className="h-screen w-screen flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white overflow-hidden shadow rounded-lg border w-[600px]">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 ">
                Edit Profile
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <div className="sm:divide-y sm:divide-gray-200 ">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div className="text-sm font-medium text-gray-500 flex items-center">
                    <div> Full name</div>
                  </div>
                  <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ">
                    <input
                      className="p-3 border border-black rounded-lg"
                      placeholder="name"
                      {...register("name")}
                    />
                    <div>
                      {errors.name && (
                        <ErrorMessage text={errors.name.message || ""} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                  <div className="text-sm font-medium text-gray-500 flex items-center">
                    <div>Email address</div>
                  </div>
                  <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      className="p-3 border border-black rounded-lg"
                      placeholder="email"
                      {...register("email")}
                    />
                    <div>
                      {errors.email && (
                        <ErrorMessage text={errors.email.message || ""} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <label  htmlFor="roleId" > Role</label>
                  <select
                    className="p-2 bg-white border border-black rounded-lg"
                    {...register("roleId")}
                    name="roleId"
                    id="roleId"
                  >
                    <option value={1}>Super Admin</option>
                    <option value={2}>Admin</option>
                    <option value={3}>Manager</option>
                    <option value={4}>Team Lead</option>
                    <option value={5}>Employee</option>
                  </select>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                  <div className="text-sm font-medium text-gray-500 flex items-center">
                    <div> Phone number</div>
                  </div>
                  <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      className="p-3 border border-black rounded-lg"
                      placeholder="number"
                      {...register("number")}
                    />
                    <div>
                      {errors.number && (
                        <ErrorMessage text={errors.number.message || ""} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 m-2">
              <Link
                className="text-black bg-white border border-black hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                to={"/list-user"}
              >
                Back
              </Link>
              <button
                type="submit"
                className="text-white bg-blue-800 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4 dark:bg-gray-800 dark:text-whiteml-4"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
