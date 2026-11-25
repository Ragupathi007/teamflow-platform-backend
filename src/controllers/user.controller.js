
import {
    updateUserProfile, getUserProfile
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


// Get another user's public profile
export const getUserById = async (req, res, next) => {
    try {
        const user = await getUserProfile(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'User profile retrieved successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
};
