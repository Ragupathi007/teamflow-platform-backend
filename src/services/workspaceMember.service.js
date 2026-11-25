
import {
    findUserByEmail,
    findWorkspaceById,
    findWorkspaceMembership,
    addWorkspaceMember,
    findWorkspaceMembers,
    findWorkspaceMemberById,
    updateWorkspaceMember,
    removeWorkspaceMember
} from '../repositories/workspaceMember.repository.js';

// Reusable error helper
const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

// Check workspace and requester membership
const checkWorkspaceAccess = async (workspaceId, requesterId) => {
    const workspace = await findWorkspaceById(workspaceId);

    if (!workspace) {
        throw createError('Workspace not found', 404);
    }

    const membership = await findWorkspaceMembership(
        workspaceId,
        requesterId
    );

    if (!membership) {
        throw createError('You are not a member of this workspace', 403);
    }

    return { workspace, membership };
};

// 1. Add workspace member
export const addWorkspaceMemberService = async (
    workspaceId,
    requesterId,
    memberData
) => {
    const { membership } = await checkWorkspaceAccess(
        workspaceId,
        requesterId
    );

    if (!['owner', 'admin'].includes(membership.role)) {
        throw createError('You do not have permission to add members', 403);
    }

    // Only owners can assign the admin role
    if (memberData.role === 'admin' && membership.role !== 'owner') {
        throw createError('Only the workspace owner can assign the admin role', 403);
    }

    const user = await findUserByEmail(memberData.email);

    if (!user) {
        throw createError('No registered user found with this email', 404);
    }

    const existingMembership = await findWorkspaceMembership(
        workspaceId,
        user.id
    );

    if (existingMembership) {
        throw createError('User is already a workspace member', 409);
    }

    return await addWorkspaceMember({
        workspaceId,
        userId: user.id,
        role: memberData.role
    });
};

// 2. Get all workspace members
export const getWorkspaceMembersService = async (
    workspaceId,
    requesterId
) => {
    await checkWorkspaceAccess(workspaceId, requesterId);

    return await findWorkspaceMembers(workspaceId);
};

// 3. Get one workspace member
export const getWorkspaceMemberByIdService = async (
    workspaceId,
    memberId,
    requesterId
) => {
    await checkWorkspaceAccess(workspaceId, requesterId);

    const member = await findWorkspaceMemberById(
        workspaceId,
        memberId
    );

    if (!member) {
        throw createError('Workspace member not found', 404);
    }

    return member;
};

// 4. Update workspace member role
export const updateWorkspaceMemberService = async (
    workspaceId,
    memberId,
    requesterId,
    memberData
) => {
    const { membership } = await checkWorkspaceAccess(
        workspaceId,
        requesterId
    );

    // Only the workspace owner can change member roles
    if (membership.role !== 'owner') {
        throw createError('Only the workspace owner can update member roles', 403);
    }

    const targetMember = await findWorkspaceMemberById(
        workspaceId,
        memberId
    );

    if (!targetMember) {
        throw createError('Workspace member not found', 404);
    }

    if (targetMember.role === 'owner') {
        throw createError('The workspace owner role cannot be changed here', 403);
    }

    return await updateWorkspaceMember(
        workspaceId,
        memberId,
        memberData.role
    );
};

// 5. Remove workspace member
export const removeWorkspaceMemberService = async (
    workspaceId,
    memberId,
    requesterId
) => {
    const { membership } = await checkWorkspaceAccess(
        workspaceId,
        requesterId
    );

    if (!['owner', 'admin'].includes(membership.role)) {
        throw createError('You do not have permission to remove members', 403);
    }

    const targetMember = await findWorkspaceMemberById(
        workspaceId,
        memberId
    );

    if (!targetMember) {
        throw createError('Workspace member not found', 404);
    }

    if (targetMember.role === 'owner') {
        throw createError('The workspace owner cannot be removed', 403);
    }

    // Admins can remove regular members, but not other admins
    if (membership.role === 'admin' && targetMember.role !== 'member') {
        throw createError('Admins can only remove regular members', 403);
    }

    return await removeWorkspaceMember(workspaceId, memberId);
};
