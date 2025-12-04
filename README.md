# Messaging-App
Simple Messaging App created with v0 by Vercel

## Running Locally

### Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager

### Frontend

1) Navigate to `frontend` directory
```bash
cd frontend
```

2) Install dependencies
```bash
npm install 
# or
pnpm install
```

3) Set up environment variables: Create a .env.local file in the `frontend` directory
```
NEXT_PUBLIC_BACKEND=your_backend_url_here
```

4) Run the development server or Run the production build
```bash
npm run dev
# or
npm run build
npm start
```

### Backend

1) Navitagte to `backend` directory
```bash
cd backend
```

2) Install dependencies
```bash
npm install
# or
pnpm install
```

3) Set up environment variables: Create a .env file in the `backend` directory
```
PORT=your_port_here
DB_FILE=your_sqlite_db_file_here
``` 

4) Run the server
```bash
npm start
```
