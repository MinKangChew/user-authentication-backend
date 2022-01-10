import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: `username is required`,
      invalid_type_error: `username must be string`,
    }),
    firstName: string({
      required_error: `firstName is required`,
      invalid_type_error: `firstName must be string`,
    }),
    lastName: string({
      required_error: `lastName is required`,
      invalid_type_error: `lastName must be string`,
    }),
    email: string().email({ message: "Invalid email address" }),
    password: string({
      required_error: `password is required`,
      invalid_type_error: `password must be string`,
    }),
  }),
});

export type CreateUser = TypeOf<typeof createUserSchema>["body"];
