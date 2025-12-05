import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create users
  const hashedPassword = await bcrypt.hash('Demo123456', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      username: 'john_doe',
      email: 'john@example.com',
      password: hashedPassword,
      role: 'AUTHOR',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      username: 'jane_smith',
      email: 'jane@example.com',
      password: hashedPassword,
      role: 'AUTHOR',
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Users created');

  // Create categories
  const techCategory = await prisma.category.upsert({
    where: { name: 'Technology' },
    update: {},
    create: { name: 'Technology' },
  });

  const lifestyleCategory = await prisma.category.upsert({
    where: { name: 'Lifestyle' },
    update: {},
    create: { name: 'Lifestyle' },
  });

  const travelCategory = await prisma.category.upsert({
    where: { name: 'Travel' },
    update: {},
    create: { name: 'Travel' },
  });

  const foodCategory = await prisma.category.upsert({
    where: { name: 'Food' },
    update: {},
    create: { name: 'Food' },
  });

  console.log('✅ Categories created');

  // Create tags
  const reactTag = await prisma.tag.upsert({
    where: { name: 'react' },
    update: {},
    create: { name: 'react' },
  });

  const javascriptTag = await prisma.tag.upsert({
    where: { name: 'javascript' },
    update: {},
    create: { name: 'javascript' },
  });

  const webdevTag = await prisma.tag.upsert({
    where: { name: 'webdev' },
    update: {},
    create: { name: 'webdev' },
  });

  const tipsTag = await prisma.tag.upsert({
    where: { name: 'tips' },
    update: {},
    create: { name: 'tips' },
  });

  console.log('✅ Tags created');

  // Create posts - Technology Category (12 posts)
  const post1 = await prisma.post.create({
    data: {
      title: 'Getting Started with React in 2025',
      slug: 'getting-started-with-react-2025',
      content: `<h2>Introduction to React</h2>
      <p>React has become one of the most popular JavaScript libraries for building user interfaces. In this comprehensive guide, we'll explore the fundamentals of React and how to get started with it in 2025.</p>
      <h3>Why React?</h3>
      <p>React offers several advantages including component-based architecture, virtual DOM for performance, and a vast ecosystem of tools and libraries.</p>
      <h3>Setting Up Your Environment</h3>
      <p>To get started with React, you'll need Node.js installed on your machine. Then you can use Create React App or Vite to scaffold a new project.</p>
      <pre><code>npm create vite@latest my-app -- --template react</code></pre>
      <h3>Your First Component</h3>
      <p>Components are the building blocks of React applications. Here's a simple example:</p>
      <pre><code>function Welcome() {
  return &lt;h1&gt;Hello, World!&lt;/h1&gt;;
}</code></pre>`,
      excerpt: 'Learn the fundamentals of React and start building modern web applications.',
      coverImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
      published: true,
      readingTime: 5,
      authorId: user1.id,
      categories: {
        connect: [{ id: techCategory.id }],
      },
      tags: {
        connect: [{ id: reactTag.id }, { id: javascriptTag.id }, { id: webdevTag.id }],
      },
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: '10 Tips for Better Work-Life Balance',
      slug: '10-tips-better-work-life-balance',
      content: `<h2>Finding Balance in Modern Life</h2>
      <p>Maintaining a healthy work-life balance is crucial for your mental and physical well-being. Here are 10 practical tips to help you achieve better balance.</p>
      <h3>1. Set Clear Boundaries</h3>
      <p>Define specific work hours and stick to them. Don't let work bleed into your personal time.</p>
      <h3>2. Prioritize Self-Care</h3>
      <p>Make time for exercise, healthy eating, and adequate sleep. Your health should always come first.</p>
      <h3>3. Learn to Say No</h3>
      <p>It's okay to decline additional responsibilities when you're already at capacity.</p>
      <h3>4. Take Regular Breaks</h3>
      <p>Short breaks throughout the day can improve productivity and reduce stress.</p>
      <h3>5. Disconnect After Hours</h3>
      <p>Turn off work notifications and resist the urge to check emails after work hours.</p>`,
      excerpt: 'Discover practical strategies to achieve a healthier work-life balance.',
      coverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      published: true,
      readingTime: 4,
      authorId: user2.id,
      categories: {
        connect: [{ id: lifestyleCategory.id }],
      },
      tags: {
        connect: [{ id: tipsTag.id }],
      },
    },
  });

  const post3 = await prisma.post.create({
    data: {
      title: 'Exploring the Hidden Gems of Southeast Asia',
      slug: 'exploring-hidden-gems-southeast-asia',
      content: `<h2>Discover Southeast Asia's Best Kept Secrets</h2>
      <p>Southeast Asia is full of incredible destinations that go beyond the typical tourist spots. Let's explore some hidden gems that deserve your attention.</p>
      <h3>Luang Prabang, Laos</h3>
      <p>This UNESCO World Heritage site offers stunning temples, French colonial architecture, and breathtaking waterfalls.</p>
      <h3>Hoi An, Vietnam</h3>
      <p>A charming ancient town known for its well-preserved architecture, lantern-lit streets, and incredible food scene.</p>
      <h3>Koh Rong, Cambodia</h3>
      <p>An island paradise with pristine beaches, bioluminescent plankton, and a laid-back atmosphere.</p>
      <h3>Pai, Thailand</h3>
      <p>A small mountain town perfect for those seeking natural beauty, hot springs, and a bohemian vibe.</p>`,
      excerpt: 'Uncover the most beautiful and lesser-known destinations in Southeast Asia.',
      coverImage: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg',
      published: true,
      readingTime: 6,
      authorId: user1.id,
      categories: {
        connect: [{ id: travelCategory.id }],
      },
      tags: {
        connect: [{ id: tipsTag.id }],
      },
    },
  });

  const post4 = await prisma.post.create({
    data: {
      title: 'The Art of Making Perfect Sourdough Bread',
      slug: 'art-making-perfect-sourdough-bread',
      content: `<h2>Master the Craft of Sourdough Baking</h2>
      <p>Sourdough bread has experienced a renaissance in recent years. Learn how to create your own delicious, crusty loaves at home.</p>
      <h3>Creating Your Starter</h3>
      <p>A healthy starter is the foundation of great sourdough. Mix equal parts flour and water, and feed it daily for about a week.</p>
      <h3>The Autolyse Method</h3>
      <p>This technique involves mixing flour and water before adding the starter, resulting in better gluten development.</p>
      <h3>Bulk Fermentation</h3>
      <p>Allow your dough to ferment at room temperature for 4-6 hours, performing stretch and folds every 30 minutes.</p>
      <h3>Shaping and Proofing</h3>
      <p>Shape your dough gently and let it proof overnight in the refrigerator for the best flavor development.</p>
      <h3>Baking</h3>
      <p>Bake in a preheated Dutch oven at 450°F for 20 minutes covered, then 25 minutes uncovered for a perfect crust.</p>`,
      excerpt: 'Learn the secrets to baking artisan sourdough bread in your own kitchen.',
      coverImage: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
      published: true,
      readingTime: 7,
      authorId: user2.id,
      categories: {
        connect: [{ id: foodCategory.id }],
      },
      tags: {
        connect: [{ id: tipsTag.id }],
      },
    },
  });

  const post5 = await prisma.post.create({
    data: {
      title: 'Understanding JavaScript Closures',
      slug: 'understanding-javascript-closures',
      content: `<h2>Demystifying JavaScript Closures</h2>
      <p>Closures are one of the most powerful features in JavaScript, yet they often confuse beginners. Let's break them down.</p>
      <h3>What is a Closure?</h3>
      <p>A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned.</p>
      <h3>Simple Example</h3>
      <pre><code>function outer() {
  const message = 'Hello';
  function inner() {
    console.log(message);
  }
  return inner;
}
const myFunc = outer();
myFunc(); // Outputs: Hello</code></pre>
      <h3>Practical Use Cases</h3>
      <p>Closures are commonly used for data privacy, creating factory functions, and in event handlers.</p>
      <h3>Common Pitfalls</h3>
      <p>Be aware of memory leaks and the classic loop closure problem when using closures.</p>`,
      excerpt: 'A comprehensive guide to understanding and using closures in JavaScript.',
      coverImage: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
      published: true,
      readingTime: 5,
      authorId: user3.id,
      categories: {
        connect: [{ id: techCategory.id }],
      },
      tags: {
        connect: [{ id: javascriptTag.id }, { id: webdevTag.id }],
      },
    },
  });

  console.log('✅ Posts created');

  // Create comments
  await prisma.comment.create({
    data: {
      content: 'Great article! Very helpful for beginners.',
      postId: post1.id,
      authorId: user2.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Thanks for sharing these tips. I really needed this!',
      postId: post2.id,
      authorId: user1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Luang Prabang is absolutely beautiful! Highly recommend.',
      postId: post3.id,
      authorId: user3.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'My sourdough finally turned out perfect using these instructions!',
      postId: post4.id,
      authorId: user1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'This explanation of closures is the best I have seen. Thank you!',
      postId: post5.id,
      authorId: user2.id,
    },
  });

  console.log('✅ Comments created');

  // Create likes
  await prisma.like.create({
    data: {
      userId: user2.id,
      postId: post1.id,
    },
  });

  await prisma.like.create({
    data: {
      userId: user1.id,
      postId: post2.id,
    },
  });

  await prisma.like.create({
    data: {
      userId: user3.id,
      postId: post1.id,
    },
  });

  console.log('✅ Likes created');

  // Create bookmarks
  await prisma.bookmark.create({
    data: {
      userId: user1.id,
      postId: post3.id,
    },
  });

  await prisma.bookmark.create({
    data: {
      userId: user2.id,
      postId: post5.id,
    },
  });

  console.log('✅ Bookmarks created');

  console.log('🎉 Seed completed successfully!');
  console.log('\n📝 Sample Accounts:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('1. Email: john@example.com');
  console.log('   Username: john_doe');
  console.log('   Password: Demo123456');
  console.log('   Role: AUTHOR\n');
  console.log('2. Email: jane@example.com');
  console.log('   Username: jane_smith');
  console.log('   Password: Demo123456');
  console.log('   Role: AUTHOR\n');
  console.log('3. Email: admin@example.com');
  console.log('   Username: admin');
  console.log('   Password: Demo123456');
  console.log('   Role: ADMIN');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
