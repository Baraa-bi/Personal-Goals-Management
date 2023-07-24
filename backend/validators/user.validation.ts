import { yup } from "../deps.ts";

export const createUserValidation = {
  body: yup.object({
    fullname: yup
      .string()
      .min(1)
      .max(255)
      .trim()
      .required(`fullname is required`),
    email: yup.string().trim().email().required(`email is required`),
    password: yup.string().required().min(6).max(255),
  }),
};

export const getUserValidation = {
  params: yup.object({
    id: yup.string().required().trim(),
  }),
};
