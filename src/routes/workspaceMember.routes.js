
import { Router } from 'express';

import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

import {
    addWorkspaceMemberSchema,
    updateWorkspaceMemberSchema,
    workspaceMemberParamsSchema,
    workspaceMemberIdParamsSchema
} from '../validators/workspaceMember.validator.js';

import {
    addMember,
    getMembers,
    getMemberById,
    updateMember,
    removeMember
} from '../controllers/workspaceMember.controller.js';

const router = Router();

// All workspace member routes require authentication
router.use(authenticate);

// 1. Add workspace member
router.post(
    '/:workspaceId/members',
    validate(workspaceMemberParamsSchema, 'params'),
    validate(addWorkspaceMemberSchema),
    addMember
);

// 2. Get all workspace members
router.get(
    '/:workspaceId/members',
    validate(workspaceMemberParamsSchema, 'params'),
    getMembers
);

// 3. Get one workspace member
router.get(
    '/:workspaceId/members/:memberId',
    validate(workspaceMemberIdParamsSchema, 'params'),
    getMemberById
);

// 4. Update workspace member role
router.patch(
    '/:workspaceId/members/:memberId',
    validate(workspaceMemberIdParamsSchema, 'params'),
    validate(updateWorkspaceMemberSchema),
    updateMember
);

// 5. Remove workspace member
router.delete(
    '/:workspaceId/members/:memberId',
    validate(workspaceMemberIdParamsSchema, 'params'),
    removeMember
);

export default router;
