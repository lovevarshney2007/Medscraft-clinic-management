const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const target = process.argv[2];

if (!['postgres', 'sqlite'].includes(target)) {
  console.log('Usage: node scripts/switch-db.js [postgres|sqlite]');
  process.exit(1);
}

const schemaPath = path.join(__dirname, '../prisma/schema.prisma');
let content = fs.readFileSync(schemaPath, 'utf8');

if (target === 'postgres') {
  content = content.replace(/provider\s*=\s*"sqlite"/, 'provider = "postgresql"');
  console.log('🔄 Switched Prisma provider to: postgresql');
} else {
  content = content.replace(/provider\s*=\s*"postgresql"/, 'provider = "sqlite"');
  console.log('🔄 Switched Prisma provider to: sqlite');
}

fs.writeFileSync(schemaPath, content, 'utf8');
console.log('⚡ Regenerating Prisma client...');
execSync('npx prisma generate', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
console.log(`✅ Database provider successfully updated to ${target}!`);
