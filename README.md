# Laeisaz

A modern website for Laeisaz textile company built with Next.js, React, and TailwindCSS.

## Features

- Bilingual website (English/Persian)
- Product showcases with filtration
- Blog system with image management
- Analytics dashboard
- Contact forms
- Mobile responsive design

## Technology Stack

- **Frontend**: Next.js, React, TailwindCSS, Framer Motion
- **Backend**: Next.js API routes
- **Database**: MongoDB 
- **Image Storage**: Vercel Blob
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- MongoDB Atlas account
- Vercel account (for Blob storage)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/barrett0073/laeisaz.git
cd laeisaz
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
# MongoDB Configuration
# ==================
# Connection String (required)
# Format: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

MONGODB_URI=mongodb+srv://mahyarahadi155:1385138Mm@laeisaz.avwxcsf.mongodb.net/?retryWrites=true
w=majority&appName=laeisaz


# Database Name (optional, if not specified in the connection string)
MONGODB_DB=laeisaz

# Vercel Blob Storage
# ==================
# Read/Write Token (required for image uploads)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_token123456789_987654321

# Authentication
# ==================
# NextAuth.js Secret (required for session encryption)
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your-random-secret-string-should-be-at-least-32-chars
NEXTAUTH_URL=http://localhost:3000

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_admin_password

# Website Configuration
# ==================
# Site URL (used for SEO, social sharing, and API callbacks)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Default Language
NEXT_PUBLIC_DEFAULT_LOCALE=en

# API Keys for External Services
# ==================
# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Email Service (for contact forms)
# Use SendGrid, Mailgun, or other email service providers
EMAIL_FROM=noreply@yourdomain.com
EMAIL_SERVER_USER=apikey
EMAIL_SERVER_PASSWORD=your_email_service_api_key
EMAIL_SERVER_HOST=smtp.sendgrid.net
EMAIL_SERVER_PORT=587

# Development Settings
# ==================
# Debug mode (set to true for development, false for production)
DEBUG=false

# Logging level (debug, info, warn, error)
LOG_LEVEL=info

# Feature Flags
# ==================
# Enable/disable features that are in development
ENABLE_BLOG=true
ENABLE_ANALYTICS_DASHBOARD=true
ENABLE_MULTILINGUAL=true
```

### Environment Variables Explained

#### Required Variables
- **MONGODB_URI**: Your MongoDB connection string. You'll get this from MongoDB Atlas after creating your cluster and database user.
- **BLOB_READ_WRITE_TOKEN**: Token to authorize your application to read from and write to Vercel Blob storage.
- **NEXTAUTH_SECRET**: A random string used to encrypt session cookies. Generate with `openssl rand -base64 32`.
- **NEXTAUTH_URL**: The base URL of your application. Use `http://localhost:3000` for local development.

#### Authentication Variables
- **ADMIN_USERNAME** and **ADMIN_PASSWORD**: Credentials to access the admin section of the website.

#### Optional Variables
- **MONGODB_DB**: Your database name, if not specified in the connection string.
- **NEXT_PUBLIC_SITE_URL**: Used for SEO, social sharing, and API callbacks.
- **NEXT_PUBLIC_DEFAULT_LOCALE**: Default language for the site (en/fa).
- **NEXT_PUBLIC_GA_MEASUREMENT_ID**: Google Analytics tracking ID.

#### Email Configuration
- **EMAIL_FROM**: The sender email address for contact forms.
- **EMAIL_SERVER_USER**: Username for your email service.
- **EMAIL_SERVER_PASSWORD**: Password or API key for your email service.
- **EMAIL_SERVER_HOST**: SMTP host for your email service.
- **EMAIL_SERVER_PORT**: SMTP port for your email service.

#### Development Variables
- **DEBUG**: Set to true for development, false for production.
- **LOG_LEVEL**: Logging level (debug, info, warn, error).

#### Feature Flags
- **ENABLE_BLOG**: Toggle the blog feature on/off.
- **ENABLE_ANALYTICS_DASHBOARD**: Toggle the analytics dashboard on/off.
- **ENABLE_MULTILINGUAL**: Toggle multilingual support on/off.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

This project uses MongoDB for the database. Follow these steps to set up your MongoDB:

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account
2. Create a new cluster (free tier is sufficient for development)
3. Create a database user with read/write permissions
4. Allow network access from your IP address (or from anywhere for development)
5. Get your connection string from the Atlas dashboard:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select Node.js as the driver and copy the connection string
   - Replace `<password>` with your database user password
   - Add the connection string to your `.env.local` file

## Vercel Blob Setup

For image storage, this project uses Vercel Blob:

