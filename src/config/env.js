
import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum([
        'development',
        'production',
        'test'
    ]).default('development'),

    PORT: z.coerce.number().default(3000),

    BASE_URL: z.string().url(),

    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

    JWT_SECRET: z.string().min(32, 'JWT_SECRET must contain at least 32 characters'),

    JWT_EXPIRES_IN: z.string().default('1d')
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error('Invalid environment variables:');
    console.error(z.treeifyError(result.error));
    process.exit(1);
}

export const env = result.data;
