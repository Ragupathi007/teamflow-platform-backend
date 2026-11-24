import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";


export const findUserByEmail = async (email) => {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1)

    return result[0] || null
}

export const createUser = async (userData) => {
    const result = await db.insert(users).values(userData).returning({
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt
    })

    return result[0]
}



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
