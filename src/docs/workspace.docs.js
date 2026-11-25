/**
 * @openapi
 * /api/v1/workspaces:
 *   post:
 *     tags:
 *       - Workspaces
 *     summary: Create a workspace
 *     description: >
 *       Creates a new workspace and adds the authenticated user as its owner.
 *       The slug is generated from the workspace name. The request body is
 *       validated with the existing Zod `createWorkspaceSchema`. All workspace
 *       routes require a valid Bearer JWT.
 *     operationId: createWorkspace
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWorkspaceRequest'
 *           example:
 *             name: Engineering Team
 *             description: Workspace for engineering projects
 *     responses:
 *       '201':
 *         description: Workspace created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateWorkspaceResponse'
 *             example:
 *               success: true
 *               message: Workspace created successfully
 *               data:
 *                 id: 6a1f2c3d-4b5e-6789-abcd-ef0123456789
 *                 name: Engineering Team
 *                 slug: engineering-team
 *                 description: Workspace for engineering projects
 *                 createdBy: 0f8fad5b-d9cb-469f-a165-70867728950e
 *                 createdAt: '2026-11-25T09:00:00.000Z'
 *                 updatedAt: '2026-11-25T09:00:00.000Z'
 *       '400':
 *         description: >
 *           Validation failed. The `errors` array contains the invalid fields
 *           and the corresponding Zod validation messages.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *             example:
 *               success: false
 *               message: Validation failed
 *               errors:
 *                 - field: name
 *                   message: Workspace name must contain at least 2 characters
 *       '401':
 *         description: >
 *           Authentication token is missing, invalid, or expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *             examples:
 *               missingToken:
 *                 summary: Missing Authorization header
 *                 value:
 *                   success: false
 *                   message: Authentication token is required
 *               invalidToken:
 *                 summary: Invalid or expired token
 *                 value:
 *                   success: false
 *                   message: Invalid or expired authentication token
 *       '409':
 *         description: >
 *           A workspace with the generated slug already exists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConflictErrorResponse'
 *             example:
 *               success: false
 *               message: Workspace slug already exists. Choose another name.
 *       '500':
 *         description: Unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */

/**
 * @openapi
 * /api/v1/workspaces:
 *   get:
 *     tags:
 *       - Workspaces
 *     summary: Get workspaces for the current user
 *     description: >
 *       Returns every workspace the authenticated user belongs to, including
 *       the user's role in each workspace. Results are ordered by creation date
 *       descending.
 *     operationId: getMyWorkspaces
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Workspaces retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetWorkspacesResponse'
 *             example:
 *               success: true
 *               message: Workspaces retrieved successfully
 *               data:
 *                 - id: 6a1f2c3d-4b5e-6789-abcd-ef0123456789
 *                   name: Engineering Team
 *                   slug: engineering-team
 *                   description: Workspace for engineering projects
 *                   createdBy: 0f8fad5b-d9cb-469f-a165-70867728950e
 *                   createdAt: '2026-11-25T09:00:00.000Z'
 *                   updatedAt: '2026-11-25T09:00:00.000Z'
 *                   role: owner
 *       '401':
 *         description: >
 *           Authentication token is missing, invalid, or expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *             examples:
 *               missingToken:
 *                 summary: Missing Authorization header
 *                 value:
 *                   success: false
 *                   message: Authentication token is required
 *               invalidToken:
 *                 summary: Invalid or expired token
 *                 value:
 *                   success: false
 *                   message: Invalid or expired authentication token
 *       '500':
 *         description: Unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */

