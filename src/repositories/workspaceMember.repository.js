
import { eq, and, desc } from 'drizzle-orm';

import { db } from '../db/index.js';

import {
    users,
    workspaces,
    workspaceMembers
} from '../db/schema.js';

// 1. Find user by email
export const findUserByEmail = async (email) => {
    const result = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email
        })
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    return result[0] || null;
};

// 2. Find workspace by ID
export const findWorkspaceById = async (workspaceId) => {
    const result = await db
        .select()
        .from(workspaces)
        .where(eq(workspaces.id, workspaceId))
        .limit(1);

    return result[0] || null;
};

// 3. Find workspace membership
export const findWorkspaceMembership = async (workspaceId, userId) => {
    const result = await db
        .select()
        .from(workspaceMembers)
        .where(
            and(
                eq(workspaceMembers.workspaceId, workspaceId),
                eq(workspaceMembers.userId, userId)
            )
        )
        .limit(1);

    return result[0] || null;
};

// 4. Add workspace member
export const addWorkspaceMember = async (memberData) => {
    const result = await db
        .insert(workspaceMembers)
        .values(memberData)
        .returning();

    return result[0];
};

// 5. Get all workspace members
export const findWorkspaceMembers = async (workspaceId) => {
    return await db
        .select({
            id: workspaceMembers.id,
            userId: users.id,
            name: users.name,
            email: users.email,
            role: workspaceMembers.role,
            joinedAt: workspaceMembers.joinedAt
        })
        .from(workspaceMembers)
        .innerJoin(
            users,
            eq(workspaceMembers.userId, users.id)
        )
        .where(eq(workspaceMembers.workspaceId, workspaceId))
        .orderBy(desc(workspaceMembers.joinedAt));
};

// 6. Find a specific workspace member
export const findWorkspaceMemberById = async (workspaceId, memberId) => {
    const result = await db
        .select({
            id: workspaceMembers.id,
            workspaceId: workspaceMembers.workspaceId,
            userId: users.id,
            name: users.name,
            email: users.email,
            role: workspaceMembers.role,
            joinedAt: workspaceMembers.joinedAt
        })
        .from(workspaceMembers)
        .innerJoin(
            users,
            eq(workspaceMembers.userId, users.id)
        )
        .where(
            and(
                eq(workspaceMembers.workspaceId, workspaceId),
                eq(workspaceMembers.id, memberId)
            )
        )
        .limit(1);

    return result[0] || null;
};

// 7. Update workspace member role
// Update workspace member role
export const updateWorkspaceMember = async (workspaceId, memberId, role) => {
    const result = await db
        .update(workspaceMembers)
        .set({ role })
        .where(
            and(
                eq(workspaceMembers.workspaceId, workspaceId),
                eq(workspaceMembers.id, memberId)
            )
        )
        .returning();

    return result[0] || null;
};

// 8. Remove workspace member
export const removeWorkspaceMember = async (workspaceId, memberId) => {
    const result = await db
        .delete(workspaceMembers)
        .where(
            and(
                eq(workspaceMembers.workspaceId, workspaceId),
                eq(workspaceMembers.id, memberId)
            )
        )
        .returning({
            id: workspaceMembers.id
        });

    return result[0] || null;
};
