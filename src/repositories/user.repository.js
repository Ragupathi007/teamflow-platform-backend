
import { eq } from 'drizzle-orm';

import { db } from '../db/index.js';
import { users } from '../db/schema.js';

// Find user by ID
export const findUserById = async (userId) => {
    const result = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email,
            createdAt: users.createdAt
        })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

    return result[0] || null;
};

// Update user profile
export const updateUser = async (userId, userData) => {
    const result = await db
        .update(users)
        .set({
            ...userData,
            updatedAt: new Date()
        })
        .where(eq(users.id, userId))
        .returning({
            id: users.id,
            name: users.name,
            email: users.email,
            createdAt: users.createdAt,
            updatedAt: users.updatedAt
        });

    return result[0] || null;
};
