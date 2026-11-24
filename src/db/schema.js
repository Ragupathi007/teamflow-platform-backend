
import {
    pgTable,
    pgEnum,
    uuid,
    varchar,
    text,
    timestamp,
    unique,
    integer,
    boolean
} from 'drizzle-orm/pg-core';

// ==========================================
// 1. USERS
// ==========================================

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),

    name: varchar('name', { length: 100 }).notNull(),

    email: varchar('email', { length: 255 })
        .notNull()
        .unique(),

    passwordHash: varchar('password_hash', { length: 255 }).notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull()
});


// ==========================================
// 2. WORKSPACES
// ==========================================

export const workspaces = pgTable('workspaces', {
    id: uuid('id').defaultRandom().primaryKey(),

    name: varchar('name', { length: 150 }).notNull(),

    slug: varchar('slug', { length: 100 }).notNull().unique(),

    description: text('description'),

    createdBy: uuid('created_by')
        .notNull()
        .references(() => users.id),

    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull()
});


// ==========================================
// 3. WORKSPACE MEMBERS
// ==========================================

export const workspaceRoleEnum = pgEnum('workspace_role', [
    'owner',
    'admin',
    'member'
]);

export const workspaceMembers = pgTable('workspace_members', {
    id: uuid('id').defaultRandom().primaryKey(),

    workspaceId: uuid('workspace_id')
        .notNull()
        .references(() => workspaces.id, { onDelete: 'cascade' }),

    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),

    role: workspaceRoleEnum('role')
        .notNull()
        .default('member'),

    joinedAt: timestamp('joined_at', { withTimezone: true })
        .defaultNow()
        .notNull()
}, (table) => [
    unique().on(table.workspaceId, table.userId)
]);


// ==========================================
// 4. PROJECTS
// ==========================================

export const projects = pgTable('projects', {
    id: uuid('id').defaultRandom().primaryKey(),

    workspaceId: uuid('workspace_id')
        .notNull()
        .references(() => workspaces.id, { onDelete: 'cascade' }),

    name: varchar('name', { length: 150 }).notNull(),

    key: varchar('key', { length: 10 }).notNull(),

    description: text('description'),

    createdBy: uuid('created_by')
        .notNull()
        .references(() => users.id),

    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull()
}, (table) => [
    unique().on(table.workspaceId, table.key)
]);


// ==========================================
// 5. PROJECT MEMBERS
// ==========================================

export const projectRoleEnum = pgEnum('project_role', [
    'lead',
    'admin',
    'member',
    'viewer'
]);

export const projectMembers = pgTable('project_members', {
    id: uuid('id').defaultRandom().primaryKey(),

    projectId: uuid('project_id')
        .notNull()
        .references(() => projects.id, { onDelete: 'cascade' }),

    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),

    role: projectRoleEnum('role')
        .notNull()
        .default('member'),

    joinedAt: timestamp('joined_at', { withTimezone: true })
        .defaultNow()
        .notNull()
}, (table) => [
    unique().on(table.projectId, table.userId)
]);


// ==========================================
// 6. ISSUE ENUMS
// ==========================================

export const issueTypeEnum = pgEnum('issue_type', [
    'task',
    'bug',
    'story',
    'epic'
]);

export const issueStatusEnum = pgEnum('issue_status', [
    'backlog',
    'todo',
    'in_progress',
    'in_review',
    'done'
]);

export const issuePriorityEnum = pgEnum('issue_priority', [
    'lowest',
    'low',
    'medium',
    'high',
    'highest'
]);


// ==========================================
// 7. ISSUES
// ==========================================

export const issues = pgTable('issues', {
    id: uuid('id').defaultRandom().primaryKey(),

    projectId: uuid('project_id')
        .notNull()
        .references(() => projects.id, { onDelete: 'cascade' }),

    issueNumber: integer('issue_number').notNull(),

    title: varchar('title', { length: 255 }).notNull(),

    description: text('description'),

    type: issueTypeEnum('type')
        .notNull()
        .default('task'),

    status: issueStatusEnum('status')
        .notNull()
        .default('todo'),

    priority: issuePriorityEnum('priority')
        .notNull()
        .default('medium'),

    reporterId: uuid('reporter_id')
        .notNull()
        .references(() => users.id),

    assigneeId: uuid('assignee_id')
        .references(() => users.id, { onDelete: 'set null' }),

    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull()
}, (table) => [
    unique().on(table.projectId, table.issueNumber)
]);


