/**
 * @openapi
 * /api/v1/users/me:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update the current user's profile
 *     description: >
 *       Updates the name and/or email of the user identified by the Bearer JWT.
 *       The request body is validated with the existing Zod `updateUserSchema`,
 *       which requires at least one field. The new email must not belong to
 *       another account. The `authenticate` middleware attaches the user ID to
 *       the request before this controller runs.
 *     operationId: updateCurrentUser
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *           example:
 *             name: Ada Byron
 *             email: ada.byron@example.com
 *     responses:
 *       '200':
 *         description: Profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateMeResponse'
 *             example:
 *               success: true
 *               message: Profile updated successfully
 *               data:
 *                 id: 0f8fad5b-d9cb-469f-a165-70867728950e
 *                 name: Ada Byron
 *                 email: ada.byron@example.com
 *                 createdAt: '2026-11-24T12:00:00.000Z'
 *                 updatedAt: '2026-11-24T12:30:00.000Z'
 *       '400':
 *         description: >
 *           Validation failed. This includes an empty body or invalid field
 *           values. The `errors` array contains the invalid fields and the
 *           corresponding Zod validation messages.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *             example:
 *               success: false
 *               message: Validation failed
 *               errors:
 *                 - field: ''
 *                   message: At least one field must be provided
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
 *       '404':
 *         description: The user belonging to the token no longer exists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundErrorResponse'
 *             example:
 *               success: false
 *               message: User not found
 *       '409':
 *         description: The requested email address is already registered.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConflictErrorResponse'
 *             example:
 *               success: false
 *               message: Email is already registered
 *       '500':
 *         description: Unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a user's public profile by ID
 *     description: >
 *       Returns the public profile of the user with the given ID. The request
 *       must include a valid Bearer JWT, which is verified by the existing
 *       `authenticate` middleware. Only public fields (id, name, email,
 *       createdAt) are returned.
 *     operationId: getUserById
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the user to retrieve.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 0f8fad5b-d9cb-469f-a165-70867728950e
 *     responses:
 *       '200':
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUserResponse'
 *             example:
 *               success: true
 *               message: User profile retrieved successfully
 *               data:
 *                 id: 0f8fad5b-d9cb-469f-a165-70867728950e
 *                 name: Ada Lovelace
 *                 email: ada@example.com
 *                 createdAt: '2026-11-24T12:00:00.000Z'
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
 *       '404':
 *         description: No user exists with the provided ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundErrorResponse'
 *             example:
 *               success: false
 *               message: User not found
 *       '500':
 *         description: Unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */
