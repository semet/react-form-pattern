import { z } from 'zod'

export const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().min(1, 'Email is required').email('Email is not valid'),
  gender: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .refine((data) => data.value !== '', {
      message: 'Gender is required',
    }),
  age: z.string().refine((val) => val !== '', {
    message: 'Please select age',
  }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
})

export type TForm = z.infer<typeof schema>
