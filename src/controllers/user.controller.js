
import {
    updateUserProfile
} from '../services/user.service.js';

// Update current user's profile
export const updateMe = async (req, res, next) => {
    try {
        const updatedUser = await updateUserProfile(
            req.user.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
};
