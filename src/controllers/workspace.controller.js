
import {
    createWorkspaceService,
    getMyWorkspacesService,
    getWorkspaceByIdService,
    updateWorkspaceService,
    deleteWorkspaceService
} from '../services/workspace.service.js';

// 1. Create workspace
export const createWorkspace = async (req, res, next) => {
    try {
        const workspace = await createWorkspaceService(
            req.user.id,
            req.body
        );

        return res.status(201).json({
            success: true,
            message: 'Workspace created successfully',
            data: workspace
        });
    } catch (error) {
        next(error);
    }
};

// 2. Get my workspaces
export const getMyWorkspaces = async (req, res, next) => {
    try {
        const workspaces = await getMyWorkspacesService(req.user.id);

        return res.status(200).json({
            success: true,
            message: 'Workspaces retrieved successfully',
            data: workspaces
        });
    } catch (error) {
        next(error);
    }
};

// 3. Get workspace by ID
export const getWorkspaceById = async (req, res, next) => {
    try {
        const workspace = await getWorkspaceByIdService(
            req.params.id,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message: 'Workspace retrieved successfully',
            data: workspace
        });
    } catch (error) {
        next(error);
    }
};

// 4. Update workspace
export const updateWorkspace = async (req, res, next) => {
    try {
        const workspace = await updateWorkspaceService(
            req.params.id,
            req.user.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: 'Workspace updated successfully',
            data: workspace
        });
    } catch (error) {
        next(error);
    }
};

// 5. Delete workspace
export const deleteWorkspace = async (req, res, next) => {
    try {
        await deleteWorkspaceService(
            req.params.id,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message: 'Workspace deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
