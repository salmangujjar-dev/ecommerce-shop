import { z } from 'zod';

const authSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name cannot exceed 30 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(255, 'Email cannot exceed 255 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password cannot exceed 100 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  rememberMe: z.boolean().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export const registerSchema = authSchema.pick({
  name: true,
  email: true,
  password: true,
  terms: true,
});

export const loginSchema = authSchema.pick({
  email: true,
  password: true,
  rememberMe: true,
});
