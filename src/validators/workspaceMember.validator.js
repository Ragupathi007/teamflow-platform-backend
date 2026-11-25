
import { z } from 'zod';

// Add workspace member
export const addWorkspaceMemberSchema = z.object({
    email: z
        .string()
        .trim()
        .email('Please provide a valid email address')
        .toLowerCase(),

    role: z
        .enum(['admin', 'member'])
        .default('member')
});

// Update workspace member role
export const updateWorkspaceMemberSchema = z.object({
    role: z.enum(
        ['admin', 'member'],
        {
            error: 'Role must be admin or member'
        }
    )
});

// Validate workspace ID
export const workspaceMemberParamsSchema = z.object({
    workspaceId: z.string().uuid('Invalid workspace ID')
});

// Validate workspace ID and membership ID
export const workspaceMemberIdParamsSchema = z.object({
    workspaceId: z.string().uuid('Invalid workspace ID'),
    memberId: z.string().uuid('Invalid membership ID')
});
