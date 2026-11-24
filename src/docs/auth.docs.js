/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: >
 *       Creates a new TeamFlow user account. The request body is validated with
 *       the existing Zod `registerSchema` before the password is hashed and the
 *       user is stored in the `users` table. This endpoint is public, so no
 *       Bearer token is required.
 *     operationId: registerUser
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *           example:
 *             name: Ada Lovelace
 *             email: ada@example.com
 *             password: strongPassword123
 *     responses:
 *       '201':
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *             example:
 *               success: true
 *               message: User registered successfully
 *               data:
 *                 id: 0f8fad5b-d9cb-469f-a165-70867728950e
 *                 name: Ada Lovelace
 *                 email: ada@example.com
 *                 createdAt: '2026-11-24T12:00:00.000Z'
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
 *                 - field: password
 *                   message: Password must contain at least 8 characters
 *       '409':
 *         description: >
 *           The email address is already registered.
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
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Log in an existing user
 *     description: >
 *       Validates credentials with the existing Zod `loginSchema`, compares the
 *       password with the stored hash, and returns a signed JWT plus the user's
 *       basic details. This endpoint is public, so no Bearer token is required.
 *     operationId: loginUser
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             email: ada@example.com
 *             password: strongPassword123
 *     responses:
 *       '200':
 *         description: Login successful. Use the returned token for protected endpoints.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               success: true
 *               message: Login successful
 *               data:
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example.signature
 *                 user:
 *                   id: 0f8fad5b-d9cb-469f-a165-70867728950e
 *                   name: Ada Lovelace
 *                   email: ada@example.com
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
 *                 - field: email
 *                   message: Please provide a valid email address
 *       '401':
 *         description: Invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedErrorResponse'
 *             example:
 *               success: false
 *               message: Invalid email or password
 *       '500':
 *         description: Unexpected server or database error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerErrorResponse'
 */

/**
 * @openapi
 * /api/v1/auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get the currently authenticated user
 *     description: >
 *       Returns the profile of the user identified by the Bearer JWT. The token
 *       is verified by the existing `authenticate` middleware, which attaches
 *       the user ID to the request before this controller runs.
 *     operationId: getCurrentUser
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Current user profile returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetMeResponse'
 *             example:
 *               success: true
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
 *         description: The user belonging to the token no longer exists.
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

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Log out the current user
 *     description: >
 *       Verifies the Bearer JWT and returns a success message. The API uses
 *       stateless JWTs, so the client is responsible for deleting the token.
 *     operationId: logoutUser
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Logout acknowledged successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutResponse'
 *             example:
 *               success: true
 *               message: Logout successful. Please remove your authentication token.
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
 */