// ==========================================
// 8. COMMENTS
// ==========================================

export const comments = pgTable('comments', {
    id: uuid('id').defaultRandom().primaryKey(),

    issueId: uuid('issue_id')
        .notNull()
        .references(() => issues.id, { onDelete: 'cascade' }),

    userId: uuid('user_id')
        .notNull()
        .references(() => users.id),

    content: text('content').notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull()
});


// ==========================================
// 9. LABELS
// ==========================================

export const labels = pgTable('labels', {
    id: uuid('id').defaultRandom().primaryKey(),

    projectId: uuid('project_id')
        .notNull()
        .references(() => projects.id, { onDelete: 'cascade' }),

    name: varchar('name', { length: 50 }).notNull(),

    color: varchar('color', { length: 7 })
        .notNull()
        .default('#808080'),

    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull()
}, (table) => [
    unique().on(table.projectId, table.name)
]);


// ==========================================
// 10. ISSUE LABELS
// ==========================================

export const issueLabels = pgTable('issue_labels', {
    id: uuid('id').defaultRandom().primaryKey(),

    issueId: uuid('issue_id')
        .notNull()
        .references(() => issues.id, { onDelete: 'cascade' }),

    labelId: uuid('label_id')
        .notNull()
        .references(() => labels.id, { onDelete: 'cascade' })
}, (table) => [
    unique().on(table.issueId, table.labelId)
]);


// ==========================================
// 11. ATTACHMENTS
// ==========================================

export const attachments = pgTable('attachments', {
    id: uuid('id').defaultRandom().primaryKey(),

    issueId: uuid('issue_id')
        .notNull()
        .references(() => issues.id, { onDelete: 'cascade' }),

    uploadedBy: uuid('uploaded_by')
        .notNull()
        .references(() => users.id),

    fileName: varchar('file_name', { length: 255 }).notNull(),

    fileUrl: text('file_url').notNull(),

    mimeType: varchar('mime_type', { length: 100 }),

    fileSize: integer('file_size').notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull()
});


// ==========================================
// 12. SPRINTS
// ==========================================

export const sprints = pgTable('sprints', {
    id: uuid('id').defaultRandom().primaryKey(),

    projectId: uuid('project_id')
        .notNull()
        .references(() => projects.id, { onDelete: 'cascade' }),

    name: varchar('name', { length: 150 }).notNull(),

    goal: text('goal'),

    startDate: timestamp('start_date', { withTimezone: true }),

    endDate: timestamp('end_date', { withTimezone: true }),

    status: varchar('status', { length: 20 })
        .notNull()
        .default('planned'),

    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
        .defaultNow()
        .notNull()
});


// ==========================================
// 13. SPRINT ISSUES
// ==========================================

export const sprintIssues = pgTable('sprint_issues', {
    id: uuid('id').defaultRandom().primaryKey(),

    sprintId: uuid('sprint_id')
        .notNull()
        .references(() => sprints.id, { onDelete: 'cascade' }),

    issueId: uuid('issue_id')
        .notNull()
        .references(() => issues.id, { onDelete: 'cascade' }),

    addedAt: timestamp('added_at', { withTimezone: true })
        .defaultNow()
        .notNull()
}, (table) => [
    unique().on(table.sprintId, table.issueId)
]);


// ==========================================
// 14. ACTIVITY LOGS
// ==========================================

export const activityLogs = pgTable('activity_logs', {
    id: uuid('id').defaultRandom().primaryKey(),

    issueId: uuid('issue_id')
        .references(() => issues.id, { onDelete: 'cascade' }),

    userId: uuid('user_id')
        .references(() => users.id, { onDelete: 'set null' }),

    action: varchar('action', { length: 100 }).notNull(),

    details: text('details'),

    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull()
});


// ==========================================
// 15. NOTIFICATIONS
// ==========================================

export const notifications = pgTable('notifications', {
    id: uuid('id').defaultRandom().primaryKey(),

    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),

    issueId: uuid('issue_id')
        .references(() => issues.id, { onDelete: 'set null' }),

    message: text('message').notNull(),

    isRead: boolean('is_read')
        .notNull()
        .default(false),

    createdAt: timestamp('created_at', { withTimezone: true })
        .defaultNow()
        .notNull()
});
