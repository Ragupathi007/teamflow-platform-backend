
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const authenticate = (req, res, next) => {
    try {
        // 1. Get Authorization header
        const authHeader = req.headers.authorization;

        // 2. Check whether token exists
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token is required'
            });
        }

        // 3. Extract token
        const token = authHeader.split(' ')[1];

        // 4. Verify token
        const decoded = jwt.verify(token, env.JWT_SECRET);

        // 5. Attach user ID to request
        req.user = {
            id: decoded.userId
        };

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired authentication token'
        });
    }
};
