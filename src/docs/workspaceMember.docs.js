/**
 * @openapi
 * /api/v1/workspaces/{workspaceId}/members:
 *   post:
 *     tags:
 *       - Workspace Members
 *     summary: Add a member to a workspace
 *     description: >
 *       Adds an existing registered user to the workspace by email. Authenticated
 *       users must be the workspace owner or admin. Only the owner can assign the
 *       admin role. The requester's membership determines the allowed role.
 *     operationId: addWorkspaceMember
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workspaceId
 *         required: true
 *         description: UUID of the workspace.
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddWorkspaceMemberRequest'
 *           example:
 *             email: grace@example.com
 *             role: member
 *     responses:
 *       '201':
 *         description: Member added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddWorkspaceMemberResponse'
 *       '400':
 *         description: Validation failed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       '401':
 *         description: Authentication token is missing, invalid, or expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *       '403':
 *         description: >
 *           The requester is not a member, lacks permission, or tried to assign
 *           the admin role without being the owner.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenErrorResponse'
 *       '404':
 *         description: Workspace or user with the provided email was not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundErrorResponse'
 *       '409':
 *         description: The user is already a member of this workspace.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConflictErrorResponse'
 *       '500':
 *         description: Unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 *   get:
 *     tags:
 *       - Workspace Members
 *     summary: Get all members of a workspace
 *     description: >
 *       Returns all workspace members with their user details and roles. The
 *       authenticated user must be a member of the workspace.
 *     operationId: getWorkspaceMembers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workspaceId
 *         required: true
 *         description: UUID of the workspace.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Members retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetWorkspaceMembersResponse'
 *       '400':
 *         description: Invalid workspace ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       '401':
 *         description: Authentication token is missing, invalid, or expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *       '403':
 *         description: The authenticated user is not a member of this workspace.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenErrorResponse'
 *       '404':
 *         description: Workspace not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundErrorResponse'
 *       '500':
 *         description: Unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 *
 * @openapi
 * /api/v1/workspaces/{workspaceId}/members/{memberId}:
 *   get:
 *     tags:
 *       - Workspace Members
 *     summary: Get one workspace member
 *     description: >
 *       Returns a single workspace membership by its membership ID. The
 *       authenticated user must be a member of the workspace.
 *     operationId: getWorkspaceMemberById
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workspaceId
 *         required: true
 *         description: UUID of the workspace.
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: memberId
 *         required: true
 *         description: UUID of the workspace membership record.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Member retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetWorkspaceMemberResponse'
 *       '400':
 *         description: Invalid workspace ID or membership ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       '401':
 *         description: Authentication token is missing, invalid, or expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *       '403':
 *         description: The authenticated user is not a member of this workspace.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenErrorResponse'
 *       '404':
 *         description: Workspace or membership not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundErrorResponse'
 *       '500':
 *         description: Unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 *   patch:
 *     tags:
 *       - Workspace Members
 *     summary: Update a workspace member role
 *     description: >
 *       Changes a member's role between admin and member. Only the workspace
 *       owner can update member roles. The owner's own role cannot be changed
 *       through this endpoint.
 *     operationId: updateWorkspaceMember
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workspaceId
 *         required: true
 *         description: UUID of the workspace.
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: memberId
 *         required: true
 *         description: UUID of the workspace membership record.
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWorkspaceMemberRequest'
 *           example:
 *             role: admin
 *     responses:
 *       '200':
 *         description: Member role updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateWorkspaceMemberResponse'
 *       '400':
 *         description: Validation failed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       '401':
 *         description: Authentication token is missing, invalid, or expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *       '403':
 *         description: >
 *           The requester is not a member, is not the owner, or tried to change
 *           the owner role.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenErrorResponse'
 *       '404':
 *         description: Workspace or membership not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundErrorResponse'
 *       '500':
 *         description: Unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 *   delete:
 *     tags:
 *       - Workspace Members
 *     summary: Remove a member from a workspace
 *     description: >
 *       Removes a workspace membership. Owners and admins may remove members,
 *       but admins can only remove regular members. The workspace owner cannot
 *       be removed.
 *     operationId: removeWorkspaceMember
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workspaceId
 *         required: true
 *         description: UUID of the workspace.
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: memberId
 *         required: true
 *         description: UUID of the workspace membership record.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Member removed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RemoveWorkspaceMemberResponse'
 *       '400':
 *         description: Invalid workspace ID or membership ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       '401':
 *         description: Authentication token is missing, invalid, or expired.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *       '403':
 *         description: >
 *           The requester lacks permission, tried to remove the owner, or an
 *           admin tried to remove another admin.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenErrorResponse'
 *       '404':
 *         description: Workspace or membership not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundErrorResponse'
 *       '500':
 *         description: Unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */
