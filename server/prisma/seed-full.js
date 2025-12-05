import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive seed...');

  // Clear existing data
  await prisma.comment.deleteMany({});
  await prisma.like.deleteMany({});
  await prisma.bookmark.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.user.deleteMany({});

  // Create users
  const hashedPassword = await bcrypt.hash('Demo123456', 10);

  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'john@example.com',
      password: hashedPassword,
      role: 'AUTHOR',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'jane_smith',
      email: 'jane@example.com',
      password: hashedPassword,
      role: 'AUTHOR',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Users created');

  // Create categories
  const techCategory = await prisma.category.create({ data: { name: 'Technology' } });
  const lifestyleCategory = await prisma.category.create({ data: { name: 'Lifestyle' } });
  const travelCategory = await prisma.category.create({ data: { name: 'Travel' } });
  const foodCategory = await prisma.category.create({ data: { name: 'Food' } });
  const artCategory = await prisma.category.create({ data: { name: 'Art' } });

  console.log('✅ Categories created');

  // Create tags
  const reactTag = await prisma.tag.create({ data: { name: 'react' } });
  const javascriptTag = await prisma.tag.create({ data: { name: 'javascript' } });
  const webdevTag = await prisma.tag.create({ data: { name: 'webdev' } });
  const tipsTag = await prisma.tag.create({ data: { name: 'tips' } });

  console.log('✅ Tags created');

  const users = [user1, user2, user3];
  
  // Technology posts (15 posts)
  const techPosts = [
    { title: 'Getting Started with React in 2025', slug: 'getting-started-react-2025', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800', time: 5 },
    { title: 'Building Scalable APIs with Node.js', slug: 'building-scalable-apis-nodejs', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800', time: 8 },
    { title: 'TypeScript Best Practices for 2025', slug: 'typescript-best-practices-2025', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800', time: 6 },
    { title: 'Understanding JavaScript Closures', slug: 'understanding-javascript-closures', image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800', time: 5 },
    { title: 'Docker for Beginners', slug: 'docker-for-beginners', image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800', time: 7 },
    { title: 'GraphQL vs REST APIs', slug: 'graphql-vs-rest-apis', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800', time: 6 },
    { title: 'Microservices Architecture Explained', slug: 'microservices-architecture-explained', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', time: 9 },
    { title: 'Web Security Best Practices', slug: 'web-security-best-practices', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800', time: 7 },
    { title: 'Introduction to Machine Learning', slug: 'introduction-machine-learning', image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800', time: 10 },
    { title: 'Cloud Computing Fundamentals', slug: 'cloud-computing-fundamentals', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800', time: 8 },
    { title: 'Git Workflow Best Practices', slug: 'git-workflow-best-practices', image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800', time: 5 },
    { title: 'CSS Grid vs Flexbox', slug: 'css-grid-vs-flexbox', image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800', time: 6 },
    { title: 'Progressive Web Apps Guide', slug: 'progressive-web-apps-guide', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800', time: 7 },
    { title: 'Database Design Principles', slug: 'database-design-principles', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800', time: 8 },
    { title: 'Agile Development Methodology', slug: 'agile-development-methodology', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800', time: 6 },
  ];

  for (const post of techPosts) {
    await prisma.post.create({
      data: {
        title: post.title,
        slug: post.slug,
        content: `<h2>${post.title}</h2><p>This is a comprehensive guide about ${post.title.toLowerCase()}. Learn everything you need to know to master this topic.</p><h3>Key Concepts</h3><p>Understanding the fundamentals is crucial for success in this area.</p><h3>Practical Applications</h3><p>Apply these concepts in real-world scenarios to build better solutions.</p>`,
        excerpt: `A comprehensive guide to ${post.title.toLowerCase()}.`,
        coverImage: post.image,
        published: true,
        readingTime: post.time,
        authorId: users[Math.floor(Math.random() * users.length)].id,
        categories: { connect: [{ id: techCategory.id }] },
        tags: { connect: [{ id: javascriptTag.id }, { id: webdevTag.id }] },
      },
    });
  }

  // Lifestyle posts (12 posts)
  const lifestylePosts = [
    { title: '10 Tips for Better Work-Life Balance', slug: '10-tips-better-work-life-balance', image: 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=800', time: 4 },
    { title: 'Minimalist Living Guide', slug: 'minimalist-living-guide', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800', time: 5 },
    { title: 'Morning Routines of Successful People', slug: 'morning-routines-successful-people', image: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800', time: 6 },
    { title: 'Meditation for Beginners', slug: 'meditation-for-beginners', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', time: 5 },
    { title: 'Building Healthy Habits', slug: 'building-healthy-habits', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800', time: 7 },
    { title: 'Time Management Strategies', slug: 'time-management-strategies', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800', time: 6 },
    { title: 'Sustainable Living Tips', slug: 'sustainable-living-tips', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800', time: 5 },
    { title: 'Home Organization Hacks', slug: 'home-organization-hacks', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800', time: 4 },
    { title: 'Financial Planning Basics', slug: 'financial-planning-basics', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800', time: 8 },
    { title: 'Self-Care Practices', slug: 'self-care-practices', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800', time: 5 },
    { title: 'Productivity Tools and Apps', slug: 'productivity-tools-apps', image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800', time: 6 },
    { title: 'Digital Detox Guide', slug: 'digital-detox-guide', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800', time: 5 },
  ];

  for (const post of lifestylePosts) {
    await prisma.post.create({
      data: {
        title: post.title,
        slug: post.slug,
        content: `<h2>${post.title}</h2><p>Discover practical advice and strategies for ${post.title.toLowerCase()}.</p><h3>Getting Started</h3><p>Begin your journey with these simple steps.</p><h3>Long-term Benefits</h3><p>Implementing these practices will transform your daily life.</p>`,
        excerpt: `Practical advice for ${post.title.toLowerCase()}.`,
        coverImage: post.image,
        published: true,
        readingTime: post.time,
        authorId: users[Math.floor(Math.random() * users.length)].id,
        categories: { connect: [{ id: lifestyleCategory.id }] },
        tags: { connect: [{ id: tipsTag.id }] },
      },
    });
  }

  // Travel posts (12 posts)
  const travelPosts = [
    { title: 'Exploring Hidden Gems of Southeast Asia', slug: 'exploring-hidden-gems-southeast-asia', image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800', time: 6 },
    { title: 'Budget Travel Tips for Europe', slug: 'budget-travel-tips-europe', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800', time: 7 },
    { title: 'Solo Travel Safety Guide', slug: 'solo-travel-safety-guide', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800', time: 5 },
    { title: 'Best Beaches in the Caribbean', slug: 'best-beaches-caribbean', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', time: 6 },
    { title: 'Mountain Hiking Adventures', slug: 'mountain-hiking-adventures', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', time: 8 },
    { title: 'Cultural Experiences in Japan', slug: 'cultural-experiences-japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800', time: 7 },
    { title: 'Road Trip Across America', slug: 'road-trip-across-america', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800', time: 9 },
    { title: 'Backpacking Through South America', slug: 'backpacking-south-america', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800', time: 8 },
    { title: 'Luxury Travel Destinations', slug: 'luxury-travel-destinations', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800', time: 6 },
    { title: 'Digital Nomad Lifestyle', slug: 'digital-nomad-lifestyle', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800', time: 7 },
    { title: 'Wildlife Safari in Africa', slug: 'wildlife-safari-africa', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', time: 8 },
    { title: 'Island Hopping in Greece', slug: 'island-hopping-greece', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800', time: 6 },
  ];

  for (const post of travelPosts) {
    await prisma.post.create({
      data: {
        title: post.title,
        slug: post.slug,
        content: `<h2>${post.title}</h2><p>Embark on an unforgettable journey with this guide to ${post.title.toLowerCase()}.</p><h3>Planning Your Trip</h3><p>Essential tips for planning the perfect adventure.</p><h3>Must-See Attractions</h3><p>Don't miss these incredible experiences.</p>`,
        excerpt: `Your ultimate guide to ${post.title.toLowerCase()}.`,
        coverImage: post.image,
        published: true,
        readingTime: post.time,
        authorId: users[Math.floor(Math.random() * users.length)].id,
        categories: { connect: [{ id: travelCategory.id }] },
        tags: { connect: [{ id: tipsTag.id }] },
      },
    });
  }

  // Food posts (12 posts)
  const foodPosts = [
    { title: 'The Art of Sourdough Baking', slug: 'art-sourdough-baking', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800', time: 7 },
    { title: 'Mediterranean Diet Guide', slug: 'mediterranean-diet-guide', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800', time: 6 },
    { title: 'Mastering French Cuisine', slug: 'mastering-french-cuisine', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', time: 8 },
    { title: 'Vegan Cooking Essentials', slug: 'vegan-cooking-essentials', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', time: 5 },
    { title: 'Street Food Around the World', slug: 'street-food-around-world', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', time: 6 },
    { title: 'Wine Pairing Basics', slug: 'wine-pairing-basics', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800', time: 5 },
    { title: 'Homemade Pasta Techniques', slug: 'homemade-pasta-techniques', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800', time: 7 },
    { title: 'Asian Fusion Recipes', slug: 'asian-fusion-recipes', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800', time: 6 },
    { title: 'Dessert Decoration Tips', slug: 'dessert-decoration-tips', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800', time: 5 },
    { title: 'Coffee Brewing Methods', slug: 'coffee-brewing-methods', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800', time: 4 },
    { title: 'Meal Prep for Busy Professionals', slug: 'meal-prep-busy-professionals', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800', time: 6 },
    { title: 'Fermentation and Pickling', slug: 'fermentation-pickling', image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800', time: 7 },
  ];

  for (const post of foodPosts) {
    await prisma.post.create({
      data: {
        title: post.title,
        slug: post.slug,
        content: `<h2>${post.title}</h2><p>Explore the delicious world of ${post.title.toLowerCase()} with this comprehensive guide.</p><h3>Ingredients and Tools</h3><p>Everything you need to get started.</p><h3>Step-by-Step Instructions</h3><p>Follow these easy steps to create amazing dishes.</p>`,
        excerpt: `Master the art of ${post.title.toLowerCase()}.`,
        coverImage: post.image,
        published: true,
        readingTime: post.time,
        authorId: users[Math.floor(Math.random() * users.length)].id,
        categories: { connect: [{ id: foodCategory.id }] },
        tags: { connect: [{ id: tipsTag.id }] },
      },
    });
  }

  // Art posts (10 posts)
  const artPosts = [
    { title: 'Introduction to Watercolor Painting', slug: 'introduction-watercolor-painting', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800', time: 6 },
    { title: 'Digital Art for Beginners', slug: 'digital-art-beginners', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800', time: 7 },
    { title: 'Photography Composition Rules', slug: 'photography-composition-rules', image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800', time: 5 },
    { title: 'Modern Art Movements', slug: 'modern-art-movements', image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800', time: 8 },
    { title: 'Sculpture Techniques', slug: 'sculpture-techniques', image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800', time: 7 },
    { title: 'Color Theory Basics', slug: 'color-theory-basics', image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800', time: 5 },
    { title: 'Portrait Drawing Guide', slug: 'portrait-drawing-guide', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800', time: 6 },
    { title: 'Abstract Art Explained', slug: 'abstract-art-explained', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800', time: 5 },
    { title: 'Street Art and Graffiti', slug: 'street-art-graffiti', image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800', time: 6 },
    { title: 'Art History Timeline', slug: 'art-history-timeline', image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800', time: 9 },
  ];

  for (const post of artPosts) {
    await prisma.post.create({
      data: {
        title: post.title,
        slug: post.slug,
        content: `<h2>${post.title}</h2><p>Dive into the creative world of ${post.title.toLowerCase()}.</p><h3>Understanding the Basics</h3><p>Learn the fundamental principles and techniques.</p><h3>Advanced Techniques</h3><p>Take your skills to the next level with these expert tips.</p>`,
        excerpt: `Explore ${post.title.toLowerCase()} and unleash your creativity.`,
        coverImage: post.image,
        published: true,
        readingTime: post.time,
        authorId: users[Math.floor(Math.random() * users.length)].id,
        categories: { connect: [{ id: artCategory.id }] },
        tags: { connect: [{ id: tipsTag.id }] },
      },
    });
  }

  console.log('✅ All 61 posts created');

  // Create some comments
  const posts = await prisma.post.findMany({ take: 5 });
  for (const post of posts) {
    await prisma.comment.create({
      data: {
        content: 'Great article! Very informative.',
        postId: post.id,
        authorId: users[Math.floor(Math.random() * users.length)].id,
      },
    });
  }

  console.log('✅ Comments created');

  // Create some likes
  for (const post of posts) {
    await prisma.like.create({
      data: {
        userId: users[Math.floor(Math.random() * users.length)].id,
        postId: post.id,
      },
    });
  }

  console.log('✅ Likes created');

  console.log('🎉 Seed completed successfully with 61 posts!');
  console.log('📝 Sample Accounts:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('1. Email: john@example.com');
  console.log('   Username: john_doe');
  console.log('   Password: Demo123456');
  console.log('   Role: AUTHOR');
  console.log('');
  console.log('2. Email: jane@example.com');
  console.log('   Username: jane_smith');
  console.log('   Password: Demo123456');
  console.log('   Role: AUTHOR');
  console.log('');
  console.log('3. Email: admin@example.com');
  console.log('   Username: admin');
  console.log('   Password: Demo123456');
  console.log('   Role: ADMIN');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
