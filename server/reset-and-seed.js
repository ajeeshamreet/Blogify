import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const prisma = new PrismaClient();

async function main() {
  console.log('🗑️  Clearing old data...');
  
  // Delete in correct order due to foreign keys
  await prisma.comment.deleteMany({});
  console.log('  - Comments deleted');
  
  await prisma.like.deleteMany({});
  console.log('  - Likes deleted');
  
  await prisma.bookmark.deleteMany({});
  console.log('  - Bookmarks deleted');
  
  await prisma.post.deleteMany({});
  console.log('  - Posts deleted');
  
  await prisma.category.deleteMany({});
  console.log('  - Categories deleted');
  
  await prisma.tag.deleteMany({});
  console.log('  - Tags deleted');
  
  await prisma.user.deleteMany({});
  console.log('  - Users deleted');
  
  console.log('✅ Old data cleared');
  
  // Disconnect before running seed
  await prisma.$disconnect();
  
  console.log('🌱 Running seed...');
  
  // Run seed as separate process
  const { stdout, stderr } = await execAsync('node prisma/seed.js');
  console.log(stdout);
  if (stderr) console.error(stderr);
  
  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
