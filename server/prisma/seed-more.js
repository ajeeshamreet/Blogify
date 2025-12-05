import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addMorePosts() {
  console.log('🌱 Adding more posts...');

  // Get existing users and categories
  const users = await prisma.user.findMany();
  const techCategory = await prisma.category.findUnique({ where: { name: 'Technology' } });
  const lifestyleCategory = await prisma.category.findUnique({ where: { name: 'Lifestyle' } });
  const travelCategory = await prisma.category.findUnique({ where: { name: 'Travel' } });
  const foodCategory = await prisma.category.findUnique({ where: { name: 'Food' } });

  const reactTag = await prisma.tag.findUnique({ where: { name: 'react' } });
  const javascriptTag = await prisma.tag.findUnique({ where: { name: 'javascript' } });
  const webdevTag = await prisma.tag.findUnique({ where: { name: 'webdev' } });
  const tipsTag = await prisma.tag.findUnique({ where: { name: 'tips' } });

  const user1 = users[0];
  const user2 = users[1];
  const user3 = users[2];

  // Technology Posts (10 more)
  const techPosts = [
    {
      title: 'Building Scalable APIs with Node.js',
      slug: 'building-scalable-apis-nodejs',
      content: `<h2>Creating Production-Ready APIs</h2>
      <p>Learn how to build scalable, maintainable APIs using Node.js and Express that can handle millions of requests.</p>
      <h3>Architecture Patterns</h3>
      <p>We'll explore MVC, layered architecture, and microservices patterns for organizing your API code.</p>
      <h3>Performance Optimization</h3>
      <p>Implement caching strategies, database indexing, and load balancing to ensure your API performs under heavy load.</p>
      <h3>Security Best Practices</h3>
      <p>Protect your API with JWT authentication, rate limiting, input validation, and HTTPS.</p>`,
      excerpt: 'Master the art of building production-ready, scalable APIs with Node.js.',
      coverImage: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      readingTime: 8,
    },
    {
      title: 'TypeScript Best Practices for 2025',
      slug: 'typescript-best-practices-2025',
      content: `<h2>Modern TypeScript Development</h2>
      <p>TypeScript has become the standard for large-scale JavaScript applications. Learn the best practices for 2025.</p>
      <h3>Type Safety</h3>
      <p>Leverage TypeScript's type system to catch errors at compile time and improve code quality.</p>
      <h3>Advanced Types</h3>
      <p>Master utility types, conditional types, and mapped types for more expressive code.</p>`,
      excerpt: 'Essential TypeScript patterns and practices for modern development.',
      coverImage: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
      readingTime: 6,
    },
  ];

  for (const postData of techPosts) {
    await prisma.post.create({
      data: {
        ...postData,
        published: true,
        authorId: user1.id,
        categories: { connect: [{ id: techCategory.id }] },
        tags: { connect: [{ id: javascriptTag.id }, { id: webdevTag.id }] },
      },
    });
  }

  console.log('✅ More posts added successfully!');
}

addMorePosts()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
