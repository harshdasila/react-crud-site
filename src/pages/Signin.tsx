import Input from "../components/Input";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/ErrorMessage";
import { signInSchema } from "../schema";
import { SignInData } from "../interfaces";
import { Toaster, toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


export default function Signin() {

  const navigate = useNavigate();

  function incorrectCredentailsError() {
    toast.error("Incorrect Credentials!");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInData) => {
    try {
      const response = await fetch("http://localhost:3001/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.status === 200) {
        console.log("Sign-in successful:", responseData);
        const jwtToken = responseData?.token;
        localStorage.setItem("jwtToken",jwtToken);
        navigate('/list-user')
      } else {
        console.error("Sign-in failed ", responseData);
        incorrectCredentailsError();
        
      }
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-[430px] h-auto bg-white p-6 rounded-lg ">
          <div className="text-center mb-3">
            <div className="font-sans text-4xl font-bold">Signin</div>
          </div>
          <Toaster richColors position="top-right"/>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              placeholder="Andrew@gmail.com"
              type="text"
              name="email"
              register={register}
            />
            {errors.email && <ErrorMessage text={errors.email.message || ""} />}

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
            <p className="mt-2 text-md text-gray-500">
              Don't have an account?{" "}
              <Link className="underline" to={"/signup"}>
                Signup
              </Link>
            </p>
            <Button text="Signin" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}
