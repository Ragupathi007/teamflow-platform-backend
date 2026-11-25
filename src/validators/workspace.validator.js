
import { z } from 'zod';

// Create workspace
export const createWorkspaceSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Workspace name must contain at least 2 characters')
        .max(150, 'Workspace name cannot exceed 150 characters'),

    description: z
        .string()
        .trim()
        .max(1000, 'Description cannot exceed 1000 characters')
        .optional()
});

// Update workspace
export const updateWorkspaceSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Workspace name must contain at least 2 characters')
        .max(150, 'Workspace name cannot exceed 150 characters')
        .optional(),

    description: z
        .string()
        .trim()
        .max(1000, 'Description cannot exceed 1000 characters')
        .nullable()
        .optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: 'At least one field must be provided'
    }
);

// Workspace ID parameter
export const workspaceIdSchema = z.object({
    id: z.string().uuid('Invalid workspace ID')
});
