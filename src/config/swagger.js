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
