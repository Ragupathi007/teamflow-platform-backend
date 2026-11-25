
import {
    findWorkspaceBySlug,
    createWorkspace,
    findWorkspacesByUserId,
    findWorkspaceById,
    findWorkspaceMembership,
    updateWorkspace,
    deleteWorkspace
} from '../repositories/workspace.repository.js';

// Helper to create errors with HTTP status codes
const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

// Generate URL-friendly workspace slug
const generateSlug = (name) => {
    return (
        name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') || 'workspace'
    );
};

// Check workspace membership and permissions
const checkWorkspaceAccess = async (workspaceId, userId) => {
    const membership = await findWorkspaceMembership(
        workspaceId,
        userId
    );

    if (!membership) {
        throw createError(
            'You do not have access to this workspace',
            403
        );
    }

    return membership;
};

// 1. Create workspace
export const createWorkspaceService = async (userId, workspaceData) => {
    const slug = generateSlug(workspaceData.name);

    const existingWorkspace = await findWorkspaceBySlug(slug);

    if (existingWorkspace) {
        throw createError(
            'Workspace slug already exists. Choose another name.',
            409
        );
    }

    return await createWorkspace(
        {
            name: workspaceData.name,
            slug,
            description: workspaceData.description
        },
        userId
    );
};

// 2. Get all workspaces belonging to the logged-in user
export const getMyWorkspacesService = async (userId) => {
    return await findWorkspacesByUserId(userId);
};

// 3. Get workspace details
export const getWorkspaceByIdService = async (workspaceId, userId) => {
    const workspace = await findWorkspaceById(workspaceId);

    if (!workspace) {
        throw createError('Workspace not found', 404);
    }

    await checkWorkspaceAccess(workspaceId, userId);

    return workspace;
};

// 4. Update workspace
export const updateWorkspaceService = async (
    workspaceId,
    userId,
    updateData
) => {
    // Check whether workspace exists
    const workspace = await findWorkspaceById(workspaceId);

    if (!workspace) {
        throw createError('Workspace not found', 404);
    }

    // Check workspace membership
    const membership = await checkWorkspaceAccess(
        workspaceId,
        userId
    );

    // Only owner and admin can update
    if (!['owner', 'admin'].includes(membership.role)) {
        throw createError(
            'Only workspace owners and admins can update the workspace',
            403
        );
    }

    return await updateWorkspace(workspaceId, updateData);
};

// 5. Delete workspace
export const deleteWorkspaceService = async (workspaceId, userId) => {
    // Check whether workspace exists
    const workspace = await findWorkspaceById(workspaceId);

    if (!workspace) {
        throw createError('Workspace not found', 404);
    }

    // Check workspace membership
    const membership = await checkWorkspaceAccess(
        workspaceId,
        userId
    );

    // Only owner can delete
    if (membership.role !== 'owner') {
        throw createError(
            'Only the workspace owner can delete the workspace',
            403
        );
    }

    return await deleteWorkspace(workspaceId);
};
