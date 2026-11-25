import path from 'node:path';
import { fileURLToPath } from 'node:url';
import swaggerJsdoc from 'swagger-jsdoc';

import { env } from './env.js';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TeamFlow API',
            version: '1.0.0',
            description:
                'REST API documentation for the TeamFlow project management backend.'
        },
        servers: [
            {
                url: env.BASE_URL,
                description: 'Local development server'
            }
        ],
        tags: [
            {
                name: 'Auth',
                description: 'Authentication endpoints'
            },
            {
                name: 'Users',
                description: 'User profile endpoints'
            },
            {
                name: 'Workspaces',
                description: 'Workspace management endpoints'
            },
            {
                name: 'Workspace Members',
                description: 'Workspace membership and role management endpoints'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                RegisterRequest: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 100,
                            example: 'Ada Lovelace',
                            description:
                                'User display name. Stored in the users.name column.'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            maxLength: 255,
                            example: 'ada@example.com',
                            description:
                                'Unique email address. Stored in the users.email column.'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            minLength: 8,
                            example: 'strongPassword123',
                            description:
                                'Plain-text password sent by the client. It is hashed before being stored in users.password_hash.'
                        }
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            example: '0f8fad5b-d9cb-469f-a165-70867728950e'
                        },
                        name: {
                            type: 'string',
                            example: 'Ada Lovelace'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'ada@example.com'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2026-11-24T12:00:00.000Z',
                            description:
                                'Creation timestamp. Stored in the users.created_at column.'
                        }
                    }
                },
                UpdateUserRequest: {
                    type: 'object',
                    minProperties: 1,
                    properties: {
                        name: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 100,
                            example: 'Ada Lovelace',
                            description:
                                'New display name. Stored in the users.name column.'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            maxLength: 255,
                            example: 'ada@example.com',
                            description:
                                'New unique email address. Stored in the users.email column.'
                        }
                    }
                },
                UpdatedUser: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            example: '0f8fad5b-d9cb-469f-a165-70867728950e'
                        },
                        name: {
                            type: 'string',
                            example: 'Ada Lovelace'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'ada@example.com'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2026-11-24T12:00:00.000Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2026-11-24T12:30:00.000Z',
                            description:
                                'Last update timestamp. Stored in the users.updated_at column.'
                        }
                    }
                },
                UpdateMeResponse: {
                    type: 'object',
                    required: ['success', 'message', 'data'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Profile updated successfully'
                        },
                        data: {
                            $ref: '#/components/schemas/UpdatedUser'
                        }
                    }
                },
                GetUserResponse: {
                    type: 'object',
                    required: ['success', 'message', 'data'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'User profile retrieved successfully'
                        },
                        data: {
                            $ref: '#/components/schemas/User'
                        }
                    }
                },
                Workspace: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            example: '6a1f2c3d-4b5e-6789-abcd-ef0123456789'
                        },
                        name: {
                            type: 'string',
                            maxLength: 150,
                            example: 'Engineering Team'
                        },
                        slug: {
                            type: 'string',
                            maxLength: 100,
                            example: 'engineering-team',
                            description:
                                'URL-friendly identifier generated from the workspace name. Stored in the workspaces.slug column.'
                        },
                        description: {
                            type: 'string',
                            maxLength: 1000,
                            nullable: true,
                            example: 'Workspace for engineering projects'
                        },
                        createdBy: {
                            type: 'string',
                            format: 'uuid',
                            example: '0f8fad5b-d9cb-469f-a165-70867728950e',
                            description:
                                'ID of the user who created the workspace. Stored in the workspaces.created_by column.'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2026-11-25T09:00:00.000Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2026-11-25T09:00:00.000Z'
                        }
                    }
                },
                WorkspaceWithRole: {
                    allOf: [
                        {
                            $ref: '#/components/schemas/Workspace'
                        },
                        {
                            type: 'object',
                            properties: {
                                role: {
                                    type: 'string',
                                    enum: ['owner', 'admin', 'member'],
                                    example: 'owner',
                                    description:
                                        'The current user\'s role in the workspace.'
                                }
                            }
                        }
                    ]
                },
                CreateWorkspaceRequest: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 150,
                            example: 'Engineering Team',
                            description:
                                'Workspace name. A URL-friendly slug is generated from it.'
                        },
                        description: {
                            type: 'string',
                            maxLength: 1000,
                            example: 'Workspace for engineering projects'
                        }
                    }
                },
                UpdateWorkspaceRequest: {
                    type: 'object',
                    minProperties: 1,
                    properties: {
                        name: {
                            type: 'string',
                            minLength: 2,
                            maxLength: 150,
                            example: 'Engineering Department',
                            description:
                                'New workspace name. The slug is not regenerated.'
                        },
                        description: {
                            type: 'string',
                            maxLength: 1000,
                            nullable: true,
                            example: 'Updated workspace description'
                        }
                    }
                },
                CreateWorkspaceResponse: {
                    type: 'object',
                    required: ['success', 'message', 'data'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Workspace created successfully'
                        },
                        data: {
                            $ref: '#/components/schemas/Workspace'
                        }
                    }
                },
                GetWorkspacesResponse: {
                    type: 'object',
                    required: ['success', 'message', 'data'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Workspaces retrieved successfully'
                        },
                        data: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/WorkspaceWithRole'
                            }
                        }
                    }
                },
                GetWorkspaceResponse: {
                    type: 'object',
                    required: ['success', 'message', 'data'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Workspace retrieved successfully'
                        },
                        data: {
                            $ref: '#/components/schemas/Workspace'
                        }
                    }
                },
                UpdateWorkspaceResponse: {
                    type: 'object',
                    required: ['success', 'message', 'data'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Workspace updated successfully'
                        },
                        data: {
                            $ref: '#/components/schemas/Workspace'
                        }
                    }
                },
                DeleteWorkspaceResponse: {
                    type: 'object',
                    required: ['success', 'message'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Workspace deleted successfully'
                        }
                    }
                },
                AddWorkspaceMemberRequest: {
                    type: 'object',
                    required: ['email'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'grace@example.com',
                            description:
                                'Email of an existing registered user to add to the workspace.'
                        },
                        role: {
                            type: 'string',
                            enum: ['admin', 'member'],
                            default: 'member',
                            example: 'member',
                            description:
                                'Role assigned to the new member. Only the workspace owner can assign admin.'
                        }
                    }
                },
                UpdateWorkspaceMemberRequest: {
                    type: 'object',
                    required: ['role'],
                    properties: {
                        role: {
                            type: 'string',
                            enum: ['admin', 'member'],
                            example: 'admin',
                            description:
                                'New role for the membership. The owner role cannot be changed here.'
                        }
                    }
                },
                WorkspaceMember: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            example: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
                            description:
                                'ID of the workspace membership record.'
                        },
                        workspaceId: {
                            type: 'string',
                            format: 'uuid',
                            example: '6a1f2c3d-4b5e-6789-abcd-ef0123456789'
                        },
                        userId: {
                            type: 'string',
                            format: 'uuid',
                            example: '0f8fad5b-d9cb-469f-a165-70867728950e'
                        },
                        name: {
                            type: 'string',
                            example: 'Grace Hopper'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'grace@example.com'
                        },
                        role: {
                            type: 'string',
                            enum: ['owner', 'admin', 'member'],
                            example: 'member'
                        },
                        joinedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2026-11-25T09:00:00.000Z'
                        }
                    }
                },
                AddWorkspaceMemberResponse: {
                    type: 'object',
                    required: ['success', 'message', 'data'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Workspace member added successfully'
                        },
                        data: {
                            $ref: '#/components/schemas/WorkspaceMember'
                        }
                    }
                },
                GetWorkspaceMembersResponse: {
                    type: 'object',
                    required: ['success', 'data'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        data: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/WorkspaceMember'
                            }
                        }
                    }
                },
                GetWorkspaceMemberResponse: {
                    type: 'object',
                    required: ['success', 'data'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        data: {
                            $ref: '#/components/schemas/WorkspaceMember'
                        }
                    }
                },
                UpdateWorkspaceMemberResponse: {
                    type: 'object',
                    required: ['success', 'message', 'data'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Workspace member role updated successfully'
                        },
                        data: {
                            $ref: '#/components/schemas/WorkspaceMember'
                        }
                    }
                },
                RemoveWorkspaceMemberResponse: {
                    type: 'object',
                    required: ['success', 'message'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Workspace member removed successfully'
                        }
                    }
                },
                RegisterResponse: {
                    type: 'object',
                    required: ['success', 'message', 'data'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'User registered successfully'
                        },
                        data: {
                            $ref: '#/components/schemas/User'
                        }
                    }
                },
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            maxLength: 255,
                            example: 'ada@example.com',
                            description:
                                'Registered email address. Matched against the users.email column.'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            minLength: 1,
                            example: 'strongPassword123',
                            description:
                                'Plain-text password. It is compared with the hashed value in users.password_hash.'
                        }
                    }
                },
                LoginUser: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            example: '0f8fad5b-d9cb-469f-a165-70867728950e'
                        },
                        name: {
                            type: 'string',
                            example: 'Ada Lovelace'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'ada@example.com'
                        }
                    }
                },
                LoginResponse: {
                    type: 'object',
                    required: ['success', 'message', 'data'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example: 'Login successful'
                        },
                        data: {
                            type: 'object',
                            required: ['token', 'user'],
                            properties: {
                                token: {
                                    type: 'string',
                                    description:
                                        'Signed JWT. Send it as `Authorization: Bearer <token>`.',
                                    example:
                                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example.signature'
                                },
                                user: {
                                    $ref: '#/components/schemas/LoginUser'
                                }
                            }
                        }
                    }
                },
                GetMeResponse: {
                    type: 'object',
                    required: ['success', 'data'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        data: {
                            $ref: '#/components/schemas/User'
                        }
                    }
                },
                LogoutResponse: {
                    type: 'object',
                    required: ['success', 'message'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: true
                        },
                        message: {
                            type: 'string',
                            example:
                                'Logout successful. Please remove your authentication token.'
                        }
                    }
                },
                UnauthorizedErrorResponse: {
                    type: 'object',
                    required: ['success', 'message'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            example: 'Invalid email or password'
                        }
                    }
                },
                ForbiddenErrorResponse: {
                    type: 'object',
                    required: ['success', 'message'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            example:
                                'You do not have access to this workspace'
                        }
                    }
                },
                NotFoundErrorResponse: {
                    type: 'object',
                    required: ['success', 'message'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            example: 'User not found'
                        }
                    }
                },
                ValidationErrorResponse: {
                    type: 'object',
                    required: ['success', 'message', 'errors'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            example: 'Validation failed'
                        },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['field', 'message'],
                                properties: {
                                    field: {
                                        type: 'string',
                                        example: 'email'
                                    },
                                    message: {
                                        type: 'string',
                                        example:
                                            'Please provide a valid email address'
                                    }
                                }
                            }
                        }
                    }
                },
                ConflictErrorResponse: {
                    type: 'object',
                    required: ['success', 'message'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            example: 'Email is already registered'
                        }
                    }
                },
                ServerErrorResponse: {
                    type: 'object',
                    required: ['success', 'message'],
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        message: {
                            type: 'string',
                            example: 'Internal server error'
                        }
                    }
                }
            }
        }
    },
    apis: [path.join(currentDirectory, '../docs/*.docs.js')]
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
