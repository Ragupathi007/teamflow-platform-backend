
import { z } from 'zod';

export const updateUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Name must contain at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters')
        .optional(),

    email: z
        .string()
        .trim()
        .email('Please provide a valid email address')
        .max(255, 'Email cannot exceed 255 characters')
        .toLowerCase()
        .optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: 'At least one field must be provided'
    }
);
