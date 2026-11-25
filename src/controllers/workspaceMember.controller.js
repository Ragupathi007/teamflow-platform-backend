
import {
    addWorkspaceMemberService,
    getWorkspaceMembersService,
    getWorkspaceMemberByIdService,
    updateWorkspaceMemberService,
    removeWorkspaceMemberService
} from '../services/workspaceMember.service.js';

// 1. Add workspace member
export const addMember = async (req, res, next) => {
    try {
        const member = await addWorkspaceMemberService(
            req.params.workspaceId,
            req.user.id,
            req.body
        );

        return res.status(201).json({
            success: true,
            message: 'Workspace member added successfully',
            data: member
        });
    } catch (error) {
        next(error);
    }
};

// 2. Get all workspace members
export const getMembers = async (req, res, next) => {
    try {
        const members = await getWorkspaceMembersService(
            req.params.workspaceId,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            data: members
        });
    } catch (error) {
        next(error);
    }
};

// 3. Get one workspace member
export const getMemberById = async (req, res, next) => {
    try {
        const member = await getWorkspaceMemberByIdService(
            req.params.workspaceId,
            req.params.memberId,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            data: member
        });
    } catch (error) {
        next(error);
    }
};

// 4. Update workspace member role
export const updateMember = async (req, res, next) => {
    try {
        const member = await updateWorkspaceMemberService(
            req.params.workspaceId,
            req.params.memberId,
            req.user.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: 'Workspace member role updated successfully',
            data: member
        });
    } catch (error) {
        next(error);
    }
};

// 5. Remove workspace member
export const removeMember = async (req, res, next) => {
    try {
        await removeWorkspaceMemberService(
            req.params.workspaceId,
            req.params.memberId,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message: 'Workspace member removed successfully'
        });
    } catch (error) {
        next(error);
    }
};
