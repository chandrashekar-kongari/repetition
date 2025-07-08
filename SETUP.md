# Setup Instructions

This Next.js app uses Neon as the PostgreSQL database provider. Follow these steps to get started:

## Database Setup (Neon)

1. **Create a Neon Account**

   - Go to [https://neon.com/](https://neon.com/)
   - Sign up for a free account
   - Create a new project

2. **Get Your Database URL**

   - In your Neon dashboard, go to the "Connection Details" section
   - Copy the connection string (it looks like: `postgresql://username:password@ep-example.us-east-2.aws.neon.tech/dbname?sslmode=require`)

3. **Set Environment Variables**

   ```bash
   # Create a .env file in the root of your project
   touch .env
   ```

   Add the following to your `.env` file:

   ```env
   # Neon Database URLs
   DATABASE_URL="postgresql://username:password@ep-example.us-east-2.aws.neon.tech/dbname?sslmode=require"
   DIRECT_URL="postgresql://username:password@ep-example.us-east-2.aws.neon.tech/dbname?sslmode=require"
   ```

4. **Initialize the Database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Push the schema to your Neon database
   npx prisma db push
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```

## Technologies Included

- **Next.js 15** with TypeScript and App Router
- **Tailwind CSS v4** with dark/light theme support
- **ShadCN UI** components
- **Prisma ORM** with Neon PostgreSQL
- **TanStack Query** for data fetching
- **Zod** for schema validation
- **React DnD** for drag and drop functionality

## Features Demonstrated

- Task management with drag and drop
- Dark/light theme switching
- Form validation with Zod
- Database operations with Prisma and Neon
- Optimistic updates with TanStack Query
- Responsive design with Tailwind CSS and ShadCN UI

Visit [http://localhost:3000](http://localhost:3000) to see the application!
