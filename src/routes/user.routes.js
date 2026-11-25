
import { Router } from 'express';

import { updateMe } from '../controllers/user.controller.js';

import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

import { updateUserSchema } from '../validators/user.validator.js';

const router = Router();

// Update current user's profile
router.patch(
    '/me',
    authenticate,
    validate(updateUserSchema),
    updateMe
);

export default router;
