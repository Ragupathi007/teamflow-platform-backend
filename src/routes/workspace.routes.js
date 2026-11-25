
import { Router } from 'express';

import {
    createWorkspace,
    getMyWorkspaces,
    getWorkspaceById,
    updateWorkspace,
    deleteWorkspace
} from '../controllers/workspace.controller.js';

import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

import {
    createWorkspaceSchema,
    updateWorkspaceSchema,
    workspaceIdSchema
} from '../validators/workspace.validator.js';

const router = Router();

// All workspace routes require authentication
router.use(authenticate);

router.post(
    '/',
    validate(createWorkspaceSchema),
    createWorkspace
);

router.get('/', getMyWorkspaces);

router.get(
    '/:id',
    validate(workspaceIdSchema, 'params'),
    getWorkspaceById
);

router.patch(
    '/:id',
    validate(workspaceIdSchema, 'params'),
    validate(updateWorkspaceSchema),
    updateWorkspace
);

router.delete(
    '/:id',
    validate(workspaceIdSchema, 'params'),
    deleteWorkspace
);

export default router;
