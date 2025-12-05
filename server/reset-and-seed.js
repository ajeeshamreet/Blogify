import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️  Clearing old data...');
  
  // Delete in correct order due to foreign keys
  await prisma.comment.deleteMany({});
  await prisma.like.deleteMany({});
  await prisma.bookmark.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.user.deleteMany({});
  
  console.log('✅ Old data cleared');
  console.log('🌱 Running seed...');
  
  // Import and run seed
  const { default: seed } = await import('./prisma/seed.js');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
