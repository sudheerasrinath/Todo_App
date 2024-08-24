import * as yup from "yup"

export const schema = yup
    .object({
        description: yup.string().required(),
    })
    .required()