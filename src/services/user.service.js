
import {
    findUserById,
    updateUser
} from '../repositories/user.repository.js';

import { findUserByEmail } from '../repositories/auth.repository.js';

// Update user profile
export const updateUserProfile = async (userId, userData) => {
    // Check whether user exists
    const existingUser = await findUserById(userId);

    if (!existingUser) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    // Check email uniqueness if email is being updated
    if (userData.email) {
        const emailUser = await findUserByEmail(userData.email);

        if (emailUser && emailUser.id !== userId) {
            const error = new Error('Email is already registered');
            error.statusCode = 409;
            throw error;
        }
    }

    // Update profile
    const updatedUser = await updateUser(userId, userData);

    return updatedUser;
};



// Get another user's public profile
export const getUserProfile = async (userId) => {
    const user = await findUserById(userId);

    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    return user;
};
