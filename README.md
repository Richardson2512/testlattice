# TestLattice Frontend

Next.js dashboard for the TestLattice platform.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:3001)

## Project Structure

```
frontend/
├── app/                 # Next.js 14 App Router
├── components/          # React components
├── lib/                 # Utility functions
├── types/               # TypeScript types
└── public/              # Static assets
```

