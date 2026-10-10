const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const schemaPath = path.join(rootDir, 'prisma/schema.prisma');

function initializeDatabase() {
  console.log('🔍 [Medscraft DB Initializer] Checking database configuration...');

  const dbUrl = process.env.DATABASE_URL || '';
  let schema = fs.readFileSync(schemaPath, 'utf8');

  // 1. Detect if PostgreSQL is configured via DATABASE_URL
  const isPostgresUrl = dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://');
  const isSqliteProvider = schema.includes('provider = "sqlite"') || schema.includes("provider = 'sqlite'");
  const isPostgresProvider = schema.includes('provider = "postgresql"') || schema.includes("provider = 'postgresql'");

  if (isPostgresUrl && isSqliteProvider) {
    console.log('🔄 Detected PostgreSQL DATABASE_URL. Switching Prisma provider to "postgresql"...');
    schema = schema.replace(/provider\s*=\s*["']sqlite["']/, 'provider = "postgresql"');
    fs.writeFileSync(schemaPath, schema, 'utf8');
    console.log('⚡ Regenerating Prisma Client for PostgreSQL...');
    execSync('npx prisma generate', { stdio: 'inherit', cwd: rootDir });
  } else if (!isPostgresUrl && isPostgresProvider && (!dbUrl || dbUrl.startsWith('file:'))) {
    console.log('🔄 Detected SQLite DATABASE_URL. Switching Prisma provider to "sqlite"...');
    schema = schema.replace(/provider\s*=\s*["']postgresql["']/, 'provider = "sqlite"');
    fs.writeFileSync(schemaPath, schema, 'utf8');
    console.log('⚡ Regenerating Prisma Client for SQLite...');
    execSync('npx prisma generate', { stdio: 'inherit', cwd: rootDir });
  }

  // 2. Ensure Prisma schema is pushed to the target database
  try {
    console.log('🔄 Syncing schema to database (npx prisma db push)...');
    execSync('npx prisma db push --skip-generate --accept-data-loss', { stdio: 'inherit', cwd: rootDir });
    console.log('✅ Database schema verified.');
  } catch (err) {
    console.error('⚠️ Warning: Prisma db push encountered an issue:', err.message);
  }

  // 3. Seed initial data if the database is empty
  try {
    console.log('🌱 Checking initial seed data...');
    execSync('node prisma/seed.js', { stdio: 'inherit', cwd: rootDir });
  } catch (err) {
    console.error('⚠️ Warning: Database seeding encountered an issue:', err.message);
  }

  console.log('🎉 [Medscraft DB Initializer] Database is ready.');
}

initializeDatabase();
