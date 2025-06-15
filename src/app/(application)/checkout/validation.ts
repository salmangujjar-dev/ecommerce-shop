import { z } from 'zod';

export const checkoutSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    firstName: z
      .string()
      .trim()
      .min(2, 'First name must be at least 2 characters'),
    lastName: z.string().trim().optional(),
    address: z.string().trim().min(5, 'Address must be at least 5 characters'),
    apartment: z.string().trim().optional(),
    city: z.string().trim().min(2, 'City must be at least 2 characters'),
    country: z.string().trim().min(2, 'Country must be at least 2 characters'),
    region: z.string().trim().min(2, 'Region must be at least 2 characters'),
    postalCode: z.string().trim().optional(),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
    paymentType: z.enum(['card', 'cod']),
    cardNumber: z.string().optional(),
    nameOnCard: z.string().optional(),
    expirationDate: z.string().optional(),
    cvc: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentType === 'card') {
      if (!data.cardNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Card number is required',
          path: ['cardNumber'],
        });
      }
      if (!data.nameOnCard) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Name on card is required',
          path: ['nameOnCard'],
        });
      }
      if (!data.expirationDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Expiration date is required',
          path: ['expirationDate'],
        });
      }
      if (!data.cvc) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'CVC is required',
          path: ['cvc'],
        });
      }
    }
  });
