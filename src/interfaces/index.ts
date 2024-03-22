import { InputHTMLAttributes } from "react";
import { signInSchema } from "../schema";
import { z } from "zod";
import { UseFormRegister } from "react-hook-form";

export type SignInData = z.infer<typeof signInSchema>;

export interface FormData {
  email: string;
  name: string;
  mobileNumber: string;
  password: string;
  cnfPassword: string;
}

export interface ButtonProps {
  text: string;
  type: string;
}

export interface ErrorMessageProps {
  text: string;
}
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: string;
  name: string;
  register:  UseFormRegister<any>;
}
