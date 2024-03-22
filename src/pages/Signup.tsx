import Input from "../components/Input";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/ErrorMessage";
import { signUpSchema } from "../schema";
import { FormData } from "../interfaces";
import { Toaster, toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  function incorrectCredentailsError() {
    toast.error("Email alredy registered!");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.status === 200) {
        console.log("Sign-up successful:", responseData);
        const jwtToken = responseData?.token;
        localStorage.setItem("jwtToken", jwtToken);
        navigate("/list-user");
      } else if(response.status===409) {
        console.error("User Already pressent ", responseData);
        incorrectCredentailsError();
      }
      else{
        console.log("Internal server error")
      }
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-[430px] h-auto bg-white p-6 rounded-lg">
          <div className="text-center mb-3">
            <div className="font-sans text-4xl font-bold">Signup</div>
          </div>

          <Toaster richColors position="top-right" />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Name"
              placeholder="Enter Your Name"
              type="text"
              name="name"
              //@ts-ignore
              register={register}
            />

            {errors.name && <ErrorMessage text={errors.name.message || ""} />}

            <Input
              label="Email"
              placeholder="harsh@example.com"
              type="text"
              name="email"
              //@ts-ignore
              register={register}
            />
            {errors.email && <ErrorMessage text={errors.email.message || ""} />}

            <Input
              label="Password"
              placeholder="Enter Your Password"
              type="password"
              name="password"
              //@ts-ignore
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
              //@ts-ignore
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
              //@ts-ignore
              register={register}
            />
            {errors.mobileNumber && (
              <ErrorMessage text={errors.mobileNumber.message || ""} />
            )}

            <p className="text-md text-gray-500">
              Already have an account?{" "}
              <Link className="underline" to={"/signin"}>
                Signin
              </Link>
            </p>

            <Button text="Signup" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}
