import { z } from "zod";

export const signUpValidationSchema = z.object({
  name: z
    .string()
    .min(1,{message:"name is requred"})
    .min(3, { message: "Minimum legngth of password should be 3" })
    .max(50, { message: "Maximum legngth of password should be 50" }),
  number: z
    .string()
    .min(1,{message:"number is requred"})
    .min(10, { message: "Minimum number is 10" })
    .regex(/^\d+$/, { message: "Invalid number" }),
  password: z
    .string()
    .min(1,{message:"password"})
    .min(6, { message: "Minimum legngth of password should be 6" })
    .regex(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]+$/,
      "Password must have at least 6 characters, including a number, a special character, and a capital letter"
    ),
});

export const loginValidationSchema = z.object({
  number: z
    .string()
    .min(1,{message:"number is requred"})
    .min(10, { message: "Minimum number is 10" })
    .regex(/^\d+$/, { message: "Invalid number" }),
  password: z
    .string()
    .min(1,{message:"password is requred"})
    .min(6, { message: "Minimum legngth of password should be 6" })
    .regex(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]+$/,
      "Password must have at least 6 characters, including a number, a special character, and a capital letter"
    ),
});
