import { forwardRef } from "react";
import { InputProps } from "../interfaces";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, type, register, name }) => {
    return (
      <div className="space-y-2">
        {label && (
          <div className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </div>
        )}
        <div>
          <input
          {...register(name) }
            // ref={ref}
            type={type || "text"}
            placeholder={placeholder}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-black"
           
          />
        </div>
      </div>
    );
  }
);

export default Input;
