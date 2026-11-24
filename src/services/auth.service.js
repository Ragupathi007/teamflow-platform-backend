
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import {
    findUserByEmail,
    createUser, findUserById
} from '../repositories/auth.repository.js';

export const registerUser = async (userData) => {
    // 1. Check whether email already exists
    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        const error = new Error('Email is already registered');
        error.statusCode = 409;
        throw error;
    }

    // 2. Hash the password
    const passwordHash = await bcrypt.hash(userData.password, 12);

    // 3. Prepare user data
    const newUser = {
        name: userData.name,
        email: userData.email,
        passwordHash
    };

    // 4. Save user in database
    const createdUser = await createUser(newUser);

    return createdUser;
};




export const loginUser = async (loginData) => {
    // 1. Find user by email
    const user = await findUserByEmail(loginData.email);

    if (!user) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    // 2. Compare password
    const isPasswordValid = await bcrypt.compare(
        loginData.password,
        user.passwordHash
    );

    if (!isPasswordValid) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    // 3. Generate JWT token
    const token = jwt.sign(
        { userId: user.id },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRES_IN }
    );

    // 4. Return token and user details
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
};




export const getCurrentUser = async (userId) => {
    const user = await findUserById(userId);

    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    return user;
};