1. Create a [Vercel](https://vercel.com/signup) account
2. Create a new project
3. Go to Storage tab and set up a new Blob store
4. Copy the Blob read/write token and add it to your `.env.local` file

## Database Migration from SQLite

This project was migrated from SQLite to MongoDB with Vercel Blob for image storage. If you're working with the older version, you can migrate your data using the provided tools.

### Changes Made in Migration

1. Replaced Prisma SQLite with MongoDB using Mongoose
2. Replaced direct file storage with Vercel Blob for blog images
3. Updated API routes to work with the new database systems

### Migration Process

To migrate existing blog posts from SQLite to MongoDB:

1. Make sure you have both SQLite and MongoDB databases set up
2. Create your `.env.local` file with all required variables
3. Run the migration script:
```bash
node scripts/migrate-to-mongodb.js
```

This script will:
- Connect to your SQLite database using Prisma
- Fetch all blog posts and page views
- Convert base64 images to files and upload them to Vercel Blob
- Create new documents in MongoDB with updated image URLs
- Migrate page view data if available

### Code Structure

The database implementation involves the following key files:

- `app/models/BlogPost.ts` - MongoDB schema for blog posts
- `app/models/PageView.ts` - MongoDB schema for page views
- `app/lib/mongodb.ts` - MongoDB connection utility
- `app/lib/blob.ts` - Vercel Blob storage utility
- `app/api/blog/route.ts` - API route for blog posts
- `app/api/blog/[id]/route.ts` - API route for individual blog posts

## Testing

After setting up the environment variables, run the development server and test the following functionality:

- Blog post creation with image upload
- Blog post editing and image management
- Blog post deletion (should also delete associated images)
- Page view tracking

## MongoDB Testing Tools

This project includes several utility scripts to test and validate the MongoDB connection and functionality:

### Basic Testing

```bash
# Test MongoDB connection and basic blog post operations
node scripts/test-mongodb.js
```

This script verifies your database connection and performs basic CRUD operations with a test blog post.

### Schema Validation Testing

```bash
# Test blog model schema validation (no actual database connection required)
node scripts/test-blog-model.js
```

This script validates the MongoDB schema structure without needing to connect to the database, checking required fields and default values.

### CRUD Operations Testing

```bash
# Test comprehensive CRUD operations for blog posts
node scripts/test-mongodb-crud.js
```

This interactive tool allows you to test creating, reading, updating, and deleting blog posts, along with searching and filtering capabilities.

### Pagination Testing

```bash
# Test blog post pagination functionality
node scripts/test-mongodb-pagination.js
```

This script tests the pagination functionality for blog posts, including different page sizes and category filtering.

### MongoDB Connection Helper

```bash
# Get help configuring MongoDB Atlas network access
node scripts/check-mongodb-access.js
```

This utility script helps troubleshoot connection issues by:
1. Detecting your current IP address
2. Verifying your MongoDB URI format
3. Testing DNS resolution
4. Providing steps to configure MongoDB Atlas IP access whitelist

If you're experiencing connection issues, run this script first to ensure your MongoDB Atlas configuration allows connections from your current IP address.

## Deployment

The easiest way to deploy the application is using Vercel:

1. Push your code to GitHub
2. Import the project to Vercel
3. Set the required environment variables
4. Deploy!

## Troubleshooting

- If you encounter connection issues with MongoDB, check your network settings and connection string
- For Vercel Blob errors, ensure your token has the correct permissions
- Check server logs for detailed error messages
- Make sure your MongoDB user has the correct permissions (read/write)
- If migrating data, ensure both databases are accessible

## Benefits of MongoDB and Vercel Blob

- **Scalability**: MongoDB scales better for growing applications
- **Performance**: Faster queries and better handling of JSON data
- **Image Storage**: Vercel Blob provides CDN-backed, optimized image storage
- **Deployment**: Easier deployment with Vercel's integrated services

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [MongoDB](https://www.mongodb.com/)
- [Vercel](https://vercel.com/)

## Git Commands and Scripts

### Git Update Script

We have a convenient script to handle Git operations including pushing to main. The script handles:
- Configuring Git for large files
- Adding all changes
- Showing current Git status
- Committing changes with a custom message
- Pushing to the main branch

#### How to Use

1. Make sure you're in the project root directory
2. Run the script:
```bash
./scripts/git-update.sh
```

3. When prompted, either:
   - Enter a custom commit message
   - Press Enter to use the default message "Update"

The script will show colored output for each step:
- 🟢 Green: Success
- 🔴 Red: Error
- 🟡 Yellow: In progress

#### Manual Git Commands

If you prefer to run Git commands manually, here are the common commands:

```bash
# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to main branch
git push origin main

# Check status
git status

# Configure Git for large files (if needed)
git config --global http.postBuffer 157286400
git config --global http.maxRequestBuffer 100M
git config --global core.compression 9
git config --global http.lowSpeedLimit 1000
git config --global http.lowSpeedTime 300
```
