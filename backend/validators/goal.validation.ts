import { yup } from "../deps.ts";
import { SetpStatus } from "../models/goal.model.ts";

export const goalValidation = {
  body: yup.object({
    title: yup.string().trim().required(`Goal title is required`),
    deadline: yup.number().required(`Goal deadline is required`),
    description: yup.string().trim().required(`Goal description is required`),
    steps: yup
      .array()
      .of(
        yup.object({
          title: yup.string().trim().required(`Step title is required`),
          deadline: yup.number().required(`Step deadline is required`),
          description: yup
            .string()
            .trim()
            .required(`Step description is required`),
          status: yup
            .string()
            .oneOf([
              SetpStatus.NOT_STARTED,
              SetpStatus.IN_PROGRESS,
              SetpStatus.COMPLETED,
            ])
            .required("Step status is required"),
        })
      )
      .notRequired(),
  }),
};
