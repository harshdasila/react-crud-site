import Input from "../components/Input";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/ErrorMessage";
import { addUserSchema } from "../schema";
import { AddUserData } from "../interfaces";
import { toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export const AddUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserData>({
    resolver: zodResolver(addUserSchema),
  });

  function incorrectCredentailsError() {
    toast.error("Email alredy registered!");
  }

  function userAddedSuccess() {
    toast.success("User Added Successfully!");
  }

  const onSubmit = async (data: AddUserData) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3001/user/add-user",
        data,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );

      if (response.status === 200) {
        console.log("User Added successful:", response);
        userAddedSuccess();
        navigate("/list-user");
      } else if (response.status === 409) {
        console.error("User Already pressent", response);
        incorrectCredentailsError();
      } else {
        console.log("Internal server error");
      }
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <div className="w-[430px] h-auto bg-white p-6 rounded-lg">
          <div className="text-center mb-3">
            <div className="font-sans text-4xl font-bold">Add User</div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Name"
              placeholder="Enter Your Name"
              type="text"
              name="name"
              register={register}
            />

            {errors.name && <ErrorMessage text={errors.name.message || ""} />}

            <Input
              label="Email"
              placeholder="harsh@example.com"
              type="text"
              name="email"
              register={register}
            />
            {errors.email && <ErrorMessage text={errors.email.message || ""} />}

            <div>
              <label htmlFor="roleId" className="text-black">
                Select Role {"  "}
              </label>
              <select
                {...register("roleId")}
                name="roleId"
                id="roleId"
                className="border border-black text-black bg-white px-3 py-2 rounded-md m-x-2"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>

            <Input
              label="Password"
              placeholder="Enter Your Password"
              type="password"
              name="password"
              register={register}
            />
            {errors.password && (
              <ErrorMessage text={errors.password.message || ""} />
            )}

            <Input
              label="Confirm Password"
              placeholder="Confirm Your Password"
              type="password"
              name="cnfPassword"
              register={register}
            />
            {errors.cnfPassword && (
              <ErrorMessage text={errors.cnfPassword.message || ""} />
            )}

            <Input
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              name="mobileNumber"
              type="text"
              register={register}
            />
            {errors.mobileNumber && (
              <ErrorMessage text={errors.mobileNumber.message || ""} />
            )}
            <div className="flex justify-between items-center">
              <Link
                className="border mt-4 border-black py-2 px-4 rounded  text-sm font-medium font-sans"
                to={"/list-user"}
              >
                Back
              </Link>
              <Button text="Add" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
