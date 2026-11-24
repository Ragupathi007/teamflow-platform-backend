
import { success } from 'zod';
import { loginUser, registerUser, getCurrentUser } from '../services/auth.service.js';

export const register = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
};





export const login = async (req, res, next) => {
    try {
        const result = await loginUser(req.body);

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result
        });
    } catch (error) {
        next(error);
    }
};



export const getMe = async (req, res, next) => {
    try {
        const user = await getCurrentUser(req.user.id);

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};




export const logout = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Logout successful. Please remove your authentication token.'
    });
};
