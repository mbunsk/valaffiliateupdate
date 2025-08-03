// Environment validation and security checks
export function validateEnvironment() {
  const requiredEnvVars = [
    'DATABASE_URL',
    'OPENAI_API_KEY'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  // Validate DATABASE_URL format (basic check)
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl.startsWith('postgresql://') && !dbUrl.startsWith('postgres://')) {
    throw new Error('DATABASE_URL must be a valid PostgreSQL connection string');
  }

  // Validate OPENAI_API_KEY format (basic check)
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey.startsWith('sk-')) {
    console.warn('OPENAI_API_KEY does not appear to be in expected format');
  }

  // Generate JWT_SECRET if not provided
  if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = generateSecureSecret();
    console.log('Generated JWT_SECRET for this session');
  }

  console.log('✅ Environment validation passed');
}

import crypto from 'node:crypto';

function generateSecureSecret(): string {
  return crypto.randomBytes(64).toString('hex');
}