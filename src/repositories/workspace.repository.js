
import { eq, desc, and } from 'drizzle-orm';

import { db } from '../db/index.js';

import {
    workspaces,
    workspaceMembers
} from '../db/schema.js';

// Find workspace by slug
export const findWorkspaceBySlug = async (slug) => {
    const result = await db
        .select()
        .from(workspaces)
        .where(eq(workspaces.slug, slug))
        .limit(1);

    return result[0] || null;
};

// Create workspace and automatically add creator as owner
export const createWorkspace = async (workspaceData, userId) => {
    return await db.transaction(async (tx) => {
        const [workspace] = await tx
            .insert(workspaces)
            .values({
                ...workspaceData,
                createdBy: userId
            })
            .returning();

        await tx
            .insert(workspaceMembers)
            .values({
                workspaceId: workspace.id,
                userId,
                role: 'owner'
            });

        return workspace;
    });
};

// Get all workspaces belonging to a user
export const findWorkspacesByUserId = async (userId) => {
    return await db
        .select({
            id: workspaces.id,
            name: workspaces.name,
            slug: workspaces.slug,
            description: workspaces.description,
            createdBy: workspaces.createdBy,
            createdAt: workspaces.createdAt,
            updatedAt: workspaces.updatedAt,
            role: workspaceMembers.role
        })
        .from(workspaceMembers)
        .innerJoin(
            workspaces,
            eq(workspaceMembers.workspaceId, workspaces.id)
        )
        .where(eq(workspaceMembers.userId, userId))
        .orderBy(desc(workspaces.createdAt));
};

// Find workspace by ID
export const findWorkspaceById = async (workspaceId) => {
    const result = await db
        .select()
        .from(workspaces)
        .where(eq(workspaces.id, workspaceId))
        .limit(1);

    return result[0] || null;
};

// Find membership for a specific user in a specific workspace
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

// Update workspace
export const updateWorkspace = async (workspaceId, updateData) => {
    const result = await db
        .update(workspaces)
        .set({
            ...updateData,
            updatedAt: new Date()
        })
        .where(eq(workspaces.id, workspaceId))
        .returning();

    return result[0] || null;
};

// Delete workspace
export const deleteWorkspace = async (workspaceId) => {
    const result = await db
        .delete(workspaces)
        .where(eq(workspaces.id, workspaceId))
        .returning({
            id: workspaces.id
        });

    return result[0] || null;
};