/**
 * @openapi
 * /api/v1/workspaces/{id}:
 *   get:
 *     tags:
 *       - Workspaces
 *     summary: Get workspace details
 *     description: >
 *       Returns the workspace with the given ID. The authenticated user must be
 *       a member of the workspace, otherwise a 403 response is returned.
 *     operationId: getWorkspaceById
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the workspace to retrieve.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 6a1f2c3d-4b5e-6789-abcd-ef0123456789
 *     responses:
 *       '200':
 *         description: Workspace retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetWorkspaceResponse'
 *             example:
 *               success: true
 *               message: Workspace retrieved successfully
 *               data:
 *                 id: 6a1f2c3d-4b5e-6789-abcd-ef0123456789
 *                 name: Engineering Team
 *                 slug: engineering-team
 *                 description: Workspace for engineering projects
 *                 createdBy: 0f8fad5b-d9cb-469f-a165-70867728950e
 *                 createdAt: '2026-11-25T09:00:00.000Z'
 *                 updatedAt: '2026-11-25T09:00:00.000Z'
 *       '400':
 *         description: The workspace ID is not a valid UUID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *             example:
 *               success: false
 *               message: Validation failed
 *               errors:
 *                 - field: id
 *                   message: Invalid workspace ID
 *       '401':
 *         description: >
 *           Authentication token is missing, invalid, or expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *             examples:
 *               missingToken:
 *                 summary: Missing Authorization header
 *                 value:
 *                   success: false
 *                   message: Authentication token is required
 *               invalidToken:
 *                 summary: Invalid or expired token
 *                 value:
 *                   success: false
 *                   message: Invalid or expired authentication token
 *       '403':
 *         description: The current user is not a member of this workspace.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenErrorResponse'
 *             example:
 *               success: false
 *               message: You do not have access to this workspace
 *       '404':
 *         description: No workspace exists with the provided ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundErrorResponse'
 *             example:
 *               success: false
 *               message: Workspace not found
 *       '500':
 *         description: Unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 *   patch:
 *     tags:
 *       - Workspaces
 *     summary: Update a workspace
 *     description: >
 *       Updates the name and/or description of a workspace. The authenticated
 *       user must be the workspace owner or an admin. The request body is
 *       validated with the existing Zod `updateWorkspaceSchema`, which requires
 *       at least one field. The slug is not regenerated when the name changes.
 *     operationId: updateWorkspace
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the workspace to update.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 6a1f2c3d-4b5e-6789-abcd-ef0123456789
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWorkspaceRequest'
 *           example:
 *             name: Engineering Department
 *             description: Updated workspace description
 *     responses:
 *       '200':
 *         description: Workspace updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateWorkspaceResponse'
 *             example:
 *               success: true
 *               message: Workspace updated successfully
 *               data:
 *                 id: 6a1f2c3d-4b5e-6789-abcd-ef0123456789
 *                 name: Engineering Department
 *                 slug: engineering-team
 *                 description: Updated workspace description
 *                 createdBy: 0f8fad5b-d9cb-469f-a165-70867728950e
 *                 createdAt: '2026-11-25T09:00:00.000Z'
 *                 updatedAt: '2026-11-25T09:30:00.000Z'
 *       '400':
 *         description: >
 *           Validation failed. This includes an invalid workspace ID or an
 *           empty/invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *             examples:
 *               invalidId:
 *                 summary: Invalid workspace ID
 *                 value:
 *                   success: false
 *                   message: Validation failed
 *                   errors:
 *                     - field: id
 *                       message: Invalid workspace ID
 *               emptyBody:
 *                 summary: No fields provided
 *                 value:
 *                   success: false
 *                   message: Validation failed
 *                   errors:
 *                     - field: ''
 *                       message: At least one field must be provided
 *       '401':
 *         description: >
 *           Authentication token is missing, invalid, or expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *             examples:
 *               missingToken:
 *                 summary: Missing Authorization header
 *                 value:
 *                   success: false
 *                   message: Authentication token is required
 *               invalidToken:
 *                 summary: Invalid or expired token
 *                 value:
 *                   success: false
 *                   message: Invalid or expired authentication token
 *       '403':
 *         description: >
 *           The current user is not a member of the workspace, or is a member
 *           without owner/admin permissions.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenErrorResponse'
 *             examples:
 *               notMember:
 *                 summary: Not a workspace member
 *                 value:
 *                   success: false
 *                   message: You do not have access to this workspace
 *               insufficientRole:
 *                 summary: Member without update permission
 *                 value:
 *                   success: false
 *                   message: Only workspace owners and admins can update the workspace
 *       '404':
 *         description: >
 *           No workspace exists with the provided ID. This is returned when the
 *           user is not a member and no workspace exists with that ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundErrorResponse'
 *             example:
 *               success: false
 *               message: Workspace not found
 *       '500':
 *         description: Unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 *   delete:
 *     tags:
 *       - Workspaces
 *     summary: Delete a workspace
 *     description: >
 *       Deletes the workspace with the given ID. Only the workspace owner may
 *       delete it. Related members are removed by the database cascade.
 *     operationId: deleteWorkspace
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the workspace to delete.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 6a1f2c3d-4b5e-6789-abcd-ef0123456789
 *     responses:
 *       '200':
 *         description: Workspace deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteWorkspaceResponse'
 *             example:
 *               success: true
 *               message: Workspace deleted successfully
 *       '400':
 *         description: The workspace ID is not a valid UUID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *             example:
 *               success: false
 *               message: Validation failed
 *               errors:
 *                 - field: id
 *                   message: Invalid workspace ID
 *       '401':
 *         description: >
 *           Authentication token is missing, invalid, or expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *             examples:
 *               missingToken:
 *                 summary: Missing Authorization header
 *                 value:
 *                   success: false
 *                   message: Authentication token is required
 *               invalidToken:
 *                 summary: Invalid or expired token
 *                 value:
 *                   success: false
 *                   message: Invalid or expired authentication token
 *       '403':
 *         description: >
 *           The current user is not a member of the workspace, or is not the
 *           workspace owner.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenErrorResponse'
 *             examples:
 *               notMember:
 *                 summary: Not a workspace member
 *                 value:
 *                   success: false
 *                   message: You do not have access to this workspace
 *               notOwner:
 *                 summary: Member without delete permission
 *                 value:
 *                   success: false
 *                   message: Only the workspace owner can delete the workspace
 *       '404':
 *         description: No workspace exists with the provided ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundErrorResponse'
 *             example:
 *               success: false
 *               message: Workspace not found
 *       '500':
 *         description: Unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */
