# BlogifyX

A modern, full-stack blogging platform built with React, Node.js, Express, and PostgreSQL. Features a clean, minimalist design with comprehensive blog management capabilities.

## Live Demo

- Frontend: https://blogify-7752.vercel.app
- Backend API: https://blogify-9ljq.onrender.com

## Features

### Content Management
- Create, read, update, and delete blog posts
- Rich text editor with formatting options
- Image support via URL (Unsplash integration)
- Automatic reading time calculation
- Post categorization and tagging
- Draft and publish functionality

### User Experience
- User authentication (register, login, logout)
- Real-time search with autocomplete suggestions
- Advanced filtering by category and tags
- Multiple sorting options (newest, oldest, alphabetical)
- Pagination with 6 posts per page
- Responsive design for all devices

### Search and Discovery
- Live search with instant suggestions
- Clickable autocomplete dropdown
- Search by title and content
- Filter by category (Technology, Lifestyle, Travel, Food, Art)
- Sort by date or title
- Visual search results with thumbnails

### Social Features
- Nested comment system
- User profiles
- Author attribution
- Comment threading

## Tech Stack

### Frontend
- React 19
- React Router for navigation
- Axios for API requests
- React Quill for rich text editing
- Tailwind CSS for styling
- Vite for build tooling

### Backend
- Node.js with Express
- Prisma ORM
- PostgreSQL database
- JWT authentication
- Bcrypt for password hashing
- CORS enabled

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Neon PostgreSQL

## Installation

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-secret-key"
PORT=8080
FRONTEND_URL="http://localhost:5173"
NODE_ENV="development"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Seed the database:
```bash
npm run seed
```

6. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```env
VITE_API_URL="http://localhost:8080/api"
```

4. Start the development server:
```bash
npm run dev
```

5. Open browser at http://localhost:5173

## API Documentation

### Authentication Endpoints
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- POST /api/auth/logout - Logout user
- GET /api/auth/me - Get current user

### Post Endpoints
- GET /api/posts - Get all posts (with pagination, filters, search)
- GET /api/posts/:slug - Get single post by slug
- POST /api/posts - Create new post (authenticated)
- PUT /api/posts/:id - Update post (authenticated)
- DELETE /api/posts/:id - Delete post (authenticated)

### Comment Endpoints
- GET /api/posts/:postId/comments - Get post comments
- POST /api/posts/:postId/comments - Add comment (authenticated)
- DELETE /api/posts/:postId/comments/:id - Delete comment (authenticated)

### Category Endpoints
- GET /api/categories - Get all categories
- GET /api/tags - Get all tags

### User Endpoints
- GET /api/users/:id - Get user profile
- PUT /api/users/:id - Update user profile (authenticated)

## Database Schema

### User Model
- id, username, email, password
- role (READER, AUTHOR, EDITOR, ADMIN)
- timestamps

### Post Model
- id, title, slug, content, excerpt
- coverImage, published, readingTime
- author relation
- categories and tags (many-to-many)
- timestamps

### Comment Model
- id, content
- post and author relations
- parent-child relationship for threading
- timestamps

### Category and Tag Models
- id, name
- post relations (many-to-many)

## Environment Variables

### Backend (.env)
```
DATABASE_URL - PostgreSQL connection string
JWT_SECRET - Secret key for JWT tokens
PORT - Server port (default: 8080)
FRONTEND_URL - Frontend URL for CORS
NODE_ENV - Environment (development/production)
```

### Frontend (.env)
```
VITE_API_URL - Backend API URL
```

## Deployment

### Backend (Render)

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set root directory to `server`
4. Build command: `npm install && npx prisma generate && npx prisma migrate deploy`
5. Start command: `npm start`
6. Add environment variables
7. Deploy and run seed command in shell

### Frontend (Vercel)

1. Create new project on Vercel
2. Import GitHub repository
3. Set root directory to `client`
4. Framework preset: Vite
5. Build command: `npm run build`
6. Output directory: `dist`
7. Add VITE_API_URL environment variable
8. Deploy

## Project Structure

```
blogify/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Page components
│   │   ├── api.js         # Axios configuration
│   │   └── main.jsx       # Entry point
│   ├── .env               # Environment variables
│   └── package.json
│
├── server/                # Backend Express application
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Custom middleware
│   │   └── routes/       # API routes
│   ├── prisma/
│   │   ├── schema.prisma # Database schema
│   │   └── seed.js       # Database seeder
│   ├── .env              # Environment variables
│   └── package.json
│
└── README.md
```

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies
- CORS protection
- Helmet.js security headers
- Input validation
- SQL injection prevention via Prisma
- XSS protection

## Performance Optimizations

- Database query optimization with Prisma
- Pagination for large datasets
- Debounced search (300ms)
- Lazy loading of images
- Code splitting with Vite
- Connection pooling for database
- Efficient caching strategies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a portfolio project. Feel free to fork and modify for your own use.

## License

MIT License - feel free to use this project for learning or portfolio purposes.

## Author

Built as a full-stack portfolio project demonstrating modern web development practices.

## Acknowledgments

- Images from Unsplash
- Icons and UI inspiration from modern blog platforms
- Built with best practices in mind for scalability and maintainability
